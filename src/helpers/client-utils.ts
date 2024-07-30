import "client-only";
export const debounceFn = () => {
  let timeoutId: NodeJS.Timeout;
  return (callback: () => any, delay: number = 1200) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(), delay);
  };
};
