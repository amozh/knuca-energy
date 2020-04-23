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
  
  am4core.useTheme(am4themes_animated);

  export default Vue.extend({
    name: 'sankey-amchart-chart',
    mounted() {
      
      // https://www.amcharts.com/demos/traceable-sankey-diagram/
      // https://www.amcharts.com/docs/v4/tutorials/handling-long-sankey-labels/
      
      let chart = am4core.create(this.$refs.chartdiv, am4charts.SankeyDiagram);

      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.data = [
        {
          "from": "Електроенергія",
          "to": "Об'єм енергоспоживання",
          "value": 1858.5
        },
        {
          "from": "Нафтопродукти",
          "to": "Об'єм енергоспоживання",
          "value": 924.56
        },
        {
          "from": "Вугілля",
          "to": "Об'єм енергоспоживання",
          "value": 2674.65
        },
        {
          "from": "Природний газ",
          "to": "Об'єм енергоспоживання",
          "value": 2411.17
        },
        {
          "from": "Дрова",
          "to": "Об'єм енергоспоживання",
          "value": 37.58
        },
        {
          "from": "Об'єм енергоспоживання",
          "to": "Оптимізація використання електроенергії",
          "value": 1858.5
        },
        {
          "from": "Об'єм енергоспоживання",
          "to": "Оптимізація використання нафтопродуктів",
          "value": 924.56
        },
        {
          "from": "Об'єм енергоспоживання",
          "to": "Оптимізація використання вугілля",
          "value": 2674.65
        },
        {
          "from": "Об'єм енергоспоживання",
          "to": "Оптимізація використання природний газ",
          "value": 2411.17
        },
        {
          "from": "Об'єм енергоспоживання",
          "to": "Оптимізація використання дров",
          "value": 37.58
        },
        {
          "from": "Оптимізація використання електроенергії",
          "to": "Потенціал сонячної  енергі",
          "value": 147.398669823134
        },
        {
          "from": "Оптимізація використання електроенергії",
          "to": "Потенціал малих рік",
          "value": 69.2132884386892
        },
        {
          "from": "Оптимізація використання електроенергії",
          "to": "Теплота грунту та грунтових вод",
          "value": 328.763120083774
        },
        {
          "from": "Оптимізація використання електроенергії",
          "to": "Теплової енергії стічних вод",
          "value": 153.166443859692
        },
        {
          "from": "Оптимізація використання електроенергії",
          "to": "Вітрова енергія",
          "value": 48.0647836379786
        },
        {
          "from": "Оптимізація використання електроенергії",
          "to": "Незамінний об'єм електроенергії",
          "value": 1111.89866149191
        },
        {
          "from": "Оптимізація використання нафтопродуктів",
          "to": "Потенціал тваринницької біомаси (Паливо)",
          "value": 1301.81161382255
        },
        {
          "from": "Оптимізація використання нафтопродуктів",
          "to": "Потенціал  рослинницької біомаси (Паливо)",
          "value": 873.753680160267
        },
        {
          "from": "Оптимізація використання нафтопродуктів",
          "to": "Незамінний об'єм нафтопродуктів",
          "value": 0
        },
        {
          "from": "Оптимізація використання вугілля",
          "to": "Потенціал  рослинницької біомаси (Паливо)",
          "value": 262.12610404808
        },
        {
          "from": "Оптимізація використання вугілля",
          "to": " Торф",
          "value": 22.1738868516541
        },
        {
          "from": "Оптимізація використання вугілля",
          "to": "Незамінний об'єм вугілля",
          "value": 2390.34774134243
        },
        {
          "from": "Оптимізація використання природний газ",
          "to": "Потенціал тваринницької біомаси (Біогаз)",
          "value": 1884.52022976629
        },
        {
          "from": "Оптимізація використання природний газ",
          "to": "Потенціал геотермальної енергії",
          "value": 0
        },
        {
          "from": "Оптимізація використання природний газ",
          "to": "Потенціал надлишкового тиску доменного газу",
          "value": 0
        },
        {
          "from": "Оптимізація використання природний газ",
          "to": "Потенціал надлишкового тиску природного газу",
          "value": 24.9936874917489
        },
        {
          "from": "Оптимізація використання природний газ",
          "to": "Незамінний об'єм природного газу",
          "value": 501.656747089403
        },
        {
          "from": "Оптимізація використання дров",
          "to": "Потенціал відходів лісу",
          "value": 12.963341456017
        },
        {
          "from": "Оптимізація використання дров",
          "to": "Незамінний об'єм дров",
          "value": 24.6145802973117
        }
      ];
      
      let hoverState = chart.links.template.states.create("hover");
      hoverState.properties.fillOpacity = 0.6;

      chart.dataFields.fromName = "from";
      chart.dataFields.toName = "to";
      chart.dataFields.value = "value";

      chart.links.template.propertyFields.id = "id";
      chart.links.template.colorMode = "solid";
      chart.links.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
      chart.links.template.fillOpacity = 0.1;
      chart.links.template.tooltipText = "";

// highlight all links with the same id beginning
//       chart.links.template.events.on("over", function(event){
//         let link = event.target;
//         let id = link.id.split("-")[0];
//
//         chart.links.each(function(link){
//           if(link.id.indexOf(id) != -1){
//             link.isHover = true;
//           }
//         })
//       })

      chart.links.template.events.on("out", function(event){
        chart.links.each(function(link){
          link.isHover = false;
        })
      })

// for right-most label to fit
      chart.paddingRight = 30;

// make nodes draggable
      let nodeTemplate = chart.nodes.template;
      nodeTemplate.inert = true;
      nodeTemplate.readerTitle = "Drag me!";
      nodeTemplate.showSystemTooltip = true;
      nodeTemplate.width = 20;
      
      nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
      nodeTemplate.showSystemTooltip = true;
      nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer
      
      this.chart = chart;
    },
    beforeDestroy() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
  })
</script>