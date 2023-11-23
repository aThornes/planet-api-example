import fs from "fs";
import { addIndexItem, delIndexItem, searchIndex } from "./indexHandler";

jest.mock("fs");

const mockFs = fs as jest.Mocked<typeof fs>;

const mockFilePath = `${process.env.DATA_STORE}/${process.env.DATA_INDEX}`;

const mockIndices = [
  {
    key: "KeyOne",
    name: "John Adams",
    age: 42,
    height: 184,
  },
  {
    key: "KeyTwo",
    name: "Bob Smith",
    age: 61,
    height: 165,
  },
  {
    key: "KeyThree",
    name: "Mary Johnson",
    age: 52,
    height: 167,
  },
  {
    key: "KeyFour",
    name: "Ross Hepton",
    age: 23,
    height: 176,
  },
  {
    key: "KeyFive",
    name: "Lucy Smith",
    age: 26,
    height: 154,
  },
];

describe("Index handler functionality", () => {
  describe("Adding indicies", () => {
    it("can create a new index", () => {
      const mockId = "mockId";
      const mockData = "test,test2,test3";
      mockFs.appendFileSync.mockImplementationOnce(() => {});

      const resp = addIndexItem({ id: mockId, data: mockData });

      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        mockFilePath,
        `${mockId},${mockData}\n`
      );
      expect(resp).toBeUndefined();
    });
  });

  describe("Removing indicies", () => {
    const mockId = "mockId";
    const headerLine = "key,headerOne,headerTwo,headerThree\n";
    beforeEach(() => {
      mockFs.readFileSync.mockImplementationOnce(
        () => `${headerLine}${mockId},mockOne,MockTwo,MockThree\n`
      );
    });
    it("Can remove an index for a matching value", () => {
      const resp = delIndexItem(mockId);

      expect(resp).toBe(true);
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        mockFilePath,
        headerLine
      );
    });

    it("Can't remove an index that doesn't exist", () => {
      const resp = delIndexItem("anotherId");

      expect(resp).toBe(false);
      expect(mockFs.writeFileSync).not.toHaveBeenCalled();
    });

    it("Can't remove the header line", () => {
      const resp = delIndexItem("key");

      expect(resp).toBe(false);
      expect(mockFs.writeFileSync).not.toHaveBeenCalled();
    });
  });

  describe("Can search indices", () => {
    const headerLine = "key,name,age,height";

    beforeEach(() => {
      mockFs.readFileSync.mockImplementationOnce(
        () =>
          `${headerLine}\n${mockIndices
            .map((x) => `${x.key},${x.name},${x.age},${x.height}`)
            .join("\n")}`
      );
    });

    it("Supports exact matches", () => {
      const searchTerm = "John Adams";
      const matches = searchIndex({
        $and: [{ key: "name", $exact: searchTerm }],
      });

      expect(matches).toEqual([mockIndices.find((x) => x.name === searchTerm)]);
    });

    it("Supports case insensitive matches", () => {
      const searchTerm = "maRy JoHNsoN";
      const matches = searchIndex({
        $and: [{ key: "name", $anycase: searchTerm }],
      });

      expect(matches).toEqual([
        mockIndices.find(
          (x) => x.name.toUpperCase() === searchTerm.toUpperCase()
        ),
      ]);
    });

    it("Supports partial matches", () => {
      const searchTerm = "Smith";
      const matches = searchIndex({
        $and: [{ key: "name", $includes: searchTerm }],
      });

      expect(matches).toEqual(
        mockIndices.filter((x) =>
          x.name.toUpperCase().includes(searchTerm.toUpperCase())
        )
      );
    });

    it("Supports numeric matches", () => {
      const searchTerm = 42;
      const matches = searchIndex({
        $and: [{ key: "age", $exact: 42 }],
      });

      expect(matches).toEqual([mockIndices.find((x) => x.age === searchTerm)]);
    });

    it("Can query by multiple values - AND", () => {
      const searchAge = 26;
      const matches = searchIndex({
        $and: [
          { key: "name", $includes: "Smith" },
          { key: "age", $exact: searchAge },
        ],
      });

      expect(matches).toEqual([mockIndices.find((x) => x.age === searchAge)]);
    });

    it("Can query by multiple values - OR", () => {
      const searchName = "John Adams";
      const searchAge = 26;
      const matches = searchIndex({
        $or: [
          { key: "name", $exact: searchName },
          { key: "age", $exact: searchAge },
        ],
      });

      expect(matches).toEqual([
        mockIndices.find((x) => x.name === searchName),
        mockIndices.find((x) => x.age === searchAge),
      ]);
    });

    it("Supports numeric comparisons - lt/gt", () => {
      const min = 26;
      const max = 45;
      const matches = searchIndex({
        $and: [
          { key: "age", $lt: max },
          { key: "age", $gt: min },
        ],
      });

      expect(matches).toEqual(
        mockIndices.filter((x) => x.age > min && x.age < max)
      );
    });

    it("Supports numeric comparisons - lte/gte", () => {
      const min = 26;
      const max = 52;
      const matches = searchIndex({
        $and: [
          { key: "age", $lte: max },
          { key: "age", $gte: min },
        ],
      });

      expect(matches).toEqual(
        mockIndices.filter((x) => x.age >= min && x.age <= max)
      );
    });
  });
});
