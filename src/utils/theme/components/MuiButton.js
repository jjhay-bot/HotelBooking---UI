import { size } from "lodash";

const MuiButton = {
  defaultProps: {
    size: "small",
    variant: "contained",
    // disableRipple: true,
    // disableElevation: true,
  },
  styleOverrides: {
    root: {
      borderRadius: 12,
      "&.Mui-disabled": {
        backgroundColor: "#ddd",
        color: "#aaa",
      },
    },
    // contained: {
    //     backgroundColor: '#0727B7',
    //     color: '#fff',
    //     '&:hover': {
    //         backgroundColor: '#061fa0',
    //     },
    // },
    // outlined: {
    //     border: '1px solid #0727B7',
    //     color: '#0727B7',
    //     '&:hover': {
    //         backgroundColor: '#f2f6ff',
    //     },
    // },
    // text: {
    //     color: '#0727B7',
    //     '&:hover': {
    //         backgroundColor: 'rgba(7, 39, 183, 0.08)',
    //     },
    // },
    sizeSmall: {
      fontSize: "0.813rem",
      padding: "6px 12px",
      borderRadius: "8px",
      border: "2px solid #ED5A29",
      fontWeight: 600,
    },
    sizeMedium: {
      fontSize: "0.813rem",
      padding: "9px 24px",
      borderRadius: "8px",
      fontWeight: 600,
    },
    sizeLarge: {
      fontSize: "1rem",
      padding: "14px 28px",
    },
    startIcon: {
      marginRight: 8,
    },
    endIcon: {
      marginLeft: 8,
    },
  },
};

export default MuiButton;
