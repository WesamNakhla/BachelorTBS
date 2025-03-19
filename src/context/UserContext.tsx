import React, { createContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string, updatedUser: User) => void;
  deleteUser: (id: string) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => setUsers([...users, user]);
  const updateUser = (id: string, updatedUser: User) =>
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  const deleteUser = (id: string) => setUsers(users.filter((user) => user.id !== id));

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
