export const isLocalStorageAvailable = () => {
  try {
    return typeof window !== 'undefined' && window.localStorage;
  } catch (e) {
    return false;
  }
};