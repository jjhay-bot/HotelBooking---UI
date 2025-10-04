import { onError, onSuccess as onSuccessNotif } from "@/gql/uiActions";
import { useNavigate } from "react-router-dom";
import env from "@/constants/env";
import { useAuth as useAuthContext } from "@/context/AuthContext";

export function useAuth() {
  // Use context for user, login, register, etc.
  const { user, loading, login, logout, refreshToken, fetchMe } = useAuthContext();
  const navigate = useNavigate();

  // Login using context
  const loginHandler = async (formData, onSuccess) => {
    try {
      const responseSuccess = await login(formData);
      if (responseSuccess) {
        onSuccess();
        return;
      }
      await onSuccessNotif("Login successful!");
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

  return { user, loading, login: loginHandler, logout, refreshToken, fetchMe, register };
}
