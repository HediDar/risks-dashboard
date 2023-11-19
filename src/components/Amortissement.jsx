import { useEffect, useRef, useState } from "react";
import {
  calculateMarginLeft,
  calculateEndRange,
  calculateEndRange2,
} from "../util/calculateRanges";
import { useResizeObserver } from "../customHooks/useResizeObserver";
import * as d3 from "d3";
import d3Tip from "d3-tip";

const Amortissement = ({ data }) => {
  const mySVGRef = useRef(null);
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 30, left: 40 };
  const width = 1000 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

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

    //first y axis
    const yscale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([height - 100, 100]);

    var y_axis = d3
      .axisLeft()
      .scale(yscale)
      .tickValues(d3.range(0, yscale.domain()[1] + 1, 2))
      .tickFormat(d3.format(".1f"));
    const y_tickValues = y_axis.tickValues();

    // y axis implementation
    const yAxisGroup = svg
      .append("g")
      .call(y_axis)
      .attr("transform", `translate(${40}, 0)`)
      .style("stroke-width", 0.6);

    // Set fill color for tick labels to blue
    yAxisGroup.selectAll(".tick text").style("fill", "#0d6efd");

    // Set stroke color for tick lines to blue
    yAxisGroup.selectAll(".tick line").attr("stroke", "#0d6efd");

    // Set stroke color for axis line to blue
    yAxisGroup.select(".domain").attr("stroke", "#0d6efd");

    //second y axis
    var y_axis2 = d3
      .axisRight()
      .scale(yscale)
      .tickValues(d3.range(0, yscale.domain()[1] + 1, 2))
      .tickFormat(d3.format(".1f"));

    const yAxisGroup2 = svg
      .append("g")
      .call(y_axis2)
      .attr("transform", `translate(${dimensions.width - 120}, 0)`) //100-40
      .style("stroke-width", 0.6);

    // Set fill color for tick labels to blue
    yAxisGroup2.selectAll(".tick text").style("fill", "#90EE90");

    // Set stroke color for tick lines to blue
    yAxisGroup2.selectAll(".tick line").attr("stroke", "#90EE90");

    // Set stroke color for axis line to blue
    yAxisGroup2.select(".domain").attr("stroke", "#90EE90");

    //third y axis
    const yscale3 = d3
      .scaleLinear()
      .domain([0, 60])
      .range([height - 100, 100]);

    var y_axis3 = d3
      .axisRight()
      .scale(yscale3)
      .tickValues(d3.range(0, yscale3.domain()[1] + 1, 10))
      .tickFormat(d3.format(".1f"));

    const yAxisGroup3 = svg
      .append("g")
      .call(y_axis3)
      .attr("transform", `translate(${dimensions.width - 70}, 0)`) //100-40
      .style("stroke-width", 0.6);

    // Set fill color for tick labels to blue
    yAxisGroup3.selectAll(".tick text").style("fill", "#F9DB24");

    // Set stroke color for tick lines to blue
    yAxisGroup3.selectAll(".tick line").attr("stroke", "#F9DB24");

    // Set stroke color for axis line to blue
    yAxisGroup3.select(".domain").attr("stroke", "#F9DB24");

    //x axis definition
    const xscale = d3
      .scaleBand()
      .domain(data.map((d, i) => d.date))
      .range([50, calculateEndRange(dimensions.width - 60)])
      .padding(0.2);

    // const tickValues = [
    //   xscale.domain()[0],
    //   ...xscale.ticks(d3.timeMonth.every(6)),
    // ];

    var x_axis = d3
      .axisBottom() //axis bottom positions the numbers of the axis below the axis, so we need a y translation so that the axis are really in the botom
      .scale(xscale);
    // .tickValues(tickValues)
    // .tickFormat(d3.timeFormat("%b %Y"));

    svg
      .append("g") // add a group element that will contain our axis The <g> element is a container that groups multiple SVG elements together
      .call(x_axis)
      .attr(
        "transform",
        `translate(${0},${
          height - 100 //height -100 because we defined the end of the first y axis at height-100 also
        })`
      )
      .style("stroke-width", 0.3)
      //   //remove the x axis
      .call((g) => g.select(".domain").remove());
    // ticks vlaues' text
    svg.selectAll(".tick text").attr("fill", "#777");

    // Add y-axis title 1
    svg
      .append("text")
      .attr("x", -height / 2)
      .attr("y", 12)
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-family", "sans-serif")
      .attr("fill", "#0d6efd")
      .text("Income (thousand crores)");
    // Add y-axis title 2
    svg
      .append("g")
      .attr(
        "transform",
        `translate(${dimensions.width - 90}, ${height / 2}) rotate(-270)`
      )
      .append("text")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-family", "sans-serif")
      .style("font-weight", "bold")
      .attr("fill", "#90EE90")
      .text("Operating cash flow (thousand of crores)");

    // Add y-axis title 3
    svg
      .append("g")
      .attr(
        "transform",
        `translate(${dimensions.width - 30}, ${height / 2}) rotate(-270)`
      )
      .append("text")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-family", "sans-serif")
      .style("font-weight", "bold")
      .attr("fill", "#90EE90")
      .text("Revenue");
    //adding horizontal grids
    svg
      .selectAll("yGrid")
      .data(y_tickValues)
      .join("line")
      .attr("x1", 0)
      .attr("x2", dimensions.width - 160)
      .attr("y1", (d) => yscale(d))
      .attr("y2", (d) => yscale(d))
      .attr("transform", `translate(${40},${0})`)
      .attr("stroke", "#e0e0e0")
      .attr("stroke-width", 1);

    //adding the lines

    // const line = d3
    //   .line()
    //   .x((d) => xscale(d.date) + 40)
    //   .y((d) => yscale3(d.value3));

    // // Add the line path to the SVG element
    // svg
    //   .selectAll(".line")
    //   .data([data])
    //   .join("path")
    //   .attr("d", (value) => line(value))
    //   .attr("fill", "none")
    //   .attr("stroke", "#777");

    const lineGroup = svg.append("g").attr("transform", `translate(${0}, 0)`);

    // Define the line generator
    const lineGenerator = d3
      .line()
      .x((d) => xscale(d.date) + xscale.bandwidth() / 2) // we add the xscale.bandwidth/2 to center ou data in the correct points, since we are using scaleBand
      .y((d) => yscale3(d.value3));

    // Append the path for the line
    lineGroup
      .append("path")
      .datum(data)
      .transition()
      .duration(2000)
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", "#90EE90")
      .attr("stroke-width", 4);
    //tooltip and invisible circle for the line points

    const tooltip0 = d3Tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html((d) => {
        return `y coordinate: ${d.target["__data__"].value3} <br>date: ${d.target["__data__"].date} `;
      });
    svg.call(tooltip0);
    lineGroup
      .selectAll(".circle")
      .data(data)
      .enter()
      .append("circle")
      .on("mouseover", tooltip0.show)
      .on("mouseout", tooltip0.hide)
      .attr("class", "circle")
      .attr("cx", (d) => xscale(d.date) + xscale.bandwidth() / 2) // x-coordinate of the circle
      .attr("cy", (d) => yscale3(d.value3)) // y-coordinate of the circle
      .attr("r", 20) // radius of the circle
      .attr("opacity", 0);

    //adding the bar charts

    //////tooltip
    const tooltip = d3Tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html((d) => {
        return `y coordinate: ${d.target["__data__"].value1} <br>date: ${d.target["__data__"].date} `;
      });
    svg.call(tooltip);

    const tooltip2 = d3Tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html((d) => {
        return `y coordinate: ${d.target["__data__"].value2} <br>date: ${d.target["__data__"].date} `;
      });
    svg.call(tooltip2);

    svg
      .selectAll(".bar1")
      .data(data)
      // Show the tooltip on mouseover
      //
      .enter()
      .append("rect")
      .on("mouseover", tooltip.show)
      .on("mouseout", tooltip.hide) // Hide the tooltip on mouseo;;
      .transition()
      .duration(1000)

      .attr("class", "bar1")
      .attr("x", (d) => xscale(d.date)) // Adjust the x-coordinate
      .attr("y", (d) => yscale(d.value1))
      .attr("width", xscale.bandwidth() / 2)
      .attr("height", (d) => height - yscale(d.value1) - 100)
      .attr("fill", "#0d6efd");

    svg
      .selectAll(".bar2")
      .data(data)
      .enter()
      .append("rect")
      .on("mouseover", tooltip2.show)
      .on("mouseout", tooltip2.hide)
      .transition()
      .duration(1000)
      .attr("class", "bar2")
      .attr("x", (d) => xscale(d.date) + xscale.bandwidth() / 2) // Adjust the x-coordinate
      .attr("y", (d) => yscale(d.value2))
      .attr("width", xscale.bandwidth() / 2)
      .attr("height", (d) => height - yscale(d.value2) - 100)
      .attr("fill", "#90EE90");
  }, [data, dimensions]);

  return (
    <div className="row">
      <div className="col-lg-2"></div>
      <div
        className="col-lg-8
       chart-div"
        ref={wrapperRef}
      >
        <svg ref={mySVGRef}></svg>
      </div>
      <div className="col-lg-2"></div>
    </div>
  );
};

export default Amortissement;
