import Screen from "@/components/atoms/Screen";
import { LoadingState } from "@/components/atoms/Spinner";
import DataTable from "@/components/molecules/DataTable";
import { useAuth } from "@/context/AuthContext";
import useUserBookings from "@/hooks/useUserBookings";
import { dateFormat } from "@/utils/format/dateFormat";
import { getRoomStatusStyle } from "@/utils/roomUtils";
import { useTheme } from "@emotion/react";
import { Chip } from "@mui/material";
import { lowerCase } from "lodash";

export default function UserRecords() {
  const { user } = useAuth();
  const theme = useTheme();
  const { bookings, loading, error } = useUserBookings(user?.id);

  const columns = [
    { field: "id", headerName: "Booking ID", minWidth: 110 },
    { field: "roomId", headerName: "Room ID", minWidth: 100 },
    {
      field: "startDate",
      headerName: "Check-in Date",
      minWidth: 140,
      renderCell: (row) => dateFormat(row?.startDate)
    },
    {
      field: "endDate",
      headerName: "Check-out Date",
      minWidth: 140,
      renderCell: (row) => dateFormat(row?.endDate)
    },
    { field: "totalPrice", headerName: "Total Price", minWidth: 120 },
    { field: "notes", headerName: "Notes", minWidth: 300 },
    {
      field: "status", headerName: "Status", minWidth: 100,
      renderCell: (row) => <Chip
        label={row.status}
        size="small"
        sx={getRoomStatusStyle(lowerCase(row.status), theme)}
      />
    },
  ];

  return (
    <Screen>
      <h2>My Bookings</h2>
      <LoadingState loading={loading} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <DataTable rows={bookings} columns={columns} />
    </Screen>
  );
}
