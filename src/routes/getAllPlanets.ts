import { getAllIndexNames } from '@handlers/indexHandler';

const getPlanetNames = (_: ExpressRequest, res: ExpressResponse) => {
  const names = getAllIndexNames();

  if (names) {
    return res.status(200).send(names);
  }

  res.status(404).send();
};

export default getPlanetNames;
