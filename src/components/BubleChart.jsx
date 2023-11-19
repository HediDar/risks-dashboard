import { useEffect, useRef, useState } from "react";
import { calculateEndRange } from "../util/calculateRanges";
import { calculateMarginLeft } from "../util/calculateRanges";
import { useResizeObserver } from "../customHooks/useResizeObserver";
import * as d3 from "d3";
import d3Tip from "d3-tip";

const BubleChart = ({ data }) => {
  const mySVGRef = useRef(null);
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const myTooltipRef = useRef(null);

  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

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
      .scaleLinear()
      .domain([0, 100])
      .range([0, calculateEndRange(dimensions.width)]);

    const x_axis = d3
      .axisBottom() //axis bottom positions the numbers of the axis below the axis, so we need a y translation so that the axis are really in the botom
      .scale(xscale)
      .tickValues(d3.range(0, xscale.domain()[1] + 1, 25));
    const x_tickValues = x_axis.tickValues();

    //  y axis definition
    const yscale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top]);

    var y_axis = d3
      .axisLeft() //axis bottom positions the numbers of the axis below the axis, so we need a y translation so that the axis are really in the botom
      .scale(yscale)
      .tickValues(d3.range(0, yscale.domain()[1] + 1, 25));
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
    svg
      .selectAll("xGrid")
      .data(x_tickValues)
      .join("line")
      .attr("x1", (d) => xscale(d))
      .attr("x2", (d) => xscale(d))
      .attr("y1", margin.top)
      .attr("y2", height - 30)
      .attr("transform", `translate(${calculateMarginLeft(margin.left)},${0})`)
      .attr("stroke", "#e0e0e0")
      .attr("stroke-width", 0.5);

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

    //create the tooltip

    // const tooltip = d3.select("body").append("div").attr("class", "tooltip");
    const tooltip0 = d3Tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html((d) => {
        return `x coordinate: ${d.target["__data__"].x} <br>y coordinates: ${d.target["__data__"].y}<br>radius: ${d.target["__data__"].r} `;
      });
    svg.call(tooltip0);
    //adding the circles
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .on("mouseover", tooltip0.show)
      .on("mouseout", tooltip0.hide)
      // .on("mouseenter", (event, d) => {
      //   tooltip
      //     .style("display", "block")
      //     .style("left", `${xscale(d["x"]) + margin.left * 4}px`) //the aditions are caused by the translations of my graph
      //     .style("top", `${yscale(d["y"]) + height - margin.bottom}px`)
      //     .html(
      //       `<strong>x coordinate:</strong> ${d["x"]}<br>
      //     <strong>y coordinate:</strong> ${d["y"]}<br>
      //     <strong>radius:</strong> ${d["r"]}
      //     `
      //     )
      //     .style("opacity", 0.7);
      // })
      // .on("mouseout", function (event, d) {
      //   tooltip.style("display", "none");
      // })
      .transition()
      .duration(1500)
      .attr("cx", (d) => {
        return xscale(d["x"]);
      })
      .attr("class", "pointCircleInvisible")

      //same must be done for the y scale
      .attr("cy", (d) => yscale(d["y"]))
      .attr("r", (d) => d["r"])
      .attr("fill", (d) => d["color"])
      .attr("transform", `translate(${calculateMarginLeft(margin.left)},${0})`)
      .attr("opacity", "0.5");
    //add legends
    // svg
    //   .append("circle")
    //   .attr("r", 10)
    //   .attr("class", "legendCircle")
    //   .attr("cx", xscale(50))
    //   .attr("cy", yscale(0) + 35)
    //   .attr("transform", `translate(${calculateMarginLeft(margin.left)},${0})`)
    //   .attr("fill", "blue")
    //   .attr("opacity", 0.5);

    // svg
    //   .append("text")
    //   .attr("text-anchor", "middle")
    //   .attr("alignment-baseline", "middle")
    //   .text((d) => {
    //     return "First legend";
    //   })
    //   .style("fill", "black")
    //   .attr("x", xscale(50 + 17))
    //   .attr("y", yscale(0) + 35);

    // svg
    //   .append("circle")
    //   .attr("r", 10)
    //   .attr("class", "legendCircle")
    //   .attr("cx", xscale(50))
    //   .attr("cy", yscale(0) + 60)
    //   .attr("transform", `translate(${calculateMarginLeft(margin.left)},${0})`)
    //   .attr("fill", "green")
    //   .attr("opacity", 0.5);

    // svg
    //   .append("text")
    //   .attr("text-anchor", "middle")
    //   .attr("alignment-baseline", "middle")
    //   .text((d) => {
    //     return "second legend";
    //   })
    //   .style("fill", "black")
    //   .attr("x", xscale(50 + 17))
    //   .attr("y", yscale(0) + 60);
  }, [data, dimensions]);

  return (
    <div className="row">
      <div className="col-lg-1"></div>
      <div className="col-lg-10 chart-div" ref={wrapperRef}>
        <svg ref={mySVGRef}></svg>
        <div ref={myTooltipRef}></div>
      </div>
      <div className="col-lg-1"></div>
    </div>
  );
};

export default BubleChart;
