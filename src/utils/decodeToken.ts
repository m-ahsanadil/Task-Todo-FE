import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  id: number;
  email?: string;
  name?: string;
  unique_name?: string;
  exp?: number;
  iat?: number;
};

export const decodeToken = (token: string) => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

