import schema from "./acceptSchema.json";

import { validateSchema } from "@helpers/schemaHelper";
import { writeItem } from "@handlers/databaseHandler";

const handler = async (req: ExpressRequest, res: ExpressResponse) => {
  const body = req.body as CelestialBody;

  const schemaResp = validateSchema(body, schema);
  if (!schemaResp.valid) {
    return res
      .status(400)
      .send({ message: "Invalid body", error: schemaResp.errors });
  }

  const postBody = body;
  /* Convert date to ISO object */
  if (body.discoveryInformation.date) {
    postBody.discoveryInformation.date = new Date(
      body.discoveryInformation.date
    );
  }

  const { success, data, status, message } = await writeItem(postBody);

  if (!success) {
    return res
      .status(status)
      .send({ message: message || "Failed to write item" });
  }

  return res.status(201).send({ id: data.insertedId });
};

export default handler;
