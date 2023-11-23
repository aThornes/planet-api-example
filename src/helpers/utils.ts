export const readJson = (stringData: string) => {
  try {
    return JSON.parse(stringData);
  } catch {
    return null;
  }
};

export const isNumeric = (str: string) => /^\d*\.?\d*$/.test(str);

export const hasValue = (val: any) => val !== undefined && val !== null;
