<script>
import ResourceTable from '@shell/components/ResourceTable';
import Masthead from '@shell/components/ResourceList/Masthead';
import ButtonDropdown from '@shell/components/ButtonDropdown';
import { STATE, NAME, STATUS, AGE } from '@shell/config/table-headers';
import { LOGGING, SCHEMA } from '@shell/config/types';
import ResourceFetch from '@shell/mixins/resource-fetch';
import { allHash } from '@shell/utils/promise';

const YOUR_K8S_RESOURCE_NAME = 'batch.volcano.sh.job';
const INGRESS = 'networking.k8s.io.ingress';

const OpenWithIngress = true;
const OpenWithSerivce = false;

const schema = {
  id:         YOUR_K8S_RESOURCE_NAME,
  type:       SCHEMA,
  attributes: {
    kind:       'volcanoJob',
    namespaced: true
  },
  metadata: { name: 'volcanoJob' },
};

export default {
  name:       'VolcanoJobs',
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
      services:  [],
      ingresses: [],
      pods:      [],
      schema,
    };
  },

  computed: {
    headers() {
      const out = [
        STATE,
        NAME,
        {
          name:     'status',
          labelKey:   'hpc.tableHeaders.status',
          value:    'status.state.phase',
          getValue: row => row.status?.state?.phase
        },
        {
          name:     'tasks',
          labelKey: 'hpc.tableHeaders.tasks',
          search:   ['tasks'],
          value:    'spec.tasks.length',
        },
        {
          name:      'containers',
          labelKey:  'hpc.tableHeaders.containers',
          value:     'containersCount', // .spec.tasks[].template.spec.containers[]
          width:     130,
        },
        {
          name:      'plugins',
          labelKey:  'hpc.tableHeaders.plugins',
          search:   ['plugins'],
          value:     'pluginsDisplay', // .spec.plugins
        },
        {
          name:      'volumes',
          labelKey:  'hpc.tableHeaders.volumes',
          search:   ['.spec.volumes'],
          value:     'spec.volumes.length',
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
          resource: YOUR_K8S_RESOURCE_NAME,
        },
      };
    },
    canCreateCluster() {
      return true;
    },
    isOff() {
      return this.resource.stateDisplay === `Pending`;
    },
    options() {
      return [
        {
          label: this.t('hpc.console.novnc'),
          value: 'vnc'
        },
        // {
        //   label: this.t('harvester.virtualMachine.console.serial'),
        //   value: 'serial'
        // }
      ];
    }
  },

  methods: {
    handleDropdown(e, row) {
      this.show(row);
    },
    show(row) {
      let host = ``;
      let port = ``;

      let url = ``;

      if (OpenWithIngress) {
        this.ingresses.forEach((igs) => {
          if (url === ``) {
            if (igs.metadata.namespace === row.namespace) {
              url = igs.createRulesForListPage()?.[0]?.fullPath;
            }
          }
        });
      }

      if (OpenWithSerivce) {
        this.services.forEach((s) => {
          if (s.metadata.name === 'gatkvnc' && s.metadata.namespace === row.namespace) {
            host = s.spec.loadBalancerIP;
            if (s.spec.ports.length > 0) {
              s.spec.ports.forEach((p) => {
                if (p.name === 'novnc') {
                  port = p.targetPort;
                }
              });
            }
          }
        });
        if (host !== `` && port !== ``) {
          url = `https://${ host }:${ port }`;
        }
      }

      if (url !== ``) {
        window.open(
          url,
          '_blank',
          'toolbars=0,width=900,height=700,left=0,top=0,noreferrer'
        );
      } else {
        if (OpenWithIngress) {
          console.error(`Can NOT find Ingress URL to open`);
        }
        if (OpenWithSerivce) {
          console.error(`Can NOT find Service IP or port`);
        }
        // build
      }
    },
  },

  async fetch() {
    console.log(this);
    const inStore = this.$store.getters['currentProduct'].inStore;

    this.$initializeFetchData(YOUR_K8S_RESOURCE_NAME);
    this.$fetchType(LOGGING.CLUSTER_OUTPUT);

    if (OpenWithSerivce) {
      if (this.$store.getters[`${ inStore }/schemaFor`]('Service')) {
        this.services = await this.$fetchType(`Service`);
      }
    }
    if (OpenWithIngress) {
      if (this.$store.getters[`${ inStore }/schemaFor`](INGRESS)) {
        this.ingresses = await this.$fetchType(INGRESS);
      }
    }
    
    if (this.$store.getters[`${ inStore }/schemaFor`](`Pod`)) {
      this.pods = await this.$fetchType(`Pod`);
    }

    this.resources = await this.$fetchType(YOUR_K8S_RESOURCE_NAME);
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
      <!-- <template
        slot="cell:console"
      > -->
      <template #cell:console="{row}">
        <div class="name-console">
          <div class="overview-web-console">
            <ButtonDropdown
              button-label="Console"
              size="sm"
              :disabled="isOff"
              :no-drop="isOff"
              :dropdown-options="options"
              @click-action="e=>handleDropdown(e, row)"
            />
          </div>
        </div>
      </template>
    </ResourceTable>
  </div>
</template>
