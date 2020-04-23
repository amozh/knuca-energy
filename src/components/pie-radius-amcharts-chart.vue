<template>
    <div class="hello" ref="chartdiv">
    </div>
</template>

<style scoped>
    .hello {
        width: 100%;
        height: 500px;
    }
</style>

<script>
  import Vue from 'vue';
  
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4charts from "@amcharts/amcharts4/charts";
  import am4themes_moonrisekingdom from "@amcharts/amcharts4/themes/moonrisekingdom";
  import am4themes_animated from "@amcharts/amcharts4/themes/animated";
  
  am4core.useTheme(am4themes_moonrisekingdom);
  am4core.useTheme(am4themes_animated);

  export default Vue.extend({
    name: 'pie-radius-amcharts-chart',
    mounted() {
      let chart = am4core.create(this.$refs.chartdiv, am4charts.PieChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.data = [
        {
          country: "Електроенергія",
          litres: 1545.40,
          depth: 1545.40
        },
        {
          country: "Потенціал сонячної  енергі",
          litres: 154.54,
          depth: 154.54
        },
        {
          country: "Потенціал малих рік",
          litres: 69.21,
          depth: 69.21
        },
        {
          country: "Теплота грунту та грунтових вод",
          litres: 280.10,
          depth: 280.10
        },
        {
          country: "Теплової енергії стічних вод",
          litres: 139.09,
          depth: 139.09
        },
        {
          country: "Вітрова енергія",
          litres: 72.44,
          depth: 72.44
        }
      ];

      var series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.value = "litres";
      series.dataFields.radiusValue = "depth";
      series.dataFields.category = "country";
      series.slices.template.cornerRadius = 6;
      series.colors.step = 3;

      series.hiddenState.properties.endAngle = -90;

      chart.legend = new am4charts.Legend();
      
      this.chart = chart;
    },
    beforeDestroy() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
  })
</script>