<template>
    <div class="cards-container">
        <v-card class="echart" elevation="12" key="Баланс споживання енергії" style="height: 800px; width: 1000px">
            <sankey-chart></sankey-chart>
        </v-card>
        <v-card class="echart funnel" elevation="12" key="Баланс споживання енергії" style="min-width: 500px; max-width: 800px;">
            <funnel-chart></funnel-chart>
        </v-card>
        <v-card class="echart" elevation="8" style="width: 800px;">
            <pie-3d-chart title="Електроенергія"></pie-3d-chart>
        </v-card>
        <v-card class="echart" elevation="8" style="width: 800px;">
            <pie-3d-chart title="Нафтопродукти"></pie-3d-chart>
        </v-card>
        <v-card class="echart" elevation="8" style="width: 800px;">
            <pie-3d-chart title="Вугілля"></pie-3d-chart>
        </v-card>
        <v-card class="echart" elevation="8" style="width: 800px;">
            <pie-3d-chart title="Природний газ"></pie-3d-chart>
        </v-card>
        <v-card class="echart" elevation="8" style="width: 800px;">
            <pie-3d-chart title="Дрова"></pie-3d-chart>
        </v-card>
<!--        <v-card class="echart" elevation="8" key="Природний газ" style="width: 800px;">-->
<!--            <pie-3d-reg-chart></pie-3d-reg-chart>-->
<!--        </v-card>-->
<!--        <v-card class="echart" elevation="8" key="Природний газ 3" style="width: 800px;">-->
<!--            <column-3d-chart></column-3d-chart>-->
<!--        </v-card>-->
<!--        <v-card class="echart" elevation="8" key="Природний газ 2" style="width: 800px;">-->
<!--            <pie-radius-chart></pie-radius-chart>-->
<!--        </v-card>-->
<!--        -->
<!--        <v-card class="echart" elevation="8" v-bind:key="`${title}${index}`" v-for="(chart, index) in charts">-->
<!--            <div>-->
<!--                <pie-chart v-bind:data="chart.data" v-bind:title="chart.title" v-bind:animation="animation"/>-->
<!--            </div>-->
<!--        </v-card>-->
<!--        <d3chart v-bind:tweetData="loadData"/>-->
<!--        <interactiveD3Chart v-bind:chartData="interactiveSankeyData"/>-->
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
    .echart {
        margin: 20px;
    }
    .funnel {
        width: 840px;
        height: 400px;
    }
</style>

<script>
  import Vue from 'vue';
  import d3Chart from './d3chart.vue'
  import interactiveD3Chart from './interactived3chart.vue'
  import pieChart from './pie-chart.vue'
  import pie3DChart from './pie-3d-amcharts-chart'
  import pie3DRegChart from './pie-3d-reg-amcharts-chart'
  import column3DChart from './column-3d-amcharts-chart'
  import pieRadiusChart from './pie-radius-amcharts-chart'
  import sankeyChart from './sankey-amcharts-chart'
  import funnelChart from './funnel-amcharts-chart'
  import { ChartSankeyData } from "@/components/chartSankeyData.ts";

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
      'sankey-chart': sankeyChart,
      // 'pie-chart': pieChart,
      // 'pie-3d-reg-chart': pie3DRegChart,
      // 'pie-radius-chart': pieRadiusChart,
      // 'column-3d-chart': column3DChart
      // 'd3chart': d3Chart,
      // 'interactiveD3Chart': interactiveD3Chart
    },
    props: ['charts', 'title'],
    data () {
      return {
        animation: {
          pieChartsDataIndex: 0,
          pieChartsDataPrevIndex: 0
        },
        loadData: [],
        interactiveSankeyData: ChartSankeyData
      }
    },
    mounted() {
      this.runDataIndexInterval()
    },
    methods: {
      runDataIndexInterval() {
        const animation = this.animation;
        const that = this;
        setInterval(() => {
          if (that.charts) {
            animation.pieChartsDataPrevIndex = animation.pieChartsDataIndex;
            animation.pieChartsDataIndex = (animation.pieChartsDataIndex + 1) % that.charts[0].data.length;
          }
        }, 5000);
      }
    }
  })
</script>