import { API_BASE } from "./env";

export const AUTH_ENDPOINTS = {
    LOGIN: `${API_BASE}/login`,
    REGISTER: `${API_BASE}/register`,
} as const;


export const TODO_ENDPOINTS = {
    TODOS: `${API_BASE}/todos`,
    TODO_BY_ID: (id: string | number) => `${API_BASE}/todos/${id}`,
} as const;

console.log("API_BASE:", API_BASE);