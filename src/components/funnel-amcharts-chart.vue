<template>
    <div class="hello" ref="chartdiv">
    </div>
</template>

<style scoped>
    .hello {
        width: 100%;
        height: 400px;
    }
</style>

<script>
  import Vue from 'vue';
  
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4charts from "@amcharts/amcharts4/charts";
  import am4themes_animated from "@amcharts/amcharts4/themes/animated";
  import { makeFunnelData } from './energyData'
  import { colors } from './colors'
  
  am4core.useTheme(am4themes_animated);

  export default Vue.extend({
    name: 'funnel-amchart-chart',
    props: ['data', 'labels'],
    // watch: {
    //   data: function(newData, oldData) {
    //     this.chart.data = makeFunnelData(newData, this.labels);
    //   }
    // },
    mounted() {
      let chart = am4core.create(this.$refs.chartdiv, am4charts.SlicedChart);
      chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

      chart.data = makeFunnelData(this.data, this.labels);
      
      let series = chart.series.push(new am4charts.FunnelSeries());
      series.colors.step = 1;
      series.dataFields.value = "value";
      series.dataFields.category = "name";
      series.alignLabels = true;

      series.slices.template.adapter.add("fill", function(fill, target) {
        if (target.dataItem) {
          const c = colors[target.dataItem.category];
          return c ? am4core.color(c.base) :  am4core.color("#000000");
        } else {
          return fill;
        }
      });

      series.labelsContainer.paddingLeft = 15;
      series.labelsContainer.width = 200;

      series.legendSettings.valueText = "{value}";

      chart.legend = new am4charts.Legend();
      chart.legend.position = "left";
      chart.legend.valign = "middle";
      // chart.legend.va
      chart.legend.margin(5,5,20,5);
      this.chart = chart;
    },
    beforeDestroy() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
  })
</script>