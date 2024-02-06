import getAllPlanets from './routes/getAllPlanets';
import getPlanet from './routes/getPlanet';
import newPlanet from './routes/newPlanet';
import searchPlanet from './routes/searchPlanet';

const defineRoutes = (app: import('express').Application) => {
  app.get('/planet/:id', getPlanet);
  app.post('/planet/search', searchPlanet);
  app.post('/planet', newPlanet);
  app.get('/planet', getAllPlanets);
};

export default defineRoutes;
