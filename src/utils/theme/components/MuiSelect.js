// theme/components/MuiSelect.js
import { bgcolor } from "@constants";

const MuiSelect = {
  defaultProps: {
    variant: "outlined",
    size: "medium",
    displayEmpty: true,
  },
  styleOverrides: {
    root: {
      borderRadius: 12,
      transition: "background-color 120ms ease",
      
      // Base styling
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: bgcolor.darkGray,
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: bgcolor.darkGray,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: bgcolor.darkGray,
      },

      // Background color based on value
      "&:not(.Mui-focused)": {
        // backgroundColor: bgcolor.gray, // Default background when not focused
      },
      "&.Mui-focused": {
        backgroundColor: bgcolor.highlight, // Focused background
      },
      
      // When has value (not empty)
      "&:has(.MuiSelect-select:not([aria-expanded='false'][value='']))": {
        backgroundColor: bgcolor.highlight,
      },

      // Select text styling  
      "& .MuiSelect-select": {
        fontSize: 15,
        fontFamily: "Poppins",
        color: "#262338",
        letterSpacing: "0.75px",
        
        // Placeholder styling for empty value
        "&[aria-expanded='false'][value='']": {
          color: "#6E7191",
          fontWeight: 400,
        },
      },
    },
  },
};

export default MuiSelect;
