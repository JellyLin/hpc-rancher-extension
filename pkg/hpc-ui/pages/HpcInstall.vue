<script>
import Loading from "@shell/components/Loading";
import merge from "lodash/merge";
import UnitInput from "@shell/components/form/UnitInput";
import LabeledInput from "@components/Form/LabeledInput/LabeledInput.vue";
import Select from "@shell/components/form/Select.vue";
import Mount from "@shell/edit/workload/storage/Mount";
import TextAreaAutoGrow from "@components/Form/TextArea/TextAreaAutoGrow.vue";
import { mapGetters } from "vuex";
import removeObject from "@shell/utils/array";
import ChartMixin from "@shell/mixins/chart";
import { clone, diff, get, set } from "@shell/utils/object";
import { LINUX, WINDOWS } from "@shell/store/catalog";
import { saferDump } from "@shell/utils/create-yaml";
import {
  CATALOG,
  MANAGEMENT,
  DEFAULT_WORKSPACE,
  CAPI,
} from "@shell/config/types";
import {
  FROM_CLUSTER,
  HIDE_SIDE_NAV,
  NAMESPACE,
  _FLAGGED,
} from "@shell/config/query-params";
import {
  CATALOG as CATALOG_ANNOTATIONS,
  PROJECT,
} from "@shell/config/labels-annotations";
import { EonOneService } from "../eonone2/eonkube-service";

const VALUES_STATE = {
  FORM: "FORM",
  YAML: "YAML",
  DIFF: "DIFF",
};

const NOT_TOTAL_MODE = [
  `cpuMaster`,
  `cpuWorker`,
  `gpuMaster`,
  `gpuWorker`,
  `memoryMaster`,
  `memoryWorker`,
];

function isPlainLayout(query) {
  return Object.keys(query).includes(HIDE_SIDE_NAV);
}

