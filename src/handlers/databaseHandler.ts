import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://admin:XtmX6a6ymXvmN8qM@planetcluster.alkxpse.mongodb.net/?retryWrites=true&w=majority&appName=PlanetCluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const initialiseDatabase = async () => {
  try {
    await client.connect();
    client.on("close", handleConnectionClose);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const handleConnectionClose = () => {
  initialiseDatabase();
  console.log("Lost connection to database. Reconnecting...");
};

const writeItem = (data: Record<string, any>) => {
  const database = client.db("planetcluster");
  const collection = database.collection("planets");
  collection.insertOne(data);
};

const readItem = async (query: Record<string, any>) => {
  const database = client.db("planetcluster");
  const collection = database.collection("planets");
  return await collection.findOne(query);
};

const searchItem = async (
  query: Record<string, any>,
  limit?: number,
  skip?: number
) => {
  const database = client.db("planetcluster");
  const collection = database.collection("planets");
  return await collection
    .find(query)
    .limit(limit || 10)
    .skip(skip || 0)
    .toArray();
};

export { initialiseDatabase, writeItem, searchItem };
