import { deleteItem } from "@handlers/databaseHandler";

const handler = async (req: ExpressRequest, res: ExpressResponse) => {
  const id = req.params.id;

  const resp = await deleteItem(id);

  if (!resp.deletedCount) {
    return res.status(500).send({ message: "Failed to delete item" });
  }

  return res.status(204).send();
};

export default handler;
