import React from "react";
import * as d3 from "d3";
import data from "../json/Records";
import { max } from "d3";
import "./BarChart.css";

const width = 960;
const height = 600;
const margin = {
  top: 20,
  right: 20,
  bottom: 100,
  left: 200,
};
const xAxisLabelOffset = 50;

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.bottom - margin.top;

const yValue = (d) => d.genre;
const xValue = (d) => d.count;

const color = d3
  .scaleSequential()
  .domain([0, d3.max(data, (d) => d.count)])
  .interpolator(d3.interpolateBlues);

const AxisLeft = ({ yScale }) =>
  yScale.domain().map((tickValue) => (
    <g key={tickValue} className="tick">
      <text
        x="-3"
        y={yScale(tickValue) + yScale.bandwidth() / 2}
        dy=".32em"
        style={{ textAnchor: "end" }}
      >
        {tickValue}
      </text>
    </g>
  ));

const AxisBottom = ({ xScale, innerHeight }) =>
  xScale.ticks().map((tickValue) => (
    <g
      className="tick"
      key={tickValue}
      transform={`translate(${xScale(tickValue)},${0})`}
    >
      <line y2={innerHeight} />
      <text style={{ textAnchor: "middle" }} dy=".71em" y={innerHeight + 3}>
        {tickValue}
      </text>
    </g>
  ));

const Marks = ({ data, xScale, yScale, xValue, yValue }) =>
  data.map((d) => (
    <rect
      // className="mark"
      fill={`${color(d.count)}`}
      key={yValue(d)}
      x={0}
      y={yScale(yValue(d))}
      width={xScale(xValue(d))}
      height={yScale.bandwidth()}
    >
      <title>{xValue(d)}</title>
    </rect>
  ));

const BarChart = () => {
  const yScale = d3
    .scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.15);

  const xScale = d3
    .scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <svg /*style={{ backgroundColor: "red" }}*/ width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          tickFormat={(n) => d3.format(".2s")(n).replace("G", "B")}
          xScale={xScale}
          innerHeight={innerHeight}
        />
        <AxisLeft yScale={yScale} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          Count
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  );
};

export default BarChart;
