// ./product.ts
import { IPlugin } from '@shell/core/types';

// this is the definition of a "blank cluster" for Rancher Dashboard
// definition of a "blank cluster" in Rancher Dashboard

export function init($plugin: IPlugin, store: any) {
  const YOUR_PRODUCT_NAME = 'HPC';
  const YOUR_K8S_RESOURCE_NAME = 'batch.volcano.sh.job';
  const CUSTOM_PAGE_NAME = 'VolcanoJobs';
  const CUSTOM_PAGE_NAME_2 = 'AppCenter';

  const {
    product,
    configureType,
    // virtualType,
    basicType
  } = $plugin.DSL(store, YOUR_PRODUCT_NAME);

  // registering a cluster-level product
  product({
    icon:    'gear',
    inStore: 'cluster', // this is what defines the extension as a cluster-level product
    weight:  96.1,
    to: {
      // name:   `${ YOUR_PRODUCT_NAME }-c-cluster-resource`,
      name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ YOUR_K8S_RESOURCE_NAME }`,
      params: {
        product:  YOUR_PRODUCT_NAME,
        resource: YOUR_K8S_RESOURCE_NAME
      }
    }
  });

  // // defining a k8s resource as page
  configureType(YOUR_K8S_RESOURCE_NAME, {
    displayName: 'Volcano Jobs',
    isCreatable: true,
    isEditable:  true,
    isRemovable: true,
    showAge:     true,
    showState:   true,
    canYaml:     true,
    customRoute: {
      name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ YOUR_K8S_RESOURCE_NAME }`,
      params: {
        product:  YOUR_PRODUCT_NAME,
        resource: YOUR_K8S_RESOURCE_NAME
      }
    }
  });

  // creating a custom page
  // virtualType({
  //   labelKey: 'some.translation.key',
  //   name:     CUSTOM_PAGE_NAME,
  //   weight:   9,
  //   route:    {
  //     name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ YOUR_K8S_RESOURCE_NAME }`,
  //     params: {
  //       product:  YOUR_PRODUCT_NAME,
  //       resource: YOUR_K8S_RESOURCE_NAME
  //     }
  //   }
  // });

  // registering the defined pages as side-menu entries
  // basicType([YOUR_K8S_RESOURCE_NAME, CUSTOM_PAGE_NAME, CUSTOM_PAGE_NAME_2, CUSTOM_PAGE_NAME_3]);
  basicType([
    // YOUR_PRODUCT_NAME,
    // YOUR_K8S_RESOURCE_NAME,
    CUSTOM_PAGE_NAME,
    CUSTOM_PAGE_NAME_2,
    // CUSTOM_PAGE_NAME_3,
    // CUSTOM_PAGE_NAME_4,
  ]);
}
