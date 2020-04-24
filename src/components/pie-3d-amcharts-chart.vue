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

  import { makePieAnyData } from "./energyData"
  import { colors } from "./colors"
  
  am4core.useTheme(am4themes_animated);

  export default Vue.extend({
    name: 'pie-3d-amcharts-chart',
    props: ['kind', 'data', 'labels'],
    mounted() {
      let chart = am4core.create(this.$refs.chartdiv, am4charts.PieChart3D);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
      
      const data = makePieAnyData(this.data, this.labels, this.kind);
      
      let baseDataPoint;
      let baseColor;
      let colorSet;
      
      data.forEach(elem => {
        const base = colors[elem.country];
        if (base) {
          baseDataPoint = elem;
          baseColor = base.base;
          colorSet = base.colorSet;
        }
      });
      
      if (!baseDataPoint) {
        alert(`Failed to pull base datapoint from ${JSON.stringify(data)}`)
      }
      
      chart.data = data.sort((a, b) => b.litres - a.litres).map((elem, idx) => {
        if (elem.litres === 0) {
          elem.hide = true;
        }
        elem.depth = idx + 1;
        return elem;
      });

      chart.innerRadius = am4core.percent(30);
      chart.depth = 80;
      chart.angle = 15;

      //https://www.amcharts.com/docs/v4/chart-types/pie-chart/#Modifying_labels_legend_tooltip
      
      let series = chart.series.push(new am4charts.PieSeries3D());
      series.dataFields.value = "litres";
      series.dataFields.depthValue = "depth";
      series.dataFields.category = "country";
      series.slices.template.cornerRadius = 50;
      series.colors.step = 1;
      
      series.slices.template.adapter.add("fill", function(fill, target) {
        if (target.dataItem && baseDataPoint.country === target.dataItem.category) {
          const isBase = baseDataPoint.country === target.dataItem.category;
          return am4core.color(baseColor);
        } else {
          return fill;
        }
      });

      series.dataFields.hidden = "hide";
      
      //Set custom color set
      //https://www.amcharts.com/docs/v4/concepts/colors/#What_is_a_color_set_
      series.colors.list = colorSet.map(c => am4core.color(c));

      //unallign labels
      series.alignLabels = true;
      
      //prepulled slices
      series.slices.template.propertyFields.isActive = "pulled";

      //wrap labels
      series.labels.template.maxWidth = 250;
      series.labels.template.wrap = true;
      
      //label font size
      // series.labels.template.fontSize = 13;
      
      //reduce pie radius
      chart.radius = am4core.percent(80);

      //https://www.amcharts.com/docs/v4/reference/legend/
      chart.legend = new am4charts.Legend();
      chart.legend.maxHeight = 100;
      chart.legend.paddingBottom = 5;
      chart.legend.scrollable = true;

      chart.legend.itemContainers.template.paddingTop = 2;
      chart.legend.itemContainers.template.paddingBottom = 2;
      
      //https://www.amcharts.com/docs/v4/tutorials/truncating-legend-labels/
      chart.legend.labels.template.fontSize = 13;
      chart.legend.labels.template.maxWidth = 150;
      chart.legend.labels.template.truncate = true;
      chart.legend.labels.template.wrap = false;
      
      chart.legend.valueLabels.template.text = "[bold]{value.value}[/]";
      chart.legend.valueLabels.template.fontSize = 14;
      
      this.chart = chart;
    },
    beforeDestroy() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
  })
</script>