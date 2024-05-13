// ./routing/extension-routing.ts
import HpcAppCenter from '../pages/HpcAppCenter.vue';
import VolcanoJobTable from '../list/batch.volcano.sh.job.vue';
import CreateResource from '@shell/pages/c/_cluster/_product/_resource/create.vue';
import ViewResource from '@shell/pages/c/_cluster/_product/_resource/_id.vue';
import ViewNamespacedResource from '@shell/pages/c/_cluster/_product/_resource/_namespace/_id.vue';

// to achieve naming consistency throughout the extension
// we recommend this to be defined on a config file and exported
// so that the developer can import it wherever it needs to be used
const YOUR_PRODUCT_NAME = 'HPC';
const CUSTOM_PAGE_NAME = 'VolcanoJobs';
const CUSTOM_PAGE_NAME_2 = 'AppCenter';
const YOUR_K8S_RESOURCE_NAME = 'batch.volcano.sh.job';

const routes = [
  // this covers the "custom page"
  // {
  //   name:      `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME }`,
  //   path:      `/c/:cluster/${ YOUR_PRODUCT_NAME }/${ CUSTOM_PAGE_NAME }`,
  //   component: HpcJobResourceList,
  //   meta:      {
  //     product:  YOUR_PRODUCT_NAME,
  //     resource: YOUR_K8S_RESOURCE_NAME,
  //   },
  // },
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
  {
    name:      `c-cluster-${ YOUR_PRODUCT_NAME }-resource-namespace-id`,
    path:      `/:cluster/${ YOUR_PRODUCT_NAME }/:resource/:namespace/:id`,
    component: ViewNamespacedResource,
    meta:      { product: YOUR_PRODUCT_NAME },
  },
  // {
  //   name:      `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME_2 }`,
  //   path:      `/c/:cluster/${ YOUR_PRODUCT_NAME }/${ CUSTOM_PAGE_NAME_2 }`,
  //   component: HpcAppCenter,
  //   meta:      { product: YOUR_PRODUCT_NAME },
  // },
];

export default routes;
