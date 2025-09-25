import { Grid, Tab, Tabs, Typography } from "@mui/material";
import Screen from "@/components/atoms/Screen.jsx";
import UserTable from "../components/templates/UserTable";
import { useState } from "react";
import RoomTable from "@/components/templates/RoomTable";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Screen>
      <Typography variant="h3" p={2} pb={0}>
        Admin Dashboard
      </Typography>

      <Grid container justifyContent="end" pb={1} px={1}>
        <Tabs
          value={activeTab}
          onChange={(e, value) => setActiveTab(value)}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="active tab"
        >
          <Tab value={0} label="Users" />
          <Tab value={1} label="Rooms" />
          <Tab value={2} label="Archive" />
        </Tabs>
      </Grid>

      {activeTab === 0 && <UserTable />}
      {activeTab === 1 && <RoomTable />}
      {/* {activeTab === 2 && <UserTable />} */}
    </Screen>
  );
}
