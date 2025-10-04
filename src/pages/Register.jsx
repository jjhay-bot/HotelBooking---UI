import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import FormTextField from "@/components/atoms/FormTextField";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { validateAndSanitizeInput } from "@/utils/security/inputValidation";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    age: 30,
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Sanitize and validate each field
    const firstNameResult = validateAndSanitizeInput(formData.firstName, "name");
    const lastNameResult = validateAndSanitizeInput(formData.lastName, "name");
    const emailResult = validateAndSanitizeInput(formData.email, "email");
    const passwordResult = validateAndSanitizeInput(formData.password, "password");
    const confirmPasswordResult = validateAndSanitizeInput(formData.confirmPassword, "confirmPassword");

    if (firstNameResult.error) newErrors.first_name = firstNameResult.error;
    if (lastNameResult.error) newErrors.last_name = lastNameResult.error;
    if (emailResult.error) newErrors.email = emailResult.error;
    if (passwordResult.error) newErrors.password = passwordResult.error;
    if (confirmPasswordResult.error) newErrors.confirm_password = confirmPasswordResult.error;
    if (!newErrors.confirm_password && formData.password !== formData.confirmPassword) {
      newErrors.confirm_password = "Passwords do not match";
    }

    // Optionally update formData with sanitized values
    setFormData((prev) => ({
      ...prev,
      firstName: firstNameResult.sanitized,
      lastName: lastNameResult.sanitized,
      email: emailResult.sanitized,
      // password and confirmPassword are not sanitized for security reasons
    }));

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    await register(formData);
    setSubmitting(false);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", p: 2 }}
    >
      <Grid size={{ xs: 12, sm: 10, md: 8, lg: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Card elevation={3}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={3}>
                {/* Header */}
                <Grid size={12} textAlign="center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <PersonAddIcon sx={{ fontSize: 36, color: "primary.main", mb: 2 }} />
                  </motion.div>
                  <Typography variant="h4" gutterBottom>
                    Create Account
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Join us today and get started
                  </Typography>
                </Grid>

                {/* Form */}
                <Grid size={12}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={1.75}>
                      {/* Name Fields */}
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <FormTextField
                          name="firstName"
                          label="First Name"
                          value={formData.firstName}
                          onChange={handleInputChange("firstName")}
                          errors={errors}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon color="action" />
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <FormTextField
                          name="lastName"
                          label="Last Name"
                          value={formData.lastName}
                          onChange={handleInputChange("lastName")}
                          errors={errors}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon color="action" />
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      </Grid>

                      {/* Email Field */}
                      <Grid size={12}>
                        <FormTextField
                          name="email"
                          label="Email Address"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange("email")}
                          errors={errors}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailIcon color="action" />
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      </Grid>

                      {/* Phone Field */}
                      {/* <Grid size={12}>
                        <FormTextField
                          name="phone"
                          label="Phone Number"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange('phone')}
                          errors={errors}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PhoneIcon color="action" />
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      </Grid> */}

                      {/* Password Fields */}
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <FormTextField
                          name="password"
                          label="Password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleInputChange("password")}
                          errors={errors}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockIcon color="action" />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    size="small"
                                  >
                                    {showPassword ? (
                                      <VisibilityOffIcon />
                                    ) : (
                                      <VisibilityIcon />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <FormTextField
                          name="confirmPassword"
                          label="Confirm Password"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleInputChange("confirmPassword")}
                          errors={errors}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockIcon color="action" />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    edge="end"
                                    size="small"
                                  >
                                    {showConfirmPassword ? (
                                      <VisibilityOffIcon />
                                    ) : (
                                      <VisibilityIcon />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      </Grid>

                      {/* Password Requirements */}
                      <Grid size={12}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block", mt: 1 }}
                        >
                          Password must be at least 8 characters and contain uppercase,
                          lowercase, and number
                        </Typography>
                      </Grid>

                      {/* Submit Button */}
                      <Grid size={12} pt={2}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            type="submit"
                            startIcon={<PersonAddIcon />}
                            sx={{ py: 1.5 }}
                            disabled={submitting}
                          >
                            {submitting ? "Creating Account..." : "Create Account"}
                          </Button>
                        </motion.div>
                      </Grid>

                      {/* Login Link */}
                      <Grid size={12} textAlign="center">
                        <Typography variant="body2" color="text.secondary">
                          Already have an account?{" "}
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ display: "inline-block" }}
                          >
                            <Button
                              variant="text"
                              size="small"
                              sx={{ textTransform: "none", p: 0, minWidth: "auto" }}
                              onClick={() => navigate("/login")}
                            >
                              Sign in here
                            </Button>
                          </motion.span>
                        </Typography>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>
    </Grid>
  );
}
