import "./Boids.css";
import Boid from "./Boid";

function Boids(props) {
  const numberOfBoids = 112;
  const boidsList = Array.from(Array(numberOfBoids).keys()).map((i) => (
    <Boid />
  ));

  return <>{boidsList}</>;
}

export default Boids;
