export interface ApiErrorResponse {
    error: {
        statusCode: number;
        data: null;
        success: false;
        errors: string;
    };
}
