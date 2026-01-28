// src/lib/api.ts
// ⚠️ Este archivo está en modo compatibilidad. 
// Usar `src/lib/api/` para nuevas implementaciones.

export { api } from "./api/client";
export { loginUser, registerUser } from "./api/auth";
export type { LoginResponse } from "./api/auth";
export { fetchUserProfile } from "./api/user";
