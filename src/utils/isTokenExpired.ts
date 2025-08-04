import { decodeToken } from "./decodeToken";

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;

  const currentTime = Date.now() / 1000; 
  return decoded.exp < currentTime;
};
