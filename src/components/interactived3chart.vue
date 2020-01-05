<template>
    <div class="interactive-chart" v-bind:id="diagramId">
    </div>
</template>

<style>
    /**
     * The default size is 600px×400px, for responsive charts
     * you may need to set percentage values as follows (also
     * don't forget to provide a size for the container).
     */
    .interactive-chart {
        width: 1000px;
        height: 700px;
        font: 13px sans-serif;
    }
    body {
        padding: 10px;
        min-width: 600px;
        max-width: 1200px;
        margin: auto;
    }
    .node rect {
        fill-opacity: .9;
        shape-rendering: crispEdges;
        stroke-width: 0;
    }
    .node text {
        text-shadow: 0 1px 0 #fff;
    }
    .link {
        fill: none;
        stroke: #000;
        stroke-opacity: .2;
    }
</style>

<script>
  import Vue from 'vue';
  import * as d3latest from 'd3latest'
  import * as d3 from 'd3'
  import * as Sankey from 'd3.chart.sankey'

  var colors = {
    'environment':         '#edbd00',
    'social':              '#367d85',
    'animals':             '#97ba4c',
    'health':              '#f5662b',
    'research_ingredient': '#3f3e47',
    'fallback':            '#9f9fa3'
  };

  function label(node) {
    return node.name.replace(/\s*\(.*?\)$/, '');
  }
  function color(node, depth) {
    var id = node.id.replace(/(_score)?(_\d+)?$/, '');
    if (colors[id]) {
      return colors[id];
    } else if (depth > 0 && node.targetLinks && node.targetLinks.length == 1) {
      return color(node.targetLinks[0].source, depth-1);
    } else {
      return null;
    }
  }

  const randomId = () => `f${(~~(Math.random()*1e8)).toString(16)}`;

  export default Vue.extend({
    name: 'interactive-d3-chart',
    props: ['chartData'],
    data() {
      return {
        diagramId: `interactived3sankey${randomId()}`
      }
    },
    mounted() {
      let svg = d3.select(`#${this.diagramId}`).append("svg");
      let chart = new Sankey.Path(svg);
      chart
        .name(label)
        .colorNodes(function(name, node) {
          return color(node, 1) || colors.fallback;
        })
        .colorLinks(function(link) {
          return color(link.source, 4) || color(link.target, 1) || colors.fallback;
        })
        .nodeWidth(15)
        .nodePadding(10)
        .spread(true)
        .iterations(0)
        .draw(this.chartData);
    }
  })
</script>