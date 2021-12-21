import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { pie } from "d3";

export default function PieChart() {
  const [data, setData] = useState(null);
  const width = 600;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;

  const csvUrl =
    "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";

  //   const fetchData = async () => {
  //     const temp = await d3
  //       .csv(csvUrl)
  //       .then((res) => {
  //         return res;
  //       })
  //       .then(setData(temp));
  //   };

  useEffect(() => {
    d3.csv(csvUrl).then(setData);
  }, []);
  const pieArc = d3.arc().innerRadius(0).outerRadius(width);
  // console.log(data);
  if (!data) {
    return <pre>"Loading..."</pre>;
  }

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX},${centerY})`}>
        {pie()
          .value(1)(data)
          .map((d) => (
            <path
              key={d.data["Specification"]}
              fill={d.data["RGB hex value"]}
              d={pieArc(d)}
            />
          ))}
        {/* {data.map((d, i) => (
          <path
            fill={d["RGB hex value"]}
            d={pieArc({
              startAngle: (i / data.length) * 2 * Math.PI,
              endAngle: ((i + 1) / data.length) * 2 * Math.PI,
            })}
          />
        ))} */}
      </g>
    </svg>
  );
}
