import { useReactiveVar } from "@apollo/client";
import { CircleShadedIcon, CloseIcon, RejectedIcon } from "@assets/Icons";
import { color } from "@constants";
import { alertVar } from "@gql/reactiveVar";
import { resetAlert } from "@gql/uiActions";
import { Alert, Slide, Snackbar, Typography } from "@mui/material";

function TransitionLeft(props) {
  return <Slide {...props} direction="up" />;
}

export const Notification = () => {
  const alert = useReactiveVar(alertVar);

  if (!alert) return null;

  return (
    alert && (
      <Snackbar
        open={true}
        autoHideDuration={3000}
        onClose={resetAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        slots={{ transition: TransitionLeft }}
        sx={{ mb: { xs: 3, md: 1 } }}
      >
        <Alert
          onClose={resetAlert}
          severity={alert.type}
          iconMapping={{ success: <CircleShadedIcon />, error: <RejectedIcon /> }}
          slots={{ closeIcon: CloseIcon }}
          slotProps={{
            closeIcon: { fill: alert.type === "success" ? color.green : "#ED5A29" },
          }}
          sx={{
            width: "420px",
            borderRadius: 2,
            "& .MuiAlert-icon": { mr: 1 },
            "& .MuiAlert-action svg": { width: 24, height: 24 },
          }}
        >
          <Typography variant="toast" color={alert.type}>
            {alert.message}
          </Typography>
        </Alert>
      </Snackbar>
    )
  );
};
