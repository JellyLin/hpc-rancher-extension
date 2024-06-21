// ./routing/extension-routing.ts
import CreateResource from '@shell/pages/c/_cluster/_product/_resource/create.vue';
import ViewResource from '@shell/pages/c/_cluster/_product/_resource/_id.vue';
import VolcanoJobTable from '../list/batch.volcano.sh.job.vue';
import FileExplorer from '../pages/FileExplorer.vue';
// import HpcAppCenter from '../pages/HpcAppCenter.vue';
import HpcInstall from '../pages/HpcInstall.vue';
import HpcEnable from '../pages/HpcEnable.vue';
import HpcSettings from '../pages/HpcSettings.vue';

// to achieve naming consistency throughout the extension
// we recommend this to be defined on a config file and exported
// so that the developer can import it wherever it needs to be used
const YOUR_PRODUCT_NAME = 'HPC';
const YOUR_K8S_RESOURCE_NAME = 'batch.volcano.sh.job';
const CUSTOM_PAGE_NAME_2 = 'FileExplorer';
const CUSTOM_PAGE_NAME_3 = 'Summary';
const CUSTOM_PAGE_NAME_4 = 'Settings';
const CUSTOM_PAGE_NAME_5 = 'Enable';

const routes = [
  {
    name:      `c-cluster-${ YOUR_PRODUCT_NAME }-${ YOUR_K8S_RESOURCE_NAME }`,
    path:      `/c/:cluster/${ YOUR_PRODUCT_NAME }/${ YOUR_K8S_RESOURCE_NAME }`,
    component: VolcanoJobTable,
    meta:      { product: YOUR_PRODUCT_NAME },
  },
  {
    name:      `c-cluster-${ YOUR_PRODUCT_NAME }-resource-create`,
    path:      `/c/:cluster/${ YOUR_PRODUCT_NAME }/:resource/create`,
    component: CreateResource,
    meta:      { product: YOUR_PRODUCT_NAME },
  },
  {
    name:      `c-cluster-${ YOUR_PRODUCT_NAME }-resource-id`,
    path:      `/c/:cluster/${ YOUR_PRODUCT_NAME }/:resource/:id`,
    component: ViewResource,
    meta:      { product: YOUR_PRODUCT_NAME },
  },
  // this covers the "custom page"
  {
    name:      `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME_2 }`,
    path:      `/c/:cluster/${ YOUR_PRODUCT_NAME }/${ CUSTOM_PAGE_NAME_2 }`,
    component: FileExplorer,
    meta:      { product: YOUR_PRODUCT_NAME },
  },
  {
    name:      `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME_3 }`,
    path:      `/c/:cluster/${ YOUR_PRODUCT_NAME }/${ CUSTOM_PAGE_NAME_3 }`,
    meta:      { product: YOUR_PRODUCT_NAME },
  },
  {
    name:      `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME_4 }`,
    path:      `/c/:cluster/${ YOUR_PRODUCT_NAME }/${ CUSTOM_PAGE_NAME_4 }`,
    component: HpcSettings,
    meta:      { product: YOUR_PRODUCT_NAME },
  },
  {
    name:       `c-cluster-${YOUR_PRODUCT_NAME}-Install`,
    path:       `/c/:cluster/${YOUR_PRODUCT_NAME}/Install`,
    component:  HpcInstall,
    meta:       { product: YOUR_PRODUCT_NAME }
  },
  {
    name:       `c-cluster-${YOUR_PRODUCT_NAME}-${ CUSTOM_PAGE_NAME_5 }`,
    path:       `/c/:cluster/${YOUR_PRODUCT_NAME}/${ CUSTOM_PAGE_NAME_5 }`,
    component:  HpcEnable,
    meta:       { product: YOUR_PRODUCT_NAME }
  },
];

export default routes;
