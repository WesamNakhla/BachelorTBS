// filepath: c:/Users/Ahmed/Documents/GitHub/BachelorTBS/src/types/User.ts
export type UserRole = "admin" | "employee" | "customer";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}
