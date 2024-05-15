import { insertAt } from '@shell/utils/array';
import {
//   AS,
  _CLONE,
//   FOCUS,
//   MODE,
//   _UNFLAG,
//   _EDIT
} from '@shell/config/query-params';
import Vue from 'vue';
import SteveModel from '@shell/plugins/steve/steve-class';
import { STATES_ENUM } from '@shell/plugins/dashboard-store/resource-class';

export default class VolcanoJob extends SteveModel {
  applyDefaults(_, realMode) {
    // const accessModes = realMode === _CLONE ? this.spec.accessModes : [];
    const tasks = realMode === _CLONE ? this.spec.tasks.length : null;

    Vue.set(this, 'spec', {
    //   accessModes,
      storageClassName: '',
      volumeName:       'test123',
      tasks,
    });
  }

  get containersCount() {
    let cnt = 0;

    this.spec.tasks.map((task) => {
      cnt += task.template.spec.containers.length;
    });

    return cnt;
  }

  get pluginsDisplay() {
    const plugins = [];

    for (const plugin in this.spec.plugins) {
      if ( this.spec.plugins[plugin].length > 0 ) {
        plugins.push(plugin);
      }
    }

    return plugins;
  }

  // get statusDisplay() {
  //   const status = this?.status?.phase === 'Bound' ? 'Ready' : 'NotReady';

  //   const conditions = this?.status?.conditions || [];

  //   if (findBy(conditions, 'type', 'Resizing')?.status === 'True') {
  //     return 'Resizing';
  //   } else {
  //     return status;
  //   }
  // }

  get _availableActions() {
    const out = super._availableActions;

    // Add backwards, each one to the top
    insertAt(out, 0, { divider: true });
    insertAt(out, 0, this.openLogsMenuItem);
    insertAt(out, 0, this.openShellMenuItem);

    return out;
  }

  get openShellMenuItem() {
    return {
      action:  'openShell',
      // enabled: !!this.links.view && this.isRunning,
      enabled: true,
      icon:    'icon icon-fw icon-chevron-right',
      label:   'Execute Shell',
      total:   1,
    };
  }

  get openLogsMenuItem() {
    return {
      action:  'openLogs',
      // enabled: !!this.links.view,
      enabled: true,
      icon:    'icon icon-fw icon-chevron-right',
      label:   'View Logs',
      total:   1,
    };
  }
}
