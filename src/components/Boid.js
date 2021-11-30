import "./Boid.css";
import React from "react";
import boidArrowhead from "../images/blackArrowhead.png";
import { NodeGroup } from "react-move";
import range from "lodash.range";

export default function Boids({ id, x, y, deg }) {
  return (
    <>
      <NodeGroup
        data={range(1).map((d) => {
          return {
            key: id,
            x: x,
            y: y,
            deg: deg,
          };
        })}
        keyAccessor={(d) => d.key}
        start={(data) => {
          return {
            x: data.x,
            y: data.y,
            deg: data.deg,
          };
        }}
        update={(data) => {
          return {
            x: [data.x],
            y: [data.y],
            deg: [data.deg],
          };
        }}
      >
        {(nodes) => (
          <>
            {nodes.map(({ key, data, state: { x, y, deg } }) => (
              <img
                className="boid"
                src={boidArrowhead}
                alt="boid arrowhead"
                key={key}
                style={{
                  transform: `translate(${x}px, ${y}px) rotate(${deg}deg)`,
                }}
              />
            ))}
          </>
        )}
      </NodeGroup>
    </>
  );
}
