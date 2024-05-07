import { readJson, isNumeric, hasValue } from "./utils";

describe("utils", () => {
  it("parses JSON correctly", () => {
    const json = '{"name":"test"}';
    const result = readJson(json);
    expect(result).toEqual({ name: "test" });
  });

  it("returns null for invalid JSON", () => {
    const json = '{name:"test"}';
    const result = readJson(json);
    expect(result).toBeNull();
  });

  it("checks if a string is numeric", () => {
    expect(isNumeric("123")).toBe(true);
    expect(isNumeric("123.456")).toBe(true);
    expect(isNumeric("abc")).toBe(false);
  });

  it("checks if a value is not null or undefined", () => {
    expect(hasValue(null)).toBe(false);
    expect(hasValue(undefined)).toBe(false);
    expect(hasValue("")).toBe(true);
    expect(hasValue(0)).toBe(true);
    expect(hasValue("test")).toBe(true);
  });
});
