import { useState } from "react";
import { CircularProgress, Typography, Grid } from "@mui/material";

import DataTable from "../molecules/DataTable";
import useUsers from "@/hooks/useUsers";

const columns = [
  // { field: "id", headerName: "ID", minWidth: 90 },
  { field: "firstName", headerName: "First name", minWidth: 150 },
  { field: "lastName", headerName: "Last name", minWidth: 150 },
  { field: "age", headerName: "Age", type: "number", minWidth: 110 },
  {
    field: "Room",
    headerName: "Room",
    minWidth: 120,
    renderCell: (row) =>
      row.reservedRoomInfo
        ? `#${row.reservedRoomInfo.roomNumber} (${row.reservedRoomInfo.status})`
        : "-",
  },
];

export default function UserTable() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { users, loading, error, total } = useUsers(page, pageSize);
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Failed to load users.</Typography>;

  return (
    <Grid container px={1} pb={2}>
      <DataTable
        rows={users}
        columns={columns}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
      />
    </Grid>
  );
}

