import { randomBytes } from "crypto";

export const generateUniqueId = () => {
  /* Note this is not truly unique but a repeat occurance is unlikely enough
     that there shouldn't be any duplicates */

  return randomBytes(16).toString("hex");
};
