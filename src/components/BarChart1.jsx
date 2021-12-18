import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./ResponsiveBar.css";

const sample = [
  {
    genre: "Action",
    count: "64",
  },
  {
    genre: "Animation",
    count: "66",
  },
  {
    genre: "Children",
    count: "60",
  },
  {
    genre: "Classics",
    count: "57",
  },
  {
    genre: "Comedy",
    count: "58",
  },
  {
    genre: "Documentary",
    count: "68",
  },
  {
    genre: "Drama",
    count: "62",
  },
  {
    genre: "Family",
    count: "69",
  },
  {
    genre: "Foreign",
    count: "73",
  },
  {
    genre: "Games",
    count: "61",
  },
  {
    genre: "Horror",
    count: "56",
  },
  {
    genre: "Music",
    count: "51",
  },
  {
    genre: "New",
    count: "63",
  },
  {
    genre: "Sci-Fi",
    count: "61",
  },
  {
    genre: "Sports",
    count: "74",
  },
  {
    genre: "Travel",
    count: "57",
  },
];

const BarChart1 = () => {
  const d3Chart = useRef();

  // Ref for updating dimention
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Ref for resize event update
  const update = useRef(false);

  useEffect(() => {
    // Listen for any resize event update
    window.addEventListener("resize", () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // If resize, remove the previous chart
      if (update.current) {
        d3.selectAll("g").remove();
      } else {
        update.current = true;
      }
    });

    // Draw chart using the data and updated dimensions
    DrawChart(sample, dimensions);
  }, [dimensions]);

  const margin = { top: 50, right: 30, bottom: 30, left: 60 };

  function DrawChart(data, dimensions) {
    // console.log(dimensions.width, dimensions.height)

    const chartwidth =
      parseInt(d3.select("#d3demo").style("width")) -
      margin.left -
      margin.right;
    const chartheight =
      parseInt(d3.select("#d3demo").style("height")) -
      margin.top -
      margin.bottom;

    const svg = d3
      .select(d3Chart.current)
      .attr("width", chartwidth + margin.left + margin.right)
      .attr("height", chartheight + margin.top + margin.bottom);

    // x scale
    const x = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, chartwidth - margin.right])
      .padding(0.1);
    console.log(x);

    svg
      .append("g")
      .attr("transform", "translate(0," + chartheight + ")")
      .call(
        d3
          .axisBottom(x)
          .tickFormat((i) => data[i].genre)
          .tickSizeOuter(0)
      );

    const max = d3.max(data, function (d) {
      return d.count;
    });

    // y scale
    const y = d3
      .scaleLinear()
      .domain([0, max])
      .range([chartheight, margin.top]);

    svg
      .append("g")
      .attr("transform", "translate(" + margin.left + ",0)")
      .call(d3.axisLeft(y));

    // Draw bars
    svg
      .append("g")
      .attr("fill", "#65f0eb")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", (d) => y(d.count))
      .attr("height", (d) => y(0) - y(d.count))
      .attr("width", x.bandwidth());
  }

  return (
    <div id="d3demo">
      <svg ref={d3Chart}></svg>
    </div>
  );
};

export default BarChart1;
