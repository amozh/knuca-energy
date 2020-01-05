<template>
    <div class="cards-container">
        <v-card class="echart" elevation="8" v-bind:key="`${title}${index}`" v-for="(chart, index) in charts">
            <div>
                <pie-chart v-bind:data="chart.data" v-bind:title="chart.title" v-bind:animation="animation"/>
            </div>
        </v-card>
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
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
    }
    .echart {
        margin: 1em;
    }
</style>

<script>
  import Vue from 'vue';
  import d3Chart from './d3chart.vue'
  import interactiveD3Chart from './interactived3chart.vue'
  import pieChart from './pie-chart.vue'
  import { ChartSankeyData } from "@/components/chartSankeyData.ts";

  // const data = (() => {
  //   const links = d3latest.csvParse(SankeyData, d3latest.autoType);
  //   const nodes = Array.from(new Set(links.flatMap(l => [l.source, l.target])), name => ({name}));
  //   return {nodes, links};
  // })();

  export default Vue.extend({
    name: 'charts',
    components: {
      'pie-chart': pieChart,
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