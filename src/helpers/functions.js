export const getObjectLength = (object) => {
  try {
    return Object.keys(object).length;
  } catch {
    return 0;
  }
};

let id;
export const debounceFn = (cb, timer = 1000) => {
  return function (args) {
    if (id) clearTimeout(id);
    id = setTimeout(() => cb(args), timer);
  };
};
