import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, Pagination } from "@mui/material";

// Reusable DataTable component
export default function DataTable({
  rows = [],
  columns = [],
  maxHeight = "calc(100vh - 240px)",
  page = 1,
  pageSize = 10,
  total = 0,
  onPageChange,
}) {
  const lastColIdx = columns.length - 1;
  const pageCount = Math.ceil(total / pageSize) || 1;

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 2, p: 0, maxHeight }}>
        <Table sx={{ minWidth: "100%" }} aria-label="data table" stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col, colIdx) => (
                <TableCell
                  key={col.field}
                  align={col.align || "left"}
                  style={{
                    minWidth: col.minWidth,
                    ...(col.style || {}),
                    ...(colIdx === lastColIdx
                      ? {
                        position: "sticky",
                        right: 0,
                        zIndex: 3, // header stays on top
                        background: "#fff",
                      }
                      : {}),
                  }}
                >
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, idx) => (
              <TableRow
                key={row.id || row.key || idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((col, colIdx) => (
                  <TableCell
                    key={col.field}
                    align={col.align || "left"}
                    style={{
                      minWidth: col.minWidth,
                      ...(col.style || {}),
                      ...(colIdx === lastColIdx
                        ? {
                          position: "sticky",
                          right: 0,
                          zIndex: 2,
                          background: "#fff",
                        }
                        : {}),
                    }}
                  >
                    {col.renderCell ? col.renderCell(row) : row[col.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {onPageChange && pageCount > 1 && (
        <Grid container justifyContent="end" pt={2} width="100%">
          <Grid>
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_, value) => onPageChange(value)}
              color="secondary"
              variant="outlined"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
