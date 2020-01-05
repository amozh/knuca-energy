<template>
    <div class="chart" id="d3sankeydiagram">
    </div>
</template>

<style>
    /**
     * The default size is 600px×400px, for responsive charts
     * you may need to set percentage values as follows (also
     * don't forget to provide a size for the container).
     */
    .chart {
        width: 1000px;
        height: 700px;
    }
</style>

<script>
  import Vue from 'vue';
  import * as d3orig from 'd3latest'
  import * as d3 from 'd3-sankey'
  import { SankeyData } from "@/components/sankeyData.ts";

  const format = (() => {
    const f = d3orig.format(",.0f");
    return d => `${f(d)} TWh`;
  })();

  const color = (() => {
    const color = d3orig.scaleOrdinal(d3orig.schemeCategory10);
    return name => color(name.replace(/ .*/, ""));
  })();

  const data = (() => {
    const links = d3orig.csvParse(SankeyData, d3orig.autoType);
    const nodes = Array.from(new Set(links.flatMap(l => [l.source, l.target])), name => ({name}));
    return {nodes, links};
  })();

  const width = 700;
  const height = 400;

  const edgeColor = 'path'//'input' 'output' 'none'
  const align = "justify"// 'left' 'right' 'center'

  const sankey = (() => {
    const sankey = d3.sankey()
      .nodeId(d => d.name)
      .nodeAlign(d3[`sankey${align[0].toUpperCase()}${align.slice(1)}`])
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 5], [width - 1, height - 5]]);
    return ({nodes, links}) => sankey({
      nodes: nodes.map(d => Object.assign({}, d)),
      links: links.map(d => Object.assign({}, d))
    });
  })();

  let uidCounter = data.links.length;

  const uid = (() => {
    function uid(id) {
      this.id = id;
      this.href = new URL(`#${id}`, location) + "";
    }

    uid.prototype.toString = function() {
      return "url(" + this.href + ")";
    };
    return function(name) {
      return new uid("O-" + (name == null ? "" : name + "-") + ++uidCounter);
    }
  })();

  export default Vue.extend({
    name: 'd3-chart',
    props: ["tweetData"],
    data() {
      return {
      };
    },
    mounted() {
      const chart = () => {
        const svg = d3orig.select("#d3sankeydiagram").append("svg")
            .attr("viewBox", [0, 0, 700, 450]);

        const {nodes, links} = sankey(data);

        svg.append("g")
          .attr("stroke", "#000")
          .selectAll("rect")
          .data(nodes)
          .join("rect")
          .attr("x", d => d.x0)
          .attr("y", d => d.y0)
          .attr("height", d => d.y1 - d.y0)
          .attr("width", d => d.x1 - d.x0)
          .attr("fill", d => color(d.name))
          .append("title")
          .text(d => `${d.name}\n${format(d.value)}`);

        const link = svg.append("g")
          .attr("fill", "none")
          .attr("stroke-opacity", 0.5)
          .selectAll("g")
          .data(links)
          .join("g")
          .style("mix-blend-mode", "multiply");

        if (edgeColor === "path") {
          const gradient = link.append("linearGradient")
            .attr("id", d => (d.uid = uid("link")).id)
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", d => d.source.x1)
            .attr("x2", d => d.target.x0);

          gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", d => color(d.source.name));

          gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d => color(d.target.name));
        }

        link.append("path")
          .attr("d", d3.sankeyLinkHorizontal())
          .attr("stroke", d => edgeColor === "none" ? "#aaa"
            : edgeColor === "path" ? d.uid
              : edgeColor === "input" ? color(d.source.name)
                : color(d.target.name))
          .attr("stroke-width", d => Math.max(1, d.width));

        link.append("title")
          .text(d => `${d.source.name} → ${d.target.name}\n${format(d.value)}`);

        svg.append("g")
          .style("font", "10px sans-serif")
          .selectAll("text")
          .data(nodes)
          .join("text")
          .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
          .attr("y", d => (d.y1 + d.y0) / 2)
          .attr("dy", "0.35em")
          .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
          .text(d => d.name);

        return svg.node();
      }

      chart()
    },
    created() {

    },
    methods: {
      packChart() {

      }
    },
    computed: {
      // packData() {
      //
      // },
      // output() {
      //   return this.packChart();
      // }
    }
  })
</script>