export default {
  name: "HpcInstall",
  mixins: [ChartMixin],
  components: {
    UnitInput,
    LabeledInput,
    Select,
    Mount,
    TextAreaAutoGrow,
    Loading,
  },
  // props: {
  //   mode: {
  //     type: String,
  //     default: `create`,
  //   },
  // },
  data() {
    const t = this.$store.getters["i18n/t"];
    const defaultCmdOpts = {
      cleanupOnFail: false,
      crds: true,
      hooks: true,
      force: false,
      resetValues: false,
      openApi: true,
      wait: true,
      timeout: 600,
      historyMax: 5,
      description: ``,
    };
    const submitOpts = {
      name: ``,
      command: ``,
      node: 0,
      cpu: {
        total: 1,
        worker: 1,
        master: 1,
      },
      gpu: {
        total: 1,
        worker: 1,
        master: 1,
      },
      memory: {
        total: 0,
        worker: 1,
        master: 1,
      },
    };
    const userInfo = {
      uid: ``,
      name: ``,
    };

    return {
      userInfo,
      EonOneJobAPI: null,
      isTotalMode: false,
      model: submitOpts,
      namespaceList: [],

      // NOTE original chart value
      defaultRegistrySetting: "",
      customRegistrySetting: "",
      serverUrlSetting: null,
      chartValues: null,
      clusterRegistry: "",
      originalYamlValues: null,
      previousYamlValues: null,
      errors: null,
      existing: null,
      globalRegistry: "",
      forceNamespace: null,
      loadedVersion: null,
      loadedVersionValues: null,
      legacyApp: null,
      mcapp: null,
      mode: null,
      value: null,
      valuesComponent: null,
      valuesYaml: "",
      project: null,
      migratedApp: false,
      defaultCmdOpts,
      customCmdOpts: { ...defaultCmdOpts },
      autoInstallInfo: [],

      nameDisabled: false,

      preFormYamlOption: VALUES_STATE.YAML,
      formYamlOption: VALUES_STATE.YAML,
      showDiff: false,
      showValuesComponent: true,
      showQuestions: true,
      showSlideIn: false,
      shownReadmeWindows: [],
      componentHasTabs: false,
      showCommandStep: false,
      showCustomRegistryInput: false,
      isNamespaceNew: false,

      stepBasic: {
        name: "basics",
        label: t("catalog.install.steps.basics.label"),
        subtext: t("catalog.install.steps.basics.subtext"),
        descriptionKey: "catalog.install.steps.basics.description",
        ready: true,
        weight: 30,
      },
      stepClusterTplVersion: {
        name: "clusterTplVersion",
        label: ``, // FIXME this.t("catalog.install.steps.clusterTplVersion.label"),
        subtext: ``, // FIXME this.t("catalog.install.steps.clusterTplVersion.subtext"),
        descriptionKey: "catalog.install.steps.helmValues.description",
        ready: true,
        weight: 30,
      },
      stepValues: {
        name: "helmValues",
        label: t("catalog.install.steps.helmValues.label"),
        subtext: t("catalog.install.steps.helmValues.subtext"),
        descriptionKey: "catalog.install.steps.helmValues.description",
        ready: true,
        weight: 20,
      },
      stepCommands: {
        name: "helmCli",
        label: t("catalog.install.steps.helmCli.label"),
        subtext: t("catalog.install.steps.helmCli.subtext"),
        descriptionKey: "catalog.install.steps.helmCli.description",
        ready: true,
        weight: 10,
      },

      customSteps: [],

      isPlainLayout: isPlainLayout(this.$route.query),

      legacyDefs: {
        legacy: t("catalog.install.error.legacy.category.legacy"),
        mcm: t("catalog.install.error.legacy.category.mcm"),
      },
    };
  },
  async fetch() {
    // async function chartInit() {
    this.errors = [];
    try {
      await this.fetchChart();
    } catch (e) {
      console.warn("Unable to fetch chart: ", e); // eslint-disable-line no-console
    }

    try {
      await this.fetchAutoInstallInfo();
    } catch (e) {
      console.warn("Unable to determine if other charts require install: ", e); // eslint-disable-line no-console
    }

    if (this.showCustomRegistry) {
      // Note: Cluster scoped registry is only supported for node driver clusters
      try {
        this.clusterRegistry = await this.getClusterRegistry();
      } catch (e) {
        console.warn("Unable to get cluster registry: ", e); // eslint-disable-line no-console
      }

      try {
        this.globalRegistry = await this.getGlobalRegistry();
      } catch (e) {
        console.warn("Unable to get global registry: ", e); // eslint-disable-line no-console
      }
      this.defaultRegistrySetting = this.clusterRegistry || this.globalRegistry;
    }

    try {
      this.serverUrlSetting = await this.$store.dispatch("management/find", {
        type: MANAGEMENT.SETTING,
        id: "server-url",
      });
    } catch (e) {
      console.error("Unable to fetch `server-url` setting: ", e); // eslint-disable-line no-console
    }

    if (this.existing) {
      this.forceNamespace = this.existing.metadata.namespace;
      this.nameDisabled = true;
    } else if (this.$route.query[FROM_CLUSTER] === _FLAGGED) {
      /* For Fleet, use the fleet-default namespace. */
      this.forceNamespace = DEFAULT_WORKSPACE;
    } else if (this.chart?.targetNamespace) {
      /* If a target namespace is defined in the chart,
      set the target namespace as default. */
      this.forceNamespace = this.chart.targetNamespace;
    } else if (this.query.appNamespace) {
      /* If a namespace is defined in the URL query,
       use that namespace as default. */
      this.forceNamespace = this.query.appNamespace;
    } else {
      if (this.$store.getters["rancher/byId"]) {
        const principal = this.$store.getters["rancher/byId"](
          "principal",
          this.$store.getters["auth/principalId"]
        );

        this.userInfo.name = principal.loginName;
        this.userInfo.uid = principal.id.split(`//`)[1];
      }
      this.forceNamespace = this.userInfo.uid;
    }

    /* Check if the app is deprecated. */
    try {
      this.legacyApp = this.existing
        ? await this.existing.deployedAsLegacy()
        : false;
    } catch (e) {
      this.legacyApp = false;
      console.warn(
        "Unable to determine if existing install is a legacy app: ",
        e
      ); // eslint-disable-line no-console
    }

    /* Check if the app is a multicluster deprecated app.
    (Multicluster apps were replaced by Fleet.) */

    try {
      this.mcapp = this.existing
        ? await this.existing.deployedAsMultiCluster()
        : false;
    } catch (e) {
      this.mcapp = false;
      console.warn("Unable to determine if existing install is a mc app: ", e); // eslint-disable-line no-console
    }

    /* The form state is intialized as a chartInstallAction resource. */
    try {
      console.log(`============================`);
      console.log(`forceNamespace`);
      console.log(this.forceNamespace);
      console.log(`============================`);
      console.log(`this.$store.getters.namespace`);
      // console.log(this.$store.getters.namespace());
      console.log(`============================`);
      this.value = await this.$store.dispatch("cluster/create", {
        type: "chartInstallAction",
        metadata: {
          namespace:
            this.forceNamespace || this.$store.getters["defaultNamespace"],
          name: this.existing?.spec?.name || this.query.appName || "",
        },
      });
    } catch (e) {
      console.error(
        "Unable to create object of type `chartInstallAction`: ",
        e
      ); // eslint-disable-line no-console

      // Nothing's going to work without a `value`. See https://github.com/rancher/dashboard/issues/9452 to handle this and other catches.
      return;
    }
    if (!this.existing) {
      if (this.chart?.targetName) {
        this.value.metadata.name = this.chart.targetName;
        this.nameDisabled = true;
      } else if (this.query.appName) {
        this.value.metadata.name = this.query.appName;
      } else {
        this.nameDisabled = false;
      }

      if (this.query.description) {
        this.customCmdOpts.description = this.query.description;
      }
    }

    if (this.forceNamespace && !this.existing) {
      let ns;

      /*
        Before moving forward, check to make sure the
        default namespace exists and the logged-in user
        has permission to see it.
      */
      try {
        ns = await this.$store.dispatch("cluster/find", {
          type: NAMESPACE,
          id: this.forceNamespace,
        });
        const project = ns.metadata.annotations?.[PROJECT];

        if (project) {
          this.project = project.replace(":", "/");
        }
      } catch {}
    }

    /* If no chart by the given app name and namespace
     can be found, or if no version is found, do nothing. */
    if (!this.chart || !this.query.versionName) {
      return;
    }

    // if (this.version) {
    //   await this.loadValuesComponent();
    // }

    // await this.loadChartSteps();

    if (!this.loadedVersion || this.loadedVersion !== this.version.key) {
      let userValues;

      if (this.loadedVersion) {
        if (this.showingYaml) {
          this.applyYamlToValues();
        }
        userValues = diff(this.loadedVersionValues, this.chartValues);
      } else if (this.existing) {
        userValues = clone(this.existing.spec?.values || {});
      } else {
        userValues = {};
      }
      this.removeGlobalValuesFrom(userValues);

      this.chartValues = merge(
        merge({}, this.versionInfo?.values || {}),
        userValues
      );

      if (this.showCustomRegistry) {
        /**
         * The input to configure the registry should never be
         * shown for third-party charts, which don't have Rancher
         * global values.
         */
        const existingRegistry =
          this.chartValues?.global?.systemDefaultRegistry ||
          this.chartValues?.global?.cattle?.systemDefaultRegistry;

        delete this.chartValues?.global?.systemDefaultRegistry;
        delete this.chartValues?.global?.cattle?.systemDefaultRegistry;

        this.customRegistrySetting =
          existingRegistry || this.defaultRegistrySetting;
        this.showCustomRegistryInput = !!this.customRegistrySetting;
      }

      /* Serializes an object as a YAML document */
      this.valuesYaml = saferDump(this.chartValues);

      /* For YAML diff */
      if (!this.loadedVersion) {
        this.originalYamlValues = this.valuesYaml;
      }

      this.loadedVersionValues = this.versionInfo?.values || {};
      this.loadedVersion = this.version?.key;
    }

    // /* Check if chart exists and if required values exist */
    // this.updateStepOneReady();

    this.preFormYamlOption =
      this.valuesComponent || this.hasQuestions
        ? VALUES_STATE.FORM
        : VALUES_STATE.YAML;

    /* Look for annotation to say this app is a legacy migrated app (we look in either place for now) */
    this.migratedApp =
      this.existing?.spec?.chart?.metadata?.annotations?.[
        CATALOG_ANNOTATIONS.MIGRATED
      ] === "true";
    // }

    // NOTE UI template
    try {
      this.EonOneJobAPI = new EonOneService(`172.27.118.101`, this.$store);
      if (this.versionInfo?.questions) {
        this.isTotalMode = !this.versionInfo.questions.questions.some((q) =>
          NOT_TOTAL_MODE.includes(q.label)
        );
        if (this.versionInfo?.values) {
          this.versionInfo.questions.questions.forEach((q) => {
            const keys = this.formatVariable(q.variable);
            let result = this.versionInfo.values;

            for (const key of keys) {
              result = result[key];
            }
            this.setValueByLabel(q.label, result);
          });
        }
      }

      if (this.$store.getters[`allNamespaces`]) {
        this.namespaceList = this.$store.getters[`allNamespaces`].map(
          (n) => n.id
        );
      }
    } catch (e) {}
    console.log(this.value.metadata.namespace);
    console.log(`Fetch finish`);
  },
  computed: {
    ...mapGetters({
      // t: "i18n/t",
      inStore: "catalog/inStore",
      features: "features/get",
    }),
    showCustomRegistry() {
      const global = this.versionInfo?.values?.global || {};

      return (
        global.systemDefaultRegistry !== undefined ||
        global.cattle?.systemDefaultRegistry !== undefined
      );
    },
    cmdOptions() {
      return this.showCommandStep ? this.customCmdOpts : this.defaultCmdOpts;
    },
    appVer() {
      return this.version.version;
    },
    getNamespaceList() {
      return this.namespaceList;
    },
    volumeMounts() {
      return [
        {
          mountPath: `/`,
          subPath: `/`,
        },
      ];
    },
  },
  watch: {
    "value.metadata.namespace"(neu, old) {
      if (neu) {
        const ns = this.$store.getters["cluster/byId"](
          NAMESPACE,
          this.value.metadata.namespace
        );

        const project = ns?.metadata.annotations?.[PROJECT];

        if (project) {
          this.project = project.replace(":", "/");
        }
      }
    },
  },
  methods: {
    translateSize(input) {
      // TODO
      // GiB to GB
      // 1 GiB = 1024MB
      // 1 GB = 1000 MB
    },
    formatVariable(input) {
      const regex = /(?:[^\s."']|"(?:\\.|[^"])*"|'(?:\\.|[^'])*')+/g;
      const matches = input.match(regex) || [];

      const result = matches.map((match) => {
        if (match.startsWith('"') && match.endsWith('"')) {
          return match.slice(1, -1);
        } else if (match.startsWith("'") && match.endsWith("'")) {
          return match.slice(1, -1);
        }

        return match;
      });

      return result;
    },
    applyValue() {
      this.chartValues = clone(this.versionInfo?.values || {});
      this.versionInfo.questions.questions.forEach((q) => {
        const variableList = this.formatVariable(q.variable);
        let nested = this.chartValues;

        for (let i = 0; i < variableList.length; i++) {
          if (i === variableList.length - 1) {
            nested[variableList[i]] =
              this.getValueByLabel(q.label) || nested[variableList[i]];
            break;
          } else if (!nested.hasOwnProperty(variableList[i])) {
            nested[variableList[i]] = {};
          }
          nested = nested[variableList[i]];
        }
      });
    },
    getValueByLabel(label) {
      switch (label) {
        case `version`:
          return this.appVer;
        case `name`:
          return this.model.name;
        case `nodes`:
          return this.model.node;
        case `command`:
          return this.model.command;
        case `cpu`:
          return this.model.cpu.total;
        case `cpuWorker`:
          return this.model.cpu.worker;
        case `cpuMaster`:
          return this.model.cpu.master;
        case `gpu`:
          return this.model.gpu.total;
        case `gpuWorker`:
          return this.model.gpu.worker;
        case `gpuMaster`:
          return this.model.gpu.master;
        case `memory`:
          return this.model.memory.total;
        case `memoryWorker`:
          return this.model.memory.worker;
        case `memoryMaster`:
          return this.model.memory.master;
      }
    },
    setValueByLabel(label, value) {
      switch (label) {
        case `version`:
          this.appVer = value;
          break;
        case `name`:
          this.model.name = value;
          break;
        case `nodes`:
          this.model.node = value;
          break;
        case `command`:
          this.model.command = value;
          break;
        case `cpu`:
          this.model.cpu.total = value;
          break;
        case `cpuWorker`:
          this.model.cpu.worker = value;
          break;
        case `cpuMaster`:
          this.model.cpu.master = value;
          break;
        case `gpu`:
          this.model.gpu.total = value;
          break;
        case `gpuWorker`:
          this.model.gpu.worker = value;
          break;
        case `gpuMaster`:
          this.model.gpu.master = value;
          break;
        case `memory`:
          this.model.memory.total = value;
          break;
        case `memoryWorker`:
          this.model.memory.worker = value;
          break;
        case `memoryMaster`:
          this.model.memory.master = value;
          break;
      }
    },
    upload() {
      // TODO Ryder
      console.log(`open file explorer`);
      const enable = this.EonOneJobAPI.getCmdParam(`enableExplorer`, {});
      const jobArr = [enable];
      const jobArrStr = JSON.stringify(jobArr);
      const cc = this.EonOneJobAPI.getCmdParam(`remoteCmd`, {
        ip: `172.26.112.113`,
        uid: `465CC`,
        jobArr: jobArrStr,
      });
      const response = this.EonOneJobAPI.executeCmd(cc);

      response.then((data) => {
        console.log(data);
      });
    },
    async submit() {
      this.applyValue();
      // TODO According this.versionInfo.questions.questions[] value to filter / select to assing value.yaml
      // input is payload
      // copy from finish func
      const { errors, input } = this.actionInput(false);
      const res = await this.repo.doAction(`install`, input);
      console.log(`=================================`);
      console.log(res);
      const operationId = `${res.operationNamespace}/${res.operationName}`;
      await this.repo.waitForOperation(operationId);
      this.operation = await this.$store.dispatch(`${this.inStore}/find`, {
        type: CATALOG.OPERATION,
        id: operationId,
      });

      try {
        await this.operation.waitForLink("logs");
        this.operation.openLogs();
      } catch (e) {
        // The wait times out eventually, move on...
      }
    },
    submitConsole() {
      console.log(`chart`);
      console.log(this.chart);
      console.log(`=================================`);
      console.log(`version`);
      console.log(this.version);
      console.log(`=================================`);
      console.log(`versionInfo`);
      console.log(this.versionInfo);
      console.log(`=================================`);
      console.log(`chartValue`);
      this.applyValue();
      console.log(this.chartValues);
      console.log(`=================================`);
      // user
      const principal = this.$store.getters["rancher/byId"](
        "principal",
        this.$store.getters["auth/principalId"]
      );

      console.log(`principal`);
      console.log(principal);
      console.log(`=================================`);
      const { errors, input } = this.actionInput(false);

      console.log({ errors, input });
    },
    addGlobalValuesTo(values) {
      let global = values.global;

      if (!global) {
        global = {};
        set(values, "global", global);
      }

      let cattle = global.cattle;

      if (!cattle) {
        cattle = {};
        set(values.global, "cattle", cattle);
      }

      const cluster = this.currentCluster;
      const projects = this.$store.getters["management/all"](
        MANAGEMENT.PROJECT
      );
      const systemProjectId =
        projects
          .find((p) => p.spec?.displayName === "System")
          ?.id?.split("/")?.[1] || "";

      const serverUrl = this.serverUrlSetting?.value || "";
      const isWindows = (cluster?.workerOSs || []).includes(WINDOWS);
      const pathPrefix =
        cluster?.spec?.rancherKubernetesEngineConfig?.prefixPath || "";
      const windowsPathPrefix =
        cluster?.spec?.rancherKubernetesEngineConfig?.winPrefixPath || "";

      setIfNotSet(cattle, "clusterId", cluster?.id);
      setIfNotSet(cattle, "clusterName", cluster?.nameDisplay);

      if (this.showCustomRegistry) {
        set(cattle, "systemDefaultRegistry", this.customRegistrySetting);
        set(global, "systemDefaultRegistry", this.customRegistrySetting);
      }

      setIfNotSet(global, "cattle.systemProjectId", systemProjectId);
      setIfNotSet(cattle, "url", serverUrl);
      setIfNotSet(cattle, "rkePathPrefix", pathPrefix);
      setIfNotSet(cattle, "rkeWindowsPathPrefix", windowsPathPrefix);

      if (isWindows) {
        setIfNotSet(cattle, "windows.enabled", true);
      }

      return values;

      function setIfNotSet(obj, key, val) {
        if (typeof get(obj, key) === "undefined") {
          set(obj, key, val);
        }
      }
    },
    removeGlobalValuesFrom(values) {
      if (!values) {
        return;
      }

      const cluster = this.$store.getters["currentCluster"];
      const serverUrl = this.serverUrlSetting?.value || "";
      const isWindows = (cluster?.workerOSs || []).includes(WINDOWS);
      const pathPrefix =
        cluster?.spec?.rancherKubernetesEngineConfig?.prefixPath || "";
      const windowsPathPrefix =
        cluster?.spec?.rancherKubernetesEngineConfig?.winPrefixPath || "";

      if (values.global?.cattle) {
        deleteIfEqual(values.global.cattle, "clusterId", cluster?.id);
        deleteIfEqual(
          values.global.cattle,
          "clusterName",
          cluster?.nameDisplay
        );
        deleteIfEqual(values.global.cattle, "url", serverUrl);
        deleteIfEqual(values.global.cattle, "rkePathPrefix", pathPrefix);
        deleteIfEqual(
          values.global.cattle,
          "rkeWindowsPathPrefix",
          windowsPathPrefix
        );

        if (isWindows) {
          deleteIfEqual(values.global.cattle.windows, "enabled", true);
        }
      }

      if (
        values.global?.cattle?.windows &&
        !Object.keys(values.global.cattle.windows).length
      ) {
        delete values.global.cattle.windows;
      }

      if (values.global?.cattle && !Object.keys(values.global.cattle).length) {
        delete values.global.cattle;
      }

      if (!Object.keys(values.global || {}).length) {
        delete values.global;
      }

      return values;

      function deleteIfEqual(obj, key, val) {
        if (get(obj, key) === val) {
          delete obj[key];
        }
      }
    },
    actionInput(isUpgrade) {
      /* Default values defined in the Helm chart itself */
      const fromChart = this.versionInfo?.values || {};

      const errors = [];

      if (this.showingYaml || this.showingYamlDiff) {
        const { errors: yamlErrors } = this.applyYamlToValues();

        errors.push(...yamlErrors);
      }

      /*
        Only save the values that differ from the chart's standard values.yaml.
        chartValues is created by applying the user's customized onto
        the default chart values.
      */
      const values = diff(fromChart, this.chartValues);

      /*
        Refer to the developer docs at docs/developer/helm-chart-apps.md
        for details on what values are injected and where they come from.
      */

      this.addGlobalValuesTo(values);

      const form = JSON.parse(JSON.stringify(this.value));

      /*
        Migrated annotations are required to allow a deprecated legacy app to be
        upgraded.
      */
      const migratedAnnotations = this.migratedApp
        ? { [CATALOG_ANNOTATIONS.MIGRATED]: "true" }
        : {};

      const chart = {
        chartName: this.chart.chartName,
        version: this.version?.version || this.query.versionName,
        releaseName: form.metadata.name,
        description: this.customCmdOpts.description,
        annotations: {
          ...migratedAnnotations,
          [CATALOG_ANNOTATIONS.SOURCE_REPO_TYPE]: this.chart.repoType,
          [CATALOG_ANNOTATIONS.SOURCE_REPO_NAME]: this.chart.repoName,
        },
        values,
      };

      if (isUpgrade) {
        chart.resetValues = this.cmdOptions.resetValues;
      }

      /*
        Configure Helm CLI options for doing the install or
        upgrade operation.
      */
      const out = {
        charts: [chart],
        noHooks: this.cmdOptions.hooks === false,
        timeout:
          this.cmdOptions.timeout > 0 ? `${this.cmdOptions.timeout}s` : null,
        wait: this.cmdOptions.wait === true,
        namespace: form.metadata.namespace,
        projectId: this.project,
      };

      /*
        Configure Helm CLI options that are specific to
        installs or specific to upgrades.
      */
      if (isUpgrade) {
        out.force = this.cmdOptions.force === true;
        out.historyMax = this.cmdOptions.historyMax;
        out.cleanupOnFail = this.cmdOptions.cleanupOnFail;
      } else {
        out.disableOpenAPIValidation = this.cmdOptions.openApi === false;
        out.skipCRDs = this.cmdOptions.crds === false;
      }

      const more = [];

      const auto = (
        this.version?.annotations?.[CATALOG_ANNOTATIONS.AUTO_INSTALL_GVK] || ""
      )
        .split(/\s*,\s*/)
        .filter((x) => !!x)
        .reverse();

      for (const gvr of auto) {
        const provider = this.$store.getters["catalog/versionProviding"]({
          gvr,
          repoName: this.chart.repoName,
          repoType: this.chart.repoType,
        });

        if (provider) {
          more.push(provider);
        } else {
          errors.push(
            `This chart requires another chart that provides ${gvr}, but none was was found`
          );
        }
      }

      /* Chart custom UI components have the ability to edit CRD chart values eg gatekeeper-crd has values.enableRuntimeDefaultSeccompProfile
        like the main chart, only CRD values that differ from defaults should be sent on install/upgrade
        CRDs should be installed with the same global values as the main chart
      */
      for (const versionInfo of this.autoInstallInfo) {
        // allValues are the values potentially changed in the installation ui: any previously customized values + defaults
        // values are default values from the chart
        const { allValues, values: crdValues } = versionInfo;

        // only save crd values that differ from the defaults defined in chart values.yaml
        const customizedCrdValues = diff(crdValues, allValues);

        // CRD globals should be overwritten by main chart globals
        // we want to avoid including globals present on crd values and not main chart values
        // that covers the scenario where a global value was customized on a previous install (and so is present in crd global vals) and the user has reverted it to default on this update (no longer present in main chart global vals)
        const crdValuesToInstall = {
          ...customizedCrdValues,
          global: values.global,
        };

        out.charts.unshift({
          chartName: versionInfo.chart.name,
          version: versionInfo.chart.version,
          releaseName:
            versionInfo.chart.annotations[CATALOG_ANNOTATIONS.RELEASE_NAME] ||
            chart.name,
          projectId: this.project,
          values: crdValuesToInstall,
        });
      }
      /*
        'more' contains additional
        charts that may not be CRD charts but are also meant to be installed at
        the same time.
      */
      for (const dependency of more) {
        out.charts.unshift({
          chartName: dependency.name,
          version: dependency.version,
          releaseName:
            dependency.annotations[CATALOG_ANNOTATIONS.RELEASE_NAME] ||
            dependency.name,
          projectId: this.project,
          values: this.addGlobalValuesTo({ global: values.global }),
          annotations: {
            ...migratedAnnotations,
            [CATALOG_ANNOTATIONS.SOURCE_REPO_TYPE]: dependency.repoType,
            [CATALOG_ANNOTATIONS.SOURCE_REPO_NAME]: dependency.repoName,
          },
        });
      }

      return { errors, input: out };
    },
    remove(volMount) {
      removeObject(this.volumeMounts, volMount);
    },
    add() {
      console.log(this);
      this.volumeMounts.push({ mountPath: ``, subPath: `` });
    },
    disableNamespace() {
      return this.userInfo.uid != undefined && this.userInfo.uid != ``;
    },
  },
};
</script>

<template>
  <Loading v-if="$fetchState.pending" />
  <div v-else>
    <h1>Install</h1>
    <div class="mb-20">
      <div>
        <p>{{ t(`job.name`) }}</p>
      </div>
      <div class="col span-3">
        <LabeledInput v-model="model.name" />
      </div>
    </div>
    <div class="mb-20">
      <div class="row">
        <p class="col span-3">
          {{ t(`namespace`) }}
        </p>
        <p class="col span-3">
          {{ t(`app.version`) }}
        </p>
      </div>
      <div class="row">
        <div class="col span-3">
          <Select
            v-model="value.metadata.namespace"
            :options="getNamespaceList"
            :disabled="disableNamespace()"
          />
        </div>
        <div class="col span-3">
          <LabeledInput v-model="appVer" :disabled="true" />
        </div>
      </div>
    </div>
    <template v-if="isTotalMode">
      <div class="mb-20">
        <div class="row">
          <p class="col span-3">
            {{ t(`cpu`) }}
          </p>
          <p class="col span-3">
            {{ t(`memory`) }}
          </p>
        </div>
        <div class="row">
          <div class="col span-3">
            <UnitInput
              v-model="model.cpu.total"
              :input-exponent="0"
              suffix="CPUs"
              :min="1"
              type="number"
            />
          </div>
          <div class="col span-3">
            <UnitInput
              v-model="model.memory.total"
              :input-exponent="2"
              :output-modifier="true"
              :increment="1024"
              :min="1"
              type="number"
            />
          </div>
        </div>
      </div>
      <div class="mb-20">
        <div class="row">
          <p class="col span-3">
            {{ t(`gpu`) }}
          </p>
          <p class="col span-3">
            {{ t(`node`) }}
          </p>
        </div>
        <div class="row">
          <div class="col span-3">
            <UnitInput
              v-model="model.gpu.total"
              :input-exponent="0"
              suffix="GPUs"
              :min="1"
              type="number"
            />
          </div>
          <div class="col span-3">
            <UnitInput
              v-model="model.node"
              :input-exponent="0"
              suffix="Node"
              :min="1"
              type="number"
            />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="mb-20">
        <div class="row">
          <p class="col span-3">
            {{ t(`cpu.master`) }}
          </p>
          <p class="col span-3">
            {{ t(`cpu.worker`) }}
          </p>
        </div>
        <div class="row">
          <div class="col span-3">
            <UnitInput
              v-model="model.cpu.master"
              :input-exponent="0"
              suffix="CPUs"
              :min="1"
              type="number"
            />
          </div>
          <div class="col span-3">
            <UnitInput
              v-model="model.cpu.worker"
              :input-exponent="0"
              suffix="CPUs"
              :min="1"
              type="number"
            />
          </div>
        </div>
      </div>
      <div class="mb-20">
        <div class="row">
          <p class="col span-3">
            {{ t(`gpu.master`) }}
          </p>
          <p class="col span-3">
            {{ t(`gpu.worker`) }}
          </p>
        </div>
        <div class="row">
          <div class="col span-3">
            <UnitInput
              v-model="model.gpu.master"
              :input-exponent="0"
              suffix="GPUs"
              :min="1"
              type="number"
            />
          </div>
          <div class="col span-3">
            <UnitInput
              v-model="model.gpu.worker"
              :input-exponent="0"
              suffix="GPUs"
              :min="1"
              type="number"
            />
          </div>
        </div>
      </div>
      <div class="mb-20">
        <div class="row">
          <p class="col span-3">{{ t(`memory.master`) }}r</p>
          <p class="col span-3">
            {{ t(`memory.worker`) }}
          </p>
        </div>
        <div class="row">
          <div class="col span-3">
            <UnitInput
              v-model="model.memory.master"
              :input-exponent="2"
              :output-modifier="true"
              :increment="1024"
              :min="1"
              type="number"
            />
          </div>
          <div class="col span-3">
            <UnitInput
              v-model="model.memory.worker"
              :input-exponent="2"
              :output-modifier="true"
              :increment="1024"
              :min="1"
              type="number"
            />
          </div>
        </div>
      </div>
      <div class="mb-20">
        <div class="row">
          <p class="col span-3">
            {{ t(`nodes`) }}
          </p>
        </div>
        <div class="row">
          <div class="col span-3">
            <UnitInput
              v-model="model.node"
              :input-exponent="0"
              suffix="Node"
              :min="1"
              type="number"
            />
          </div>
        </div>
      </div>
    </template>
    <div class="mb-20">
      <div v-if="volumeMounts.length" class="mount-headers">
        <span>
          {{ t(`workload.storage.mountPoint`) }}
          <span class="text-error">*</span>
        </span>
        <span>
          {{ t("workload.storage.subPath") }}
        </span>
        <!-- <span class="read-only">
          {{ t("workload.storage.readOnly") }}
        </span> -->
        <span />
      </div>
      <div v-for="(volumeMount, i) in volumeMounts" :key="i" class="mount-rows">
        <div>
          <LabeledInput
            :id="`mount-path-${i}`"
            v-model="volumeMount.mountPath"
            :mode="mode"
            :disabled="i == 0"
          />
        </div>
        <div>
          <LabeledInput
            v-model="volumeMount.subPath"
            :mode="mode"
            :disabled="i == 0"
          />
        </div>
        <div class="remove">
          <button
            v-if="i != 0"
            id="remove-mount"
            type="button"
            class="btn btn-sm role-link"
            @click="remove(volumeMount)"
          >
            {{ t("generic.remove") }}
          </button>
        </div>
      </div>
      <div class="row">
        <button
          id="add-mount"
          type="button"
          class="btn role-tertiary"
          @click="add()"
        >
          {{ t("workload.storage.addMount") }}
        </button>
      </div>
    </div>
    <div class="mb-20">
      <div class="row">
        <p class="col span-3">
          {{ t(`command`) }}
        </p>
      </div>
      <div class="row">
        <div class="col span-6">
          <TextAreaAutoGrow v-model="model.command" />
        </div>
      </div>
    </div>
    <div class="mb-20">
      <div class="row">
        <p class="col span-3">
          {{ t(`input.file`) }}
        </p>
      </div>
      <button class="role-tertiary" @click="upload">
        {{ t(`upload`) }}
      </button>
    </div>
    <div class="mb-20">
      <div class="row">
        <p class="col span-3">
          {{ t(`post.processing`) }}
        </p>
      </div>
      <button class="role-tertiary" @click="upload">
        {{ t(`upload`) }}
      </button>
    </div>
    <div class="mb-20">
      <button class="role-tertiary" @click="submit">
        {{ t(`submit`) }}
      </button>
    </div>
    <div class="mb-20">
      <button class="role-tertiary" @click="submitConsole">
        {{ t(`submitOnlyConsole`) }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
