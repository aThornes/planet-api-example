import { getItem, searchItem } from '@handlers/databaseHandler';
import { idText } from 'typescript';

const handler = async (req: ExpressRequest, res: ExpressResponse) => {
  const { id } = req.params;
  const recursionDepth: number = Number(req.headers['x-recursion-depth']) || 5;

  //Retrieve Body using ID from database
  const body = await getItem(id);
  let hierarchy = { [id]: null };

  //Get children (recursive) function
  const getChildren = async (id: string, depth: number = 1) => {
    let children = await searchItem({
      parentBodyId: id,
    });

    let childrenObject = {};

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const childID = child._id.toString();

      let childrensChildren = null;
      if (depth < recursionDepth) {
        childrensChildren = await getChildren(childID, depth + 1);
      }
      childrenObject[childID] = childrensChildren;
    }

    if (Object.keys(childrenObject).length > 0) {
      return childrenObject;
    }
    return null;
  };

  hierarchy[id] = await getChildren(id);

  //Add parents to front of hierarchy
  let hasParent = true;
  let lookupId = id;
  while (hasParent) {
    const body = await getItem(lookupId);
    const parentId = body.parentBodyId;
    if (parentId) {
      hierarchy = { [parentId]: hierarchy };
      lookupId = parentId;
    } else {
      hasParent = false;
    }
  }
  return res.status(200).send(hierarchy);
};

export default handler;
