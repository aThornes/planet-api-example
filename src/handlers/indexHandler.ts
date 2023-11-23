import { isNumeric } from "@helpers/utils";
import fs from "fs";

/* Note: Env data isn't available on load therefore must invoke as a function */
const getPath = () => `${process.env.DATA_STORE}/${process.env.DATA_INDEX}`;

export const addIndexItem = ({ id, data }: { id: string; data: string }) => {
  fs.appendFileSync(getPath(), `${id},${data}\n`);
};

export const delIndexItem = (id: string) => {
  const indexFilePath = getPath();
  const indices = fs.readFileSync(indexFilePath, "utf-8");

  const lines = indices.split("\n");

  /* Note: Not using foreach since we can exit as soon as we find the matching line
       - Start from 1 to ignore header line
   */
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].startsWith(id)) {
      lines.splice(i, 1);
      fs.writeFileSync(indexFilePath, lines.join("\n"));
      return true;
    }
  }

  return false;
};

interface SearchItem {
  key: string;

  $exact?: string | number | boolean;
  $anycase?: string;
  $includes?: string;

  /* Number queries, used to find range */
  $gt?: number;
  $lt?: number;
  $gte?: number;
  $lte?: number;
}

interface SearchIndex {
  $and?: SearchItem[];
  $or?: SearchItem[];
  $not?: SearchItem[];
}

const isMatch = (
  value: string | number | boolean,
  { $exact, $anycase, $includes, $gt, $lt, $gte, $lte }: SearchItem
) => {
  if ($exact) return value === $exact;
  else if ($anycase && typeof value === "string")
    return value.toUpperCase() === $anycase.toUpperCase();
  else if ($includes && typeof value === "string")
    return value.toUpperCase().includes($includes.toUpperCase());
  else if ($gt) return Number(value) > $gt;
  else if ($gte) return Number(value) >= $gte;
  else if ($lt) return Number(value) < $lt;
  else if ($lte) return Number(value) <= $lte;
};

const validateIndexMatch = ({
  indexValues,
  searchParams,
}: {
  indexValues: Record<string, any>;
  searchParams: SearchIndex;
}) => {
  let currentMatch = false;

  /* Key may not exist in index so ensure its present */
  const validKey = (searchItem) =>
    searchItem.key && indexValues[searchItem.key];

  if (searchParams.$and) {
    /* All requested values must match for the item to be valid */
    let allMatch = true;
    searchParams.$and.forEach((searchItem) => {
      if (
        validKey(searchItem) &&
        !isMatch(indexValues[searchItem.key], searchItem)
      ) {
        allMatch = false;
      }
    });
    currentMatch = allMatch;
  } else if (searchParams.$or) {
    /* Only one of the requested values must match for the item to be valid */
    searchParams.$or.forEach((searchItem) => {
      if (
        validKey(searchItem) &&
        isMatch(indexValues[searchItem.key], searchItem)
      ) {
        currentMatch = true;
      }
    });
  }

  if (searchParams.$not) {
    /* If any of the requested values match then this item is not valid */
    searchParams.$not.forEach((searchItem) => {
      if (
        validKey(searchItem) &&
        isMatch(indexValues[searchItem.key], searchItem)
      ) {
        currentMatch = false;
      }
    });
  }

  return currentMatch;
};

export const searchIndex = (searchParams: SearchIndex) => {
  if (searchParams.$and && searchParams.$or) {
    throw new Error(
      "$and and $or are mutually exclusive, they cannot both be provided."
    );
  }

  const indexFilePath = getPath();
  const indices = fs.readFileSync(indexFilePath, "utf-8");
  const indexLines = indices.split("\n");

  const matches = [];

  const headers = indexLines[0].replace("\n", "").split(",");
  /* Ignore headers */
  indexLines.shift();

  /* Iterate through indices to find any matches */
  indexLines.forEach((index) => {
    if (!index) return;

    /* Iterate over each provided condition */
    const indexValues: Record<string, any> = {};
    const indexSplit = index.split(",");
    headers.forEach((val, i) => {
      const indexValue = indexSplit[i];

      indexValues[val] = isNumeric(indexValue)
        ? Number(indexValue)
        : indexValue;
    });

    const currentMatch = validateIndexMatch({ indexValues, searchParams });

    if (currentMatch) {
      matches.push(indexValues);
    }
  });

  return matches;
};
