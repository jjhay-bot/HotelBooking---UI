// pages/PaperDemo.js
import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

const variants = ["elevation", "outlined"];
const elevations = [0, 1, 4, 8, 16, 24];
const shapes = [false, true]; // square

export default function PaperDemo() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        MUI Paper Demo – Variants, Elevations, Shape
      </Typography>
      <Grid container spacing={4}>
        {variants.map((variant) =>
          elevations.map((elevation) =>
            shapes.map((square) => (
              <Grid item xs={12} sm={6} md={4} key={`${variant}-${elevation}-${square}`}>
                <Paper
                  variant={variant}
                  elevation={variant === "elevation" ? elevation : 0}
                  square={square}
                  sx={{
                    height: 120,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2">
                    variant: {variant} <br />
                    elevation: {elevation} <br />
                    square: {String(square)}
                  </Typography>
                </Paper>
              </Grid>
            )),
          ),
        )}
      </Grid>
    </Box>
  );
}
