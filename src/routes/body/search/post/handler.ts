import { validateSchema } from "@helpers/schemaHelper";

import schema from "./acceptSchema.json";
import { ObjectId } from "mongodb";
import { searchItem } from "@handlers/databaseHandler";

interface Range {
  min?: number;
  max?: number;
}

interface DateRange {
  min?: string;
  max?: string;
}

interface Body {
  limit?: number;
  offset?: number;
  name?: string;
  type?: string;
  distance?: Range;
  radius?: Range;
  mass?: Range;
  discoveryDate?: DateRange;
  discoveredBy?: string;
  discoveryMethod?: DiscoveryMethod;
  parentId?: string;
}

const textFields = ["name", "discoveredBy"];
const rangeFields = ["mass", "radius", "distance"];
const dateFields = ["discoveryDate"];

const handler = async (req: ExpressRequest, res: ExpressResponse) => {
  const body = req.body as Body;

  const schemaResp = validateSchema(body, schema);
  if (!schemaResp.valid) {
    return res
      .status(400)
      .json({ message: "Invalid body", error: schemaResp.errors });
  }

  let query = body as Record<string, any>;

  textFields.forEach((field) => {
    if (body[field]) {
      query[field] = { $regex: body[field], $options: "i" };
    }
  });

  rangeFields.forEach((field) => {
    if (body[field]) {
      query[field] = {
        $gte: body[field].min || -Infinity,
        $lte: body[field].max || Infinity,
      };
    }
  });

  dateFields.forEach((field) => {
    if (body[field]) {
      if (body[field].min) {
        query[field] = {
          $gte: new Date(body[field].min),
        };
        delete query[field].min;
      }
      if (body[field].max) {
        query[field] = {
          ...query[field],
          $lte: new Date(body[field].max),
        };
        delete query[field].max;
      }
    }
  });

  if (body.discoveryDate) {
    query = {
      ...query,
      "discoveryInformation.date": query.discoveryDate,
    };
    delete query.discoveryDate;
  }

  if (body.discoveryMethod) {
    query = {
      ...query,
      "discoveryInformation.method": query.discoveryMethod,
    };
    delete query.discoveryMethod;
  }

  if (body.discoveredBy) {
    query = {
      ...query,
      "discoveryInformation.discoveredBy": query.discoveredBy,
    };
    delete query.discoveredBy;
  }

  if (body.parentId) {
    query.parentId = new ObjectId(body.parentId);
  }

  const resp = await searchItem(query, body.limit, body.offset);

  if (!resp) {
    console.error("Error searching item", resp.error);
    return res.status(500).send({ message: "Internal server error" });
  }

  return res.status(200).send(resp);
};

export default handler;
