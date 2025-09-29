import { LoadingState } from "@/components/atoms/Spinner";
import { initLoadingVar } from "@/gql/reactiveVar";
import { useReactiveVar } from "@apollo/client";
import Screen from "@components/atoms/Screen";
import { Stack } from "@mui/material";
import { FilterForm } from "../components/organisms/FilterForm";
import { FeaturedRooms } from "@/components/organisms/FeaturedRooms";
import { useState } from "react";

export function Landing() {
  const initLoading = useReactiveVar(initLoadingVar);

  if (initLoading) return <LoadingState />;

  return <LandingPage />;
}

const LandingPage = () => {
  const [filters, setFilters] = useState({});

  return (
    <Screen
      header={
        <Stack py={2}>
          <FilterForm filters={filters} setFilters={setFilters} />
        </Stack>
      }
    >
      <FeaturedRooms filters={filters} />
    </Screen>
  );
};
