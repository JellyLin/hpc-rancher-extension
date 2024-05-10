<script>
import ResourceTable from '@shell/components/ResourceTable';
import { STATE, NAME, AGE } from '@shell/config/table-headers';
import { LOGGING } from '@shell/config/types';
import ResourceFetch from '@shell/mixins/resource-fetch';

const YOUR_K8S_RESOURCE_NAME = 'batch.volcano.sh.job';

export default {
  name:       'VolcanoJobs556',
  components: { ResourceTable },
  mixins:     [ResourceFetch],
  props:      {
    useQueryParamsForSimpleFiltering: {
      type:    Boolean,
      default: false
    }
  },

  resource: YOUR_K8S_RESOURCE_NAME,

  data() {
    return {
      resources: [],
      schema:    []
    };
  },

  computed: {
    headers() {
      const out = [
        STATE,
        NAME,
        {
          name:     'tasks',
          labelKey: 'tableHeaders.tasks',
          search:   ['tasks'],
          value:    'tasks', // spec.tasks
          getValue:  row => row.spec.tasks.length,
        },
        {
          name:      'containers',
          labelKey:  'tableHeaders.containers',
          value:     'containers', // .spec.tasks[].template.spec.containers[]
          width:     130,
          getValue:  (row) => {
            let cnt = 0;

            row.spec.tasks.map((task) => {
              cnt += task.template.spec.containers.length;
            });

            return cnt;
          },
        },
        {
          name:      'plugins',
          labelKey:  'tableHeaders.plugins',
          search:   ['plugins'],
          value:     'plugins', // .spec.plugins
          getValue:  row => row.plugins.length,
        },
        {
          name:      'volumes',
          labelKey:  'tableHeaders.volumes',
          search:   ['.spec.volumes'],
          value:     '.spec.volumes',
        },
        {
          name:      'runningDuration',
          labelKey:  'tableHeaders.runningDuration',
          value:     '.status.runningDuration',
        },
        {
          name:      'queue',
          labelKey:  'tableHeaders.queue',
          search:   ['.spec.queue'],
          value:     '.spec.queue',
        },
      ];

      out.push(AGE);

      out.push({
        name:  'console',
        label: ' ',
        align: 'right',
        width: 65,
      });

      return out;
    },

  //   filteredRows() {
  //     return this.rows;
  //   },
  },

  async fetch() {
    console.log(this);
    this.$initializeFetchData(YOUR_K8S_RESOURCE_NAME);
    this.$fetchType(LOGGING.CLUSTER_OUTPUT);

    this.resources = await this.$fetchType(YOUR_K8S_RESOURCE_NAME);
    // this.schema = this.$store.getters['management/schemaFor'](YOUR_K8S_RESOURCE_NAME);
    // this.schema = this.$store.getters['type-map/headersFor'](YOUR_K8S_RESOURCE_NAME);
    console.log(this);
  },
};
</script>

<template>
  <div>
    <Button>Button Here</Button>
    <!-- :schema="schema" -->
    <ResourceTable
      :headers="headers"
      :rows="resources"
      :loading="loading"
      :use-query-params-for-simple-filtering="useQueryParamsForSimpleFiltering"
      :force-update-live-and-delayed="forceUpdateLiveAndDelayed"
    />
  </div>
</template>
