export const uniqueList = (list: string[]) => {
  return Array.from(new Set(list));
};

export const getUniqueValue = (list: string[], notUnique = '', noValues = '') => {
  if (list.length === 0) return noValues;
  if (list.length > 1) return notUnique;
  return list[0];
};

export const multiValue = (list: string[]) => {
  return list.length > 1;
};
