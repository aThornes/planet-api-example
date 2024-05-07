import { MongoClient, ObjectId } from "mongodb";
import {
  initialiseDatabase,
  writeItem,
  editItem,
  deleteItem,
  getItem,
  searchItem,
} from "./databaseHandler";

jest.mock("mongodb");

const mockConnect = jest.fn();
const mockInsertOne = jest.fn();
const mockUpdateOne = jest.fn();
const mockDeleteOne = jest.fn();
const mockFindOne = jest.fn();
const mockFind = jest.fn(() => ({
  limit: jest.fn(() => ({
    skip: jest.fn(() => ({
      toArray: jest.fn(),
    })),
  })),
}));

(ObjectId as jest.MockedClass<any>).mockImplementation((id: string) => ({
  objectId: id,
}));

(MongoClient as jest.MockedClass<typeof MongoClient>).mockImplementation(() => {
  return {
    connect: mockConnect,
    db: () => ({
      collection: () => ({
        insertOne: mockInsertOne,
        updateOne: mockUpdateOne,
        deleteOne: mockDeleteOne,
        findOne: mockFindOne,
        find: mockFind,
      }),
    }),
    on: jest.fn(),
  } as unknown as MongoClient;
});

console.log = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("databaseHandler", () => {
  beforeAll(() => {
    initialiseDatabase();
  });

  it("writes an item", async () => {
    const data = { name: "test" };
    await writeItem(data);
    expect(mockInsertOne).toHaveBeenCalledWith(data);
  });

  it("edits an item", async () => {
    const id = "60a8c9c9e8e5a63f7c3e0e8a";
    const data = { name: "test" };
    await editItem(id, data);
    expect(mockUpdateOne).toHaveBeenCalledWith(
      { _id: { objectId: id } },
      { $set: data }
    );
  });

  it("deletes an item", async () => {
    const id = "60a8c9c9e8e5a63f7c3e0e8a";
    await deleteItem(id);
    expect(mockDeleteOne).toHaveBeenCalledWith({ _id: { objectId: id } });
  });

  it("gets an item", async () => {
    const id = "60a8c9c9e8e5a63f7c3e0e8a";
    await getItem(id);
    expect(mockFindOne).toHaveBeenCalledWith({ _id: { objectId: id } });
  });

  it("searches for items", async () => {
    const query = { name: "test" };
    const limit = 5;
    const skip = 0;
    await searchItem(query, limit, skip);
    expect(mockFind).toHaveBeenCalledWith(query);
  });
});
