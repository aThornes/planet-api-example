import { getItem, searchItem } from '@handlers/databaseHandler';
import { idText } from 'typescript';

const handler = async (req: ExpressRequest, res: ExpressResponse) => {
  const { id } = req.params;
  const recursionDepth = req.headers['x-recursion-depth'] || 5;

  //Retrieve Body using ID from database
  const body = await getItem(id);

  //Get all parents
  let hierarchy = { [id]: null };

  let hasParent = true;
  let lookupId = id;
  let path = '';
  while (hasParent) {
    const body = await getItem(lookupId);
    const parentId = body.parentBodyId;
    if (parentId) {
      hierarchy = { [parentId]: hierarchy };
      path = parentId + (path ? `.${path}` : '');
      lookupId = parentId;
    } else {
      hasParent = false;
    }
  }

  //Output IDs
  console.log('hierarchy: ', hierarchy);
  console.log('path: ', path);

  const getChildren = async (id: string, objectPath: string) => {
    const splitPath = objectPath.split('.');
    let item = hierarchy;
    splitPath.forEach((pathItem) => {
      console.log('item:', item);
      console.log('path item: ', pathItem);
      item = item[pathItem];
    });
    console.log('item is called:', item);
    console.log('PID:', item);
    let children = await searchItem({
      parentBodyId: id,
    });

    children.forEach((child) => {
      const childID = child._id.toString();
      console.log(childID);
      console.log(child.name);
      hierarchy = { [hierarchy] : [childID] };
      console.log(hierarchy);
    });

    //getChildren(childID, objectPath+.id)
  };

  await getChildren(id, path);
  //Recursively search all records where parentsID = param ID

  //Return all records

  //Look at mongoDB indexes

  //Create names from IDs (for ease of checking functionality)
  // const hierarchyNameList = [];
  // let index = 0;
  // while (index < hierarchyList.length) {
  //   const name = (await getItem(hierarchyList[index])).name;
  //   hierarchyNameList.push(name);
  //   index++;
  // }
  // console.log(hierarchyNameList);

  // //Create and return the response
  // const resp = hierarchyNameList;
  // if (!resp) {
  //   let message = 'Item not found, Parent: ' + hierarchyList[1];
  //   return res.status(404).send({ message: message });
  // }

  return res.status(200).send(hierarchy);
};

export default handler;
