import getAllPlanets from './routes/getAllPlanets';
import getHeaders from './routes/getHeaders';
import getPlanet from './routes/getPlanet';
import newPlanet from './routes/newPlanet';
import searchPlanet from './routes/searchPlanet';

const defineRoutes = (app: import('express').Application) => {
  app.get('/planet/:id', getPlanet);
  app.get('/planet', getAllPlanets);
  app.get('/headers', getHeaders);

  app.post('/planet/search', searchPlanet);
  app.post('/planet', newPlanet);
};

export default defineRoutes;
