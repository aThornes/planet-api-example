import { hasValue } from '@helpers/utils';
import { editJsonItem, readJsonItem, writeJsonItem } from './databaseHandler';
import { addIndexItem, delIndexItem, searchIndex } from './indexHandler';

const getIndexString = ({ name, type, mass, solarDistance }: PlanetBase) =>
  `${name},${type},${mass},${solarDistance}`;

export const addPlanet = (planet: Planet) => {
  const planetId = writeJsonItem({ store: 'planet', jsonData: planet });

  if (planetId) {
    /* Update index for easier search */
    addIndexItem({ id: planetId, data: getIndexString(planet) });

    return planetId;
  }

  return null;
};

/* Note: Untested */
export const editPlanet = (id: string, updatePlanet: UpdatePlanet) => {
  try {
    editJsonItem({ store: 'planet', id, update: { $set: updatePlanet } });
  } catch (e) {
    console.error('Failed to update planet with ID', id, '. Error\n', e);
    return null;
  }

  /* Update index if required */
  const { name, type, mass, solarDistance } = updatePlanet;

  if (name || type || hasValue(mass) || hasValue(solarDistance)) {
    const originalItem = getPlanetById(id);

    const newIndex = getIndexString({
      name: name || originalItem.name,
      type: type || originalItem.type,
      mass: hasValue(mass) ? mass : originalItem.mass,
      solarDistance: hasValue(solarDistance)
        ? solarDistance
        : originalItem.solarDistance,
    });

    delIndexItem(id);
    addIndexItem({ id, data: newIndex });
  }
};

export const getPlanetById = (id: string): Planet =>
  readJsonItem({ store: 'planet', id });

export const searchStoredPlanets = ({
  name,
  type,
  minDistance,
  maxDistance,
  minMass,
  maxMass,
}: PlanetSearchParams) => {
  const buildQuery = [];

  if (name) buildQuery.push({ key: 'name', $includes: name });
  if (type) buildQuery.push({ key: 'type', $exact: type });
  if (minDistance) buildQuery.push({ key: 'solarDistance', $gte: minDistance });
  if (maxDistance) buildQuery.push({ key: 'solarDistance', $lte: maxDistance });
  if (minMass) buildQuery.push({ key: 'mass', $gte: minMass });
  if (maxMass) buildQuery.push({ key: 'mass', $lt: maxMass });

  return searchIndex({ $and: buildQuery });
};
