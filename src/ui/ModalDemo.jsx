import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

export default function DemoModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 300,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            mx: 'auto',
            my: '20vh',
            boxShadow: 24,
          }}
        >
          <Typography variant="h6">Hello Modal</Typography>
          <Typography>This is a customized MUI Modal</Typography>
        </Box>
      </Modal>
    </>
  );
}
