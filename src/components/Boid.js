import "./Boid.css";
import { useState } from "react";
import boidArrowhead from "../images/boidArrowhead.png";
import { NodeGroup } from "react-move";
import range from "lodash.range";
import { uid } from "uid";

export default function Boid(props) {
  const [location, setLocation] = useState([0, 0]);

  return (
    <>
      <NodeGroup
        data={range(1).map((d) => {
          return {
            key: uid(),
            x: location[0],
            y: location[1],
          };
        })}
        keyAccessor={(d) => d.key}
        start={(data) => {
          return {
            x: data.x,
            y: data.y,
          };
        }}
        update={(data) => {
          return {
            x: [data.x],
            y: [data.y],
          };
        }}
      >
        {(nodes) => (
          <>
            {nodes.map(({ key, data, state: { x, y } }) => (
              <img
                className="boid"
                src={boidArrowhead}
                alt="boid arrowhead"
                key={key}
                style={{
                  transform: `scale(0.1) translate(${x - 3800}px, ${
                    y - 4000
                  }px)`,
                }}
              />
            ))}
          </>
        )}
      </NodeGroup>
    </>
  );
}
