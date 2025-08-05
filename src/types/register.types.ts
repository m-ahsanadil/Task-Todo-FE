

export interface RegisterSuccessResponse {
    statusCode: number;
    data: {
        id: number;
        name: string;
        email: string;
    };
    message: string;
    success: true;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
