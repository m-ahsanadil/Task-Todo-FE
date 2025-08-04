export const isClient = typeof window !== "undefined";

export const setLocalStorage = (key: string, value: any): void => {
  if (!isClient) {
    console.warn("localStorage is not available in this environment");
    return;
  }

  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error setting localStorage:", error);
  }
};

export const getLocalStorage = <T = any>(key: string): T | null => {
  if (!isClient) {
    console.warn("localStorage is not available in this environment");
    return null;
  }

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  } catch (error) {
    console.error("Error getting localStorage:", error);
    return null;
  }
};

export const removeLocalStorage = (key: string): void => {
  if (!isClient) {
    console.warn("localStorage is not available in this environment");
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing localStorage:", error);
  }
};

export const clearLocalStorage = (): void => {
  if (!isClient) {
    console.warn("localStorage is not available in this environment");
    return;
  }

  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

export const isLocalStorageAvailable = (): boolean => {
  if (!isClient) return false;

  try {
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};