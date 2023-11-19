import { useEffect, useRef, useState } from "react";
import {
  calculateMarginLeft,
  calculateEndRange,
  calculateEndRange2,
} from "../util/calculateRanges";
import { useResizeObserver } from "../customHooks/useResizeObserver";
import * as d3 from "d3";
import d3Tip from "d3-tip";

const Transfert = ({ data }) => {
  const mySVGRef = useRef(null);
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const colors = ["#0d6efd", "#90EE90"];
  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 30, left: 40 };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  useEffect(() => {
    if (!dimensions) {
      return;
    }
    const svg = d3.select(mySVGRef.current);

    svg
      // .append("svg")
      .attr("width", dimensions.width)
      .attr("height", height + margin.top + margin.bottom)
      .attr("transform", `translate(${0},${margin.top * 3})`);

    // Set the dimensions and center of the chart
    // const width = svg.attr("width");
    // const height = svg.attr("height");
    const radius = Math.min(dimensions.width, height) * 0.4;
    const centerX = dimensions.width / 2;
    const centerY = height / 2;

    // Create a pie generator
    const pie = d3.pie().value((d) => d.value);

    // Create an arc generator for the donut chart
    const arc = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.9);

    // Create the donut chart
    const chart = svg
      .append("g")
      .attr("transform", `translate(${centerX}, ${centerY})`);

    // Generate the arcs based on the data
    const arcs = chart
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");
    // Create the path elements for each arc
    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => colors[i]);

    // Add text labels to the arcs
    arcs
      .append("text")
      .transition()
      .duration(2000)
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("fill", "white")
      .text((d) => d.value);

    arcs
      .append("text")
      .attr("id", "valueLabel")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("y", "-20")
      .text("Total risk")
      .style("fill", "#000000")
      .style("font-weight", "normal");

    arcs
      .append("text")
      .attr("id", "valueLabel2")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("y", "10")
      .text("Costs")
      .style("fill", "#000000")
      .style("font-weight", "bold");

    // Add legends
    const legendGroup = svg
      .append("g")
      .attr(
        "transform",
        `translate(${centerX}, ${centerY + radius * 1.2 - 20})`
      ); // Position the legend group below the pie chart

    const legends = legendGroup
      .selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(0, ${i * 30})`);

    legends
      .append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", (d, i) => colors[i]);

    legends
      .append("text")
      .attr("x", 30)
      .attr("y", 10)
      .text((d) => d.label)
      .attr("fill", "black");
  }, [data, dimensions]);

  return (
    <div className="row">
      <div className="col-lg-2"></div>
      <div
        className="col-lg-8 d-flex justify-content-center
       chart-div"
        ref={wrapperRef}
      >
        <svg ref={mySVGRef}></svg>
      </div>
      <div className="col-lg-2"></div>
    </div>
  );
};

export default Transfert;
