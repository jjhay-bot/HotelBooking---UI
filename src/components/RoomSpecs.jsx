import { Box, Typography, Grid, Stack } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import BedIcon from "@mui/icons-material/Bed";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function RoomSpecs({ room }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Room Details
      </Typography>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Stack direction="row" spacing={1} alignItems="center">
            <PeopleIcon fontSize="small" color="action" />
            <Typography variant="body2">
              Up to {room.capacity} guests
            </Typography>
          </Stack>
        </Grid>
        <Grid size={6}>
          <Stack direction="row" spacing={1} alignItems="center">
            <BedIcon fontSize="small" color="action" />
            <Typography variant="body2">{room.bedType}</Typography>
          </Stack>
        </Grid>
        <Grid size={6}>
          <Stack direction="row" spacing={1} alignItems="center">
            <SquareFootIcon fontSize="small" color="action" />
            <Typography variant="body2">{room.size}</Typography>
          </Stack>
        </Grid>
        <Grid size={6}>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOnIcon fontSize="small" color="action" />
            <Typography variant="body2">Floor {room.floor}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
