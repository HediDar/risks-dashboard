import { useEffect, useRef, useState } from "react";
import {
  calculateMarginLeft,
  calculateEndRange,
  calculateEndRange2,
} from "../util/calculateRanges";
import { useResizeObserver } from "../customHooks/useResizeObserver";
import * as d3 from "d3";
import d3Tip from "d3-tip";

const ChordDiagram = ({ data }) => {
  const mySVGRef = useRef(null);
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 30, left: 40 };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  useEffect(() => {
    var svg = d3.select(mySVGRef.current);
    if (!dimensions) return;
    //so that we dont have duplication
    svg.html(null);
    svg
      // .append("svg")
      .attr("width", dimensions.width)
      .attr("height", height + margin.top + margin.bottom);

    const container = svg
      .append("g")
      .attr(
        "transform",
        `translate(${dimensions.width / 2},${margin.top + height / 2})`
      );
    // give this matrix to d3.chord(): it will calculates all the info we need to draw arc and ribbon

    const res = d3
      .chord()
      .padAngle(0.05) // padding between entities (black arc)
      .sortSubgroups(d3.descending)(data);

    // var colors = ["#440154ff", "#31668dff", "#37b578ff", "#fde725ff"];
    const colorScale = d3
      .scaleOrdinal()
      .domain(d3.range(data.length))
      .range(["#440154ff", "#31668dff", "#37b578ff"]);
    // .range(d3.schemeCategory10);

    const tooltip = d3Tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html((d) => {
        const sourceData = d.target["__data__"].value; // Get the source data
        const targetData = data[d.target["__data__"].index]; // Get the target data
        return `Source: ${sourceData}<br>Target: ${targetData}`;
      });
    svg.call(tooltip);
    // add the groups on the inner part of the circle
    container
      .datum(res)
      .append("g")
      .selectAll("g")
      .data((d) => d.groups)
      .join("g")
      .append("path")
      .style("fill", "grey")
      .style("stroke", "black")
      .style("fill", function (d, i) {
        return colorScale(i);
      })
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(dimensions.width * 0.2)
          .outerRadius(dimensions.width * 0.21)
      )
      .on("mouseover", tooltip.show) // Show the tooltip on mouseover
      .on("mouseout", tooltip.hide); // Hide the tooltip on mouseo;

    const tooltip2 = d3Tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html((d) => {
        return `Source: link group${
          d.target["__data__"].source.index + 1
        }/group${d.target["__data__"].target.index + 1}<br>from: ${
          d.target["__data__"].source.value
        } to  ${d.target["__data__"].target.value}`;
      });
    svg.call(tooltip2);

    // Add the links between groups
    container
      .datum(res)
      .append("g")
      .selectAll("path")
      .data((d) => d)
      .join("path")
      .attr("d", d3.ribbon().radius(dimensions.width * 0.2))
      .style("fill", "#69b3a2")
      .style("stroke", "black")
      .style("fill", function (d) {
        return colorScale(d.source.index);
      })
      .on("mouseover", tooltip2.show) // Show the tooltip on mouseover
      .on("mouseout", tooltip2.hide); // Hide the tooltip on mouseo;;

    // Add the labels for the groups
    container
      .datum(res)
      .append("g")
      .selectAll("text")
      .data((d) => d.groups)
      .join("text")
      .attr("transform", function (d) {
        const angle = ((d.startAngle + d.endAngle) / 2) * (180 / Math.PI);
        const radius = dimensions.width * 0.21; // Adjust the radius based on available space
        const offset = 5; // Adjust the offset as needed

        const x = (radius + offset) * Math.cos((angle - 90) * (Math.PI / 180));
        const y = (radius + offset) * Math.sin((angle - 90) * (Math.PI / 180));
        return `translate(${x}, ${y}) rotate(${angle})`;
      })
      .text(function (d, i) {
        return `Group ${i + 1}`; // Replace with your label text based on the group
      })
      .style("text-anchor", "middle")
      .style("font-size", "12px");
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

export default ChordDiagram;
