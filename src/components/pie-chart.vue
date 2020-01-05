<template>
    <v-chart class="chart"
             :options="pie"
             :init-options="initOptions"
             ref="pie"
             autoresize
             @mouseover="clearAnimationInterval()"
             @mouseout="scheduleSetInterval()"
    />
</template>

<style>
    /**
     * The default size is 600px×400px, for responsive charts
     * you may need to set percentage values as follows (also
     * don't forget to provide a size for the container).
     */
    .chart {
        width: 400px;
        height: 400px;
    }
</style>

<script>
  import Vue from 'vue';
  import ECharts from 'vue-echarts'

  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/title'

  export default Vue.extend({
    name: 'pie-chart',
    components: {
      'v-chart': ECharts
    },
    props: ['title', 'data', 'animation'],
    data () {
      return {
        initOptions: {
          renderer: 'canvas'
        },
        animationState: {
          curVal: 0,
          prevVal: 0,
          interval: undefined,
          timeout: undefined,
          isSet: false
        },
        pie: {
          title: {
            text: this.title,
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} ({d}%)'
          },
          // legend: {
          //   orient: 'vertical',
          //   left: 'left',
          //   data: ['Segment1', 'Segment2', 'Segment3', 'Segment4', 'Segment5']
          // },
          series: [
            {
              name: 'Series information',
              type: 'pie',
              radius: '50%',
              center: ['50%', '50%'],
              data: this.data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    watch:{
      'animation.pieChartsDataIndex': function(newVal, oldVal){
        if (this.animationState.isSet) {
          let pie = this.$refs.pie;
          pie.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: oldVal
          });
          pie.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: newVal
          });
          pie.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: newVal
          })
        }
      }
    },
    mounted () {
      this.setAnimationInterval()
    },
    methods: {
      setAnimationInterval() {
        this.animationState.isSet = true;
      },
      clearAnimationInterval() {
        if (this.animationState.isSet) {
          this.animationState.isSet = false;
          let pie = this.$refs.pie;
          pie.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: this.animation.pieChartsDataIndex
          });
        }
      },
      scheduleSetInterval() {
        clearTimeout(this.animationState.timeout);
        this.animationState.timeout = setTimeout(() => {
          this.setAnimationInterval()
        }, 10000)
      }
    }
  })
</script>