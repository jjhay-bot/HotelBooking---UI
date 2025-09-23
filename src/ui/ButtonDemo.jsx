import { Box, Button, Stack, Typography } from "@mui/material";

const variants = ["text", "outlined", "contained"];
const colors = ["primary", "secondary", "success", "error", "warning", "info"];
const sizes = ["small", "medium", "large"];

const ButtonDemo = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3" gutterBottom>
        MUI Button Variants
      </Typography>

      {variants.map((variant) => (
        <Box key={variant} mb={4}>
          <Typography variant="h6" gutterBottom>
            Variant: {variant}
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {colors.map((color) => (
              <Button key={color} variant={variant} color={color}>
                {color}
              </Button>
            ))}
          </Stack>
        </Box>
      ))}

      <Box mt={6}>
        <Typography variant="h6" gutterBottom>
          Button Sizes (using variant="contained" & color="primary")
        </Typography>
        <Stack direction="row" spacing={2}>
          {sizes.map((size) => (
            <Button key={size} variant="contained" color="primary" size={size}>
              {size}
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default ButtonDemo;
