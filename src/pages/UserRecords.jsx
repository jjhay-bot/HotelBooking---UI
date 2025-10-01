import Screen from "@/components/atoms/Screen";
import { LoadingState } from "@/components/atoms/Spinner";
import DataTable from "@/components/molecules/DataTable";
import { useAuth } from "@/context/AuthContext";
import useUserBookings from "@/hooks/useUserBookings";
import { dateFormat } from "@/utils/format/dateFormat";
import { getRoomStatusStyle } from "@/utils/roomUtils";
import { useTheme } from "@emotion/react";
import { Button, Chip, Grid, Stack, Typography } from "@mui/material";
import { lowerCase } from "lodash";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function UserRecords() {
  const { user } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();

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
      {
        !loading && bookings?.length === 0 &&
        <Grid container justifyContent="center" alignItems="center" flexDirection="column" my={4}>
          <Typography variant="body2" color="text.secondary" p={2}>
            No bookings found. Hurry up and make your first booking!
          </Typography>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, scale: [1, 1.06, 1] }}
            transition={{
              opacity: { duration: 1, delay: 1, ease: "easeOut" },
              // y: { duration: 1, delay: 1, ease: "easeOut" },
              scale: { duration: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.12, }}
            whileTap={{ scale: 0.97 }}
            style={{ marginTop: 32 }}
          >
            <Button variant="contained"
              onClick={() => navigate('/explore')}
            >
              Explore available rooms
            </Button>
          </motion.div>
        </Grid>
      }
    </Screen>
  );
}
