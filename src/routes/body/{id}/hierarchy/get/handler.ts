import { getItem } from '@handlers/databaseHandler';

const handler = async (req: ExpressRequest, res: ExpressResponse) => {
  const { id } = req.params;
  const recursionDepth = req.headers['x-recursion-depth'] || 5;

  //Retrieve Body using ID from database
  const body = await getItem(id);

  //Get all parents
  const parentId = body.parentsId;

  //Recursively search all records where parentsID = param ID

  //Return all records

  //Look at mongoDB indexes
};

export default handler;
