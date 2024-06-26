// import { v1 as uuidv1 } from 'uuid';
import { Store } from 'vuex';
import { NODE, CONFIG_MAP } from '@shell/config/types';
// import { fetchOrCreateSetting } from '@shell/utils/settings';
import { createYamlWithOptions } from '@shell/utils/create-yaml';
import { RaidCliCmd } from './interface/raid-cli-cmd';
import { RaidCliAPI } from './raid-cli-api';
import { remoteSendJobsParam, shellMkdirParam, showExternalStorageParam } from './interface/cmd-param-raid';
import { hpcApplyParam, hpcRemoveParam, openFileExplorerParam, FssK8sCsiExStorageMountParam, vcctlParam, FssExplorerStartParam } from './interface/cmd-param-fss';
// import { stringify } from '@shell/utils/error';
// import Resource from '@shell/plugins/dashboard-store/resource-class';

export const NODE_ROLES = {
  CONTROL_PLANE_OLD: 'node-role.kubernetes.io/controlplane',
  CONTROL_PLANE: 'node-role.kubernetes.io/control-plane',
  WORKER: 'node-role.kubernetes.io/worker',
  ETCD: 'node-role.kubernetes.io/etcd',
  HEAD_NODE: 'node-role.cluster/head_node',
  SCMGMT_IP: 'node-role.cluster/scmgmt-ip',
};

const configmapInNamespace = `default`;

// use Connie API
function getEonOneIp(store: any) {
  const inStore = store.getters['currentProduct'].inStore;
  const allNodes = store.getters[`${inStore}/all`](NODE);
  const headNode = allNodes.filter((n: { metadata: { labels: { [x: string]: any; }; }; }) => n.metadata.labels[NODE_ROLES.HEAD_NODE]);
  const scmgmtIP = headNode[0]?.metadata?.annotations[NODE_ROLES.SCMGMT_IP];

  return (scmgmtIP !== '') ? scmgmtIP : '172.27.118.101';
  // return (scmgmtIP === '') ? scmgmtIP : '172.27.12.113';
}

function getEonOneDevId(store: any) {
  // const inStore = store.getters['currentProduct'].inStore;
  // const allNodes = store.getters[`${ inStore }/all`](NODE);
  // const headNode = allNodes.filter((n: { metadata: { labels: { [x: string]: any; }; }; }) => n.metadata.labels[NODE_ROLES.HEAD_NODE]);
  // const scmgmtIP = headNode[0]?.metadata?.annotations[NODE_ROLES.SCMGMT_IP];
  // configmap/externalstorageIP

  return '8D6785';
}

type SelectPartial<T, K extends keyof T | (keyof T)[]> =
  Partial<Pick<T, K extends (keyof T)[] ? K[number] : K>> &
  Omit<T, K extends (keyof T)[] ? K[number] : K> extends infer O ?
  { [P in keyof O]: O[P] } : never;

interface CmdToParam {
  raidCliCmd: never;
  showExternalStorage: showExternalStorageParam;
  openFileExplorer: SelectPartial<openFileExplorerParam, [`deviceId`, `ip`, `path`]>;
  hpcGet: never;
  hpcApply: hpcApplyParam;
  hpcRemove: hpcRemoveParam;
  fssK8sCsiExStorageMount: FssK8sCsiExStorageMountParam;
  vcctlResume: vcctlParam;
  vcctlPause: vcctlParam;
  fssExplorerStart: FssExplorerStartParam;
  remoteSendJobs: SelectPartial<remoteSendJobsParam, [`uid`]>;
  shellMkdir: shellMkdirParam;
}

type CmdKey = keyof CmdToParam;

interface workspace {
  deviceId: string;
  projectName: string;
  folder: string;
  homeFolder: string;
  appFolder: string;
}

export class HpcConfig {
  private _plugins: Array<string>;
  private _service: object;
  private _workspace: Array<workspace>;

  constructor(cm: any) {
    this._plugins = cm.plugins;
    this._service = JSON.parse(cm.service);
    this._workspace = JSON.parse(cm.workspace);
  }

  public get plugins(): Array<string> {
    return this._plugins;
  }

  public get service(): object {
    return this._service;
  }

  public get workspace(): Array<object> {
    return this._workspace;
  }

  public getHome(devId: string): string {
    const h = this._workspace.find(w => w.deviceId === devId)?.homeFolder;
    return h ? h : ``;
  }
}


export class EonOneService {
  private $store!: Store<any>;
  private scmgmtIP!: string;
  private deviceId!: string;
  private hpcConfig!: HpcConfig;
  private namespace: string;
  public executeCmd = this._executeCmd;

