import { getItem } from "@handlers/databaseHandler";

const handler = async (req: ExpressRequest, res: ExpressResponse) => {
  const id = req.params.id;
  const resp = await getItem(id);

  if (!resp) {
    return res.status(404).send({ message: "Item not found" });
  }

  return res.status(200).send(resp);
};

export default handler;
