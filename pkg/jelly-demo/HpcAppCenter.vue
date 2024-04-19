<script>
import Carousel from '@shell/components/Carousel';
import SelectIconGrid from '@shell/components/SelectIconGrid';
import { BadgeState } from '@components/BadgeState';
import { Banner } from '@components/Banner';
import json from './assets/apps_list.json';

function SliderViewModel(data) {
  // this.Id = data.Id;
  this.icon = data.logo;
  this.repoName = data.app_name;
  this.chartNameDisplay = data.title;
  this.chartDescription = data.description;
}

function AppViewModel(data, index) {
  // this.Id = data.Id;
  this.icon = data.logo;
  this.iconClass = 'icon icon-4x icon-gear icon-spin';
  switch (data.app_name) {
  case 'antivirus':
    this.disabled = true;
    break;
  case 'docker':
    this.link = 'https://www.infortrend.com/global/products/docker';
    this.key = 'keyAttr';
    break;
  default:
    this.link = 'https://www.infortrend.com/global/products/app';
  }
  this.badgeState = fillBadgeState(index);
  this.repoName = data.app_name;
  this.chartNameDisplay = data.title;
  this.chartDescription = data.description;
}

function fillBadgeState(rand) {
  const props = {
    color: 'bg-success',
    icon:  'icon-checkmark',
  };

  switch (rand % 10) {
  case 0:
    props.color = 'bg-success';
    props.icon = 'icon-checkmark';
    break;
  case 1:
    props.color = 'bg-error';
    props.icon = 'icon-warning';
    break;
  case 2:
    props.color = 'bg-info';
    props.icon = 'icon-warning';
    break;
  case 3:
    props.color = 'bg-warning';
    props.icon = 'icon-warning';
    break;
  case 4:
    props.color = 'bg-darker';
    props.icon = 'icon-warning';
    break;
  default:
    props.color = 'bg-info';
    props.icon = 'icon-warning';
    break;
  }

  return props;
}

function BannerViewModel(data, index) {
  // this.Id = data.Id;
  this.icon = data.logo;
  this.label = data.app_name;
  this.banner = fillBanner(index);
}

function fillBanner(rand) {
  const props = {
    color:    'info',
    icon:     '',
    stacked:  false,
    closable: false,
  };

  switch (rand % 10) {
  case 0:
    props.color = 'info';
    break;
  case 1:
    props.color = 'warning';
    break;
  case 2:
    props.color = 'error';
    break;
  case 3:
    props.color = 'primary';
    props.icon = 'icon-checkmark';
    break;
  case 4:
    props.color = 'secondary';
    break;
  default:
    props.color = 'success';
    props.stacked = true;
    props.closable = true;
    break;
  }

  return props;
}

export default {
  name:       'AppCenter',
  layout:     'plain',
  components: {
    Carousel,
    SelectIconGrid,
    BadgeState,
    Banner
  },
  // data(){
  //     return{
  //         myJson: json
  //     }
  // },

  fetch() {
    // const response = await fetch("<%= BASE_URL %>apps_list.json");
    // const apps = await response.json();
    // console.log(apps);
    const appList = json;

    this.sliders = appList.map((app) => {
      return new SliderViewModel(app);
    });
    this.apps = appList.map((app, index) => {
      return new AppViewModel(app, index);
    });
    this.banners = appList.map((app, index) => {
      return new BannerViewModel(app, index);
    });
    // this.sliders = [];
    // for( let i=0; i < app_list.length; i++ ) {
    //   this.sliders.push(new ContainerViewModel(app_list[i]));
    // }
    // this.apps = [];
    // for( let i=0; i < app_list.length; i++ ) {
    //   this.sliders.push(new ContainerViewModel(app_list[i]));
    // }
  },

  methods: {
    selectChart(chart) {
      if ( !chart ) {
        return;
      }
      alert(`${ chart.repoName } not implemented`);
      // this.$router.applyQuery({
      // });
    },
  },

  computed: {
    getApps() {
      return this.apps;
    },
    getSliders() {
      return this.sliders;
    },
    getBanners() {
      return this.banners;
    },
  },
};
</script>
<template>
  <!-- <script src="models/app.js"></script> -->
  <div>
    <h1>Welcome to AppCenter</h1>
    <div>
      <h3> GS EonOne > App Center </h3>
      <h2>Carousel</h2>
      <Carousel
        :sliders="getSliders"
        @clicked="(row) => selectChart(row)"
      />
    </div>

    <div>
      <div
        style="width: 100%;"
      >
        <div class="m-50 text-center">
          <h1>noCharts</h1>
        </div>
      </div>
      <h2>SelectIconGrid</h2>
      <SelectIconGrid
        :as-link="true"
        :rows="getApps"
        name-field="chartNameDisplay"
        description-field="chartDescription"
        @clicked="(row) => selectChart(row)"
      />
    </div>
    <div>
      <h2>BadgeState</h2>
      <div>
        <BadgeState
          v-for="item in getApps"
          :key="item.repoName"
          v-clean-tooltip="item.repoName"
          :color="item.badgeState.color"
          :icon="item.badgeState.icon"
          :label="item.repoName"
          class="mr-10 ml-10 state"
        />
      </div>
    </div>
    <div>
      <h2>Banner</h2>
      <div style="display: flex;">
        <Banner
          v-for="item in getBanners"
          :key="item.label"
          :color="item.banner.color"
          :icon="item.banner.icon"
          :stacked="item.banner.stacked"
          :closable="item.banner.closable"
          :label="item.label"
          style="margin-left: 10px;"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  h1, h3 {
    margin: 20px 0;
    text-align: center;
  }

  h3 {
    color: #2553FF;
    font-weight: bold;
  }
</style>
