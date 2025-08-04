export interface LoginUser {
  id: number;
  name: string;
  email: string;
  token: string;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: LoginUser;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}