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
    <Screen
      header={
        <Stack py={2}>
          <FilterForm />
        </Stack>
      }
    >
      <FeaturedRooms />
    </Screen >
  );
};
