import { Card, CardContent, Typography, Grid, Stack } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import PetsIcon from "@mui/icons-material/Pets";
import CancelIcon from "@mui/icons-material/Cancel";

export default function HotelPolicies({ room }) {
  return (
    <Card sx={{ borderRadius: 3, bgcolor: "grey.50" }}>
      <CardContent sx={{ p: { xs: 1, md: 2 } }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <AccessTimeIcon fontSize="small" color="primary" />
          Hotel Policies
        </Typography>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Check-in:</strong> {room.checkIn || "2:00 PM"}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Check-out:</strong> {room.checkOut || "12:00 PM"}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <SmokeFreeIcon fontSize="small" color="success" />
              <Typography variant="body2">
                {room.policies?.smoking === false
                  ? "Non-smoking"
                  : "Smoking allowed"}
              </Typography>
            </Stack>
          </Grid>
          <Grid size={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <PetsIcon fontSize="small" color="primary" />
              <Typography variant="body2">
                {room.policies?.pets ? "Pet-friendly" : "No pets allowed"}
              </Typography>
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CancelIcon fontSize="small" color="warning" />
              <Typography variant="body2">
                {room.policies?.cancellation ||
                  "Free cancellation until 24h before"}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
