<script>
import { NODE } from '@shell/config/types';
import { RaidCliAPI } from '../eonone2/raid-cli-api';
import { EonOneJobService } from '../eonone2/eonkube-service';
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

  return (scmgmtIP === '') ? scmgmtIP : '172.27.118.101';
  // return (scmgmtIP === '') ? scmgmtIP : '172.27.12.113';
}

export default {
  name:       'FileExplorer',
  components: {},

  data() {
    const principal = this.$store.getters['rancher/byId']('principal', this.$store.getters['auth/principalId']);
    const showExternalStorage = RaidCliAPI.showExternalStorage;
    const openFileExplorer = RaidCliAPI.openFileExplorer;
    const deleteMap = RaidCliAPI.deleteMap;
    console.log(this);

    return {
      principal,
      scmgmtIP:         '',
      RaidCliAPI,
      EonOneJobAPI: '',
      cmd:              { openFileExplorer, showExternalStorage, deleteMap }
    };
  },

  async fetch() {
    const inStore = this.$store.getters['currentProduct'].inStore;

    if (this.$store.getters[`${ inStore }/schemaFor`](NODE)) {
      this.scmgmtIP = await getEonOneIp(this.$store);
    }
    this.EonOneJobAPI = new EonOneJobService(undefined, this.$store);
    // this.EonOneJobAPI = new EonOneJobService(this.scmgmtIP, this.$store);
  },

  methods: {
    callApiBtn(cmd) {
      console.log(cmd.name); // 'showExternalStorage'
      // this.EonOneJobAPI.showExternalStorage();
      this.EonOneJobAPI.executeJob(cmd.name);
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
      <li v-for="(item, index) in RaidCliAPI" :key="index">
        {{ item }}
      </li>
      <li v-for="(item, index) in cmd" :key="index">
        <div v-if="true">
          <span>{{ item }}</span>
          <button @click="callApiBtn(item)">
            Click
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
