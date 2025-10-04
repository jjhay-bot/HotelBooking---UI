// Utility for sanitizing and validating user input

export function validateAndSanitizeInput(value, type) {
  let sanitized = value;
  let error = "";

  switch (type) {
    case "name":
      sanitized = value.trim().replace(/[<>"'&]/g, "");
      if (!sanitized) error = "Name is required";
      break;
    case "email":
      sanitized = value.trim().toLowerCase();
      if (!sanitized) error = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(sanitized)) error = "Invalid email format";
      break;
    case "phone":
      sanitized = value.replace(/[^0-9]/g, "");
      if (!sanitized) error = "Phone number is required";
      else if (sanitized.length < 7) error = "Invalid phone number";
      break;
    case "password":
      // No sanitization for password, just validation
      if (!value) error = "Password is required";
      else if (value.length < 8) error = "Password must be at least 8 characters";
      else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) error = "Password must contain uppercase, lowercase, and number";
      break;
    case "confirmPassword":
      // Should be checked against password in form logic
      sanitized = value;
      if (!sanitized) error = "Please confirm your password";
      break;
    default:
      sanitized = value.trim();
  }

  return { sanitized, error };
}
