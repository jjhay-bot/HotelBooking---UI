import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Paper,
  Dialog,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import GalleryDetails from "@/components/molecules/GalleryDetails";
import { getRoomStatusStyle, getRoomStatusText, isRoomBookable } from "@/utils/roomUtils";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PeopleIcon from '@mui/icons-material/People';
import BedIcon from '@mui/icons-material/Bed';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import PetsIcon from '@mui/icons-material/Pets';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import PlaceIcon from '@mui/icons-material/Place';
import { useModal } from "@/hooks";

export default function RoomDetails({ room }) {
  const theme = useTheme();
  const modal = useModal()

  const onBookNow = () => {
    // console.log(`Booking room: ${room.roomType}`);
    modal.openModal()
  }

  if (!room) {
    return (
      <Card sx={{ borderRadius: 6 }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            Select a room to view details
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card sx={{ borderRadius: 6, height: "100%" }}>
        <CardContent sx={{ p: { xs: 1, md: 3 } }} >
          <Grid container spacing={{ xs: 3, md: 4 }} height="100%">
            {/* Gallery Section */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={3}>
                {/* Main Gallery */}
                <Stack spacing={1} alignItems='center' sx={{ aspectRatio: 4 / 2, maxWidth: '100%' }}  >
                  <GalleryDetails cards={room.gallery} />
                </Stack>

                {/* Hotel Policies Card */}
                <Card sx={{ borderRadius: 3, bgcolor: 'grey.50' }}>
                  <CardContent sx={{ p: { xs: 1, md: 2 } }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon fontSize="small" color="primary" />
                      Hotel Policies
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={6}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Check-in:</strong> 3:00 PM
                        </Typography>
                      </Grid>
                      <Grid size={6}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Check-out:</strong> 11:00 AM
                        </Typography>
                      </Grid>
                      <Grid size={6}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <SmokeFreeIcon fontSize="small" color="success" />
                          <Typography variant="body2">Non-smoking</Typography>
                        </Stack>
                      </Grid>
                      <Grid size={6}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <PetsIcon fontSize="small" color="primary" />
                          <Typography variant="body2">Pet-friendly</Typography>
                        </Stack>
                      </Grid>
                      <Grid size={12}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <CancelIcon fontSize="small" color="warning" />
                          <Typography variant="body2">Free cancellation until 24h before</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Room Features Grid */}
                <Card sx={{ borderRadius: 3, bgcolor: 'grey.50' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WifiIcon fontSize="small" color="primary" />
                      Room Features
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={6}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <WifiIcon fontSize="small" color="success" />
                          <Typography variant="body2">High-speed WiFi</Typography>
                        </Stack>
                      </Grid>
                      <Grid size={6}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <LocalParkingIcon fontSize="small" color="primary" />
                          <Typography variant="body2">Free parking</Typography>
                        </Stack>
                      </Grid>
                      <Grid size={6}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>WiFi Speed:</strong> 100 Mbps
                        </Typography>
                      </Grid>
                      <Grid size={6}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Room Service:</strong> 24/7
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>

            {/* Room Information Section */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={2} height="100%">
                {/* Room Header */}
                <Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h4" fontWeight="bold">
                      {room.roomType}
                    </Typography>
                    <Chip
                      label={room.status}
                      size="small"
                      sx={getRoomStatusStyle(room.status, theme)}
                    />
                  </Box>

                  <Typography variant="body1" color="text.secondary" mb={2}>
                    Room #{room.roomNumber} • Floor {room.floor}
                  </Typography>


                  <Typography variant="h5" color="primary.main" fontWeight="bold" textAlign='right'>
                    ${room.pricePerNight}/night
                  </Typography>
                </Box>

                <Divider />

                {/* Room Description */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {room.description}
                  </Typography>
                </Box>

                <Divider />

                {/* Room Specifications */}
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
                        <Typography variant="body2">
                          {room.bedType}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid size={6}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <SquareFootIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          {room.size}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid size={6}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          Floor {room.floor}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                {/* Amenities */}
                <Box flex={1}>
                  <Typography variant="h6" gutterBottom>
                    Amenities
                  </Typography>
                  <List dense sx={{ py: 0 }}>
                    {room.amenities.map((amenity, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircleIcon
                            fontSize="small"
                            sx={{ color: theme.palette.success.main }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={amenity}
                          primaryTypographyProps={{ variant: "body2" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                {/* Availability & Booking */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Availability
                  </Typography>
                  <Typography
                    variant="body2"
                    color={isRoomBookable(room.status) ? "success.main" : "error.main"}
                    mb={2}
                  >
                    {isRoomBookable(room.status)
                      ? "Available for booking"
                      : room.status === "occupied"
                        ? "Currently occupied"
                        : "Under maintenance"
                    }
                  </Typography>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={isRoomBookable(room.status) ? 'contained' : 'outlined'}
                      startIcon={
                        <BookmarkIcon
                          sx={{
                            transform: 'rotate(15deg)',
                            transition: 'transform 0.2s ease-in-out',
                          }}
                        />
                      }
                      fullWidth
                      disabled={!isRoomBookable(room.status)}
                      size="large"
                      sx={{
                        '&:hover .MuiSvgIcon-root': {
                          transform: 'rotate(-0deg)',
                        }
                      }}
                      onClick={onBookNow}
                    >
                      {getRoomStatusText(room.status)}
                    </Button>
                  </motion.div>
                </Box>

                <Divider />

                {/* Guest Reviews Preview */}
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StarIcon fontSize="small" color="warning" />
                    Guest Reviews
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Rating value={4.8} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                      4.8 out of 5 (124 reviews)
                    </Typography>
                  </Box>
                  <Stack spacing={1}>
                    <Paper sx={{ p: 1.5, borderRadius: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                        "Amazing room with stunning views! The amenities were top-notch."
                      </Typography>
                      <Grid container sx={{ justifyContent: 'end' }}>
                        <Typography variant="caption" color="text.secondary" mt={0.5}>
                          - Sarah M., 2 days ago
                        </Typography>
                      </Grid>
                    </Paper>

                    <Paper sx={{ p: 1.5, borderRadius: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                        "Perfect location and excellent service. Highly recommended!"
                      </Typography>
                      <Grid container sx={{ justifyContent: 'end' }}>
                        <Typography variant="caption" color="text.secondary" mt={0.5}>
                          - John D., 1 week ago
                        </Typography>
                      </Grid>
                    </Paper>
                  </Stack>
                </Box>

                <Divider />

                {/* Location & Nearby Attractions */}
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card >

      <Dialog open={modal.open} onClose={modal.closeModal} maxWidth="sm" fullWidth>
        <Stack p={{ xs: 1.25, md: 2.5 }} spacing={3}>
          {/* Header */}
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Booking Summary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Review your reservation details before confirming
            </Typography>

            <Divider sx={{ mt: 1 }} />
          </Box>


          {/* Room Information */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BedIcon fontSize="small" color="primary" />
              Room Details
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid size={8}>
                  <Typography variant="subtitle1" fontWeight="600">
                    {room.roomType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Room #{room.roomNumber} • Floor {room.floor}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {room.bedType} • Up to {room.capacity} guests • {room.size}
                  </Typography>
                </Grid>
                <Grid size={4} sx={{ textAlign: 'right' }}>
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
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon fontSize="small" color="primary" />
              Stay Duration
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <Typography variant="body2" color="text.secondary">
                    Check-in
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="600">
                    Dec 24, 2024
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    3:00 PM
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="body2" color="text.secondary">
                    Check-out
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="600">
                    Dec 27, 2024
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    11:00 AM
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>

          {/* Price Breakdown */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Price Breakdown
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Stack spacing={1}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2">
                    ${room.pricePerNight} × 3 nights
                  </Typography>
                  <Typography variant="body2">
                    ${room.pricePerNight * 3}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2">
                    Service fee
                  </Typography>
                  <Typography variant="body2">
                    $25
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2">
                    Taxes
                  </Typography>
                  <Typography variant="body2">
                    ${Math.round((room.pricePerNight * 3 + 25) * 0.12)}
                  </Typography>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                    ${Math.round((room.pricePerNight * 3 + 25) * 1.12)}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Box>

          {/* Action Buttons */}
          <Grid container spacing={2}>
            <Grid size={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={modal.closeModal}
              >
                Cancel
              </Button>
            </Grid>

            <Grid size={6}>
              <Button
                variant="contained"
                fullWidth
              >
                Confirm Booking
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Dialog>
    </>
  );
}
