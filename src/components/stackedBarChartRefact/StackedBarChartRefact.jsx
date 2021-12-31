import React, { useEffect, useRef, useState } from "react";
import data from "./StackedBarData.js";
import {
  axisBottom,
  axisLeft,
  max,
  range,
  scaleBand,
  scaleLinear,
  select,
  stack,
  scaleOrdinal,
  selectAll,
} from "d3";

export default function StackedBarChartRefact() {
  const stackedBarChartRef = useRef();
  const update = useRef(false);

  const groups = data.map((d) => d.group);
  const subGroups = Object.keys(data[0]).filter((d) => d !== "group");
  const stackedData = stack().keys(subGroups)(data);

  const margin = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 100,
  };
  const [chartWidth, setChartWidth] = useState(window.innerWidth);
  const [chartHeight, setChartHeight] = useState(window.innerHeight);

  const xSacle = scaleBand()
    .domain(range(groups.length))
    .range([margin.left, chartWidth - 2 * margin.right - margin.left])
    .padding(0.1);

  const yScale = scaleLinear()
    .domain([0, max(stackedData[stackedData.length - 1].map((d) => d[1]))])
    .range([chartHeight - margin.bottom - margin.top, margin.top]);

  const colorScale = scaleOrdinal()
    .domain(subGroups)
    .range(["#e41a1c", "#377eb8", "#4daf4a"]);

  const handleApiCall = (e, d) => {
    console.log("click event handled" + d[1]);
  };

  const handleResize = () => {
    const svg = select(stackedBarChartRef.current);

    const tooldiv = select("#chartArea")
      .append("div")
      .style("visibility", "hidden")
      .style("position", "absolute")
      .style("background-color", "white");

    svg
      .append("g")
      .selectAll("g")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("fill", function (d) {
        return colorScale(d.key);
      })
      .selectAll("rect")
      .data(function (d) {
        return d;
      })
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return xSacle(i);
      })
      .attr("y", function (d) {
        return yScale(d[1]);
      })
      .attr("height", function (d) {
        return yScale(d[0]) - yScale(d[1]);
      })
      .attr("width", xSacle.bandwidth())
      .on("click", (e, d) => {
        handleApiCall(e, d);
      })
      .on("mouseover", (e, d) => {
        tooldiv.style("visibility", "visible").text(`${d[1]}`);
      })
      .on("mousemove", (e, d, i) => {
        tooldiv
          .style("top", e.pageY - 25 + "px")
          .style("left", e.pageX - 25 + "px");
      })
      .on("mouseout", () => {
        tooldiv.style("visibility", "hidden");
      });

    svg
      .append("g")
      .attr("transform", `translate(0,${chartHeight - 2 * margin.bottom})`)
      .call(
        axisBottom(xSacle)
          .tickFormat((i) => groups[i])
          .tickSizeOuter(0)
      );

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(axisLeft(yScale));
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setChartHeight(window.innerHeight);
      setChartWidth(window.innerWidth);
    });

    if (update) {
      selectAll("g").remove();
    } else {
      update.current = true;
    }
    handleResize();
  }, [chartHeight, chartWidth, update]);

  return (
    <div id="chartArea">
      <svg
        width={chartWidth}
        height={chartHeight}
        style={{ backgroundColor: "white" }}
        ref={stackedBarChartRef}
      >
        <text
          x={margin.left}
          y={(margin.top * 3) / 4}
          fill={colorScale("Nitrogen")}
        >
          Nitrogen
        </text>
        <text
          x={margin.left}
          y={(margin.top * 1) / 4}
          fill={colorScale("stress")}
        >
          Stress
        </text>
        <text
          x={margin.left}
          y={(margin.top * 2) / 4}
          fill={colorScale("normal")}
        >
          Normal
        </text>
      </svg>
    </div>
  );
}
