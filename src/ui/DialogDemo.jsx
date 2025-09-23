import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Typography,
  TextField,
  Box,
  Stack,
} from "@mui/material";

function AllDialogSamples() {
  const [openDialog, setOpenDialog] = useState(null);

  const sizes = ["xs", "sm", "md", "lg", "xl", false];

  const handleOpen = (key) => () => setOpenDialog(key);
  const handleClose = () => setOpenDialog(null);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        All Dialog Variants
      </Typography>

      <Stack spacing={2} direction="row" flexWrap="wrap">
        {sizes.map((size) => (
          <Button
            key={size === false ? "no-maxWidth" : size}
            variant="outlined"
            onClick={handleOpen(`size-${size}`)}
          >
            Open size={String(size)}
          </Button>
        ))}

        <Button variant="outlined" onClick={handleOpen("fullscreen")}>
          Full Screen Dialog
        </Button>

        <Button variant="outlined" onClick={handleOpen("scroll-dialog")}>
          Scrollable Dialog
        </Button>

        <Button variant="outlined" onClick={handleOpen("alert")}>
          Alert / Confirm Dialog
        </Button>

        <Button variant="outlined" onClick={handleOpen("form")}>
          Form Dialog
        </Button>
      </Stack>

      {/* Size Dialogs */}
      {sizes.map((size) => (
        <Dialog
          key={size === false ? "no-maxWidth" : size}
          open={openDialog === `size-${size}`}
          onClose={handleClose}
          maxWidth={size === false ? false : size}
          fullWidth
        >
          <DialogTitle>Dialog - maxWidth={String(size)}</DialogTitle>
          <DialogContent>
            <Typography>
              This is a dialog with size <strong>{String(size)}</strong>.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      ))}

      {/* Fullscreen Dialog */}
      <Dialog fullScreen open={openDialog === "fullscreen"} onClose={handleClose}>
        <DialogTitle>Full Screen Dialog</DialogTitle>
        <DialogContent>
          <Typography>
            Fullscreen dialog is useful on mobile or detailed screens.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Scrollable Dialog */}
      <Dialog
        open={openDialog === "scroll-dialog"}
        onClose={handleClose}
        scroll="paper"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Scrollable Dialog</DialogTitle>
        <DialogContent dividers>
          {[...Array(50)].map((_, i) => (
            <Typography key={i} gutterBottom>
              Scroll content line {i + 1}: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Alert / Confirm Dialog */}
      <Dialog open={openDialog === "alert"} onClose={handleClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. Are you sure you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Form Dialog */}
      <Dialog open={openDialog === "form"} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>User Form</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField label="Full Name" fullWidth />
            <TextField label="Email Address" type="email" fullWidth />
            <TextField label="Message" multiline rows={4} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AllDialogSamples;
