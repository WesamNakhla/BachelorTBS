import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: { id: string; name: string; email: string } | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async () => {
    setLoading(true);
    setTimeout(() => {
      setUser({ id: "1", name: "User", email: "user@example.com" });
      setLoading(false);
    }, 1000); // Simulate a network request
  };

  const logout = async () => {
    setLoading(true);
    setTimeout(() => {
      setUser(null);
      setLoading(false);
    }, 1000); // Simulate a network request
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
