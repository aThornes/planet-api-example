import jsonschema from "jsonschema";

export const validateSchema = (data: any, schema: jsonschema.Schema) => {
  const validator = new jsonschema.Validator();
  const result = validator.validate(data, schema);
  return result;
};
