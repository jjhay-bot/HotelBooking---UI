import { onError, onSuccess as onSuccessNotif } from "@/gql/uiActions";
import { useNavigate } from "react-router-dom";
import env from "@/constants/env";
import { lowerCase } from "lodash";

export function useAuth() {
  const navigate = useNavigate();

  // Login using API
  const login = async (formData, onSuccess) => {
    try {
      const res = await fetch(`${env.API_URI}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include", // Accept and send cookies for authentication
      });
      if (!res.ok) {
        const errorData = await res.json();
        return onError(errorData.message || "Login failed. Please try again.");
      }
      const data = await res.json();
      const user = data.user || data; // Adjust if API shape is different
      // Set session (optional)
      console.log("user", user);

      if (data.token) {
        sessionStorage.setItem("jwt", data.token);
      }
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("userRole", lowerCase(user.role));
      // Navigate based on role
      if (onSuccess) {
        onSuccess();
        return;
      }
      onSuccessNotif("Login successful!");
      if (lowerCase(user.role) === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
      return user;
    } catch (err) {
      return onError(err.message || "Network error. Please try again.");
    }
  };

  // Register using API
  const register = async (formData) => {
    try {
      const res = await fetch(`${env.API_URI}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          age: formData.age, // Not supported yet
          password: formData.password,
          role: "User",
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        return onError(errorData.message || "Registration failed. Please try again.");
      }
      const data = await res.json();
      // Optionally auto-login or redirect
      navigate("/login");
      return data;
    } catch (err) {
      return onError(err.message || "Network error. Please try again.");
    }
  };

  return { login, register };
}
