<template>
    <div class="hello" ref="chartdiv">
    </div>
</template>

<style scoped>
    .hello {
        width: 100%;
        height: 1200px;
    }
</style>

<script>
  import Vue from 'vue';
  
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4charts from "@amcharts/amcharts4/charts";
  import am4themes_moonrisekingdom from "@amcharts/amcharts4/themes/moonrisekingdom";
  import am4themes_animated from "@amcharts/amcharts4/themes/animated";

  import { colors } from "./colors"
  
  am4core.useTheme(am4themes_animated);

  export default Vue.extend({
    name: 'sankey-amchart-chart',
    props: ['data', 'labels'],
    mounted() {
      
      // https://www.amcharts.com/demos/traceable-sankey-diagram/
      // https://www.amcharts.com/docs/v4/tutorials/handling-long-sankey-labels/
      
      let chart = am4core.create(this.$refs.chartdiv, am4charts.SankeyDiagram);

      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
      
      chart.data = this.data.sankeyData;
      
      chart.data.unshift({ "from": "Об'єм енергоспоживання" });
      
      const idSeparator = '-----';

      chart.numberFormatter.numberFormat = "#.##";
      
      chart.data.forEach(o => {
        if (o.value < 0) {
          o.value = 0;
        }
        if (!o.to) {
          o.nodeColor = am4core.color("#a69097")
        } else {
          o.id = `${o.from}${idSeparator}${o.to}`;
          const cTo = colors[o.to];
          const cFrom = colors[o.from];
          if (cTo) {
            o.nodeColor = am4core.color(cTo.base)
          } else if (cFrom) {
            o.nodeColor = am4core.color(cFrom.base)
          } else {
            o.nodeColor = am4core.color("#000000")
          }
        }
      });
      
      let hoverState = chart.links.template.states.create("hover");
      hoverState.properties.fillOpacity = 0.6;

      chart.dataFields.fromName = "from";
      chart.dataFields.toName = "to";
      chart.dataFields.value = "value";
      chart.dataFields.color = "nodeColor";

      chart.links.template.propertyFields.id = "id";
      chart.links.template.colorMode = "solid";
      chart.links.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
      chart.links.template.fillOpacity = 0.1;
      chart.links.template.tooltipText = "{value}";

      // make nodes draggable
      let nodeTemplate = chart.nodes.template;
      // nodeTemplate.inert = true;
      nodeTemplate.draggable = false;
      nodeTemplate.width = 20;
      nodeTemplate.marginTop = 0;
      nodeTemplate.marginBottom = 0;
      nodeTemplate.paddingTop = 2;
      nodeTemplate.paddingBottom = 2;

      nodeTemplate.tooltipText = "{totalIncoming} → {totalOutgoing}";
      nodeTemplate.readerTitle = "Натисніть щоб приховати або показати";
      // nodeTemplate.showSystemTooltip = true;
      nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;

      nodeTemplate.nameLabel.label.truncate = false;
      nodeTemplate.nameLabel.label.wrap = true;
      nodeTemplate.nameLabel.label.width = 240;
      
      // for right-most label to fit
      chart.paddingRight = 220;
      
      this.chart = chart;
    },
    beforeDestroy() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
  })
</script>