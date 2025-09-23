import ActionDrawer from "@components/molecules/ActionDrawer";
import { color } from "@constants";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Autocomplete,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { lowerCase, snakeCase, startCase } from "lodash";

/**
 * A reusable form autocomplete component using MUI's Autocomplete and TextField.
 *
 * Supports both single and multiple selection modes and handles mapping between
 * selected IDs and the corresponding option objects.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {string} [props.name=''] - The name of the form field
 * @param {string} [props.label=''] - The label displayed on the TextField
 * @param {Array<{ id: string | number, label: string }>} [props.options=[]] - Array of option objects
 * @param {string | number | (string | number)[]} props.value - Selected value(s), either a single ID or array of IDs
 * @param {function} props.onChange - Callback fired when selection changes; receives the selected ID(s)
 * @param {boolean} [props.multiple=false] - Whether multiple options can be selected
 * @param {boolean} [props.shrink=false] - Whether the input label should shrink
 * @param {'small' | 'medium'} [props.size='small'] - Size of the component
 *
 * @returns {import("react").JSX.Element}
 */

const FormAutocomplete = ({
  name = "",
  label = "",
  options = [],
  value,
  onChange,
  multiple = false,
  shrink = false,
  size = "medium",
  onClick,
  onSelect,
  disabled,
  errors = {},
  optional = false,
}) => {
  const getOptionById = (id) => options.find((opt) => opt.id === id);

  const getOptionsByIds = (ids) => options.filter((opt) => ids.includes(opt.id));

  const selectedValue = multiple
    ? getOptionsByIds(value || [])
    : getOptionById(value) || null;

  const onChangeHandler = (_event, newValue, reason) => {
    if (reason === "clear") {
      _event.stopPropagation();
    }
    if (multiple) {
      const ids = Array.isArray(newValue) ? newValue.map((item) => item.id) : [];
      onChange(snakeCase(name), ids);
    } else {
      onChange(snakeCase(name), newValue ? newValue.id : null);
    }
  };

  return (
    <ActionDrawer
      selectedValue={selectedValue}
      onSelect={onSelect}
      defaulOptions={options || []}
      name={snakeCase(name)}
      disabled={disabled}
    >
      <Stack gap={0.5}>
        <Grid container justifyContent="space-between">
          <Typography variant="mid">{label || name}</Typography>
          {optional && (
            <Typography variant="optional" sx={{ color: color.low }}>
              Optional
            </Typography>
          )}
        </Grid>
        <Autocomplete
          multiple={multiple}
          size={size}
          options={options}
          value={selectedValue}
          onChange={onChangeHandler}
          getOptionLabel={(option) => option?.label ?? option?.id ?? ""}
          // getOptionLabel={() => ""}
          disabled={disabled}
          isOptionEqualToValue={(option, val) => option.id === val?.id}
          slotProps={{
            chip: {
              sx: {
                maxHeight: size === "small" ? 18 : 26,
              },
            },
          }}
          popupIcon={<KeyboardArrowDown fontSize="large" sx={{ color: color.low }} />} // custom arrow
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              name={startCase(name)}
              placeholder={`Pumili ng ${lowerCase(name)}`}
              label={shrink ? startCase(String(label || name)) : undefined}
              slotProps={{
                inputLabel: {
                  shrink,
                },
                input: {
                  ...params.inputProps,
                  tabIndex: -1,
                  // readOnly: true,
                },
                inputAdornment: {
                  position: "end",
                  children: (
                    <KeyboardArrowDown
                      fontSize="large"
                      sx={{ color: color.low, cursor: "pointer" }}
                    />
                  ),
                },
              }}
              required={!optional}
              onClick={onClick}
              error={!!errors[snakeCase(name)]}
              helperText={
                <Typography variant="error">{errors[snakeCase(name)]}</Typography>
              }
            />
          )}
        />
      </Stack>
    </ActionDrawer>
  );
};

export default FormAutocomplete;
