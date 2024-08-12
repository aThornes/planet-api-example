/*
  |---------------------------------------------------------|
  |---                                                    --|
  |--                    DO NOT MODIFY                    --|
  |--        Autogenerated file: built by build.sh        --|
  |---                                                    --|
  |---------------------------------------------------------|
*/
import bodyPost from './routes/body/post/handler';
import bodySearchPost from './routes/body/search/post/handler';
import body_id_Delete from './routes/body/{id}/delete/handler';
import body_id_Get from './routes/body/{id}/get/handler';
import body_id_HierarchyGet from './routes/body/{id}/hierarchy/get/handler';
import body_id_Put from './routes/body/{id}/put/handler';

const defineRoutes = (app: import('express').Application) => {
  // POST /body
  app.post('/body', bodyPost);

  // POST /body/search
  app.post('/body/search', bodySearchPost);

  // DELETE /body/:id
  app.delete('/body/:id', body_id_Delete);

  // GET /body/:id
  app.get('/body/:id', body_id_Get);

  // GET /body/:id/hierarchy
  app.get('/body/:id/hierarchy', body_id_HierarchyGet);

  // PUT /body/:id
  app.put('/body/:id', body_id_Put);

};

export default defineRoutes;
