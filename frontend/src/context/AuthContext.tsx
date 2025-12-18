import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { AuthState, User, LoginCredentials, RegisterCredentials } from "../types/auth";
import { login as loginApi, register as registerApi } from "../api/AuthApi";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Load token from localStorage on mount
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setAuthState({
          user,
          token,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await loginApi(credentials);
    
    const user: User = {
      username: response.username,
      email: response.email,
    };
    
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(user));
    
    setAuthState({
      user,
      token: response.token,
      isAuthenticated: true,
    });
  };

  const register = async (credentials: RegisterCredentials) => {
    const response = await registerApi(credentials);
    
    const user: User = {
      username: response.username,
      email: response.email,
    };
    
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(user));
    
    setAuthState({
      user,
      token: response.token,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
