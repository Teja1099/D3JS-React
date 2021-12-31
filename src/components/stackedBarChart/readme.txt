 {/* {colorScale.domain().map((v, i) => {
          return (
            <g
              transform={`translate(${margin.left},${
                ((margin.top * i) / 4) * 0
              })`}
            >
              <circle fill={colorScale(v)} r={10} />
              <text>{v}</text>
            </g>
          );
        })} */}

          const ColorLegend = () => {
    return colorScale.domain().map((v, i) => (
      <g transform={`translate(${margin.left + 30},${(margin.top * i) / 4})`}>
        <circle fill={colorScale(v)} r={10} />
        <text>{v}</text>
      </g>
    ));
  };