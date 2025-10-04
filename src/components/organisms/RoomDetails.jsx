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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useModal } from "@/hooks";
import { useEffect } from "react";
import HotelPolicies from "@/components/organisms/HotelPolicies";
import RoomFeatures from "@/components/organisms/RoomFeatures";
import BookingSummary from "@/components/organisms/BookingSummary";
import GuestReviews from "@/components/organisms/GuestReviews";
import LocationNearby from "@/components/organisms/LocationNearby";
import { Login } from "@/pages";
import { lowerCase } from "lodash";
import { useRoomDetails } from "@/hooks/useRoomDetails";
import RoomSpecs from "@/components/RoomSpecs";
import { addDays } from "date-fns";

export default function RoomDetails({ room: initialRoom }) {
  const theme = useTheme();
  const modal = useModal();

  const {
    room,
    loading,
    error,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    notes,
    setNotes,
    errors,
    apiError,
    showLoginDialog,
    setShowLoginDialog,
    bookRoom,
  } = useRoomDetails(initialRoom?.id);

  const onBookNow = () => {
    setCheckIn(null);
    setCheckOut(null);
    modal.openModal();
  };

  const onConfirmBooking = async () => {
    const success = await bookRoom();
    if (success) {
      modal.closeModal();
    }
  };

  // Add a handler to auto-set check-out date +1 day after check-in using date-fns
  const handleCheckInChange = (date) => {
    setCheckIn(date);
    if (date) {
      const nextDay = addDays(new Date(date), 1);
      setCheckOut(nextDay);
    } else {
      setCheckOut(null);
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

  if (loading) {
    return (
      <Card sx={{ borderRadius: 6 }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            Loading room details...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (error || !room) {
    return (
      <Card sx={{ borderRadius: 6 }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            {error?.message || "Failed to load room details. Please try again later."}
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
                      sx={getRoomStatusStyle(lowerCase(room.status), theme)}
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
                <RoomSpecs room={room} />

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
          onCheckInChange={handleCheckInChange}
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
