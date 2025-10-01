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
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Login({ hideLinks = false, onSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call login and navigate based on role
    await login(formData, onSuccess);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100%", p: 2 }}
    >
      <Grid size={{ xs: 12 }} sx={{ maxWidth: 400, width: "100%" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Card elevation={3}>
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {/* Header */}
                <Grid size={12} textAlign="center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <PersonIcon sx={{ fontSize: 36, color: "primary.main", mb: 2 }} />
                  </motion.div>
                  <Typography variant="h3" gutterBottom>
                    Welcome Back
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Please sign in to your account
                  </Typography>
                </Grid>

                {/* Form */}
                <Grid size={12}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={1.75}>
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
                                  <PersonIcon color="action" />
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      </Grid>

                      {/* Password Field */}
                      <Grid size={12}>
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
                            startIcon={<LoginIcon />}
                            sx={{ py: 1.5 }}
                          >
                            Sign In
                          </Button>
                        </motion.div>
                      </Grid>

                      {/* Forgot Password Link */}
                      {!hideLinks && (
                        <Grid size={12} textAlign="center">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="text"
                              size="small"
                              sx={{ textTransform: "none" }}
                            >
                              Forgot your password?
                            </Button>
                          </motion.div>
                        </Grid>
                      )}

                      {/* Sign Up Link */}
                      {!hideLinks && (
                        <Grid size={12} textAlign="center">
                          <Typography variant="body2" color="text.secondary">
                            Don't have an account?{" "}
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              style={{ display: "inline-block" }}
                            >
                              <Button
                                variant="text"
                                size="small"
                                sx={{ textTransform: "none", p: 0, minWidth: "auto" }}
                                onClick={() => navigate("/register")}
                              >
                                Sign up here
                              </Button>
                            </motion.span>
                          </Typography>
                        </Grid>
                      )}
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
