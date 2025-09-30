import { Grid, Tab, Tabs, Typography } from "@mui/material";
import Screen from "@/components/atoms/Screen.jsx";
import UserTable from "../components/templates/UserTable";
import { useMemo } from "react";
import RoomTable from "@/components/templates/RoomTable";
import BookingsTable from "@/components/templates/BookingsTable";
import { useNavigate, useLocation } from "react-router-dom";

const tabRoutes = [
  "/admin/bookings",
  "/admin/users",
  "/admin/rooms",
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  // Determine active tab from route
  const activeTab = useMemo(() => {
    const idx = tabRoutes.findIndex((route) => location.pathname.startsWith(route));
    return idx === -1 ? 0 : idx;
  }, [location.pathname]);

  const handleTabChange = (e, value) => {
    navigate(tabRoutes[value]);
  };

  return (
    <Screen>
      <Typography variant="h3" p={2} pb={0}>
        Admin Dashboard
      </Typography>

      <Grid container justifyContent="end" pb={1} px={1}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="active tab"
        >
          <Tab value={0} label="Bookings" />
          <Tab value={1} label="Users" />
          <Tab value={2} label="Rooms" />
        </Tabs>
      </Grid>

      {activeTab === 0 && <BookingsTable />}
      {activeTab === 1 && <UserTable />}
      {activeTab === 2 && <RoomTable />}
    </Screen>
  );
}
