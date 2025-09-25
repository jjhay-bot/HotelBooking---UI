import { users } from "@/data/users";
import DataTable from "../molecules/DataTable";
import { Grid } from "@mui/material";

export default function UserTable() {
  return (
    <Grid container px={1} pb={2}>
      <DataTable rows={users} columns={columns} />
    </Grid>
  );
}

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
  },
  {
    field: "Room",
    headerName: "Room",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    style: { width: "100px" },
    sticky: true,
    renderCell: (row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

