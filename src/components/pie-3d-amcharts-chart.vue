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
  
  am4core.useTheme(am4themes_animated);

  export default Vue.extend({
    name: 'pie-3d-amcharts-chart',
    props: ['title'],
    mounted() {
      let chart = am4core.create(this.$refs.chartdiv, am4charts.PieChart3D);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      let colorSetIdx = -1;
      const getNextColor = (colorSet) =>  {
        if (colorSetIdx >= colorSet.length) {
          colorSetIdx = 0;
        } else {
          colorSetIdx++;
        }
        colorSet[colorSetIdx];
      };
      const colors = {
        "Природний газ": {
          base: "#d48264",
          colorSet: [
            "#f3b42e",
            "#b3b15a",
            "#d45f63",
            "#b390a1",
            "#856c3f",
            "#8a480f"
          ],
          data: [
            {
              country: "Природний газ",
              litres: 2040.13,
              pulled: true
            },
            {
              country: "Потенціал тваринницької біомаси (Біогаз)",
              litres: 1679.92
            },
            {
              country: "Потенціал геотермальної енергії",
              litres: 0
            },
            {
              country: "Потенціал надлишкового тиску доменного газу",
              litres: 0
            },
            {
              country: "Потенціал надлишкового тиску природного газу",
              litres: 9.98,
            }
          ]
        },
        "Електроенергія": {
          base: "#609fa8",
          colorSet: [
            "#00c5cd",
            "#62dff0",
            "#a8c6fc",
            "#68a7fc",
            "#0d8cfc"
          ],
          data: [
            {
              country: "Електроенергія",
              litres: 1545.40,
              pulled: true
            },
            {
              country: "Потенціал сонячної  енергі",
              litres: 154.54
            },
            {
              country: "Теплота грунту та грунтових вод",
              litres: 280.10
            },
            {
              country: "Потенціал малих рік",
              litres: 69.21
            },
            {
              country: "Вітрова енергія",
              litres: 72.44,
            },
            {
              country: "Теплової енергії стічних вод",
              litres: 139.09
            },
          ]
        },
        "Нафтопродукти": {
          base: "#c35957",
          colorSet: [
            "#d8584a",
            "#de5885",
            "#de3d00"
          ],
          data: [{
            country: "Нафтопродукти",
            litres: 912.87,
            pulled: true
          },
            {
              country: "Потенціал тваринницької біомаси (Паливо)",
              litres: 1161.25
            },
            {
              country: "Потенціал рослинницької біомаси (Паливо)",
              litres: 110.11
            },
          ]
        },
        "Вугілля": {
          base: "#4f6e81",
          colorSet: [
            "#6c9bbb",
            "#726fb3",
            "#80bbbc"
          ],
          data: [{
            country: "Вугілля",
            litres: 149.01,
            pulled: true
          },
            {
              country: "Потенціал тваринницької біомаси (Паливо)",
              litres: 33.03
            },
            {
              country: "Торф",
              litres: 735.80
            },
          ]
        },
        "Дрова": {
          base: "#91c7ae",
          colorSet: [
            "#75a289",
            "#5dc769",
            "#5bc3c7",
            "#88c76b",
            "#26b070",
            "#82ab26"
          ],
          data: [{
            country: "Дрова",
            litres: 82.90,
            pulled: true
          },
            {
              country: "Потенціал відходів лісу",
              litres: 41.83
            }
          ]
        }
      };
      
      const data = colors[this.title].data;
      
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
      
      // const coloredData = data.map((elem, idx) => {
      //   const isBase = baseDataPoint.country === elem.country;
      //   if (isBase) {
      //     elem.color = am4core.color(baseColor);
      //   } else {
      //     elem.color = am4core.color(colorSet[idx]);
      //   }
      //   return elem;
      // });
      
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