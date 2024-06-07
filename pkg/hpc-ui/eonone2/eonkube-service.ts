// import { v1 as uuidv1 } from 'uuid';
import { Store } from 'vuex';
import { NODE } from '@shell/config/types';
// import { fetchOrCreateSetting } from '@shell/utils/settings';
import { createYamlWithOptions } from '@shell/utils/create-yaml';
import { RaidCliCmd } from './interface/raid-cli-cmd';
import { newRaidCmd } from './raid-cli-service';
// import { stringify } from '@shell/utils/error';
// import Resource from '@shell/plugins/dashboard-store/resource-class';

export const NODE_ROLES = {
  CONTROL_PLANE_OLD: 'node-role.kubernetes.io/controlplane',
  CONTROL_PLANE:     'node-role.kubernetes.io/control-plane',
  WORKER:            'node-role.kubernetes.io/worker',
  ETCD:              'node-role.kubernetes.io/etcd',
  HEAD_NODE:         'node-role.cluster/head_node',
  SCMGMT_IP:         'node-role.cluster/scmgmt-ip',
};

export interface ConfigMapJobParam {
    JOB_ID: string;
    CMD: RaidCliCmd;
    getYaml: Function;
}

class ConfigMapJob implements ConfigMapJobParam {
  JOB_ID: string;
  CMD: RaidCliCmd;
  getYaml = this.Yaml;
  constructor(JOB_ID: string, CMD: RaidCliCmd) {
    this.JOB_ID = JOB_ID;
    this.CMD = CMD;
  }

  public Yaml(data: object): object {
  // get Yaml(): Resource {
    return {
      apiVersion: 'v1',
      data,
      // data:       {
      //   // auth:   JSON.stringify([{ user: 'admin' }]),
      //   // params: JSON.stringify([{
      //   //   key:   'showExternalStorage',
      //   //   param: {
      //   //     ip:  '172.26.112.133',
      //   //     uid: '4CB17'
      //   //   },
      //   //   showArray: true
      //   // }]),
      //   cmdKey:   'showExternalStorage',
      //   ip:       '172.24.110.127',
      //   uid:      'AC7D2'
      // },
      kind:        'ConfigMap',
      metadata:    {
        // name:      'a4ca2909-6c77-48b7-8b08-6586fd3c4251',
        name:      this.JOB_ID,
        namespace: 'autotest-eonkube-job'
      }
    };
  }
}

// use Connie API
function getEonOneIp(store: any) {
  const inStore = store.getters['currentProduct'].inStore;
  const allNodes = store.getters[`${ inStore }/all`](NODE);
  const headNode = allNodes.filter((n: { metadata: { labels: { [x: string]: any; }; }; }) => n.metadata.labels[NODE_ROLES.HEAD_NODE]);
  const scmgmtIP = headNode[0]?.metadata?.annotations[NODE_ROLES.SCMGMT_IP];

  // return (scmgmtIP === '') ? scmgmtIP : '172.27.118.101';
  return (scmgmtIP === '') ? scmgmtIP : '172.27.12.113';
}

function getEonOneDevId(store: any) {
  // const inStore = store.getters['currentProduct'].inStore;
  // const allNodes = store.getters[`${ inStore }/all`](NODE);
  // const headNode = allNodes.filter((n: { metadata: { labels: { [x: string]: any; }; }; }) => n.metadata.labels[NODE_ROLES.HEAD_NODE]);
  // const scmgmtIP = headNode[0]?.metadata?.annotations[NODE_ROLES.SCMGMT_IP];
  // configmap/externalstorageIP

  return '8DCC1C';
}

export class EonOneJobService {
  private $store!: Store<any>;
  private scmgmtIP!: string;
  private deviceId!: string;
  public executeJob = this._executeJob;

