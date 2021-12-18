import React, { useState, useCallback } from "react";

export default function OnMouseMoveChangeEvent() {
  const initialMousePosition = {
    x: 50,
    y: 100,
  };

  const [mousePosition, setMousePosition] = useState(initialMousePosition);
  const handleMouseMove = useCallback(
    (event) => {
      console.log("hi");
      setMousePosition({ x: event.clientX, y: event.clientY });
    },
    [setMousePosition]
  );

  return (
    <div>
      <svg width={1000} height={500} onMouseMove={handleMouseMove}>
        <circle cx={mousePosition.x} cy={mousePosition.y} r={20} />
      </svg>
    </div>
  );
}
