import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, AuthState } from "../types";
import { API_BASE_URL } from "../config";
import { toast } from "react-toastify";

interface AuthContextType extends AuthState {
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => void;
  updateCV: (content: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("jobmatch_user");

    if (!storedUser || storedUser === "undefined") {
      localStorage.removeItem("jobmatch_user");
      setState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      const user = JSON.parse(storedUser);

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (e) {
      console.error("Invalid stored user:", storedUser);
      localStorage.removeItem("jobmatch_user");
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      console.log("call login");
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });
      if (response.status == 401) {
        toast.error("sai ten dang nhap hoac mat khau");

        return;
      }

      if (!response) {
        throw new Error("API did not return user");
      }
      console.log(JSON.stringify(response, null, 2));
      const data = await response.json();

      if (!data?.user) {
        throw new Error("API did not return user");
      }

      localStorage.setItem("jobmatch_user", JSON.stringify(data.user));
      setState({ user: data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (email: string, pass: string, name: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass, fullName: name }),
      });
      const data = await response.json();

      localStorage.setItem("jobmatch_user", JSON.stringify(data.user));
      setState({ user: data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error("Register failed", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("jobmatch_user");
    setState({ user: null, isAuthenticated: false, isLoading: false });
  };

  const updateCV = async (content: string) => {
    if (!state.user) return;

    try {
      const response = await fetch(`${API_BASE_URL}/user/cv`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: state.user.id, cvContent: content }),
      });

      if (response.ok) {
        const updatedUser = { ...state.user, cvContent: content };
        localStorage.setItem("jobmatch_user", JSON.stringify(updatedUser));
        setState((prev) => ({ ...prev, user: updatedUser }));
      }
    } catch (error) {
      console.error("Update CV failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, register, logout, updateCV }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
