import {
  csv,
  select,
  axisBottom,
  scaleBand,
  scaleOrdinal,
  scaleLinear,
  stack,
  axisLeft,
} from "d3";
import reactDimensions from "react-dimensions";
import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";

const bar = [
  { group: "banana", Nitrogen: 12, normal: 1, stress: 13 },
  { group: "poacee", Nitrogen: 6, normal: 6, stress: 33 },
  { group: "sorgho", Nitrogen: 11, normal: 28, stress: 12 },
  { group: "triticum", Nitrogen: 19, normal: 6, stress: 1 },
];

export default function StackedBarChart() {
  const [data, setData] = useState(bar);

  let t = Object.keys(bar[0]);
  t = t.filter((e) => e != "group");

  const [subGroups, setSubGroups] = useState(t);

  const [groups, setGroups] = useState(bar.map((d) => d.group));

  const margin = { top: 100, right: 30, bottom: 50, left: 50 };
  const [width, setWidth] = useState(600 - margin.left - margin.right);
  const [height, setHeight] = useState(600 - margin.top - margin.bottom);

  const fetchData = async () => {
    const res = csv(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv"
    );
    return await res;
  };

  const x = scaleBand().domain(groups).range([0, width]).padding([0.2]);
  const y = scaleLinear().domain([0, 60]).range([height, 0]);
  const color = scaleOrdinal()
    .domain(subGroups)
    .range(["#e41a1c", "#377eb8", "#4daf4a"]);
  const stackedData = stack().keys(subGroups)(bar);
  console.log(stackedData);
  console.log(subGroups);
  console.log(bar);

  useEffect(() => {
    // Listen for any resize event update
    console.log(reactDimensions.toString());
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth - margin.left - margin.right - 400);
      setHeight(window.innerHeight - margin.top - margin.bottom);

      // If resize, remove the previous chart
      // if (update.current) {
      //   d3.selectAll("g").remove();
      // } else {
      //   update.current = true;
      // }
    });

    // Draw chart using the data and updated dimensions
  }, [width, height]);

  //   useEffect(() => {
  //     const promise = fetchData();
  //     promise.then((res) => {
  //       setData(res);
  //       setGroups(res.map((d) => d.group));
  //       setSubGroups(
  //         res.map((d) => {
  //           const o = {
  //             Nitrogen: d.Nitrogen,
  //             normal: d.normal,
  //             stress: d.stress,
  //           };
  //           return o;
  //         })
  //       );
  //     });
  //   }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <svg
            id="my_dataviz"
            // style={{ backgroundColor: "red" }}
            width={width + margin.right + margin.left}
            height={height + margin.top + margin.bottom}
          >
            <text x={margin.left} y={margin.top / 4}>
              Nitogen
            </text>
            <text x={margin.left} y={(margin.top * 2) / 4}>
              Normal
              <span className=" badge rounded-pill bg-danger">99+</span>
            </text>
            <text x={margin.left} y={(margin.top * 3) / 4}>
              Stress<div className="badge rounded-pill bg-danger"> new</div>
            </text>
            <g transform={`translate(${margin.left},${margin.top})`}>
              {stackedData.map((t) => {
                return (
                  <g key={t.key} fill={color(t.key)}>
                    {t.map((d) => {
                      // console.log(d);
                      return (
                        <rect
                          key={`${d[0]}&${d[1]}`}
                          x={x(d.data.group)}
                          y={y(d[1])}
                          width={x.bandwidth()}
                          height={y(d[0]) - y(d[1])}
                        >
                          <title>
                            {t.key + "\n"}
                            {d[1]}
                          </title>
                        </rect>
                      );
                    })}
                  </g>
                );
              })}
              {x.domain().map((tickValue) => (
                <g key={tickValue} className="tick">
                  <text
                    x={x(tickValue) + x.bandwidth() / 2}
                    dy=".71em"
                    y={height + margin.bottom / 2}
                    style={{ textAnchor: "middle" }}
                  >
                    {tickValue}
                  </text>
                </g>
              ))}
              {y.ticks().map((tickValue) => (
                <g
                  className="tick"
                  key={tickValue}
                  transform={`translate(${0},${y(tickValue)})`}
                >
                  <line x1={x.bandwidth() / 4} x2={width - x.bandwidth() / 4} />
                  <text style={{ textAnchor: "end" }} dy=".32em" x={width + 3}>
                    {tickValue}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </Col>
      </Row>
    </Container>
  );
}
