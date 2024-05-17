<script>
import { NODE } from '@shell/config/types';
// import { NODE_ROLES } from '@shell/config/labels-annotations.js';
export const NODE_ROLES = {
  CONTROL_PLANE_OLD: 'node-role.kubernetes.io/controlplane',
  CONTROL_PLANE:     'node-role.kubernetes.io/control-plane',
  WORKER:            'node-role.kubernetes.io/worker',
  ETCD:              'node-role.kubernetes.io/etcd',
  HEAD_NODE:         'node-role.cluster/head_node',
  SCMGMT_IP:         'node-role.cluster/scmgmt-ip',
};

function getEonOneIp(store) {
  const allNodes = store.getters['cluster/all'](NODE);
  const headNode = allNodes.filter(n => n.metadata.labels[NODE_ROLES.HEAD_NODE]);
  const scmgmtIP = headNode[0]?.metadata?.annotations[NODE_ROLES.SCMGMT_IP];

  return (scmgmtIP === '') ? scmgmtIP : '172.27.120.51';
}

export default {
  name:       'FileExplorer',
  components: {},

  data() {
    const principal = this.$store.getters['rancher/byId']('principal', this.$store.getters['auth/principalId']);
    const scmgmtIP = getEonOneIp(this.$store);

    return { principal, scmgmtIP };
  },

  methods: {},

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
      <li>6. Redirect UI to GSx FileExplorer with token</li>
      <li><a :href="`http://172.24.110.128:8989?token=abc&username=${principal.loginName}`" target="_blank">6. Redirect UI to GSx FileExplorer with token</a></li>
    </ul>
  </div>
</template>
