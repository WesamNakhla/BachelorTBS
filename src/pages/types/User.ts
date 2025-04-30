export type UserRole = "admin" | "employee" | "customer";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  password?: string; // Optional: used for creation only

  // ✅ Add these optional fields to avoid future errors
  createdAt?: string;
  status?: "active" | "inactive";
}
