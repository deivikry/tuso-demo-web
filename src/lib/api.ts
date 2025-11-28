// src/lib/api.ts
import axios from "axios";

const API_URL = "http://localhost:4000"; // Cambia si tu backend corre en otro puerto


// 🧩 Definimos el tipo que devolverá el backend
interface LoginResponse {
  token: string;
  user: {
    id: number;
    nombre: string;
    email: string;
  };
}
//encabezado de configuracion de axios

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});



// Agregar automáticamente el token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// 🔸 Función de login
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/login", { email, password });
  return response.data; // { token, user }
};


// 🔹 Función de registro de usuario (conexión real)
export const registerUser = async (
  nombre: string,
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/register", {
    nombre,
    email,
    password,
  });
  return response.data;
};


// 🔸 Obtener perfil de usuario
export const fetchUserProfile = async () => {
  const response = await api.get("/profile");
  return response.data; // { id, name, email, ... }
}