<script>
import ResourceTable from '@shell/components/ResourceTable';
import Masthead from '@shell/components/ResourceList/Masthead';
import ButtonDropdown from '@shell/components/ButtonDropdown';
import { STATE, NAME, AGE } from '@shell/config/table-headers';
import { LOGGING } from '@shell/config/types';
import ResourceFetch from '@shell/mixins/resource-fetch';

const YOUR_K8S_RESOURCE_NAME = 'batch.volcano.sh.job';

export default {
  name:       'VolcanoJobs556',
  components: {
    ResourceTable,
    Masthead,
    ButtonDropdown
  },
  mixins:     [ResourceFetch],
  props:      {
    useQueryParamsForSimpleFiltering: {
      type:    Boolean,
      default: false
    }
  },

  data() {
    const inStore = this.$store.getters['currentProduct'].inStore;
    // return !!this.$store.getters[`${ inStore }/schemaFor`](METRIC.NODE);
    const schema = this.$store.getters[`${ inStore }/schemaFor`](YOUR_K8S_RESOURCE_NAME);

    return {
      resource:  YOUR_K8S_RESOURCE_NAME,
      resources: [],
      schema,
    };
  },

  computed: {
    headers() {
      const out = [
        STATE,
        NAME,
        {
          name:     'tasks',
          labelKey: 'hpc.tableHeaders.tasks',
          search:   ['tasks'],
          // value:    'tasks', // spec.tasks
          getValue:  'spec.tasks.length',
        },
        {
          name:      'containers',
          labelKey:  'hpc.tableHeaders.containers',
          // value:     'containers', // .spec.tasks[].template.spec.containers[]
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
          labelKey:  'hpc.tableHeaders.plugins',
          search:   ['plugins'],
          value:     'spec.plugins', // .spec.plugins
        },
        {
          name:      'volumes',
          labelKey:  'hpc.tableHeaders.volumes',
          search:   ['.spec.volumes'],
          value:     'spec.volumes',
        },
        {
          name:      'runningDuration',
          labelKey:  'hpc.tableHeaders.runningDuration',
          value:     'status.runningDuration',
        },
        {
          name:      'queue',
          labelKey:  'hpc.tableHeaders.queue',
          search:   ['.spec.queue'],
          value:     'spec.queue',
        },
      ];

      out.push(AGE);

      out.push({
        name:     'console',
        labelKey: 'hpc.tableHeaders.open',
        label:    ' ',
        align:    'right',
        width:    65,
      });

      return out;
    },
    importLocation() {
      return {
        name:   'c-cluster-product-resource-create',
        params: {
          product:  this.$store.getters['currentProduct'].name,
          resource: this.schema.id,
        },
      };
    },
    canCreateCluster() {
      const schema = this.$store.getters['management/schemaFor'](YOUR_K8S_RESOURCE_NAME);

      return !!schema?.collectionMethods.find((x) => x.toLowerCase() === 'post');
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
    this.schema = this.$store.getters['management/schemaFor'](YOUR_K8S_RESOURCE_NAME);
    // this.schema = this.$store.getters['type-map/headersFor'](YOUR_K8S_RESOURCE_NAME);
    console.log(this);
  },
};
</script>

<template>
  <div>
    <Masthead
      :schema="schema"
      :resource="resource"
      :is-creatable="true"
    >
      <template
        v-if="canCreateCluster"
        slot="extraActions"
      >
        <n-link
          :to="importLocation"
          class="btn role-primary"
        >
          {{ t('cluster.importAction') }}
        </n-link>
      </template>
    </Masthead>
    <ResourceTable
      :schema="schema"
      :headers="headers"
      :rows="resources"
      :loading="loading"
      :use-query-params-for-simple-filtering="useQueryParamsForSimpleFiltering"
      :force-update-live-and-delayed="forceUpdateLiveAndDelayed"
    >
      <template
        slot="cell:console"
      >
        <div class="name-console">
          <div class="overview-web-console">
            <ButtonDropdown
              button-label="Console"
              size="sm"
            />
            <!-- :disabled="isOff"
              :no-drop="isOff" -->
            <!-- :dropdown-options="options" -->
            <!-- @click-action="handleDropdown" -->
          </div>
        </div>
      </template>
    </ResourceTable>
  </div>
</template>
