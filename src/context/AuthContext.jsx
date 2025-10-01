import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import env from "@/constants/env";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Refresh token function
  const refreshToken = async () => {
    try {
      const res = await fetch(`${env.API_URI}/api/v1/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Refresh failed");
      const data = await res.json();
      setUser(data.user || data);
      return true;
    } catch {
      setUser(null);
      return false;
    }
  };

  // Check auth state on mount
  useEffect(() => {
    async function fetchMe() {
      setLoading(true);
      try {
        const res = await fetch(`${env.API_URI}/api/v1/auth/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user || data);
        } else if (res.status === 401) {
          // Try to refresh token if unauthorized
          const refreshed = await refreshToken();
          if (!refreshed) setUser(null);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchMe();
  }, []);

  // Login function
  const login = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch(`${env.API_URI}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      setUser(data.user || data);
      navigate("/");
      return true;
    } catch {
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await fetch(`${env.API_URI}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

    } finally {
      sessionStorage.clear();
      setUser(null);
      setLoading(false);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
