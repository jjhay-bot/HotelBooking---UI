import { createContext, useContext, useState, useEffect, useCallback } from "react";
import env from "@/constants/env";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [csrfToken, setCsrfToken] = useState(null);

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

  // Helper to fetch user info after login
  const fetchMe = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${env.API_URI}/api/v1/auth/me`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || data);
      } else {
        setUser(null);
      }
    } catch {
      setUser({ "role": "guest" })
    } finally {
      setLoading(false);
    }
  };

  // Fetch CSRF token once and reuse
  const getCsrfToken = useCallback(async () => {
    if (csrfToken) return csrfToken;
    try {
      const res = await fetch(`${env.API_URI}/api/v1/csrf-sessions`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("You are not authorized. Please log in to continue.");
      const data = await res.json();
      setCsrfToken(data.csrfToken);
      return data.csrfToken;
    } catch {
      setCsrfToken(null);
      return null;
    }
  }, [csrfToken]);

  // Check auth state on mount
  useEffect(() => {
    async function initialFetchMe() {
      setLoading(true);

      try {
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

    if (!window.location.pathname.match(/login|register/gi)) {
      initialFetchMe();
    }
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
      if (!res.ok) {
        let errorMsg = "Login failed";
        const errorData = await res.json();
        if (errorData && errorData.message) errorMsg = errorData.message;
        setUser(null);
        throw new Error(errorMsg);
      }
      await fetchMe(); // <-- fetch user info after login
    } catch (e) {
      setUser(null);
      throw new Error(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async (navigateFn) => {
    setIsLoggingOut(true);
    setLoading(true);
    const token = await getCsrfToken();

    try {
      await fetch(`${env.API_URI}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "X-CSRF-Token": token }
      });
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      localStorage.clear();
      setUser(null);
      setLoading(false);
      setIsLoggingOut(false);
      // Use navigate function from component
      if (navigateFn) navigateFn("/login", { replace: true });
    }
  };

  // Utility: refresh and retry pattern
  async function refreshTokenAndRetry(url, options = {}) {
    // First attempt
    let res = await fetch(url, options);
    // Only refresh and retry if not a /me call
    if (res.status === 401 && !url.includes('/me')) {
      // Try to refresh token
      const refreshed = await refreshToken();
      if (refreshed) {
        // Retry original request once
        res = await fetch(url, options);
      }
    }
    return res;
  }

  // Utility: fetch with CSRF for /bookings endpoints only
  const fetchWithCsrf = useCallback(async (url, options = {}) => {
    if (!url.includes("/bookings")) {
      // Not a bookings endpoint, just fetch
      return fetch(url, options);
    }
    // Ensure CSRF token is present
    const token = await getCsrfToken();
    if (!token) throw new Error("You are not authorized. Please log in to continue.");
    // Add CSRF token to headers
    const headers = {
      ...(options.headers || {}),
      "X-CSRF-Token": token,
    };
    return fetch(url, { ...options, headers });
  }, [getCsrfToken]);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      refreshToken,
      fetchMe,
      refreshTokenAndRetry,
      fetchWithCsrf, // Expose CSRF utility
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
