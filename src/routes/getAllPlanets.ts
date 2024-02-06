import { getAllPlanets } from '@handlers/planetHandler';

const getPlanetNames = (_: ExpressRequest, res: ExpressResponse) => {
  console.log('Endpoint reached');
  const planets = getAllPlanets();
  console.log(planets);
  const names = planets.map((planet) => planet.name);
  console.log(names);

  if (names) {
    return res.status(200).send(names);
  }

  res.status(404).send();
};

export default getPlanetNames;
