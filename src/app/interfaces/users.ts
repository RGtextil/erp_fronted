export interface User {
    id?: number;
    email: string;
    username: string;
    password: string;
    phone: number;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}