import { Box, Typography, Stack } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";

export default function LocationNearby() {
  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <PlaceIcon fontSize="small" color="error" />
        Location & Nearby
      </Typography>
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <PlaceIcon fontSize="small" color="primary" />
          <Typography variant="body2">5 min walk to Central Beach</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <PlaceIcon fontSize="small" color="primary" />
          <Typography variant="body2">10 min to Downtown Shopping</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <PlaceIcon fontSize="small" color="primary" />
          <Typography variant="body2">15 min to Airport</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <PlaceIcon fontSize="small" color="primary" />
          <Typography variant="body2">2 min to Metro Station</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