  constructor(scmgmtIP?: string, store?: Store<any>) {
    if (store !== undefined) {
      this.$store = store;
      this.deviceId = getEonOneDevId(this.$store);
      const principal = this.$store.getters["rancher/byId"](
        "principal",
        this.$store.getters["auth/principalId"]
      );
      this.namespace = principal.id.split(`//`)[1] || configmapInNamespace;
    } else {
      this.namespace = configmapInNamespace;
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
    const schemas = this.$store.getters[`${inStore}/all`]('schema');
    // const out = await createYamlWithOptions(schemas, resource.type, resource, modifiers);
    const out = createYamlWithOptions(schemas, 'configmap', resource, modifiers);

    return out;
  }

  private createCmdYaml(raidCLiCmd: RaidCliCmd, JOB_ID: string): object {
    // const key = raidCLiCmd.key;
    const data = raidCLiCmd.param || {};

    data.cmdKey = raidCLiCmd.key;

    // const dataStr = JSON.stringify(data);
    return {
      apiVersion: 'v1',
      // data: dataStr,
      data,
      kind: 'ConfigMap',
      metadata: {
        name: JOB_ID,
        namespace: this.namespace
      }
    };
  }

  private async _executeCmd(cmd: RaidCliCmd): Promise<any> {
    const JOB_ID = crypto.randomUUID();
    const yaml = this.createCmdYaml(cmd, JOB_ID);
    console.log(`====================`)
    console.log(`cmd yaml`)
    console.log(yaml)
    console.log(`====================`)
    const yamlStr = this.createResourceYaml(`ConfigMap`, yaml, '');
    await this.applyConfigMap(yamlStr);
    return await this.sendCmd(JOB_ID);
  }

  public getCmdParam<T extends CmdKey>(cmdKey: T, arg?: CmdToParam[T], raidCLiCmd?: RaidCliCmd): RaidCliCmd {
    const principal = this.$store.getters['rancher/byId']('principal', this.$store.getters['auth/principalId']);
    let cmd: RaidCliCmd = raidCLiCmd || {
      key: cmdKey,
      devID: this.deviceId,
      refParam: {},
      refReturn: {},
    };
    switch (cmdKey) {
      case `showExternalStorage`: {
        let args = <CmdToParam['showExternalStorage']>arg;
        return RaidCliAPI.showExternalStorage(cmd, {
          ip: args?.ip || this.scmgmtIP,
          uid: args?.uid,
        })
      }
      case `openFileExplorer`: {
        let args = <CmdToParam['openFileExplorer']>arg;

        // fetch hpc external storage deviceId and ip
        return RaidCliAPI.openFileExplorer(cmd, {
          identity: principal.loginName,
          deviceId: args?.deviceId || 'AC7D2' || this.deviceId,
          ip: args?.ip || '172.24.110.127',
          path: args?.path || '',
        })
      }
      case `hpcApply`: {
        let args = <CmdToParam['hpcApply']>arg;

        return RaidCliAPI.hpcApply(cmd, {
          plugins: args?.plugins,
          service: args?.service || "enable",
          deviceId: args?.deviceId || this.deviceId,
          projectName: args?.projectName,
          folder: args?.folder,
          homeFolder: args?.homeFolder,
          appFolder: args?.appFolder,
        })
      }
      case `hpcRemove`: {
        let args = <CmdToParam['hpcRemove']>arg;

        return RaidCliAPI.hpcRemove(cmd, {
          deviceId: args?.deviceId || this.deviceId,
        })
      }
      case `remoteSendJobs`:
        let args = <CmdToParam[`remoteSendJobs`]>arg;
        return RaidCliAPI.remoteSendJobs(cmd, {
          ip: args?.ip,
          uid: args?.uid || this.deviceId,
          jobArr: args.jobArr,
        })
      default:
        cmd.param = arg;
    }
    return cmd;
  }

  private createJobYaml(cmdArray: Array<RaidCliCmd>, JOB_ID: string): object {
    const jobData: object = {
      devType: `raid`,
      devID: this.deviceId,
      CLICommands: [cmdArray]
    };
    const jobStr: string = JSON.stringify(jobData);
    return {
      apiVersion: 'v1',
      data: {
        job: jobStr
      },
      kind: 'ConfigMap',
      metadata: {
        name: JOB_ID,
        namespace: this.namespace
      }
    };
  }

  public async executeJob(cmdArray: Array<RaidCliCmd>): Promise<boolean> {
    const JOB_ID = crypto.randomUUID();
    const yaml = this.createJobYaml(cmdArray, JOB_ID);
    console.log(`====================`)
    console.log(`job yaml`)
    console.log(yaml)
    console.log(`====================`)
    const yamlStr = this.createResourceYaml(`ConfigMap`, yaml, ``);
    await this.applyConfigMap(yamlStr);
    return await this.sendJob(JOB_ID);
  }

  async applyConfigMap(yaml: string) {
    try {
      // kubectl get cm 2ad5f604-7cff-48b6-b891-57882847f222
      // apply configmap under user namespace
      // cli: showExternalStorage, fill params
      const requestOptions = {
        url: `v1/configmaps`,
        method: 'POST',
        headers: { 'Content-Type': 'application/yaml' },
        data: yaml,
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

  private async sendCmd(id: string) {
    try {
      const requestOptions = {
        url: `meta/proxy/http:/${this.scmgmtIP}:8816/eonkube/cmd/${id}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };

      const response = await this.$store.dispatch('management/request', requestOptions);
      const data = await response;
      this.deleteConfigMap(id);
      return data?.data?.[0];
    } catch (e) {
      console.error(e);
      this.deleteConfigMap(id);
      return false;
    }
  }

  private async sendJob(id: string) {
    try {
      const requestOptions = {
        url: `meta/proxy/http:/${this.scmgmtIP}:8816/eonkube/job/${id}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await this.$store.dispatch('management/request', requestOptions);
      const data = await response;
      this.deleteConfigMap(id);
      return data?.data?.[0];
    } catch (e) {
      this.deleteConfigMap(id);
      return false;
    }
  }

  private async deleteConfigMap(id: string) {
    const requestOptions = {
      url: `v1/configmaps/${this.namespace}/${id}`,
      method: 'DELETE',
      headers: { 'Content-Type': 'application/yaml' },
    };
    try {
      const response = await this.$store.dispatch('management/request', requestOptions);
      const data = await response;

      if (data.access_token !== undefined && data.access_token !== null && data.access_token !== '') {
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public async getHpcConfig(getAgain?: boolean): Promise<HpcConfig> {
    if (!this.hpcConfig || getAgain) {
      const cm = await this.$store.dispatch('cluster/find', { type: CONFIG_MAP, id: `default/hpc` });
      this.hpcConfig = new HpcConfig(cm?.data);
    }
    return this.hpcConfig;
  }
}

function createResourceYaml(modifiers: any) {
  throw new Error('Function not implemented.');
}