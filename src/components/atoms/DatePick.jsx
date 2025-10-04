import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Stack, TextField, Typography } from "@mui/material";

const DatePick = ({
  label = "Select date",
  value,
  onChange,
  disabled = false,
  slotProps,
  ...otherProps
}) => {
  return (
    <Stack flex={1}>
      <Typography variant="label">{label}</Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          // label={label}
          value={value}
          onChange={onChange}
          disabled={disabled}
          clearable={true} // 👈 enables clear button
          closeOnSelect={true} // 👈 closes modal when date is selected
          enableAccessibleFieldDOMStructure={false} // 👈 fixes the error
          slots={{
            textField: TextField, // ✅ just reference the component
          }}
          slotProps={{
            textField: (params) => (
              <TextField
                {...params}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "& fieldset": {
                      borderColor: "red",
                    },
                    "&:hover fieldset": {
                      borderColor: "red",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "red",
                    },
                  },
                }}
              />
            ),
            actionBar: {
              actions: ["clear", "today"], // 👈 enables Clear button in picker popup
            },
            ...slotProps,
          }}
          {...otherProps}
        />
      </LocalizationProvider>
    </Stack>
  );
};

export default DatePick;
