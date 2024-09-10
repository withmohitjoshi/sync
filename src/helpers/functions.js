export const getObjectLength = (object) => {
  try {
    return Object.keys(object).length;
  } catch {
    return 0;
  }
};
