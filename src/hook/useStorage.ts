export const useStorage = () => {
  const getLocalStorage = (key: string, defaultValue: any) => {
    try {
      const parsedLocalStorage = JSON.parse(localStorage.getItem(key) || '{}') || defaultValue;
      return parsedLocalStorage;
    } catch (error) {
      console.error(error);

      return defaultValue;
    }
  };

  const setLocalStorage = (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getLocalStorage,
    setLocalStorage,
  };
};
