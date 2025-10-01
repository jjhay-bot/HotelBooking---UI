import { useState } from "react";
import { CircularProgress, Typography, Grid, Chip } from "@mui/material";

import DataTable from "../molecules/DataTable";
import useUsers from "@/hooks/useUsers";
import { getRoomStatusStyle } from "@/utils/roomUtils";
import { lowerCase } from "lodash";
import { useTheme } from "@emotion/react";
import { LoadingState } from "../atoms/Spinner";

export default function UserTable() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const theme = useTheme();
  const { users, loading, error, total } = useUsers(page, pageSize);

  const columns = [
    // { field: "id", headerName: "ID", minWidth: 90 },
    { field: "firstName", headerName: "First name", minWidth: 150 },
    { field: "lastName", headerName: "Last name", minWidth: 150 },
    { field: "age", headerName: "Age", type: "number", minWidth: 110 },
    {
      field: "Room",
      headerName: "Room",
      minWidth: 120,
      // renderCell: (row) =>
      //   row.reservedRoomInfo
      //     ? `#${row.reservedRoomInfo.roomNumber} (${row.reservedRoomInfo.status})`
      //     : "-",
      renderCell: (row) =>
        row?.reservedRoomInfo?.status && <Grid container spacing={2}>
          <Typography variant='mid'>
            #{row?.reservedRoomInfo?.roomNumber}
          </Typography>
          <Chip
            label={row?.reservedRoomInfo?.status}
            size="small"
            sx={getRoomStatusStyle(lowerCase(row?.reservedRoomInfo?.status), theme)}
          />
        </Grid>

    },
  ];

  if (error) return <Typography color="error">Failed to load users.</Typography>;

  return (
    <Grid container px={1} pb={2}>
      <LoadingState loading={loading} />
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

