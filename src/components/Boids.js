import "./Boids.css";
import Boid from "./Boid";
import range from "lodash.range";
import { uid } from "uid";

export default function Boids(props) {
  const numberOfBoids = 1;
  return (
    <>
      {range(numberOfBoids).map((d) => (
        <Boid key={uid()} />
      ))}
    </>
  );
}
