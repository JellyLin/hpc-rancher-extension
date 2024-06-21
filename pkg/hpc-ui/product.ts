// ./product.ts
import { IPlugin } from '@shell/core/types';

// this is the definition of a "blank cluster" for Rancher Dashboard
// definition of a "blank cluster" in Rancher Dashboard
export function init($plugin: IPlugin, store: any) {
  const YOUR_PRODUCT_NAME = 'HPC';
  const YOUR_K8S_RESOURCE_NAME = 'batch.volcano.sh.job';
  const CUSTOM_PAGE_NAME = 'VolcanoJobs';
  const CUSTOM_PAGE_NAME_2 = 'FileExplorer';
  const CUSTOM_PAGE_NAME_3 = 'Summary';
  const CUSTOM_PAGE_NAME_4 = 'Settings';
  const CUSTOM_PAGE_NAME_5 = 'Install';
  const CUSTOM_PAGE_NAME_6 = 'Enable';

  const {
    product,
    configureType,
    virtualType,
    basicType
  } = $plugin.DSL(store, YOUR_PRODUCT_NAME);

  // registering a cluster-level product
  product({
    icon:    'gear',
    inStore: 'cluster', // this is what defines the extension as a cluster-level product
    weight:  96.1,
    to: {
      name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ YOUR_K8S_RESOURCE_NAME }`,
      params: { product: YOUR_PRODUCT_NAME }
    }
  });

  // defining a k8s resource as page
  configureType(YOUR_K8S_RESOURCE_NAME, {
    displayName: CUSTOM_PAGE_NAME,
    isCreatable: false,
    isEditable:  false,
    isRemovable: false,
    showAge:     true,
    showState:   true,
    canYaml:     false,
    customRoute: {
      name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ YOUR_K8S_RESOURCE_NAME }`,
      params: {
        product:  YOUR_PRODUCT_NAME,
        resource: YOUR_K8S_RESOURCE_NAME
      }
    }
  });

  // creating a custom page
  virtualType({
    labelKey: 'hpc.jobs.title',
    name:     CUSTOM_PAGE_NAME,
    weight:   9.9,
    route:    {
      name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ YOUR_K8S_RESOURCE_NAME }`,
      params: { product: YOUR_PRODUCT_NAME }
    }
  });
  virtualType({
    labelKey: 'hpc.explorer.title',
    name:     CUSTOM_PAGE_NAME_2,
    weight:   9.8,
    route:    {
      name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME_2 }`,
      params: { product: YOUR_PRODUCT_NAME }
    }
  });
  virtualType({
    labelKey: 'hpc.summary.title',
    name:     CUSTOM_PAGE_NAME_3,
    weight:   9.7,
    route:    {
      name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME_3 }`,
      params: { product: YOUR_PRODUCT_NAME }
    }
  });
  virtualType({
    labelKey: 'hpc.settings.title',
    name:     CUSTOM_PAGE_NAME_4,
    weight:   9.6,
    route:    {
      name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME_4 }`,
      params: { product: YOUR_PRODUCT_NAME }
    }
  });
  virtualType({
    labelKey: 'hpc.install.title',
    name:     CUSTOM_PAGE_NAME_5,
    weight:   9.5,
    route:    {
      name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME_5 }`,
      params: { product: YOUR_PRODUCT_NAME }
    }
  });
  virtualType({
    labelKey: 'hpc.enable.title',
    name:     CUSTOM_PAGE_NAME_6,
    weight:   9.4,
    route:    {
      name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME_6 }`,
      params: { product: YOUR_PRODUCT_NAME }
    }
  });

  // registering the defined pages as side-menu entries
  basicType([
    CUSTOM_PAGE_NAME,
    CUSTOM_PAGE_NAME_2,
    // CUSTOM_PAGE_NAME_3,
    CUSTOM_PAGE_NAME_4,
    CUSTOM_PAGE_NAME_5,
    CUSTOM_PAGE_NAME_6
  ]);
}
