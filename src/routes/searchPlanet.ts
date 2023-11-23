import { searchStoredPlanets } from "@handlers/planetHandler";

/* Task - Improvements
  > Body validation (using schemas)
  > Response validation (schemas)
 */

const searchPlanet = (req: ExpressRequest, res: ExpressResponse) => {
  const body = req.body;

  const { name, classification, minDistance, maxDistance, minMass, maxMass } =
    body;

  /* In practise a schema check should be used rather than a basic check like this */
  if (
    !name &&
    !classification &&
    !minDistance &&
    !maxDistance &&
    !minMass &&
    !maxMass
  ) {
    return res.status(400).send("Invalid body parameters provided");
  }

  const planet = searchStoredPlanets({
    name,
    classification,
    minDistance,
    maxDistance,
    minMass,
    maxMass,
  });

  if (planet) {
    return res.status(200).send(planet);
  }

  res.status(404).send();
};

export default searchPlanet;
