<template>
    <div class="hello" ref="chartdiv">
    </div>
</template>

<style scoped>
    .hello {
        width: 100%;
        height: 100%;
    }
</style>

<script>
  import Vue from 'vue';
  
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4charts from "@amcharts/amcharts4/charts";
  import am4themes_moonrisekingdom from "@amcharts/amcharts4/themes/moonrisekingdom";
  import am4themes_animated from "@amcharts/amcharts4/themes/animated";

  // function am4themes_myTheme(target) {
  //   if (target instanceof am4core.ColorSet) {
  //     target.list = [
  //       am4core.color("#d48264"),
  //       am4core.color("#c23531"),
  //       am4core.color("#60a0a8"),
  //       am4core.color("#91c7ae"),
  //     ];
  //   }
  // }
  
  // am4core.useTheme(am4themes_moonrisekingdom);
  am4core.useTheme(am4themes_animated);
  // am4core.useTheme(am4themes_myTheme);

  export default Vue.extend({
    name: 'funnel-amchart-chart',
    mounted() {
      let chart = am4core.create(this.$refs.chartdiv, am4charts.SlicedChart);
      chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

      chart.data = [ {
        "name": "Дрова",
        "value": 82.904
      }, {
        "name": "Вугілля",
        "value": 147.40
      }, {
        "name": "Нафтопродукти",
        "value": 149.009
      }, {
        "name": "Електроенергія",
        "value": 912.87
      }, {
        "name": "Природний газ",
        "value": 2040.133
      }];

      let series = chart.series.push(new am4charts.FunnelSeries());
      series.colors.step = 1;
      series.dataFields.value = "value";
      series.dataFields.category = "name";
      series.alignLabels = true;

      series.slices.template.adapter.add("fill", function(fill, target) {
        if (target.dataItem) {
          switch(target.dataItem.category) {
            case "Природний газ":
              return am4core.color("#d48264");
            case "Електроенергія":
              return am4core.color("#609fa8");
            case "Нафтопродукти":
              return am4core.color("#c35957");
            case "Вугілля":
              return am4core.color("#4f6e81");
            case "Дрова":
              return am4core.color("#91c7ae");
          }
        }
        else {
          return fill;
        }
      });

      series.labelsContainer.paddingLeft = 15;
      series.labelsContainer.width = 200;

      series.legendSettings.valueText = "{value}";

//series.orientation = "horizontal";
//series.bottomRatio = 1;

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