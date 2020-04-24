<template>
    <div class="cards-container" v-if="item">
        <v-card class="echart funnel" elevation="12" key="Баланс споживання енергії" style="width: 800px;">
            <div class="card-title-container"><span>Існуючий баланс споживання енергії</span></div>
            <funnel-chart v-bind:data="item" v-bind:labels="labels"></funnel-chart>
        </v-card>
        <v-card class="echart" elevation="8" style="width: 800px;">
            <div class="card-title-container"><span>Оптимізація джерел енергії. Електроенергія</span></div>
            <pie-3d-chart kind="electric" v-bind:data="item" v-bind:labels="labels"></pie-3d-chart>
        </v-card>
        <v-card class="echart" elevation="8" style="width: 800px;">
            <div class="card-title-container"><span>Оптимізація джерел енергії. Нафтопродукти</span></div>
            <pie-3d-chart kind="oil" v-bind:data="item" v-bind:labels="labels"></pie-3d-chart>
        </v-card>
        <v-card class="echart" elevation="8" style="width: 800px;">
            <div class="card-title-container"><span>Оптимізація джерел енергії. Вугілля</span></div>
            <pie-3d-chart kind="coal" v-bind:data="item" v-bind:labels="labels"></pie-3d-chart>
        </v-card>
        <v-card class="echart" elevation="8" style="width: 800px;">
            <div class="card-title-container"><span>Оптимізація джерел енергії. Природний газ</span></div>
            <pie-3d-chart kind="gas" v-bind:data="item" v-bind:labels="labels"></pie-3d-chart>
        </v-card>
        <v-card class="echart" elevation="8" style="width: 800px;">
            <div class="card-title-container"><span>Оптимізація джерел енергії. Дрова</span></div>
            <pie-3d-chart kind="wood" v-bind:data="item" v-bind:labels="labels"></pie-3d-chart>
        </v-card>
        <v-card class="echart" elevation="12" style="width: 100%; padding: 10px; max-width: 1200px;">
            <div class="card-title-container"><span>Оптимізація джерел енергії</span></div>
            <sankey-chart v-bind:data="item" v-bind:labels="labels"></sankey-chart>
        </v-card>
    </div>
</template>

<style>
    /**
     * The default size is 600px×400px, for responsive charts
     * you may need to set percentage values as follows (also
     * don't forget to provide a size for the container).
     */
    .cards-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .card-title-container {
        width: 100%;
        text-align: center;
        font-weight: bold;
    }

    .echart {
        margin: 20px;
    }
</style>

<script>
  import Vue from 'vue';
  import pie3DChart from './pie-3d-amcharts-chart'
  import sankeyChart from './sankey-amcharts-chart'
  import funnelChart from './funnel-amcharts-chart'
  import { ChartSankeyData } from "@/components/chartSankeyData.ts";
  import { EnergyData, EnergyDataItem, loadEnergyData } from './energyData'
  
  // const data = (() => {
  //   const links = d3latest.csvParse(SankeyData, d3latest.autoType);
  //   const nodes = Array.from(new Set(links.flatMap(l => [l.source, l.target])), name => ({name}));
  //   return {nodes, links};
  // })();

  export default Vue.extend({
    name: 'charts',
    components: {
      'funnel-chart': funnelChart,
      'pie-3d-chart': pie3DChart,
      'sankey-chart': sankeyChart
    },
    props: ['item', 'labels'],
  })
</script>