import { LoadingState } from "@/components/atoms/Spinner";
import Tagline from "@/components/molecules/Tagline";
import { taglines } from "@/data/taglines";
import { initLoadingVar } from "@/gql/reactiveVar";
import { useReactiveVar } from "@apollo/client";
import Screen from "@components/atoms/Screen";
import { Button, Card, CardContent, FormControl, Grid, MenuItem, Select, Stack, Typography, Chip, Box } from "@mui/material";
import { useState } from 'react';
import DatePick from "@/components/atoms/DatePick";
import FormTextField from "@/components/atoms/FormTextField";
import { roomTypes } from "@/data/roomTypes";
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import { rooms } from "@/data/rooms";
import Gallery from "@/components/molecules/Gallery";
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleIcon from '@mui/icons-material/People';
import { useTheme } from "@mui/material/styles";
import { getRoomStatusStyle, getRoomStatusText, isRoomBookable } from "@/utils/roomUtils";

export function Landing() {
  const initLoading = useReactiveVar(initLoadingVar);

  if (initLoading) return <LoadingState />;

  return <LandingPage />;
}

const LandingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const theme = useTheme();

  return (
    <Screen noHeader pt={6}>
      <Stack px={2}>
        <Stack sx={{ height: '70px', alignItems: 'center', justifyContent: 'center' }} >
          <Tagline taglines={taglines} />
        </Stack>

        <Card>
          <CardContent >
            <Grid container rowSpacing={1.5} columnSpacing={2} >

              <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
                <DatePick
                  label="Check-in Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
                <DatePick
                  label="Check-out Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
                <FormTextField
                  required
                  name="guests"
                  type="number"
                // onChange={handleChange}
                // errors={errors}
                // value={formData?.home_details || ""}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
                <FormControl fullWidth variant="filled" size="small">
                  <Typography variant="label">Room Type</Typography>
                  <Select
                    size="medium"
                    labelId="fruit-label"
                    variant='outlined'
                  // value={fruit}
                  // onChange={(e) => setFruit(e.target.value)}
                  >
                    {roomTypes.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 4, lg: 3 }} pt={1} alignItems='end' container justifyItems='center' >
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  startIcon={<TravelExploreRoundedIcon />}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </CardContent>


        </Card>

        <Stack pt={2} >
          <Typography variant='h3' py={2} >
            Featured Rooms
          </Typography>

          <Grid container spacing={3}>
            {
              rooms?.map((r, ind) =>
                <Grid key={ind} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                  <Card >
                    <CardContent>
                      <Stack spacing={1} alignItems='center' sx={{ aspectRatio: 3 / 2 }} >
                        <Gallery cards={r.gallery} />
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
                          startIcon={<VisibilityIcon />}
                          fullWidth
                          disabled={!isRoomBookable(r.status)}
                          sx={{ mt: 2 }}
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
      </Stack>
    </Screen >
  );
};
