import { LoadingState } from "@/components/atoms/Spinner";
import Tagline from "@/components/molecules/Tagline";
import { taglines } from "@/data/taglines";
import { initLoadingVar } from "@/gql/reactiveVar";
import { useReactiveVar } from "@apollo/client";
import Screen from "@components/atoms/Screen";
import { Grid, Stack, Typography, IconButton, Divider } from "@mui/material";
import { FilterForm } from "../components/organisms/FilterForm";
import { FeaturedRooms } from "@/components/organisms/FeaturedRooms";

export function Landing() {
  const initLoading = useReactiveVar(initLoadingVar);

  if (initLoading) return <LoadingState />;

  return <LandingPage />;
}

const LandingPage = () => {

  return (
    <Screen noHeader>
      <Stack px={2} py={2}>

        <Divider color='#706b3b' sx={{ my: "1px" }} />
        <Divider color='#706b3b' sx={{ my: "1px" }} />

        <Grid container alignItems="center" spacing={0.5} >
          <Grid size='auto'>
            <IconButton size="small" >
              <img src="/favicon.png" width={44} />
            </IconButton>
          </Grid>
          <Grid size='grow' >
            <Typography variant="logo" color="#706b3b" >
              Bedder Deals
              <Grid container >
                <Tagline taglines={taglines} />
              </Grid>
            </Typography>
          </Grid>
        </Grid>

        <Divider color='#706b3b' sx={{ my: "1px" }} />
        <Divider color='#706b3b' sx={{ my: "1px", mb: 6 }} />

        <FilterForm />

        <FeaturedRooms />
      </Stack>
    </Screen >
  );
};
