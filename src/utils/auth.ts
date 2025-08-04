import { STORAGE_KEYS } from "../lib/constants";
import { getLocalStorage } from "./localStorageHelper";

export const getToken = (): string | null => getLocalStorage<string>(STORAGE_KEYS.TODO_TOKEN);