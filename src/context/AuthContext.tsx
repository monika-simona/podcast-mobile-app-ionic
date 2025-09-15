import React, { createContext, useState, useEffect, ReactNode } from "react";
import api from "../api";

interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Auto login iz tokena
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api
        .get("/user")
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/login", { email, password });
      const token = res.data.access_token; // ispravno čitanje tokena
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(res.data.user);
    } catch (err: any) {
      console.error("Greška pri login-u", err);
      if (err.response && err.response.status === 401) {
        alert("Neispravan email ili lozinka");
      } else {
        alert("Greška pri login-u");
      }
      throw err;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation,
      });
      const token = res.data.access_token;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(res.data.user);
    } catch (err: any) {
      console.error("Greška pri registraciji", err);
      if (err.response) {
        alert(err.response.data.message || "Greška pri registraciji");
      }
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
