import { Box, Typography, Rating, Paper, Grid, Stack, Divider } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function GuestReviews() {
  return (
    <>
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <StarIcon fontSize="small" color="warning" />
          Guest Reviews
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Rating value={4.8} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            4.8 out of 5 (124 reviews)
          </Typography>
        </Box>
        <Stack spacing={1}>
          <Paper sx={{ p: 1.5, borderRadius: 2, bgcolor: "grey.50" }}>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              "Amazing room with stunning views! The amenities were top-notch."
            </Typography>
            <Grid container sx={{ justifyContent: "end" }}>
              <Typography variant="caption" color="text.secondary" mt={0.5}>
                - Sarah M., 2 days ago
              </Typography>
            </Grid>
          </Paper>

          <Paper sx={{ p: 1.5, borderRadius: 2, bgcolor: "grey.50" }}>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              "Perfect location and excellent service. Highly recommended!"
            </Typography>
            <Grid container sx={{ justifyContent: "end" }}>
              <Typography variant="caption" color="text.secondary" mt={0.5}>
                - John D., 1 week ago
              </Typography>
            </Grid>
          </Paper>
        </Stack>
      </Box>
      <Divider />
    </>
  );
}
