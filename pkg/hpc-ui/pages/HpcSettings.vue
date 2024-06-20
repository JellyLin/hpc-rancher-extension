<script>
import Select from "@shell/components/form/Select.vue";
import { ToggleSwitch } from '@components/Form/ToggleSwitch';
import { Banner } from '@components/Banner';
import { RadioGroup } from '@components/Form/Radio';
import SortableTable from '@shell/components/SortableTable';
import CodeMirror from '@shell/components/CodeMirror';
import { EonOneService } from '../eonone2/eonkube-service';
import Loading from '@shell/components/Loading';

export default {
  name: "HpcSettings",
  components: {
    Select,
    ToggleSwitch,
    Banner,
    RadioGroup,
    SortableTable,
    CodeMirror,
    Loading,
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

      // Message
      mountedMessage: `Message to tell user to go to EonOne for adding external storage.`,
      hpcStorageMessage: `Select a device for HPC storage.`,
      selectSharedFolderMessage: `Only one shared folder can be selected.`,

      // Control view
      currentTab: `enable`,
      currentPage: 'enableHPCPage',
      hpcEnable: false,
      showHpcDevices: false,
      selectedHpcStorage: ``,
      selectedVersion: `1.0.1`,
      selectSharedFolder: [],
      showHomeFolder: false,
      showImageVersion: false,
      tableLoading: true,
      pageLoading: false,

      // RaidCliAPI
      eonOneService: {},

      // Data
      hpcStorageData: {},
      hpcGetData: {},
      hpcStorageList: [],
      externalStorageData: {},
      versionList: ['1.0.1'],
      tableHeaders: [
        {
          name: `sharedFolder`,
          label: `Shared folder`,
          sort: ["sharedFolder"],
        },
        {
          name: `fileSystem`,
          label: `File system`,
          sort: ["fileSystem"],
        },
        {
          name: `size`,
          label: `Size`,
          sort: ["size"],
        },
      ],
      sharedFolderTable: [
        {
          sharedFolder: `GSx001`,
          fileSystem: `NFS`,
          size: `10GB`,
        },
        {
          sharedFolder: `GSx002`,
          fileSystem: `NFS`,
          size: `20GB`,
        },
      ],
      hpcHomeFolder: `1`,
      hpcAppBaseImageVersion: `1`,
    };
  },
  fetch() {
  },
  computed: {
    getSchedule() {
      return this.scheduleList;
    },
    getHomeFolderButtonLabel() {
      return this.showHomeFolder ? `Apply` : `Edit Setting`;
    },
    getImageVersionButtonLabel() {
      return this.showImageVersion ? `Apply` : `Edit Setting`;
    },
  },
  methods: {
    testMethod() {
      console.log(`test`);
    },
    pressNextButton() {
      if (this.getButtonLabel === `Next` && this.hpcEnable && this.selectedHpcStorage && this.currentPage == 'enableHPCPage') {
        console.log(`Next`);
        console.log(`selectedHpcStorage: ${this.selectedHpcStorage}`);
        this.currentPage = 'infoPage';
      } else if (this.currentPage == 'infoPage' && this.hpcEnable ) {
        console.log(`infoPage`);
        this.currentPage = 'installPackagePage';
      } else {
        console.log(`Create`);
      }
    },
    pressPreviousButton() {
      if (this.currentPage == 'infoPage') {
        this.currentPage = 'enableHPCPage';
      } else if (this.currentPage == 'installPackagePage') {
        this.currentPage = 'infoPage';
      }
    },
    selectSharedFolders(selected) {
      this.selectSharedFolder = selected;
      console.log("--------------------");
      selected.forEach((item) => {
        console.log(item.sharedFolder);
        console.log(item.fileSystem);
        console.log(item.size);
      });
    },
    editHomeFolder() {
      if (this.selectSharedFolder.length === 1 && this.showHomeFolder) {
        console.log("Apply");
        this.enableHPC();
      }
      this.showHomeFolder = !this.showHomeFolder;
    },
    editImageVersion() {
      if (this.showImageVersion) {
        console.log("Apply");
        this.enableHPC();
      }
      this.showImageVersion = !this.showImageVersion;
    },
    async hpcGet() {
      const inStore = this.$store.getters['currentProduct'].inStore;
      const result = await this.$store.dispatch(`${ inStore }/find`, { type: `configmap`, id: 'default/externalstoragelist'});

      this.hpcStorageData = result.data;

      const cmd = this.eonOneService.getCmdParam(`hpcGet`);
      const result2 = await this.eonOneService.executeCmd(cmd);
      console.log("hpcGet result:");
      console.log(result2);

      this.hpcGetData = result2;

      if (this.hpcGetData.plugins.length > 0) {
        this.hpcEnable = true;
        this.showHpcDevices = true;
        this.hpcHomeFolder = this.hpcGetData?.workspace.at(-1)?.homeFolder;
        const str = this.hpcGetData?.plugins.at(-1);
        this.hpcAppBaseImageVersion = str.substring(str.indexOf(':') + 2);
        this.selectSharedFolder.push({
          sharedFolder: this.hpcGetData?.workspace.at(-1)?.folder
        });
        this.showExternalStorage();
      }
    },
    async showExternalStorage() {
      const deviceId = this.hpcGetData?.workspace.at(-1)?.deviceId;
      const args = {
        ip: this.hpcStorageData[deviceId],
        uid: deviceId,
      };
      const cmd = this.eonOneService.getCmdParam(`showExternalStorage`, args);
      const result = await this.eonOneService.executeCmd(cmd);
      this.externalStorageData = result;
      console.log("showExternalStorage", this.externalStorageData);

      const allFolderList = this.externalStorageData['fsPagelistFolder'];
      const fsShareStatusList = this.externalStorageData['fsShareStatus'];
      const partitionList = this.externalStorageData['partition'];
      this.sharedFolderTable = [];
      Object.values(allFolderList).forEach((folder) => {
        if(!folder.isShared) return ;
        if(!fsShareStatusList[folder.path] || !fsShareStatusList[folder.path].isNFS) return ;
        
        let fsType = '';
        Object.keys(partitionList).forEach((key) => {
          if(key === folder.VolumeID) {
            fsType = partitionList[key].fsType;
          }
        });
        this.sharedFolderTable.push({
          sharedFolder: folder.name,
          fileSystem: fsType,
          size: (folder.Size / 1024).toFixed(2) + 'GB',
        });
    });
      this.tableLoading = false;
    },
    async enableHPC() {
      this.pageLoading = true;
      const allFolderList = this.externalStorageData['fsPagelistFolder'];
      const deviceId = this.hpcGetData?.workspace.at(-1)?.deviceId;
      let sharePath;
      let shareController;
      
      for (const [key, value] of Object.entries(allFolderList)) {
        const selectedFolder = this.selectSharedFolder[0]?.sharedFolder;
        if (selectedFolder && selectedFolder !=  this.hpcGetData?.workspace.at(-1)?.folder) {
          if (value.name === selectedFolder) {
          sharePath = value.path;
          shareController = value.owner;
          }
        } else if(this.hpcGetData?.workspace.at(-1)?.folder) {
          if (value.path === selectedFolder) {
          sharePath = value.path;
          shareController = value.owner;
          }
        }
      }
      let args = {
        s: sharePath,
        i: this.hpcStorageData[deviceId],
        d: deviceId,
        t: this.getModelType().toLowerCase(),
        c: shareController,
      };
      let cmd = this.eonOneService.getCmdParam(`fssK8sCsiExStorageMount`, args);
      let result = await this.eonOneService.executeCmd(cmd);
      console.log(result);
      
      const mount_path = result[sharePath].mount_path;
      console.log(mount_path);
      if (mount_path) {
        args = {
          plugins: "hpc-ui:v" + this.selectedVersion,
          service: "enable",
          deviceId: deviceId,
          folder: sharePath,
          homeFolder: mount_path + '/hpchome',
          appFolder: mount_path + '/hpcapp',
        };
        cmd = this.eonOneService.getCmdParam(`hpcApply`, args);
        let result2 = await this.eonOneService.executeCmd(cmd);
        console.log(result2);
        this.pageLoading = false;
      }
      
      // window.location.href = window.location.href.replace(/\/[^\/]*$/, '/batch.volcano.sh.job');
    },
    getModelType() {
      const model = this.externalStorageData.systemSettingInfo.Model;
      if (model.startsWith("CS")) {
        return "CS";
      }
      if(model.startsWith("GSx")) {
        return "GSx";
      }
      return "GS";
    },
    
  },
  mounted() {
    this.eonOneService = new EonOneService('172.27.118.101', this.$store);
    this.hpcGet();
  },
  watch: {
    hpcEnable: {
      handler: function (val) {
        console.log(`hpcEnable: ${val}`);
      },
      immediate: true,
    },
    selectedHpcStorage: {
      handler: function (val) {
        console.log(`selectedHpcStorage: ${val}`);
      },
      immediate: true,
    },
  },
};
</script>

