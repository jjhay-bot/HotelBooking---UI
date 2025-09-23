// theme/components/MuiTextField.js
import { bgcolor, color } from "@constants";

const MuiTextField = {
  defaultProps: {
    variant: "outlined",
    size: "medium",
    fullWidth: true,
  },
  styleOverrides: {
    root: {
      // Target the OutlinedInput root inside TextField

      "& .MuiOutlinedInput-root": {
        transition: "background-color 120ms ease",
        borderRadius: 12,
        // Base / not focused
        "&:not(.Mui-focused)": {
          backgroundColor: bgcolor.lightGray, // <- your unfocused bg
        },

        // Focused
        "&.Mui-focused": {
          backgroundColor: bgcolor.highlight, // <- your focused bg
        },

        // When typing / has value (works because you use `placeholder`)
        "&:has(input:not(:placeholder-shown))": {
          backgroundColor: bgcolor.highlight,
        },

        // Border tweaks (use the class for the notched outline)
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: bgcolor.darkGray,
          // borderWidth: 0,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: bgcolor.darkGray,
          // borderWidth: 2,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: bgcolor.darkGray,
        },

        // Input text styles
        "& .MuiOutlinedInput-input": {
          fontSize: 15,
          fontFamily: "Poppins",
          color: "#262338",
          letterSpacing: "0.75px",
        },

        // Disabled state styles
        "&.Mui-disabled": {
          cursor: "not-allowed !important",
          "& .MuiOutlinedInput-input": {
            cursor: "not-allowed !important",
          },
        },
      },

      // Placeholder styling
      input: {
        "&::placeholder": {
          fontWeight: 400,
          opacity: 1,
          color: color.low,
        },
      },
    },
  },
};

export default MuiTextField;
