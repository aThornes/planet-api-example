import schema from "./acceptSchema.json";

import { validateSchema } from "@helpers/schemaHelper";
import { editItem } from "@handlers/databaseHandler";

const handler = async (req: ExpressRequest, res: ExpressResponse) => {
  const body = req.body as CelestialBody;
  const id = req.params.id;

  const schemaResp = validateSchema(body, schema);
  if (!schemaResp.valid) {
    return res
      .status(400)
      .send({ message: "Invalid body", error: schemaResp.errors });
  }

  const resp = await editItem(id, body);

  if (!resp.acknowledged) {
    console.error(resp);
    return res.status(500).send({ message: "Failed to write item" });
  }

  if (!resp.matchedCount)
    return res.status(404).send({ message: "Item not found" });

  if (!resp.modifiedCount)
    return res.status(304).send({ message: "No changes made" });

  return res.status(200).send();
};

export default handler;
