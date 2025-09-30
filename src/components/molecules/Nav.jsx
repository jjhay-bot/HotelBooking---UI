import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect } from "react";

export default function BottomNav({ value, setValue }) {
  // Check if user is admin
  const isAdmin = sessionStorage.getItem("userRole") === "admin";
  useEffect(() => {}, []); // For SSR safety if needed
  if (!isAdmin) return null;
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        border: "none",
        bgcolor: "transparent",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Users" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Rooms" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Archive" icon={<FavoriteIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
