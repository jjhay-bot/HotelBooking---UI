import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import Gallery from "@/components/molecules/Gallery";
import PeopleIcon from "@mui/icons-material/People";
import { useTheme } from "@mui/material/styles";
import { getRoomStatusStyle, getRoomStatusText, isRoomBookable } from "@/utils/roomUtils";
import LocalHotelRoundedIcon from "@mui/icons-material/LocalHotelRounded";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LoadingState } from "../atoms/Spinner";
import { useRooms } from "@/hooks/useRooms";
import { motion } from "framer-motion";

export function FeaturedRooms({ filters = {} }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { rooms, loading, error } = useRooms(filters);
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset activeIndex to 0 when rooms change
  useEffect(() => {
    setActiveIndex(0);
  }, [rooms]);

  if (loading)
    return (
      <>
        <LoadingState />
        <Typography>Loading rooms...</Typography>
      </>
    );

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Stack>
      <Typography variant="h3" pb={1.5}>
        Featured Rooms
      </Typography>

      <Grid container spacing={3}>
        {rooms?.map((r, ind) => (
          <Grid key={ind} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
            <Card
              sx={{ borderRadius: 6 }}
              tabIndex={0}
              onClick={() => setActiveIndex(ind)}
              onTouchStart={() => setActiveIndex(ind)}
              onFocus={() => setActiveIndex(ind)}
            >
              <CardContent sx={{ p: 1.25 }}>
                <Stack spacing={1} alignItems="center" sx={{ aspectRatio: 3 / 2 }}>
                  <Gallery cards={r.gallery} anime={activeIndex === ind} />
                </Stack>

                <Stack spacing={2} pt={2}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">
                      {r.roomType}
                      <Box component="span" sx={{ color: "#bdbdbd", px: 1 }}>
                        #{r.roomNumber}
                      </Box>
                    </Typography>

                    <Chip
                      label={r.status}
                      size="small"
                      sx={getRoomStatusStyle(r.status, theme)}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {r.description}
                  </Typography>

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PeopleIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Up to {r.capacity} guests
                      </Typography>
                      {r.size && (
                        <>
                          <span style={{ margin: "0 8px", color: "#bdbdbd" }}>|</span>
                          <Typography variant="body2" color="text.secondary">
                            {r.size}
                          </Typography>
                        </>
                      )}
                    </Stack>

                    <Typography variant="h6" color="primary.main" fontWeight="bold">
                      ${r.pricePerNight}/night
                    </Typography>
                  </Box>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant={isRoomBookable(r.status) ? "contained" : "outlined"}
                      startIcon={<LocalHotelRoundedIcon fontSize="8px" />}
                      fullWidth
                      disabled={!isRoomBookable(r.status)}
                      sx={{ mt: 2 }}
                      onClick={() => navigate(`/room/${r.id}`)}
                    >
                      {getRoomStatusText(r.status)}
                    </Button>
                  </motion.div>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
