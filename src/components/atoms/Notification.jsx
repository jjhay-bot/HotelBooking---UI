import toast from "react-hot-toast";
import { Alert, IconButton, Slide, Snackbar, Typography } from "@mui/material";
import { CircleShadedIcon, CloseIcon, RejectedIcon } from "@assets/Icons";
import { color } from "@constants";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

// Custom Notification component for react-hot-toast
export const Notification = ({ t, type, message }) => (
  <Alert
    severity={type}
    iconMapping={{ success: <CircleShadedIcon />, error: <RejectedIcon /> }}
    slots={{ closeIcon: CloseIcon }}
    slotProps={{
      closeIcon: { fill: type === "success" ? color.green : "#ED5A29" },
    }}
    sx={{
      width: "420px",
      borderRadius: 2,
      boxShadow: 3,
      mb: 1,
      display: "flex",
      alignItems: "center",
      "& .MuiAlert-icon": { mr: 1 },
      "& .MuiAlert-action svg": { width: 24, height: 24 },
    }}
    action={
      <IconButton>
        <CloseIcon
          style={{ cursor: "pointer" }}
          onClick={() => toast.dismiss(t.id)}
          fill={type === "success" ? color.green : "#ED5A29"}
        />
      </IconButton>
    }
  >
    <Typography variant="toast" color={type}>
      {message}
    </Typography>
  </Alert>
);
