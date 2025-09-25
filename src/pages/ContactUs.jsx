import Screen from "@/components/atoms/Screen";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

export default function ContactUs() {
  return (
    <Screen>
      <Container
        maxWidth="sm"
        sx={{
          alignItems: "center",
          display: "flex",
          height: "100%",
          py: 6,
          flex: 1,
          overflow: "auto",
        }}
      >
        <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
          <Stack spacing={3} alignItems="center">
            <Typography variant="h3" fontWeight={700} color="primary.main" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              Have a question or need help? Fill out the form below and our team will get
              back to you soon.
            </Typography>
            <Box component="form" width="100%" mt={2}>
              <Stack spacing={2}>
                <TextField label="Name" name="name" fullWidth required />
                <TextField label="Email" name="email" type="email" fullWidth required />
                <TextField
                  label="Message"
                  name="message"
                  fullWidth
                  required
                  multiline
                  minRows={4}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Send Message
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Screen>
  );
}
