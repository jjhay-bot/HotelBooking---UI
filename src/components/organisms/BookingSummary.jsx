import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DatePick from "@components/atoms/DatePick";

const SERVICE_FEE = 5;
const TAX_RATE = 0.12;
// If you have standard check-in/out times, set them in the date values passed as props.

export default function BookingSummary({
  room,
  modal,
  onConfirmBooking,
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  notes,
  onNotesChange,
  errors = {},
}) {
  // Compute nights
  let nights = 1;
  let checkInDate = checkIn ? new Date(checkIn) : null;
  let checkOutDate = checkOut ? new Date(checkOut) : null;
  if (checkInDate && checkOutDate) {
    nights = Math.max(
      1,
      Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)),
    );
  }

  // Price breakdown
  const subtotal = room.pricePerNight * nights;
  const serviceFee = SERVICE_FEE;
  const taxes = Math.round((subtotal + serviceFee) * TAX_RATE);
  const total = Math.round((subtotal + serviceFee) * (1 + TAX_RATE));

  return (
    <Stack
      p={0}
      spacing={1}
      sx={{ height: { xs: "100%", md: 600 }, maxHeight: "90vh", display: "flex" }}
    >
      {/* Header */}
      <Box
        sx={{
          p: { xs: 1.25, md: 2.5 },
          borderBottom: 1,
          borderColor: "divider",
          position: "sticky",
          top: 0,
          zIndex: 2,
          bgcolor: "background.paper",
          flexShrink: 0,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Booking Summary
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review your reservation details before confirming
        </Typography>
      </Box>

      {/* Scrollable Content */}
      <Stack
        sx={{
          flex: 1,
          overflowY: "auto",
          p: { xs: 1.25, md: 2.5 },
          bgcolor: "background.paper",
        }}
        spacing={2}
      >
        {/* Room Information */}
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <BedIcon fontSize="small" color="primary" />
            Room Details
          </Typography>

          <Paper sx={{ p: 2, bgcolor: "grey.50", borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid size={8}>
                <Typography variant="subtitle1" fontWeight="600">
                  {room.roomType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Room #{room.roomNumber} • Floor {room.floor}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {room.bedType} • Up to
                  <b>
                    &nbsp;
                    {room.capacity} guests &nbsp;
                  </b>
                  • {room.size}
                </Typography>
              </Grid>
              <Grid size={4} sx={{ textAlign: "right" }}>
                <Typography variant="h6" color="primary.main" fontWeight="bold">
                  ${room.pricePerNight}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  per night
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Booking Dates */}
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <AccessTimeIcon fontSize="small" color="primary" />
            Stay Duration
          </Typography>
          <Paper sx={{ p: 2, bgcolor: "grey.50", borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography variant="body2" color="text.secondary">
                  Check-in
                </Typography>

                {/* Check-in/out Inputs */}

                <DatePick label="" value={checkInDate} onChange={onCheckInChange} />
                {errors.checkIn && (
                  <Typography
                    color="error"
                    variant="body2"
                    align="center"
                    sx={{ mt: 0.5 }}
                  >
                    {errors.checkIn}
                  </Typography>
                )}

                {/* <Typography variant="subtitle1" fontWeight="600">
                  {checkInDay}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {checkInTime}
                </Typography> */}
              </Grid>
              <Grid size={6}>
                <Typography variant="body2" color="text.secondary">
                  Check-out
                </Typography>
                <DatePick label="" value={checkOutDate} onChange={onCheckOutChange} />
                {errors.checkOut && (
                  <Typography
                    color="error"
                    variant="body2"
                    align="center"
                    sx={{ mt: 0.5 }}
                  >
                    {errors.checkOut}
                  </Typography>
                )}

                {/* <Typography variant="subtitle1" fontWeight="600">
                  {checkOutDay}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {checkOutTime}
                </Typography> */}
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Price Breakdown */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Price Breakdown
          </Typography>
          <Paper sx={{ p: 2, bgcolor: "grey.50", borderRadius: 2 }}>
            <Stack spacing={1}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">
                  ${room.pricePerNight} × {nights} night{nights > 1 ? "s" : ""}
                </Typography>
                <Typography variant="body2">${subtotal}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Service fee</Typography>
                <Typography variant="body2">${serviceFee}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Taxes</Typography>
                <Typography variant="body2">${taxes}</Typography>
              </Box>
              <Divider />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                  ${total}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Box>
        {/* Notes Input */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Notes
          </Typography>
          <Paper sx={{ p: 0, bgcolor: "grey.50", borderRadius: 3, overflow: "clip" }}>
            <TextField
              label=""
              value={notes}
              onChange={(e) => onNotesChange?.(e.target.value)}
              multiline
              minRows={2}
              fullWidth
              variant="outlined"
              sx={{ bgcolor: "white" }}
              error={Boolean(errors.notes)}
              helperText={errors.notes}
            />
          </Paper>
        </Box>
      </Stack>

      {/* Action Buttons */}
      <Grid
        container
        spacing={2}
        sx={{
          p: { xs: 1.25, md: 2.5 },
          borderTop: 1,
          borderColor: "divider",
          position: "sticky",
          bottom: 0,
          zIndex: 2,
          bgcolor: "background.paper",
          flexShrink: 0,
        }}
      >
        <Grid size={6}>
          <Button variant="outlined" fullWidth onClick={modal.closeModal}>
            Cancel
          </Button>
        </Grid>
        <Grid size={6}>
          <Button fullWidth variant="contained" onClick={onConfirmBooking}>
            Confirm
            <Box component="span" pl={1} sx={{ display: { xs: "none", sm: "block" } }}>
              Booking
            </Box>
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
}
