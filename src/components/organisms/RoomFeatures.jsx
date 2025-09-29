import { Card, CardContent, Typography, Grid, Stack } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";

export default function RoomFeatures({ room }) {
  return (
    <Card sx={{ borderRadius: 3, bgcolor: "grey.50" }}>
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <WifiIcon fontSize="small" color="primary" />
          Room Features
        </Typography>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <WifiIcon fontSize="small" color="success" />
              <Typography variant="body2">
                {room.features?.wifi || "High-speed WiFi"}
              </Typography>
            </Stack>
          </Grid>
          <Grid size={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocalParkingIcon fontSize="small" color="primary" />
              <Typography variant="body2">
                {room.features?.parking || "Free parking"}
              </Typography>
            </Stack>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>WiFi Speed:</strong>{" "}
              {room.features?.wifiSpeed || "100 Mbps"}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Room Service:</strong>{" "}
              {room.features?.roomService || "24/7"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
