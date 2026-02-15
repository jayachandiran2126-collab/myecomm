import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "http://localhost:5000";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // 🔐 LOGIN
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      if (res.data?.user) {
        setUser(res.data.user);
        localStorage.setItem(
          "aaha_current_user",
          JSON.stringify(res.data.user)
        );
        return true;
      }
      return false;
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      return false;
    }
  };

  //signup//

const signup = async (userData: any): Promise<boolean> => {
  try {
    const res = await axios.post(`${API_URL}/register`, userData);
    return true;
  } catch (error: any) {
    console.error("Signup FULL ERROR:", error);
    console.error("Signup RESPONSE:", error.response?.data);
    return false;
  }
};



  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("aaha_current_user");
  };

  // 🔄 Restore session
  useEffect(() => {
    const storedUser = localStorage.getItem("aaha_current_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
