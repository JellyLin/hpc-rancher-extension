import { importTypes } from '@rancher/auto-import';
import { IPlugin } from '@shell/core/types';
import HpcDashboardComponent from './HpcDashboardComponent.vue';
import HpcAppCenter from './HpcAppCenter.vue';

// Init the package
export default function(plugin: IPlugin): void {
  // Auto-import model, detail, edit from the folders
  importTypes(plugin);

  // Provide plugin metadata from package.json
  plugin.metadata = require('./package.json');

  // Load a product
  // plugin.addProduct(require('./product'));
  
  plugin.addRoute({
    name:      'hpcDashboard',
    path:      '/hpc',
    component: HpcDashboardComponent
  });

  plugin.addRoute({
    name:      'HpcAppCenter',
    path:      '/appcenter',
    component: HpcAppCenter
  });
}