<template>
  <div>
    <Loading v-if="pageLoading"/>
    <Banner
        v-if="this.selectSharedFolder.length !== 1 && showHomeFolder"
        color="warning"
        :label="selectSharedFolderMessage"
    />
    <h1 class="h50">Settings</h1>
    <div class="mb-20" v-if="currentPage == 'enableHPCPage'">
      <div class="row h50">
        <div class="col span">
          <h3>Enable HPC:</h3>
        </div>
        <div class="col span">
          <ToggleSwitch
            v-model="showHpcDevices"
            name="Enable HPC"
          />
        </div>
      </div>
      <div class="borderDiv" v-if="currentPage == 'enableHPCPage' && showHpcDevices">
        <div class="row h50">
          <div class="col span p15">
            <h3>HPC home folder</h3>
          </div>
          <div class="col span p15 pr23">
            <button
              class="btn role-primary"
              type="button"
              @click="editHomeFolder"
              :disabled="this.selectSharedFolder.length !== 1 && showHomeFolder"
            >
            {{getHomeFolderButtonLabel}}
            </button>
          </div>
        </div>
        <div class="row p15">
          <CodeMirror
            v-if="!showHomeFolder"
            mode="view"
            :value="hpcHomeFolder"
            :options="{readOnly: true}"
            :disabled = "true"
            asTextArea
            class = "grayBackGround"
          />
          <SortableTable
            v-if="showHomeFolder"
            :rows="sharedFolderTable"
            :headers="tableHeaders"	  
            :search="false"
            :table-actions="true"
            :row-actions="false"
            :loading="loading"
            default-sort-by="sharedFolder"
            key-field="sharedFolder"
            @selection="selectSharedFolders"
           />      
        </div>
      </div>
      <div class="borderDiv" v-if="currentPage == 'enableHPCPage' && showHpcDevices">
        <div class="row h50">
          <div class="col span p15">
            <h3>HPC App base image version</h3>
          </div>
          <div class="col span p15 pr23">
            <button
              class="btn role-primary"
              type="button"
              @click="editImageVersion"
            >
            {{getImageVersionButtonLabel}}
            </button>
          </div>
        </div>
        <div class="row p15">
          <CodeMirror
            v-if="!showImageVersion"
            mode="view"
            :value="hpcAppBaseImageVersion"
            :options="{readOnly: true}"
            :disabled = "true"
            asTextArea
            class = "grayBackGround"
          />
          <Select
            v-if="showImageVersion"
            v-model="selectedVersion"
            :options="versionList"
            label="Version"
            :mode="mode"
            class="custom-page-options"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .borderDiv {
    border: var(--nav-border-size) solid var(--nav-border);
    margin-bottom: 15px;
  }
  .grayBackGround {
    background-color: var(--disabled-bg);
  }
  .p15 {
    padding: 15px;
  }
  .h50 {
    height: 50px;
  }
  .pr23 {
    position: absolute;
    right: 23px;
  }

</style>
