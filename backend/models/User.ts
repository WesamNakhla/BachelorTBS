import bcrypt from "bcryptjs";

// Define the User interface for TypeScript
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

// Mock database for storing users (replace with your actual database logic)
const users: IUser[] = [];

// Export the mock database or logic as default
export { users };

/**
 * Hash the user's password before saving it to the database.
 * @param user - The user object
 */
export async function hashPassword(user: IUser): Promise<IUser> {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  return user;
}

/**
 * Compare the entered password with the hashed password.
 * @param enteredPassword - The password entered by the user
 * @param storedPassword - The hashed password stored in the database
 * @returns A boolean indicating whether the passwords match
 */
export async function matchPassword(
  enteredPassword: string,
  storedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, storedPassword);
}

/**
 * Add a new user to the mock database.
 * @param user - The user object to add
 */
export function addUser(user: IUser): void {
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
 * Swagger schema definition for the User model.
 * This will be used in the Swagger documentation.
 */
export const swaggerUserSchema = {
  type: "object",
  required: ["name", "email", "password"],
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
    password: {
      type: "string",
      format: "password",
      description: "The user's password",
    },
    role: {
      type: "string",
      description: "The role of the user (default: 'user')",
    },
  },
};
