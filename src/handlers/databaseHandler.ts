import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

let client;

export const initialiseDatabase = async () => {
  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@planetcluster.alkxpse.mongodb.net/?retryWrites=true&w=majority&appName=PlanetCluster`;

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    console.log("Connected to database");
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

export const writeItem = async (data: Record<string, any>) => {
  const database = client.db(process.env.DB_NAME);
  const collection = database.collection(process.env.MONGO_COLLECTION_NAME);

  try {
    // Try to insert the new document
    const resp = await collection.insertOne(data);

    return { success: true, data: resp };
  } catch (error) {
    if (error.code === 11000) {
      return {
        success: false,
        status: 400,
        message: "Name already in use",
      };
    } else {
      console.error(error);
      return {
        success: false,
        status: 500,
        message: "An error occurred while inserting the document",
      };
    }
  }
};

export const editItem = (id: string, data: Record<string, any>) => {
  const database = client.db(process.env.DB_NAME);
  const collection = database.collection(process.env.MONGO_COLLECTION_NAME);
  return collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
};

export const deleteItem = (id: string) => {
  const database = client.db(process.env.DB_NAME);
  const collection = database.collection(process.env.MONGO_COLLECTION_NAME);
  return collection.deleteOne({ _id: new ObjectId(id) });
};

export const getItem = (id: string) => {
  const database = client.db(process.env.DB_NAME);
  const collection = database.collection(process.env.MONGO_COLLECTION_NAME);
  return collection.findOne({ _id: new ObjectId(id) });
};

export const searchItem = async (
  query: Record<string, any>,
  limit?: number,
  skip?: number
) => {
  const database = client.db(process.env.DB_NAME);
  const collection = database.collection(process.env.MONGO_COLLECTION_NAME);
  return await collection
    .find(query)
    .limit(limit || 10)
    .skip(skip || 0)
    .toArray();
};
