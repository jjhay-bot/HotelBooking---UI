import { Stack, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Stack className="centered" height="100%" gap={2}>
      <img src="/404-error.png" alt="" width={64} height={64} />
      <Typography variant="caption">Page Not Found :|</Typography>
    </Stack>
  );
}
