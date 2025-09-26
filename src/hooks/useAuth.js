import { onError } from "@/gql/uiActions";
import { useNavigate } from "react-router-dom";

// Dummy login function for demonstration. Replace with real API call.
export function useAuth() {
  const navigate = useNavigate();

  // Simulate login: expects { email, password } and returns a user object
  const login = async (formData) => {
    // TODO: Replace with real authentication logic
    // Example: fetch user from API and get their role
    // For now, hardcode role based on email for demo
    let user;

    // Simple validation
    if (formData?.password !== "123456") {
      return onError("Invalid credentials. Please check your email and password.");
    }

    if (formData.email.match(/admin/)) {
      user = { role: "admin" };
    } else {
      user = { role: "user" };
    }
    // Set session (optional)
    sessionStorage.setItem("isAuthenticated", "true");
    sessionStorage.setItem("userRole", user.role);

    // Navigate based on role
    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
    return user;
  };

  return { login };
}
