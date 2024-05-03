const fs = require("fs");
const yaml = require("js-yaml");

const getSchemaData = (path) => {
  const schemaData = fs.readFileSync(path, "utf-8");
  const jsonData = JSON.parse(schemaData);

  delete jsonData.$schema;
  delete jsonData.$id;
  delete jsonData.title;

  return jsonData;
};

const getYamlData = (file) => {
  const yamlData = yaml.load(fs.readFileSync(`${file}`, "utf-8"));

  const fileSplit = file.split("/");

  const filePath =
    fileSplit.length > 2
      ? `/${fileSplit.splice(1, fileSplit.length - 2).join("/")}`
      : "";

  return { yaml: yamlData, type: filePath };
};

const getEndpointYamlData = (file) => {
  const path = file.substring(0, file.lastIndexOf("/"));
  const fileData = getYamlData(file);

  const regex = /{([^}]+)}/g;
  const matches = path.match(regex);

  if (matches?.length) {
    if (!fileData.yaml.parameters) {
      fileData.yaml.parameters = [];
    }
    matches.forEach((match) => {
      fileData.yaml.parameters.push({
        in: "path",
        name: match.replace("{", "").replace("}", ""),
        required: true,
        schema: {
          type: "integer",
        },
      });
    });
  }

  let definitions = {};

  /* Build the response schema the expected response */
  if (fs.existsSync(`${path}/responseSchema.json`)) {
    const responseSchema = getSchemaData(`${path}/responseSchema.json`);

    let writeSchema = responseSchema;
    if (responseSchema.definitions) {
      definitions = responseSchema.definitions;

      writeSchema = JSON.parse(
        JSON.stringify(responseSchema).replaceAll(
          "#/definitions/",
          "#/components/schemas/"
        )
      );
      delete responseSchema.definitions;
    }

    const updateObject = {
      description: "Endpoint return data",
      content: {
        "application/json": {
          schema: writeSchema,
        },
      },
    };

    if (fileData.yaml.responses["200"]) {
      fileData.yaml.responses["200"] = updateObject;
    } else if (fileData.yaml.responses["201"]) {
      fileData.yaml.responses["201"] = updateObject;
    }
  }

  /* Build the accept schema into the requestBody */
  if (fs.existsSync(`${path}/acceptSchema.json`)) {
    const acceptSchema = getSchemaData(`${path}/acceptSchema.json`);

    let writeSchema = { ...acceptSchema };

    if (writeSchema.definitions) {
      definitions = { ...definitions, ...writeSchema.definitions };

      writeSchema = JSON.parse(
        JSON.stringify(acceptSchema).replaceAll(
          "#/definitions/",
          "#/components/schemas/"
        )
      );

      delete writeSchema.definitions;
    }

    fileData.yaml.requestBody = {
      description: "Input body parameters",
      required: true,
      content: {
        "application/json": { schema: writeSchema },
      },
    };
  }

  return { data: fileData, definitions };
};

const writeYamlData = (file, data) => {
  fs.writeFile(`${file}.yaml`, yaml.dump(data), (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const writeJSONData = (file, data) => {
  fs.writeFile(`${file}.json`, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const getFilesInFolder = (folder, suffix) => {
  const dirsFound = fs.readdirSync(`${folder}`);

  const files = [];

  /* Determine if dir is a folder */
  dirsFound.forEach((dir) => {
    if (dir.endsWith(suffix || ".yaml")) {
      files.push(dir);
    } else if (fs.lstatSync(`${folder}/${dir}`).isDirectory()) {
      // Allow for nested folders, recursion!
      const dirFiles = getFilesInFolder(`${folder}/${dir}`, suffix);

      dirFiles.forEach((foundFile) => {
        files.push(`${dir}/${foundFile}`);
      });
    }
  });

  return files;
};

module.exports = {
  getYamlData,
  getEndpointYamlData,
  writeYamlData,
  writeJSONData,
  getFilesInFolder,
};