  constructor(scmgmtIP?: string, store?: Store<any>) {
    if (store !== undefined) {
      this.$store = store;
      this.deviceId = getEonOneDevId(this.$store);
    }
    if (scmgmtIP !== undefined) {
      this.scmgmtIP = scmgmtIP;
    } else {
      this.scmgmtIP = getEonOneIp(this.$store);
    }
    // this.APIs = {
    //   showExternalStorage: _showExternalStorage,
    // };
    // this.init();
  }

  private createResourceYaml(SCHEMA: string, resource: object, modifiers: string): string {
    const inStore = this.$store.getters['currentProduct'].inStore;
    // const schemas = [this.$store.getters[`${ inStore }/schemaFor`](SCHEMA)];
    const schemas = this.$store.getters[`${ inStore }/all`]('schema');
    // const out = await createYamlWithOptions(schemas, resource.type, resource, modifiers);
    const out = createYamlWithOptions(schemas, 'configmap', resource, modifiers);

    return out;
  }

  public async _executeJob(cmdKey: string): Promise<boolean> {
    const job = new ConfigMapJob(crypto.randomUUID(), newRaidCmd(this.deviceId, '', ''));
    // if (job === undefined) {
    //   job = new ConfigMapJob(crypto.randomUUID(), newRaidCmd(this.deviceId, '', ''));
    // }
    let jobAttr = {};

    switch (cmdKey) {
    case 'showExternalStorage':
      jobAttr = this._showExternalStorage(job);
      break;
    case 'openFileExplorer':
      jobAttr = this._openFileExplorer(job);
      break;
    default:
      // auto find this.functions
    }

    console.log(jobAttr);
    // await fetchOrCreateSetting(this.$store, `ConfigMap`, jobAttr, true);
    const yaml = this.createResourceYaml(`ConfigMap`, jobAttr, '');

    await this.applyConfigmap(yaml);

    return await this.test(job.JOB_ID);
  }

  private _showExternalStorage(job: ConfigMapJob): object {
    const data = {
      cmdKey:   'showExternalStorage',
      uid:      'AC7D2', // default/configmap/hpc .data.workspace[0].deviceId fetch deviceId
      ip:       '172.24.110.127', // default/configmap/externalstoragelist fetch ip
    };

    return job.getYaml(data);
  }

  private _openFileExplorer(job: ConfigMapJob): object {
    const data = {
      cmdKey:   'openFileExplorer',
      deviceId: 'AC7D2', // TODO: get attr from default/configmap/hpc .data.workspace[0].deviceId
      path:     '', // open to subfolder TODO: get attr from default/configmap/hpc .data.workspace[0].folder
    };

    return job.getYaml(data);
  }

  async applyConfigmap(yaml: string) {
    try {
      // kubectl get cm 2ad5f604-7cff-48b6-b891-57882847f222
      // apply configmap under user namespace
      // cli: showExternalStorage, fill params
      const requestOptions = {
        url:                  `v1/configmaps`,
        method:               'POST',
        headers:              { 'Content-Type': 'application/yaml' },
        data:                 yaml,
        // redirectUnauthorized: false,
      };

      const response = await this.$store.dispatch('management/request', requestOptions);
      const data = await response;

      if (data.access_token !== undefined && data.access_token !== null && data.access_token !== '') {
        return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }

  private async test(jobId: string) {
    try {
      // kubectl get cm 2ad5f604-7cff-48b6-b891-57882847f222
      // apply configmap under user namespace
      // cli: showExternalStorage, fill params
      const requestOptions = {
        url:                  `meta/proxy/http:/${ this.scmgmtIP }:8816/eonkube/cmd/${ jobId }`,
        method:               'GET',
        headers:              { 'Content-Type': 'application/json' },
        // redirectUnauthorized: false,
      };

      const response = await this.$store.dispatch('management/request', requestOptions);
      const data = await response;

      if (data.access_token !== undefined && data.access_token !== null && data.access_token !== '') {
        return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }
}
function createResourceYaml(modifiers: any) {
  throw new Error('Function not implemented.');
}
