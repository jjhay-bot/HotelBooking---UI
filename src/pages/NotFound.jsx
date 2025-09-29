import { Button, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function NotFound() {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <Stack className="centered" height="100%" gap={2}>
      <img src="/404-error.png" alt="" width={64} height={64} />
      <Typography variant="caption">Page Not Found :|</Typography>
      <Typography variant="body2">Click below to go back to the Landing page.</Typography>
      <Button size="small" variant="text" onClick={handleGoHome}>
        <ArrowBackIcon />
        Go to Landing
      </Button>
    </Stack>
  );
}
