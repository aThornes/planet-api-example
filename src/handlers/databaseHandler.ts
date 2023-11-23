import fs from "fs";
import { generateUniqueId } from "./encryptionHandler";
import { isNumeric, readJson } from "@helpers/utils";

const datastores = ["planet", "user"];

const validateId = (store: Store, id: string) => {
  if (id.length !== 32) return false;

  const fileItems = fs.readdirSync(`${process.env.DATA_STORE}/${store}`);
  return !fileItems.some((x) => x.includes(id));
};

export const initialiseDatabase = () => {
  /* Retreive all subfolders already in the data store */
  const dirs = fs
    .readdirSync(process.env.DATA_STORE, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  /* Iterate through required dirs and create if they dont exist */
  datastores.forEach((store) => {
    if (!dirs.includes(store)) {
      fs.mkdirSync(`${process.env.DATA_STORE}/${store}`);
    }
  });
};

export const writeJsonItem = ({ store, id, jsonData }: DBWriteItem) => {
  /* If no ID is provided then generate a unique 32 length string */
  const objId = id || generateUniqueId();

  /* Validate id isn't in use and is valid */
  const valid = validateId(store, objId);

  if (!valid) return null;

  /* Write JSON data to the file */
  fs.writeFileSync(
    `${process.env.DATA_STORE}/${store}/${objId}.json`,
    JSON.stringify(jsonData, null, 2)
  );

  return objId;
};

export const readJsonItem = ({ store, id }: DBQueryBase) => {
  const filepath = `${process.env.DATA_STORE}/${store}/${id}.json`;
  const exists = fs.existsSync(filepath);

  /* Early return since we can't retrieve an item that doesn't exist */
  if (!exists) return null;

  const strData = fs.readFileSync(filepath, "utf-8");

  return readJson(strData);
};

export const editJsonItem = ({ store, id, update }: DBEditItem) => {
  const existingData = readJsonItem({ store, id });

  /* Early return since we can't edit an item that doesn't exist */
  if (!existingData) return null;

  if (update.$set) {
    const setKeys = Object.keys(update.$set);

    setKeys.forEach((key) => {
      const value = update.$set[key];

      existingData[key] = value;
    });
  }

  if (update.$inc) {
    const updateKeys = Object.keys(update.$set);

    updateKeys.forEach((key) => {
      const originalValue = existingData[key];
      const value = update.$set[key];

      if (
        (originalValue && typeof originalValue === "number") ||
        isNumeric(originalValue)
      ) {
        existingData[key] = Number(originalValue) + value;
      } else {
        throw new Error("Incremented key must exist and be a valid number");
      }
    });
  }

  if (update.$push) {
    const pushKeys = Object.keys(update.$push);

    pushKeys.forEach((key) => {
      const originalValue = existingData[key];
      const value = update.$push[key];

      if (!Array.isArray(originalValue)) {
        throw new Error("Push key must be a valid array");
      }

      existingData[key].push(value);
    });
  }

  if (update.$dropIndex) {
    const dropKeys = Object.keys(update.$dropIndex);

    dropKeys.forEach((key) => {
      const originalValue = existingData[key];
      const dropIndex = update.$push[key];

      if (!Array.isArray(originalValue)) {
        throw new Error("Push key must be a valid array");
      }

      existingData[key].splice(dropIndex, 1);
    });
  }

  /* Apply changes to file */
  fs.writeFileSync(
    `${process.env.DATA_STORE}/${store}/${id}.json`,
    JSON.stringify(existingData, null, 2)
  );
};
