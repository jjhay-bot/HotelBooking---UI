import { color } from "@constants";
import { Grid, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField"; // , { TextFieldProps }
import { lowerCase, snakeCase, startCase } from "lodash";

/**
 * @param {import('@mui/material').TextFieldProps & {
 * name: string,
 * shrink?: boolean }} props
 */

export default function FormTextField({
  name = "",
  label = "",
  shrink = false,
  slotProps = {},
  size = "medium",
  optional,
  errors = {},
  ...props
}) {
  return (
    <Stack >
      <Grid container justifyContent="space-between">
        <Typography variant="label">{startCase(label || name)}</Typography>
        {optional && (
          <Typography variant="optional" sx={{ color: color.low }}>
            Optional
          </Typography>
        )}
      </Grid>

      <TextField
        fullWidth
        size={size}
        name={snakeCase(name)}
        placeholder={`Enter ${lowerCase(name)}`}
        label={shrink ? startCase(String(label || name)) : undefined}
        slotProps={{
          ...slotProps,
          inputLabel: {
            shrink,
          },
        }}
        // required={!optional}
        error={!!errors[snakeCase(name)]}
        helperText={<Typography variant="error">{errors[snakeCase(name)]}</Typography>}
        {...props}
      />
    </Stack>
  );
}
