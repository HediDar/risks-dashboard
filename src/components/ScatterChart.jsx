import { useEffect, useRef, useState } from "react";
import {
  calculateMarginLeft,
  calculateEndRange,
  calculateEndRange2,
} from "../util/calculateRanges";
import { useResizeObserver } from "../customHooks/useResizeObserver";
import * as d3 from "d3";

const ScatterChart = ({ data }) => {
  const mySVGRef = useRef(null);
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 30, left: 40 },
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  useEffect(() => {
    var svg = d3.select(mySVGRef.current);

    if (!dimensions) return;
    //so that we dont have duplication
    svg.html(null);
    svg
      // .append("svg")
      .attr("width", dimensions.width)
      .attr("height", height + margin.top + margin.bottom)
      .attr("transform", `translate(${0},${margin.top * 3})`);

    //x axis definition
    const xscale = d3
      .scaleTime()
      .domain(d3.extent(data.map((d, i) => d.date)))
      .range([100, calculateEndRange(dimensions.width) - 100]);

    const tickValues = [
      xscale.domain()[0],
      ...xscale.ticks(d3.timeMonth.every(6)),
    ];

    var x_axis = d3
      .axisBottom() //axis bottom positions the numbers of the axis below the axis, so we need a y translation so that the axis are really in the botom
      .scale(xscale)
      .tickValues(tickValues)
      .tickFormat(d3.timeFormat("%b %Y"));

    // const x_axis = d3
    //   .axisBottom() //axis bottom positions the numbers of the axis below the axis, so we need a y translation so that the axis are really in the botom
    //   .scale(xscale)
    //   .tickValues(d3.range(0, xscale.domain()[1] + 1, 25));

    //  y axis definition
    const yscale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top]);

    var y_axis = d3
      .axisLeft() //axis bottom positions the numbers of the axis below the axis, so we need a y translation so that the axis are really in the botom
      .scale(yscale)
      .tickValues(d3.range(0, yscale.domain()[1] + 1, 20));
    const y_tickValues = y_axis.tickValues();
    //   .ticks((d3.max(data, (d) => d.population) - 65000) / 5000)
    // y axis implementation
    svg
      .append("g") // add a group element that will contain our axis The <g> element is a container that groups multiple SVG elements together
      .call(y_axis)
      .attr("transform", `translate(${calculateMarginLeft(margin.left)},${0})`)
      .style("stroke-width", 0.3)
      //   //remove the y axis
      .call((g) => g.select(".domain").remove());
    // ticks vlaues' text
    svg.selectAll(".tick text").attr("fill", "#777");

    svg
      .append("g") // add a group element that will contain our axis The <g> element is a container that groups multiple SVG elements together
      .call(x_axis)
      .attr(
        "transform",
        `translate(${calculateMarginLeft(margin.left)},${
          height - margin.bottom
        })`
      )
      .style("stroke-width", 0.3)
      //   //remove the x axis
      .call((g) => g.select(".domain").remove());
    // ticks vlaues' text
    svg.selectAll(".tick text").attr("fill", "#777");

    //adding vertical grids

    //adding horizontal grids
    svg
      .selectAll("yGrid")
      .data(y_tickValues)
      .join("line")
      .attr("x1", 0)
      .attr("x2", calculateEndRange(dimensions.width))
      .attr("y1", (d) => yscale(d))
      .attr("y2", (d) => yscale(d))
      .attr("transform", `translate(${calculateMarginLeft(margin.left)},${0})`)
      .attr("stroke", "#e0e0e0")
      .attr("stroke-width", 0.5);

    data.forEach((element, i) => {
      var data_sorted = element.data.sort(d3.ascending);
      var q1 = d3.quantile(data_sorted, 0.25);
      var median = d3.quantile(data_sorted, 0.5);
      var q3 = d3.quantile(data_sorted, 0.75);
      var interQuantileRange = q3 - q1;
      var min = data_sorted[0];
      var max = data_sorted[element.data.length - 1];
      svg
        .append("rect")
        .transition()
        .duration(1000)
        .attr("y", yscale(q3))
        .attr("x", xscale(element.date) + 40)
        .attr("height", ((q3 - median) / 100) * (height - margin.bottom)) //100 is the limit of the yscale
        .attr("width", 130)
        .attr("opacity", 1)
        // green
        .style("fill", "#90EE90");

      svg
        .append("rect")
        .transition()
        .duration(1000)
        .attr("y", yscale(median))
        .attr("x", xscale(element.date) + 40)
        .attr("height", ((median - q1) / 100) * (height - margin.bottom)) //100 is the limit of the yscale
        .attr("width", 130)
        .attr("opacity", 1)
        // blue
        .style("fill", "#3380f3");
      //add vertical lines
      svg
        .append("line")
        .transition()
        .duration(1500)
        .attr("x1", xscale(element.date) + (40 + 130 / 2))
        .attr("y1", yscale(q3))
        .attr("x2", xscale(element.date) + (40 + 130 / 2))
        .attr("y2", yscale(max))
        .attr("stroke", "#808080");
      //add vertical lines
      svg
        .append("line")
        .transition()
        .duration(1500)
        .attr("x1", xscale(element.date) + (40 + 130 / 2))
        .attr("y1", yscale(min))
        .attr("x2", xscale(element.date) + (40 + 130 / 2))
        .attr("y2", yscale(q1))
        .attr("stroke", "#808080");
      //add horizontal lines
      svg
        .append("line")
        .transition()
        .duration(1500)
        .attr("x1", xscale(element.date) + 40)
        .attr("y1", yscale(max))
        .attr("x2", xscale(element.date) + (40 + 130))
        .attr("y2", yscale(max))
        .attr("stroke", "#808080");

        svg
        .append("line")
        .transition()
        .duration(1500)
        .attr("x1", xscale(element.date) + 40)
        .attr("y1", yscale(min))
        .attr("x2", xscale(element.date) + (40 + 130))
        .attr("y2", yscale(min))
        .attr("stroke", "#808080");
    });
  }, [data, dimensions]);

  return (
    <div className="row">
      <div className="col-lg-1"></div>
      <div className="col-lg-10 chart-div" ref={wrapperRef}>
        <svg ref={mySVGRef}></svg>
      </div>
      <div className="col-lg-1"></div>
    </div>
  );
};

export default ScatterChart;
