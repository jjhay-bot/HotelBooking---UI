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
import { useState } from "react";
import { LoadingState } from "../atoms/Spinner";
import { useStaggeredRooms } from "@/hooks/useStaggeredRooms";
import { motion } from "framer-motion";
import { lowerCase } from "lodash";

export function FeaturedRooms({ filters = {} }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const pageSize = 6;

  const {
    displayedRooms,
    visibleCount,
    loading,
    error,
    hasMore,
    setPage,
  } = useStaggeredRooms({ filters, pageSize });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Stack>
      <Typography variant="h3" pb={1.5}>
        Featured Rooms
      </Typography>
      {loading && <LoadingState />}

      {(!loading && !displayedRooms.length) && 'No rooms found based on the selected filters.'}

      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={3}>
        {displayedRooms.slice(0, visibleCount).map((r, ind) => (
          <Grid key={r.id} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
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
                      sx={getRoomStatusStyle(lowerCase(r.status), theme)}
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

                  <Grid container alignItems="center" spacing={1.5}>
                    <Stack direction="row" spacing={1} alignItems="center" >
                      <PeopleIcon fontSize="small" color="action" />

                      <Typography variant="body2" color="text.secondary">
                        Up to {r.capacity} guests
                      </Typography>
                      {r.size && (
                        <>
                          <span style={{ margin: "0 8px", color: "#bdbdbd" }}>|</span>
                          <Typography variant="body2" color="text.secondary" >
                            {r.size}
                          </Typography>
                        </>
                      )}
                    </Stack>

                    <Grid
                      container
                      justifyContent="end"
                      alignItems="center"
                      width='100%'
                    >
                      <Typography variant="h6" color="primary.main" fontWeight="bold">
                        ${r.pricePerNight}/night
                      </Typography>
                    </Grid>
                  </Grid>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant={isRoomBookable(r.status) ? "contained" : "outlined"}
                      startIcon={<LocalHotelRoundedIcon fontSize="8px" />}
                      fullWidth
                      disabled={!isRoomBookable(r.status)}
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

      {hasMore && visibleCount >= displayedRooms.length && (
        <Button
          onClick={() => setPage((p) => p + 1)}
          disabled={loading}
          variant="outlined"
          sx={{ my: 3, mx: "auto", display: "block", minWidth: 200 }}
        >
          {loading ? "Loading..." : "Load More"}
        </Button>
      )}
    </Stack>
  );
}
