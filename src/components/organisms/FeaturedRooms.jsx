import { Button, Card, CardContent, Grid, Stack, Typography, Chip, Box } from "@mui/material";
import { rooms } from "@/data/rooms";
import Gallery from "@/components/molecules/Gallery";
import PeopleIcon from '@mui/icons-material/People';
import { useTheme } from "@mui/material/styles";
import { getRoomStatusStyle, getRoomStatusText, isRoomBookable } from "@/utils/roomUtils";
import LocalHotelRoundedIcon from '@mui/icons-material/LocalHotelRounded';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export function FeaturedRooms() {

  const theme = useTheme();
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Stack>
      <Typography variant='h3' pb={1.5} >
        Featured Rooms
      </Typography>

      <Grid container spacing={3}>
        {
          rooms?.map((r, ind) =>
            <Grid key={ind} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <Card
                sx={{ borderRadius: 6 }}
                tabIndex={0}
                onClick={() => setActiveIndex(ind)}
                onTouchStart={() => setActiveIndex(ind)}
                onFocus={() => setActiveIndex(ind)}
              >
                <CardContent sx={{ p: 1.25 }}>
                  <Stack spacing={1} alignItems='center' sx={{ aspectRatio: 3 / 2 }} >
                    <Gallery cards={r.gallery} anime={activeIndex === ind} />
                  </Stack>

                  <Stack spacing={2} pt={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant='h5'>
                        {r.roomType}
                      </Typography>

                      <Chip
                        label={r.status}
                        size="small"
                        sx={getRoomStatusStyle(r.status, theme)}
                      />
                    </Box>

                    <Typography variant='body2' color='text.secondary' sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {r.description}
                    </Typography>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <PeopleIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          Up to {r.capacity} guests
                        </Typography>
                      </Stack>

                      <Typography variant="h6" color="primary.main" fontWeight="bold">
                        ${r.pricePerNight}/night
                      </Typography>
                    </Box>

                    <Button
                      variant={isRoomBookable(r.status) ? 'contained' : 'outlined'}
                      startIcon={<LocalHotelRoundedIcon fontSize="8px" />}
                      fullWidth
                      disabled={!isRoomBookable(r.status)}
                      sx={{ mt: 2, }}
                      onClick={() => navigate(`/room/${r.id}`)}
                    >
                      {getRoomStatusText(r.status)}
                    </Button>
                  </Stack>

                </CardContent>
              </Card>
            </Grid>
          )
        }
      </Grid>
    </Stack>
  );
};
