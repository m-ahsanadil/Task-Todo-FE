export interface ApiResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}

export interface Todo {
    id: number;
    userId: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
}

export type TodosResponse = ApiResponse<Todo[]>;

export type TodoResponse = ApiResponse<Todo>;