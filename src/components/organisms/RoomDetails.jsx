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
  Dialog,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import GalleryDetails from "@/components/molecules/GalleryDetails";
import { getRoomStatusStyle, getRoomStatusText, isRoomBookable } from "@/utils/roomUtils";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PeopleIcon from "@mui/icons-material/People";
import BedIcon from "@mui/icons-material/Bed";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useModal } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HotelPolicies from "@/components/organisms/HotelPolicies";
import RoomFeatures from "@/components/organisms/RoomFeatures";
import BookingSummary from "@/components/organisms/BookingSummary";
import GuestReviews from "@/components/organisms/GuestReviews";
import LocationNearby from "@/components/organisms/LocationNearby";
import { env } from "@/constants";
import { onError, onSuccess } from "@/gql/uiActions";
import { Login } from "@/pages";

export default function RoomDetails({ room }) {
  const theme = useTheme();
  const modal = useModal();

  // Booking state
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  // TODO: Replace with real user id and JWT from auth context
  const userId = 1;
  const JWT_TOKEN = sessionStorage.getItem("jwt");
  // Calculate total price
  let nights = 1;
  if (checkIn && checkOut) {
    nights = Math.max(1, Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24)));
  }
  const totalPrice = room ? (room.pricePerNight * nights + 5) * 1.12 : 0;

  const onBookNow = () => {
    modal.openModal();
  };

  const onConfirmBooking = async () => {
    let newErrors = {};
    setApiError("");
    // Validation
    if (!checkIn) newErrors.checkIn = "Check-in date is required";
    if (!checkOut) newErrors.checkOut = "Check-out date is required";

    if (checkIn && checkOut && checkOut <= checkIn)
      newErrors.checkOut = "Check-out must be after check-in";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      userId,
      roomId: room.id,
      startDate: checkIn.toISOString(),
      endDate: checkOut.toISOString(),
      status: "Reserved",
      totalPrice: Number(totalPrice.toFixed(2)),
      notes,
    };

    try {
      const res = await fetch(`${env.API_URI}/api/v1/bookings`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) {
        let msg = "Booking failed";
        if (res.status === 401) {
          msg = "You are not authorized. Please log in again.";
          setApiError(msg);
          onError(msg);
          setShowLoginDialog(true);
          return;
        }
        try {
          const data = await res.json();
          if (data && data.message) msg = data.message;
        } catch {
          console.log("Failed to parse error response");
        }
        setApiError(msg);
        onError(msg);
        return;
      }

      onSuccess("Booking successful!");
      modal.closeModal();
    } catch (e) {
      onError(e.message);
    }
  };

  useEffect(() => {
    if (modal.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal.open]);

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
        <CardContent sx={{ p: { xs: 1, md: 3 } }}>
          <Grid container spacing={{ xs: 3, md: 4 }} height="100%">
            {/* Gallery Section */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={3}>
                {/* Main Gallery */}
                <Stack
                  spacing={1}
                  alignItems="center"
                  sx={{ aspectRatio: 4 / 2, maxWidth: "100%" }}
                >
                  <GalleryDetails cards={room.gallery} />
                </Stack>

                <Stack display={{ xs: "none", md: "flex" }} spacing={3}>
                  {/* Hotel Policies Card */}
                  <HotelPolicies room={room} />

                  {/* Room Features Grid */}
                  <RoomFeatures room={room} />
                </Stack>
              </Stack>
            </Grid>

            {/* Room Information Section */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={2} height="100%">
                {/* Room Header */}
                <Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
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

                  <Typography
                    variant="h5"
                    color="primary.main"
                    fontWeight="bold"
                    textAlign="right"
                  >
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
                        <ListItemText primary={amenity} />
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
                        : "Under maintenance"}
                  </Typography>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant={isRoomBookable(room.status) ? "contained" : "outlined"}
                      startIcon={
                        <BookmarkIcon
                          sx={{
                            transform: "rotate(15deg)",
                            transition: "transform 0.2s ease-in-out",
                          }}
                        />
                      }
                      fullWidth
                      disabled={!isRoomBookable(room.status)}
                      size="large"
                      sx={{
                        "&:hover .MuiSvgIcon-root": {
                          transform: "rotate(-0deg)",
                        },
                      }}
                      onClick={onBookNow}
                    >
                      {/* Book now */}
                      {getRoomStatusText(room.status)}
                    </Button>
                  </motion.div>
                </Box>

                <Stack display={{ xs: "flex", md: "none" }} spacing={3}>
                  {/* Hotel Policies Card */}
                  <HotelPolicies room={room} />

                  {/* Room Features Grid */}
                  <RoomFeatures room={room} />
                </Stack>

                <Divider />

                {/* Guest Reviews Preview */}
                <GuestReviews />

                <Divider />

                {/* Location & Nearby Attractions */}
                <LocationNearby />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog open={modal.open} onClose={modal.closeModal} maxWidth="sm" fullWidth>
        <BookingSummary
          room={room}
          modal={modal}
          checkIn={checkIn}
          checkOut={checkOut}
          onCheckInChange={setCheckIn}
          onCheckOutChange={setCheckOut}
          onConfirmBooking={onConfirmBooking}
          notes={notes}
          onNotesChange={setNotes}
          errors={errors}
          apiError={apiError}
        />
      </Dialog>

      <Dialog
        open={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        maxWidth="sm"
        // fullWidth
        sx={{ height: "100%" }}
      >
        <Login onSuccess={() => setShowLoginDialog(false)} hideLinks />
      </Dialog>
    </>
  );
}
