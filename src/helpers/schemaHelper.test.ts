import { validateSchema } from "./schemaHelper";
import jsonschema from "jsonschema";

describe("schemaHelper", () => {
  it("validates correct data", () => {
    const data = { name: "test" };
    const schema: jsonschema.Schema = {
      type: "object",
      properties: {
        name: { type: "string" },
      },
      required: ["name"],
    };

    const result = validateSchema(data, schema);
    expect(result.errors).toHaveLength(0);
  });

  it("validates incorrect data", () => {
    const data = { name: 123 };
    const schema: jsonschema.Schema = {
      type: "object",
      properties: {
        name: { type: "string" },
      },
      required: ["name"],
    };

    const result = validateSchema(data, schema);
    expect(result.errors).not.toHaveLength(0);
  });
});
