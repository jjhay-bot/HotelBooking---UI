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

export default function RoomDetails({ room }) {
  const theme = useTheme();

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
  );
}
