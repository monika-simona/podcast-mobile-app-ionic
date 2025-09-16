import React, { createContext, useState, useEffect, ReactNode } from "react";
import api from "../api";

interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "author" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    role?: "user" | "author"
  ) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoadingUser(false);
      } else {
        api
          .get("/user")
          .then((res) => {
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
          })
          .catch(() => {
            localStorage.removeItem("token");
            setUser(null);
          })
          .finally(() => setLoadingUser(false));
      }
    } else {
      setLoadingUser(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/login", { email, password });
    const token = res.data.access_token;
    const userData = res.data.user;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    role: "user" | "author" = "user"
  ) => {
    const res = await api.post("/register", {
      name,
      email,
      password,
      password_confirmation,
      role,
    });
    const token = res.data.access_token;
    const userData = res.data.user;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {!loadingUser && children}
    </AuthContext.Provider>
  );
};
