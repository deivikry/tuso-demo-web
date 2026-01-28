import { api } from "./client";

export interface LoginResponse {
    token: string;
    user: {
        id: number;
        nombre: string;
        email: string;
    };
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/api/auth/login", { email, password });
    return response.data;
};

export const registerUser = async (
    nombre: string,
    email: string,
    password: string
): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/api/auth/register", {
        nombre,
        email,
        password,
    });
    return response.data;
};
