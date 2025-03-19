import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: { id: string; name: string; email: string } | null;
  login: () => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = () => setUser({ id: "1", name: "User", email: "user@example.com" });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
