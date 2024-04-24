// ./product.ts
import { IPlugin } from '@shell/core/types';

export function init($plugin: IPlugin, store: any) {
  const YOUR_PRODUCT_NAME = 'HPC';
  const YOUR_K8S_RESOURCE_NAME = 'velero.io.backupstoragelocation';
  const CUSTOM_PAGE_NAME = 'Jobs';
  const CUSTOM_PAGE_NAME_2 = 'File explorer';
  const CUSTOM_PAGE_NAME_3 = 'Summary';
  const CUSTOM_PAGE_NAME_4 = 'Settings';

  const {
    product,
    configureType,
    virtualType,
    // weightType,
    basicType
  } = $plugin.DSL(store, YOUR_PRODUCT_NAME);

  // registering a cluster-level product
//   product({
//     icon:    'gear',
//     inStore: 'cluster', // this is what defines the extension as a cluster-level product
//     weight:  96.4,
//     to:      {
//       name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME }`,
//       params: { product: YOUR_PRODUCT_NAME }
//     }
//   });
//   product({
//     icon:    'gear',
//     inStore: 'cluster', // this is what defines the extension as a cluster-level product
//     weight:  96.3,
//     to:      {
//       name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME_2 }`,
//       params: { product: YOUR_PRODUCT_NAME }
//     }
//   });
//   product({
//     icon:    'gear',
//     inStore: 'cluster', // this is what defines the extension as a cluster-level product
//     weight:  96.2,
//     to:      {
//       name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME_3 }`,
//       params: { product: YOUR_PRODUCT_NAME }
//     }
//   });
  product({
    icon:    'gear',
    inStore: 'cluster', // this is what defines the extension as a cluster-level product
    weight:  96.1,
    to:      {
      name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME_4 }`,
      params: { product: YOUR_PRODUCT_NAME }
    }
  });

  // defining a k8s resource as page
  configureType(YOUR_K8S_RESOURCE_NAME, {
    displayName: 'Jobs',
    isCreatable: true,
    isEditable:  true,
    isRemovable: true,
    showAge:     true,
    showState:   true,
    canYaml:     true,
    customRoute: {
      name:   `c-cluster-${ YOUR_PRODUCT_NAME }-resource`,
      params: {
        product:  YOUR_PRODUCT_NAME,
        resource: YOUR_K8S_RESOURCE_NAME
      }
    }
  });

  // creating a custom page
  virtualType({
    labelKey: 'some.translation.key',
    name:     CUSTOM_PAGE_NAME,
    weight:   9,
    route:    {
      name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME }`,
      params: { product: YOUR_PRODUCT_NAME }
    }
  });
  virtualType({
    labelKey: 'some.translation.key',
    name:     CUSTOM_PAGE_NAME_2,
    weight:   8,
    route:    {
      name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME_2 }`,
      params: { product: YOUR_PRODUCT_NAME }
    }
  });
  virtualType({
    labelKey: 'some.translation.key',
    name:     CUSTOM_PAGE_NAME_3,
    weight:   7,
    route:    {
      name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME_3 }`,
      params: { product: YOUR_PRODUCT_NAME }
    }
  });
  virtualType({
    labelKey: 'some.translation.key',
    name:     CUSTOM_PAGE_NAME_4,
    weight:   6,
    route:    {
      name:   `c-cluster-${ YOUR_PRODUCT_NAME }-${ CUSTOM_PAGE_NAME_4 }`,
      params: { product: YOUR_PRODUCT_NAME }
    }
  });

  // registering the defined pages as side-menu entries
  // basicType([YOUR_K8S_RESOURCE_NAME, CUSTOM_PAGE_NAME, CUSTOM_PAGE_NAME_2, CUSTOM_PAGE_NAME_3]);
  basicType([
    YOUR_PRODUCT_NAME,
    CUSTOM_PAGE_NAME,
    CUSTOM_PAGE_NAME_2,
    CUSTOM_PAGE_NAME_3,
    CUSTOM_PAGE_NAME_4,
    YOUR_K8S_RESOURCE_NAME,
  ]);
}
