import "./Boids.css";
import Boid from "./Boid";
import { uid } from "uid";
import React from "react";

class Boids extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boids: [],
    };
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    let mouseIsDown = false;
  }

  componentDidMount() {
    window.addEventListener("click", this.handleMouseClick);
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mousedown", this.handleMouseDown);
    window.addEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseClick({ pageX: x, pageY: y }) {
    this.addBoid(x - 40, y - 40);
  }

  handleMouseMove({ pageX: x, pageY: y }) {
    if (!this.mouseIsDown) {
      return;
    }

    let boids = [...this.state.boids];
    boids.map((boid) => {
      const centerX = boid.x + 40;
      const centerY = boid.y + 40;
      const changeX = x - centerX;
      const changeY = y - centerY;

      // (changeX, changeY)
      //
      //           *
      //   (-, -)  *  (+, -)
      //           *
      // **********************
      //           *
      //   (-, +)  *  (+, +)
      //           *

      const deg =
        Math.atan(Math.abs(changeY) / Math.abs(changeX)) * (180 / Math.PI);
      let finalDeg;
      console.log(changeX + " " + changeY);
      if (changeX >= 0 && changeY >= 0) {
        finalDeg = deg + 90;
      } else if (changeX <= 0 && changeY >= 0) {
        finalDeg = 270 - deg;
      } else if (changeX <= 0 && changeY <= 0) {
        finalDeg = 270 + deg;
      } else if (changeX >= 0 && changeY <= 0) {
        finalDeg = 90 - deg;
      }
      boid.deg = finalDeg;

      const rad = deg * (Math.PI / 180);
      let newX = boid.x;
      let newY = boid.y;
      const speed = 20;
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
      boid.x = newX;
      boid.y = newY;
    });
    this.setState({ boids });
  }

  handleMouseDown({ pageX: x, pageY: y }) {
    this.mouseIsDown = true;
  }

  handleMouseUp({ pageX: x, pageY: y }) {
    this.mouseIsDown = false;
  }

  addBoid(x, y) {
    const key = uid();
    const deg = Math.random() * 360;
    const boids = [...this.state.boids, { key, x, y, deg }];
    this.setState({ boids });
  }

  render() {
    return (
      <>
        {this.state.boids.map((boid) => (
          <Boid
            key={boid.key}
            id={boid.key}
            x={boid.x}
            y={boid.y}
            deg={boid.deg}
          />
        ))}
      </>
    );
  }
}

export default Boids;
