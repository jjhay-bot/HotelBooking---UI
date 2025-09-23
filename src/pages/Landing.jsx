import { LoadingState } from "@/components/atoms/Spinner";
import Tagline from "@/components/molecules/Tagline";
import { taglines } from "@/data/taglines";
import { initLoadingVar } from "@/gql/reactiveVar";
import { useReactiveVar } from "@apollo/client";
import Screen from "@components/atoms/Screen";
import { Button, Card, CardContent, Grid, Stack, Typography, Chip, Box } from "@mui/material";
import { rooms } from "@/data/rooms";
import Gallery from "@/components/molecules/Gallery";
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleIcon from '@mui/icons-material/People';
import { useTheme } from "@mui/material/styles";
import { getRoomStatusStyle, getRoomStatusText, isRoomBookable } from "@/utils/roomUtils";
import { FilterForm } from "../components/organisms/FilterForm";

export function Landing() {
  const initLoading = useReactiveVar(initLoadingVar);

  if (initLoading) return <LoadingState />;

  return <LandingPage />;
}

const LandingPage = () => {
  const theme = useTheme();

  return (
    <Screen noHeader pt={6}>
      <Stack px={2}>
        <Stack sx={{ height: '70px', alignItems: 'center', justifyContent: 'center' }} >
          <Tagline taglines={taglines} />
        </Stack>

        <FilterForm />

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
