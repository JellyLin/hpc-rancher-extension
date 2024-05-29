<script>
import { Checkbox } from "@components/Form/Checkbox";
import Tab from "@shell/components/Tabbed/Tab";
import Tabbed from "@shell/components/Tabbed";
import UnitInput from "@shell/components/form/UnitInput";
import LabeledInput from "@components/Form/LabeledInput/LabeledInput.vue";
import Select from "@shell/components/form/Select.vue";
import ContainerMountPaths from "@shell/edit/workload/storage/ContainerMountPaths";

export default {
  name: "HpcInstall",
  components: {
    Checkbox,
    Tabbed,
    Tab,
    UnitInput,
    LabeledInput,
    Select,
    ContainerMountPaths
  },
  props: {
    mode: {
      type: String,
      default: `create`,
    },
  },
  data() {
    return {
      model: {
        job: ``,
        namespace: {
          opt: `namespace`,
          list: ["namespace", "default", "test"],
        },
        appVer: {
          opt: `1.0.0`,
          list: ["1.0.0", "1.1.0"],
        },
        command: ``,
        cmdTemplate: `TEST`,
        cpu: 0,
        gpu: 0,
        node: 0,
        memory: 0,
        wait: {
          hour: 0,
          min: 0,
        },
        schedule: `gang`,
      },
    };
  },
  fetch() {
    const scheduleType = [`gang`, `conformance`, `DRF`, `nodeorder`];
    this.scheduleList = scheduleType;
  },
  computed: {
    getSchedule() {
      return this.scheduleList;
    },
  },
  methods: {
    testMethod() {
      console.log(`test`);
    },
  },
};
</script>

<template>
  <div>
    <h1>Install</h1>
    <div class="mb-20">
      <div>
        <p>Job Name</p>
      </div>
      <div class="col span-3">
        <LabeledInput v-model="model.job" type="text" />
      </div>
    </div>
    <div class="mb-20">
      <div class="row">
        <p class="col span-3">Namespace</p>
        <!-- <p class="col span-3">App Version</p> -->
      </div>
      <div class="row">
        <div class="col span-3">
          <Select
            v-model="model.namespace.opt"
            :options="model.namespace.list"
          />
        </div>
      </div>
    </div>
    <div class="mb-20">
      <div>
        <p>Wait time</p>
      </div>
      <div class="row">
        <div class="col span-3">
          <UnitInput
            v-model="model.wait.hour"
            :inputExponent="0"
            suffix="hours"
            :min="0"
            type="number"
          />
        </div>
        <div class="col span-3">
          <UnitInput
            v-model="model.wait.min"
            :inputExponent="0"
            suffix="mins"
            :min="0"
            type="number"
          />
        </div>
      </div>
    </div>
    <div class="mb-20">
      <div class="row">
        <p class="col span-3">CPU</p>
        <p class="col span-3">Memory</p>
      </div>
      <div class="row">
        <div class="col span-3">
          <UnitInput
            v-model="model.cpu"
            :inputExponent="0"
            suffix="CPUs"
            :min="1"
            type="number"
          />
        </div>
        <div class="col span-3">
          <UnitInput
            v-model="model.memory"
            :inputExponent="2"
            :min="1"
            type="number"
          />
        </div>
      </div>
    </div>
    <div class="mb-20">
      <div class="row">
        <p class="col span-3">GPU</p>
        <p class="col span-3">Nodes</p>
      </div>
      <div class="row">
        <div class="col span-3">
          <UnitInput
            v-model="model.gpu"
            :inputExponent="0"
            suffix="GPUs"
            :min="1"
            type="number"
          />
        </div>
        <div class="col span-3">
          <UnitInput
            v-model="model.node"
            :inputExponent="0"
            suffix="Node"
            :min="1"
            type="number"
          />
        </div>
      </div>
    </div>
    <div>
      <ContainerMountPaths />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
