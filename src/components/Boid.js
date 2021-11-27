import "./Boid.css";
import React from "react";
import boidArrowhead from "../images/blackArrowhead.png";
import { NodeGroup } from "react-move";
import range from "lodash.range";
import { uid } from "uid";

class Boid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: Math.random() * 5300,
      y: Math.random() * 2700,
      deg: Math.random() * 360,
    };
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount() {
    window.addEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseMove({ pageX: x, pageY: y }) {
    const centerX = this.state.x + 40;
    const centerY = this.state.y + 40;
    const changeX = x - centerX;
    const changeY = y - centerY;
    const deg =
      Math.atan(Math.abs(changeY) / Math.abs(changeX)) * (180 / Math.PI);
    let finalDeg = 0;
    if (changeX >= 0 && changeY >= 0) {
      finalDeg = deg + 90;
    } else if (changeX < 0 && changeY >= 0) {
      finalDeg = 270 - deg;
    } else if (changeX < 0 && changeY < 0) {
      finalDeg = 270 + deg;
    } else if (changeX >= 0 && changeY < 0) {
      finalDeg = 90 - deg;
    }
    this.setState({ deg: finalDeg });

    const rad = deg * (Math.PI / 180);
    let newX = this.state.x;
    let newY = this.state.y;
    const speed = 30;
    if (changeX >= 0 && changeY >= 0) {
      newX += Math.cos(rad) * speed;
      newY += Math.sin(rad) * speed;
    } else if (changeX < 0 && changeY >= 0) {
      newX -= Math.cos(rad) * speed;
      newY += Math.sin(rad) * speed;
    } else if (changeX < 0 && changeY < 0) {
      newX -= Math.cos(rad) * speed;
      newY -= Math.sin(rad) * speed;
    } else if (changeX >= 0 && changeY < 0) {
      newX += Math.cos(rad) * speed;
      newY -= Math.sin(rad) * speed;
    }
    this.setState({ x: newX, y: newY });
  }

  render() {
    const numberOfBoidsPerGroup = 1;
    return (
      <>
        <NodeGroup
          data={range(numberOfBoidsPerGroup).map((d) => {
            return {
              key: uid(),
              x: this.state.x,
              y: this.state.y,
              deg: this.state.deg,
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
}

export default Boid;
