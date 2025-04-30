import { createContext, useContext, useEffect, useState } from "react";
import api from "../axios";
import UserService from "../services/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("auth_token"));

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Basic ${token}`;
      UserService.getMe()
        .then((res) => setUser(res.data))
        .catch(() => {
          setToken(null);
          setUser(null);
          localStorage.removeItem("auth_token");
        });
    }
  }, [token]);
  
  const login = async (data) => {
    const { username, password } = data;
    const token = btoa(`${username}:${password}`);
    setToken(token);
    localStorage.setItem("auth_token", token);
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    delete api.defaults.headers.common["Authorization"];
  };

  const register = async (data) => {
    await UserService.register(data)
    await login({ username: data.username, password: data.password })
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
