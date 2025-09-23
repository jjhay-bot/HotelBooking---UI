import { ChevronRightIcon } from "@/assets/Icons";
import { Typography } from "@mui/material";

export default function CTA({ label, action }) {
  return (
    <Typography
      variant="body2"
      color="primary"
      sx={{
        cursor: "pointer",
        display: "flex",
        placeItems: "center",
        fontWeight: 800,
      }}
      onClick={action}
    >
      <span>{label}</span>
      <ChevronRightIcon />
    </Typography>
  );
}
