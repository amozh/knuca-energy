<template>
  <v-app id="inspire">
    <v-navigation-drawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
    >
      <v-list>
        <template v-for="item in data">
          <v-list-item
                  :key="item.id"
                  @click="switchActiveArea(item)"
                  v-bind:class="{ 'selected-area': activeArea && (activeArea.data.id === item.id)}"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ item.area }} область
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            app
            color="blue darken-3"
            dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
              style="width: 500px"
              class="ml-0 pl-4"
      >
        <div>
          <span>Енергетика України - </span>
          <transition name="chart-fade">
            <span v-if="activeArea">{{ activeArea.header }} область</span>
          </transition>
        </div>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container
              class="fill-height"
              fluid
      >
        <transition name="chart-fade">
          <charts  v-if="activeArea" v-bind:item="activeArea.data" v-bind:labels="labels"/>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<style>
  .region-item {
    color: #0409ff;
  }
  .selected-area {
    background-color: rgba(162, 160, 170, 0.51);
  }
  .chart-fade-leave-active {
    transition: opacity .5s;
  }
  .chart-fade-leave-to /* .chart-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

<script>
  import Vue from 'vue';
  import ECharts from 'vue-echarts'

  Vue.component('v-chart', ECharts);

  import charts from './components/charts.vue'
  import { DataByArea } from "@/data.ts";
  import { MenuItems, DefaultMenuItem } from "@/items.ts";
  import { loadEnergyData } from "@/components/energyData.ts";

  export default Vue.extend({
    name: 'App',
    components: {
      charts,
    },
    props: {
      source: String,
    },
    created () {
      // fetch the data when the view is created and the data is
      // already being observed
      this.fetchData()
    },
    data: () => ({
      dialog: false,
      drawer: null,
      items: MenuItems,
      labels: [],
      data: [],
      item: null,
      activeArea: null
    }),
    methods: {
      fetchData () {
        loadEnergyData().then(ed => {
          this.labels = ed.labels;
          this.data = ed.data;
          const firstToLoad = ed.data[0];
          this.activeArea = {
            header: firstToLoad.area,
            data: firstToLoad,
          };
        })
      },
      switchActiveArea (item) {
        // eslint-disable-next-line no-console
        console.log('Switching region to ' + item.area);
        this.activeArea = undefined;
        setTimeout(() => {
          this.activeArea = {
            header: item.area,
            data: item,
          };
        });
      }
    }
  })
</script>