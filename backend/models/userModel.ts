
// Define the User interface for TypeScript
export interface IUser {
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  createdAt?: Date;
  updatedAt?: Date;
}

// Mock database for storing users (replace with your actual database logic)
const users: IUser[] = [];

/**
 * Add a new user to the mock database.
 * @param user - The user object to add
 */
export function addUser(user: IUser): void {
  const timestamp = new Date();
  user.createdAt = timestamp;
  user.updatedAt = timestamp;
  users.push(user);
}

/**
 * Get all users from the mock database.
 * @returns An array of users
 */
export function getUsers(): IUser[] {
  return users;
}

/**
 * Update a user's role in the mock database.
 * @param email - The email of the user to update
 * @param newRole - The new role to assign
 * @returns A boolean indicating whether the update was successful
 */
export function updateUserRole(email: string, newRole: "admin" | "editor" | "viewer"): boolean {
  const user = users.find((u) => u.email === email);
  if (user) {
    user.role = newRole;
    user.updatedAt = new Date();
    return true;
  }
  return false;
}

/**
 * Swagger schema definition for the User model.
 * This will be used in the Swagger documentation.
 */
export const swaggerUserSchema = {
  type: "object",
  required: ["name", "email", "role"],
  properties: {
    name: {
      type: "string",
      description: "The name of the user",
    },
    email: {
      type: "string",
      format: "email",
      description: "The email address of the user",
    },
    role: {
      type: "string",
      enum: ["admin", "editor", "viewer"],
      description: "The role of the user",
    },
    createdAt: {
      type: "string",
      format: "date-time",
      description: "The timestamp when the user was created",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      description: "The timestamp when the user was last updated",
    },
  },
};
