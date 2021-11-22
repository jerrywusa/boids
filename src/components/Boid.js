import "./Boid.css";
import { useState } from "react";
import boidArrowhead from "../images/boidArrowhead.png";
import { uid } from "uid";

function Boid(props) {
  const [rotate, setRotate] = useState(false);

  return (
    <>
      <img
        src={boidArrowhead}
        alt="boid arrowhead"
        key={uid()}
        className={"boid" + (rotate ? "-rotate" : "")}
        onClick={() => setRotate(!rotate)}
      />
    </>
  );
}

export default Boid;
