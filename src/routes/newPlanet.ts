import { addPlanet } from '@handlers/planetHandler';

/* Task - Improvements
  > Body validation (using schemas)
  > Duplicate prevention
  > Additional parameters (support additional information)
 */

const newPlanet = (req: ExpressRequest, res: ExpressResponse) => {
  const {
    name,
    type,
    mass,
    solarDistance,
    description,
    mRadius,
    eRadius,
    pRadius,
    density,
    gravity,
    temperature,
    surfacePressure,
    rotationalPeriod,
  } = req.body;

  /* This is not the best way of doing this, schema checks are far more useful */
  // TASK - update this to use a schema
  if (
    !name ||
    !type ||
    !mass ||
    !solarDistance ||
    !description ||
    !mRadius ||
    !eRadius ||
    !pRadius ||
    !density ||
    !gravity ||
    !temperature ||
    !surfacePressure ||
    !rotationalPeriod ||
    (type !== 'terrestrial' && type !== 'gaseous')
  ) {
    return res.status(400).send('One or more missing parameters');
  }

  const planetId = addPlanet({
    name,
    type,
    mass,
    solarDistance,
    description,
    mRadius,
    eRadius,
    pRadius,
    density,
    gravity,
    temperature,
    surfacePressure,
    rotationalPeriod,
  });

  res.status(200).send({ id: planetId });
};

export default newPlanet;
