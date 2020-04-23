<template>
  <v-app id="inspire">
    <v-navigation-drawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
    >
      <v-list expand>
        <template v-for="item in items">
          <v-list-group
                  v-if="item.children"
                  :key="item.text"
                  v-model="item.active"
                  :prepend-icon="item.model ? item.icon : item['icon-alt']"
                  append-icon=""
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="region-item">
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
                    v-for="(child, i) in item.children"
                    :key="i"
                    @click="switchActiveArea(child.key, child.text)"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-bind:class="{ 'region-item': child.region }">
                  {{ child.menuLabel || child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
                  v-else
                  :key="item.text"
                  @click="switchActiveArea(item.key, item.text)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-bind:class="{ 'region-item': item.region }">
                {{ item.text }}
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
        <span>Енергетика України - {{activeArea.header}}</span>
      </v-toolbar-title>
<!--      <v-text-field-->
<!--              flat-->
<!--              solo-inverted-->
<!--              hide-details-->
<!--              prepend-inner-icon="mdi-magnify"-->
<!--              label="Search"-->
<!--              class="hidden-sm-and-down"-->
<!--      />-->
<!--      <v-spacer />-->
<!--      <v-btn icon>-->
<!--        <v-icon>mdi-apps</v-icon>-->
<!--      </v-btn>-->
<!--      <v-btn icon>-->
<!--        <v-icon>mdi-bell</v-icon>-->
<!--      </v-btn>-->
<!--      <v-btn-->
<!--              icon-->
<!--              large-->
<!--      >-->
<!--        <v-avatar-->
<!--                size="32px"-->
<!--                item-->
<!--        >-->
<!--          <v-img-->
<!--                  src="https://cdn.vuetifyjs.com/images/logos/logo.svg"-->
<!--                  alt="Vuetify"-->
<!--          /></v-avatar>-->
<!--      </v-btn>-->
    </v-app-bar>
    <v-content>
      <v-container
              class="fill-height"
              fluid
      >
        <charts v-bind:charts="activeArea.data" v-bind:title="activeArea.key"/>
      </v-container>
    </v-content>
  </v-app>
</template>

<style>
  .region-item {
    color: #0409ff;
  }
</style>

<script>
  import Vue from 'vue';
  import ECharts from 'vue-echarts'

  Vue.component('v-chart', ECharts);

  import charts from './components/charts.vue'
  import { DataByArea } from "@/data.ts";
  import { MenuItems, DefaultMenuItem } from "@/items.ts";

  export default Vue.extend({
    name: 'App',

    components: {
      charts,
    },

    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      drawer: null,
      items: MenuItems,
      activeArea: {
        key: DefaultMenuItem.key,
        header: DefaultMenuItem.text,
        data: DataByArea[DefaultMenuItem.key]
      }
    }),
    methods: {
      switchActiveArea (areaKey, header) {
        // eslint-disable-next-line no-console
        console.log('Switching region to ' + header);
        if (DataByArea[areaKey]) {
          this.activeArea.key = areaKey;
          this.activeArea.header = header;
          this.activeArea.data = DataByArea[areaKey]
        }
      }
    }
  })
</script>