import { useState } from "react";
import DataTable from "../molecules/DataTable";
import {
  Grid,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Button,
  Box,
  InputLabel,
} from "@mui/material";
import { useRooms, useRoomTypes } from "@/hooks";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Available", value: "available" },
  { label: "Reserved", value: "Reserved" },
  { label: "Maintenance", value: "maintenance" },
];

const columns = [
  // { field: "id", headerName: "ID", minWidth: 90 },
  { field: "roomNumber", headerName: "Room #", minWidth: 100 },
  { field: "roomType", headerName: "Type", minWidth: 180 },
  { field: "pricePerNight", headerName: "Price/Night", minWidth: 120 },
  { field: "capacity", headerName: "Capacity", minWidth: 100 },
  { field: "bedType", headerName: "Bed Type", minWidth: 140 },
  { field: "size", headerName: "Size", minWidth: 120 },
  { field: "floor", headerName: "Floor", minWidth: 80 },
  {
    field: "amenities",
    headerName: "Amenities",
    minWidth: 220,
    renderCell: (row) =>
      Array.isArray(row.amenities)
        ? row.amenities.join(", ")
        : row.amenities,
  },
  {
    field: "gallery",
    headerName: "Gallery",
    minWidth: 120,
    renderCell: (row) =>
      Array.isArray(row.gallery) && row.gallery.length > 0
        ? `${row.gallery.length} images`
        : "-",
  },
  { field: "description", headerName: "Description", minWidth: 300 },
  { field: "status", headerName: "Status", minWidth: 120 },
];

export default function RoomTable() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [status, setStatus] = useState("all");
  const [roomType, setRoomType] = useState("all");
  const filters = {
    status: status === "all" ? "" : status,
    roomType: roomType === "all" ? "" : roomType,
  };
  const { rooms, loading, error, total } = useRooms(page, pageSize, filters);
  const { roomTypes, loading: loadingRoomTypes } = useRoomTypes();
  if (loading) return <CircularProgress />;
  if (error)
    return (
      <Typography color="error" textAlign="center">
        Failed to load rooms.
      </Typography>
    );

  return (
    <Grid container px={1} py={2}>
      <Card sx={{ height: 'fit-content', width: "100%", mb: 2 }}>
        <CardContent sx={{ height: { sm: '60px' } }} >
          <Box display="flex" gap={2} flexWrap="wrap">
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                size="small"
                displayEmpty
                sx={{
                  minWidth: 160,
                  "& .MuiSelect-select": { paddingRight: "32px" },
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                }}
                shrink={true}
              >
                <MenuItem value="all">All</MenuItem>
                {statusOptions.filter(opt => opt.value !== "all").map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Room Type</InputLabel>
              <Select
                label="Room Type"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                size="small"
                displayEmpty
                sx={{
                  minWidth: 180,
                  "& .MuiSelect-select": { paddingRight: "32px" },
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                }}
                shrink={true}
                disabled={loadingRoomTypes}
              >
                <MenuItem value="all">All</MenuItem>
                {roomTypes.map((opt) => (
                  <MenuItem key={opt.id || opt.value} value={opt.id || opt.value}>
                    {opt.name || opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              onClick={() => {
                setStatus("all");
                setRoomType("all");
                setPage(1);
              }}
              sx={{ p: 0.75 }}
              size='small'
            >
              Reset
            </Button>
          </Box>
        </CardContent>
      </Card>

      <DataTable
        rows={rooms}
        columns={columns}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
      />
    </Grid>
  );
}
