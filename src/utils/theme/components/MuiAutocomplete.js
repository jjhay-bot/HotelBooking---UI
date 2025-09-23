import { bgcolor } from "@constants";

const MuiAutocomplete = {
  styleOverrides: {
    root: {},
    inputRoot: {},
    popupIndicator: {},
    paper: {
      borderRadius: 10,
      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    },
    listbox: {
      padding: 0, // no padding on container
      margin: 0, // ensure no default margin
    },
    option: ({ ownerState }) => ({
      minHeight: "auto",
      padding:
        ownerState.size === "small"
          ? "4px 12px" // tighter for small
          : "8px 14px", // default for medium
      "&.Mui-focused": {
        backgroundColor: bgcolor.highlight, // light blue for hover
      },
      '&[aria-selected="true"]': {
        backgroundColor: bgcolor.highlight, // darker blue for selected
      },
    }),
  },
  defaultProps: {},
};

export default MuiAutocomplete;
