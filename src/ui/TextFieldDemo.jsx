import { Box, Stack, TextField, Typography } from "@mui/material";

const variants = ["outlined", "filled", "standard"];
const colors = ["primary", "secondary", "success", "error", "warning", "info"];
const sizes = ["small", "medium"];

const TextFieldDemo = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3" gutterBottom>
        MUI TextField Variants
      </Typography>

      {variants.map((variant) => (
        <Box key={variant} mb={4}>
          <Typography variant="h6" gutterBottom>
            Variant: {variant}
          </Typography>
          <Stack direction="row" gap={2} flexWrap="wrap">
            {colors.map((color) => (
              <TextField key={color} label={`${color}`} variant={variant} color={color} />
            ))}
          </Stack>
        </Box>
      ))}

      <Box mt={6}>
        <Typography variant="h6" gutterBottom>
          TextField Sizes (variant="outlined", color="primary")
        </Typography>
        <Stack direction="row" spacing={2}>
          {sizes.map((size) => (
            <TextField
              key={size}
              label={size}
              size={size}
              variant="outlined"
              color="primary"
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default TextFieldDemo;
