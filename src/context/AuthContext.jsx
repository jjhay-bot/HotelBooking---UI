import { createContext, useContext, useState, useEffect, useCallback } from "react";
import env from "@/constants/env";
import { se } from "date-fns/locale";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Refresh token function
  const refreshToken = useCallback(async () => {
    // Don't refresh during logout
    if (isLoggingOut) return false;

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
  }, [isLoggingOut]);

  // Check auth state on mount
  useEffect(() => {
    // Don't check auth status if we're logging out or if logout was just completed
    const justLoggedOut = localStorage.getItem('justLoggedOut');
    if (isLoggingOut || justLoggedOut) {
      if (justLoggedOut) {
        localStorage.removeItem('justLoggedOut');
        setUser(null);
        setLoading(false);
      }
      return;
    }

    async function fetchMe() {
      setLoading(true);

      try {
        // skip /me for local dev ONLY
        if (env.STAGE === 'local2') {
          setUser({
            "id": 12,
            "email": "admin@gm.com",
            "role": "Admin",
            "firstName": "admin",
            "lastName": "jhay",
            "age": 30,
            "isActive": true
          })
          setLoading(false);
          return
        }

        const res = await fetch(`${env.API_URI}/api/v1/auth/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user || data);
        } else if (res.status === 401) {
          // Do not call refreshToken if /me returns 401
          setUser(null);
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
  }, [refreshToken, isLoggingOut]);

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
    setIsLoggingOut(true);
    setLoading(true);
    try {
      await fetch(`${env.API_URI}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Clear any remaining session data
      sessionStorage.clear();
      localStorage.clear();
      setUser(null);
      setLoading(false);
      setIsLoggingOut(false);
      // Use a small delay before redirect to ensure state is set
      setTimeout(() => {
        window.location.replace("/login");
      }, 100);
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
