import { CircularProgress, Typography, Grid, Chip } from "@mui/material";
import DataTable from "../molecules/DataTable";
import useBookings from "@/hooks/useBookings";
import { useState } from "react";
import { getRoomStatusStyle } from "@/utils/roomUtils";
import { lowerCase } from "lodash";
import { useTheme } from "@emotion/react";
import { LoadingState } from "../atoms/Spinner";

export default function BookingsTable() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const theme = useTheme();
  const { bookings, loading, error, total } = useBookings(page, pageSize);

  const columns = [
    // { field: "id", headerName: "ID", minWidth: 90 },
    {
      field: "user",
      headerName: "User",
      minWidth: 180,
      renderCell: (row) => row.user ? `${row.user.firstName} ${row.user.lastName}` : "-",
    },
    {
      field: "room",
      headerName: "Room",
      minWidth: 120,
      renderCell: (row) => row.room ? `#${row.room.roomNumber}` : "-",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      minWidth: 140,
      renderCell: (row) => row.startDate ? new Date(row.startDate).toLocaleDateString() : "-",
    },
    {
      field: "endDate",
      headerName: "End Date",
      minWidth: 140,
      renderCell: (row) => row.endDate ? new Date(row.endDate).toLocaleDateString() : "-",
    },
    { field: "totalPrice", headerName: "Total Price", minWidth: 120 },
    {
      field: "status", headerName: "Payment Status", minWidth: 120,
      renderCell: (row) => <Chip
        label={row.status}
        size="small"
        sx={getRoomStatusStyle(lowerCase(row.status), theme)}
      />
    },
  ];

  if (error) return <Typography color="error">Failed to load bookings.</Typography>;

  return (
    <Grid container px={1} pb={2}>
      <LoadingState loading={loading} />
      <DataTable
        rows={bookings}
        columns={columns}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
      />
    </Grid>
  );
}
