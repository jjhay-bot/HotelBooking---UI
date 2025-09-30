import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LocalHotelRoundedIcon from "@mui/icons-material/LocalHotelRounded";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function QuickActions() {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);
  const navigate = useNavigate();
  const auth = useAuth() || {};
  const user = auth.user;
  const logout = auth.logout || (() => {});

  // Define actions inside the component to access user and logout
  const actions = [
    { icon: <HomeIcon />, name: "Home", href: "/" },
    { icon: <LocalHotelRoundedIcon />, name: "Book Now", href: "/room/1" },
    { icon: <ContactMailIcon />, name: "Contact Us", href: "/contact" },
    {
      icon: <DashboardIcon />,
      name: "Admin Dashboard",
      href: "/admin/dashboard",
      role: "admin",
    },
    {
      icon: <LoginIcon />,
      name: "Login",
      href: "/login",
      showIf: () => !user,
    },
    {
      icon: <LogoutIcon />,
      name: "Logout",
      onClick: async () => {
        await logout();
      },
      showIf: () => !!user,
    },
  ];

  // Get user role from context (default to 'user' if not set)
  const userRole = user?.role || "user";

  // Filter actions based on role and showIf
  const filteredActions = actions.filter(
    (action) =>
      (!action.role || action.role === userRole) &&
      (!action.showIf || action.showIf(user)),
  );

  return (
    <Box position="relative" top={0} zIndex={1500}>
      <Box sx={{ height: 0, transform: "translateZ(0px)", flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", top: -23, right: 4, zIndex: 1500 }}
          FabProps={{
            component: motion.button,
            whileHover: { scale: 1.12, rotate: 8 },
            whileTap: { scale: 0.96, rotate: -8 },
            sx: { height: 46, width: 46, p: 0 },
            onClick: handleToggle,
          }}
          icon={<LocalHotelRoundedIcon />}
          direction="down"
          open={open}
        >
          {filteredActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              slotProps={{
                tooltip: { title: action.name },
                root: {
                  sx: {
                    backgroundColor: "background.paper",
                    opacity: 1,
                    zIndex: 1700,
                    boxShadow: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    "&:hover": {
                      backgroundColor: "background.paper",
                      opacity: 1,
                      zIndex: 1700,
                    },
                  },
                },
              }}
              onClick={() => {
                setOpen(false);
                if (action.onClick) {
                  action.onClick(navigate);
                } else if (action.href) {
                  navigate(action.href);
                }
              }}
            />
          ))}
        </SpeedDial>
      </Box>
    </Box>
  );
}
