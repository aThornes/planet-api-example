/** -------------------------------------------------------
 *
 *  Generates a swagger YAML file from created documents
 *
 *  To run this file, use the yarn script via;
 *    yarn run buildDocs
 *
 *  -------------------------------------------------------*/

const {
  getYamlData,
  writeYamlData,
  getFilesInFolder,
  getEndpointYamlData,
  writeJSONData,
} = require("./yaml");

const BASE_PATH = "./docs";
const DOCS_PATH = `${BASE_PATH}/openapi`;

const formatPathData = (objectArr) => {
  const endpoints = {};

  objectArr.forEach((endpoint) => {
    const yamlData = endpoint.yaml;
    const typeSplit = endpoint.type.split("/");
    const spliced = typeSplit.slice(typeSplit.indexOf("src") + 2);

    const method = spliced.pop();
    const type = "/" + spliced.join("/");

    if (endpoints[type]) {
      endpoints[type] = { ...endpoints[type], ...{ [method]: yamlData } };
    } else {
      endpoints[type] = { [method]: yamlData };
    }
  });

  return endpoints;
};

const concatArrayOfObjects = (objectArr) => {
  const endpoints = {};

  objectArr.forEach((endpoint) => {
    const yamlData = endpoint.yaml;

    const objectKey = Object.keys(yamlData);
    const endpointData = yamlData[objectKey];
    const endpointPath = objectKey;

    if (endpoints[endpointPath]) {
      endpoints[endpointPath] = { ...endpoints[endpointPath], ...endpointData };
    } else {
      endpoints[endpointPath] = endpointData;
    }
  });

  return endpoints;
};

/* Initial api docs header information */
const apiInfo = getYamlData(`${DOCS_PATH}/config/api.yaml`).yaml;

/* Tags information */
const tagFiles = getFilesInFolder(`${DOCS_PATH}/config/tags`);
const tagData = tagFiles.map(
  (file) => getYamlData(`${DOCS_PATH}/config/tags/${file}`).yaml
);

/* Server information */
const serverInfo = getYamlData(`${DOCS_PATH}/config/server.yaml`).yaml;

/* Endpoint data */
const endpointFiles = getFilesInFolder("./src/routes");

let definitions = {};
const endpointData = formatPathData(
  endpointFiles.map((file) => {
    const yamlResp = getEndpointYamlData(`./src/routes/${file}`);
    definitions = { ...definitions, ...yamlResp.definitions };
    return yamlResp.data;
  })
);

/* Component information */
const componentFiles = getFilesInFolder(`${DOCS_PATH}/components`);
const componentData = concatArrayOfObjects(
  componentFiles.map((file) => getYamlData(`${DOCS_PATH}/components/${file}`))
);

const apiDocsObject = {
  ...apiInfo,
  tags: tagData,
  servers: serverInfo,
  paths: endpointData,
  components: {
    ...componentData,
    schemas: { ...componentData.schemas, ...definitions },
  },
};

writeYamlData(`${DOCS_PATH}/apiDocs`, apiDocsObject);

writeJSONData(`${DOCS_PATH}/apiDocs`, apiDocsObject);
