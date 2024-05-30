<script>
import { NODE } from '@shell/config/types';
import { RaidCliService } from '../eonone2/raid-cli-service';
// import { NODE_ROLES } from '@shell/config/labels-annotations.js';
export const NODE_ROLES = {
  CONTROL_PLANE_OLD: 'node-role.kubernetes.io/controlplane',
  CONTROL_PLANE:     'node-role.kubernetes.io/control-plane',
  WORKER:            'node-role.kubernetes.io/worker',
  ETCD:              'node-role.kubernetes.io/etcd',
  HEAD_NODE:         'node-role.cluster/head_node',
  SCMGMT_IP:         'node-role.cluster/scmgmt-ip',
};

// use Connie API
function getEonOneIp(store) {
  const inStore = store.getters['currentProduct'].inStore;
  const allNodes = store.getters[`${ inStore }/all`](NODE);
  const headNode = allNodes.filter(n => n.metadata.labels[NODE_ROLES.HEAD_NODE]);
  const scmgmtIP = headNode[0]?.metadata?.annotations[NODE_ROLES.SCMGMT_IP];

  return (scmgmtIP === '') ? scmgmtIP : '172.27.118.109';
}

export default {
  name:       'FileExplorer',
  components: {},

  data() {
    const principal = this.$store.getters['rancher/byId']('principal', this.$store.getters['auth/principalId']);
    const showExternalStorage = RaidCliService.showExternalStorage;
    const deleteMap = RaidCliService.deleteMap;
    console.log(this);

    return {
      principal,
      scmgmtIP: '',
      RaidCliService,
      cmd: { showExternalStorage, deleteMap }
    };
  },

  async fetch() {
    const inStore = this.$store.getters['currentProduct'].inStore;

    if (this.$store.getters[`${ inStore }/schemaFor`](NODE)) {
      this.scmgmtIP = await getEonOneIp(this.$store);
    }
  },

  methods: {
    async test(cli) {
      try {
        console.log(cli);
        // kubectl get cm 2ad5f604-7cff-48b6-b891-57882847f222
        // apply configmap under user namespace
        // cli: showExternalStorage, fill params
        const requestOptions = {
          url:                  `meta/proxy/http:/${ this.scmgmtIP }:8816/eonkube/job/2ad5f604-7cff-48b6-b891-57882847f222`,
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
  },

  computed: {},
};
</script>
<template>
  <!-- <script src="models/app.js"></script> -->
  <div>
    <h1>Welcome to FileExplorer page</h1>
    <p>[EonKube]</p>
    <ul>
      <li>1. Encrypt user name token</li>

      <li><a :href="`https://${scmgmtIP}:8817/redirectToExplorer?token=abc&username=${principal.loginName}`" target="_blank">2. UI hyperlink to EonOne</a></li>

      <p>[EonOne]</p>
      <li>3. Decrypt user name token</li>
      <li>>4. EonOne 可由這user name 透過系統查uid</li>
      <li>5. Get GSx FileExplorer login token</li>
      <li><a :href="`http://172.24.110.128:8989?token=abc&username=${principal.loginName}`" target="_blank">6. Redirect UI to GSx FileExplorer with token</a></li>
    </ul>
    <ul>
      <li v-for="(item, index) in RaidCliService" :key="index">
        {{ item }}
      </li>
      <li v-for="(item, index) in cmd" :key="index">
        <div v-if="true">
          <span>{{ item }}</span>
          <button :action="test(item)">
            Click
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
