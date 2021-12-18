import React from "react";
import { arc } from "d3";

export default function SmileyFace() {
  const width = 600;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;
  const strokeWidth = 10;
  const eyeOffsetX = 110;
  const eyeOffsetY = 70;
  const eyeRadius = 40;
  const mouthRadius = 180;
  const mouthWidth = 20;

  const mouthArc = arc()
    .innerRadius(mouthRadius)
    .outerRadius(mouthRadius + mouthWidth)
    .startAngle(Math.PI / 2)
    .endAngle((Math.PI * 3) / 2);

  return (
    <div>
      <svg style={{ marginTop: "20px" }} width={width} height={height}>
        <g transform={`translate(${centerX},${centerY})`}>
          <circle
            r={centerY - strokeWidth / 2}
            fill="yellow"
            stroke="black"
            stroke-width={strokeWidth}
          />
          <circle cx={-eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} />
          <circle cx={+eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} />
          <path d={mouthArc()} />
        </g>
      </svg>
    </div>
  );
}
