// src/types/User.ts

// Role type for user access control
export type UserRole = "admin" | "editor" | "client" | "viewer" | "visitor";

// Full user type as returned from backend
export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
  }
