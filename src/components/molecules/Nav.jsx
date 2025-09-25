import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function BottomNav({ value, setValue }) {
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
