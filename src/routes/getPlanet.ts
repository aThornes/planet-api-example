import { getPlanetById } from "@handlers/planetHandler";

/* Task - Improvements
  > Response validation (using schemas)
 */

const getPlanet = (req: ExpressRequest, res: ExpressResponse) => {
  
  const id = req.params?.id;

  if (!id) {
    return res.status(400).send({ error: "ID must be provided" });
  }

  const planet = getPlanetById(id);

  if (planet) {
    return res.status(200).send(planet);
  }

  res.status(404).send();
};

export default getPlanet;
