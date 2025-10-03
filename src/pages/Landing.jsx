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
  const [filters, setFilters] = useState({
    // status: "available",
  });

  // Always ensure status: "available" is present in filters
  const setFiltersWithStatus = (newFilters) => {
    setFilters({
      ...newFilters,
      // status: "available"
    });
  };

  return (
    <Screen
      header={
        <Stack pt={2}>
          <FilterForm filters={filters} setFilters={setFiltersWithStatus} />
        </Stack>
      }
    >
      <FeaturedRooms filters={filters} />
    </Screen>
  );
};
