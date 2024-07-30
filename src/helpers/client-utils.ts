import "client-only";
export const debounceFn = () => {
  let timeoutId: NodeJS.Timeout;
  return (callback: () => any, delay: number = 650) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(), delay);
  };
};
