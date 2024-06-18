<script>
import { NODE } from '@shell/config/types';
import { RaidCliAPI } from '../eonone2/raid-cli-api';
import { EonOneService } from '../eonone2/eonkube-service';
// import { NODE_ROLES } from '@shell/config/labels-annotations.js';
export const NODE_ROLES = {
  CONTROL_PLANE_OLD: 'node-role.kubernetes.io/controlplane',
  CONTROL_PLANE:     'node-role.kubernetes.io/control-plane',
  WORKER:            'node-role.kubernetes.io/worker',
  ETCD:              'node-role.kubernetes.io/etcd',
  HEAD_NODE:         'node-role.cluster/head_node',
  SCMGMT_IP:         'node-role.cluster/scmgmt-ip',
};

export default {
  name:       'FileExplorer',
  components: {},

  data() {
    const principal = this.$store.getters['rancher/byId']('principal', this.$store.getters['auth/principalId']);
    const showExternalStorage = RaidCliAPI.showExternalStorage;
    const openFileExplorer = RaidCliAPI.openFileExplorer;
    const hpcGet = RaidCliAPI.hpcGet;
    console.log(this);

    return {
      principal,
      scmgmtIP:         '',
      RaidCliAPI,
      EonOneJobAPI: '',
      cmd:              { openFileExplorer, showExternalStorage, hpcGet }
    };
  },

  async fetch() {
    const inStore = this.$store.getters['currentProduct'].inStore;

    if (this.$store.getters[`${ inStore }/schemaFor`](NODE)) {
      await this.$store.dispatch(`${ inStore }/findAll`, { type: NODE });
      // this.scmgmtIP = getEonOneIp(this.$store);
    }
    this.EonOneJobAPI = new EonOneService(undefined, this.$store);
    // this.EonOneJobAPI = new EonOneService(this.scmgmtIP, this.$store);
  },

  methods: {
    callFileExplorerBtn() {
      // const args = CmdToParam.openFileExplorer;
      const args = {
        path: $('#FileExplorerPath').val()
      };

      this.callApiBtn({ name: 'openFileExplorer', params: args });
    },
    callApiBtn(cmd) {
      const cc = this.EonOneJobAPI.getCmdParam(cmd.name, cmd?.params);
      const response = this.EonOneJobAPI.executeCmd(cc);

      response.then((data) => {
        let url;

        switch (cmd.name) {
        case 'openFileExplorer':
          if (data.token !== ``) {
            url = data.url || `https://172.24.110.128:8991/login.php?key=${ data.token }`;
            window.open(
              url,
              '_blank',
              'toolbars=0,width=1280,height=880,left=0,top=0,noreferrer'
            );
          }
          break;
        }
      });
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
      <input id="FileExplorerPath" placeholder="${principal.loginName}'s home folder">
      <button @click="callFileExplorerBtn()">
        Open FileExplorer with path
      </button>
      <br>
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
