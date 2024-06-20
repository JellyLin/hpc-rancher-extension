<script>
import Select from "@shell/components/form/Select.vue";
import { ToggleSwitch } from '@components/Form/ToggleSwitch';
import { Banner } from '@components/Banner';
import { RadioGroup } from '@components/Form/Radio';
import SortableTable from '@shell/components/SortableTable';
import { EonOneService } from '../eonone2/eonkube-service';
import Loading from '@shell/components/Loading';

export default {
  name: "HpcEnable",
  components: {
    Select,
    ToggleSwitch,
    Banner,
    RadioGroup,
    SortableTable,
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
      tableLoading: true,
      pageLoading: false,
      
      // RaidCliAPI
      eonOneService: {},

      // Data
      hpcStorageData: {},
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
    };
  },
  fetch() {
  },
  computed: {
    getButtonLabel() {
      if (this.currentPage == 'enableHPCPage' && this.hpcEnable) {
        return `Next`;
      } else if (this.currentPage == 'installPackagePage') {
        return `Enable`;
      } else if (this.currentPage == 'infoPage') {
        return `Next`;
      } else {
        return `Create`;
      }
    },
  },
  methods: {
    testMethod() {
      console.log(`test`);
      window.location.href = window.location.href.replace(/\/[^\/]*$/, '/batch.volcano.sh.job');
    },
    pressNextButton() {
      if (this.getButtonLabel === `Next` && this.hpcEnable && this.selectedHpcStorage && this.currentPage == 'enableHPCPage') {
        console.log(`Next`);
        console.log(`selectedHpcStorage: ${this.selectedHpcStorage}`);
        this.showExternalStorage();
        this.currentPage = 'infoPage';
      } else if (this.currentPage == 'infoPage' && this.hpcEnable ) {
        console.log(`infoPage`);
        this.currentPage = 'installPackagePage';
      } else if (this.currentPage == 'installPackagePage' && this.hpcEnable && this.selectedVersion) {
        console.log(`installPackagePage`);
        console.log(`selectedVersion: ${this.selectedVersion}`);
        
        this.enableHPC();

      } 
      else {
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
    async isHpcEnable() {
      const inStore = this.$store.getters['currentProduct'].inStore;
      const result = await this.$store.dispatch(`${ inStore }/find`, { type: `configmap`, id: 'default/externalstoragelist'});

      if (result) {
        this.hpcEnable = true;

        this.hpcStorageData = result.data;
        for (const [key, value] of Object.entries(this.hpcStorageData)) {
          this.hpcStorageList.push({
            label: key,
            value: key,
          });
        }
      } else {
        this.hpcEnable = false;
      }
    },
    async showExternalStorage() {
      const args = {
        ip: this.hpcStorageData[this.selectedHpcStorage],
        uid: this.selectedHpcStorage,
      };
      const cmd = this.eonOneService.getCmdParam(`showExternalStorage`, args);
      const result = await this.eonOneService.executeCmd(cmd);
      console.log(result);
      this.externalStorageData = result;
      console.log(this.externalStorageData);

      const allFolderList = this.externalStorageData['fsPagelistFolder'];
      const fsShareStatusList = this.externalStorageData['fsShareStatus'];
      const partitionList = this.externalStorageData['partition'];
      this.sharedFolderTable = [];
      this.tableLoading = true;
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
      let sharePath;
      let shareController;
      
      for (const [key, value] of Object.entries(allFolderList)) {
        if (value.name === this.selectSharedFolder[0].sharedFolder) {
          sharePath = value.path;
          shareController = value.owner;
        }
      }
      let args = {
        s: sharePath,
        i: this.hpcStorageData[this.selectedHpcStorage],
        d: this.selectedHpcStorage,
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
          deviceId: this.selectedHpcStorage,
          projectName: '',
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
    this.isHpcEnable();
    this.eonOneService = new EonOneService('172.27.118.101', this.$store);
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
    <div class="viewMain">
      <Banner
        v-if="!hpcEnable"
        color="warning"
        :label="mountedMessage"
      />
      <Banner
        v-if="this.selectSharedFolder.length !== 1 && currentPage == 'infoPage'"
        color="warning"
        :label="selectSharedFolderMessage"
      />
      <h1 class="h50">HPC</h1>
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
      </div>
      <div class="mb-20" v-if="currentPage == 'enableHPCPage' && showHpcDevices && hpcEnable">
        <div class="row">
          <RadioGroup
          v-model="selectedHpcStorage"
          class="mb-20"
          name="model"
          :options="hpcStorageList"
          :label="hpcStorageMessage"
          />
        </div>
      </div>
      <div class="mb-20" v-if="currentPage == 'infoPage' && hpcEnable">
        <div class="row h50">
          <div class="col span">
            <h5>Description if needed</h5>
          </div>
        </div>
        <SortableTable
          :rows="sharedFolderTable"
          :headers="tableHeaders"
          :search="false"
          :table-actions="true"
          :row-actions="false"
          :loading="tableLoading"
          default-sort-by="sharedFolder"
          key-field="sharedFolder"
          @selection="selectSharedFolders"
        />
      </div>
      <div class="mb-20" v-if="currentPage == 'installPackagePage' && hpcEnable">
        <Loading v-if="pageLoading"/>
        <div class="row h50">
          <div class="col span">
            <h5>install package upload and extract on hpc workspace</h5>
          </div>
        </div>
        <div class="row">
          <div class="col span">
            <h4>Version</h4>
          </div>
        </div>
          <Select
            v-model="selectedVersion"
            :options="versionList"
            label="Version"
            :mode="mode"
            class="custom-page-options"
          />
      </div>
    </div>
    <div class="viewBottom">
      <hr>
      <div class="buttonGroup">
        <button
        class="btn role-secondary mr-6"
        type="button"
        @click="testMethod"
        >
        Cancel
        </button>
        <button
          class="btn role-secondary mr-6"
          type="button"
          @click="pressPreviousButton"
          v-if="currentPage == 'infoPage' || currentPage == 'installPackagePage'"
          style="margin-left: 10px;"
        >
          Previous
        </button>
        <button
          class="btn role-primary"
          type="button"
          @click="pressNextButton"
          :disabled="!hpcEnable || !selectedHpcStorage || (this.selectSharedFolder.length !== 1 && currentPage == 'infoPage')"
          style="margin-left: 10px;"
        >
          {{ getButtonLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .viewMain {
    height: calc(100vh - 140px);
  }

  .viewBottom {
    display: flex;
    flex-direction: column;
  }

  .buttonGroup {
    display: flex;
    justify-content: flex-end;
  }

  .custom-page-options {
    margin: 5px 0 0 20px;
    min-width: 320px;
    width: fit-content;
  }

  .h50 {
    height: 50px;
  }

</style>
