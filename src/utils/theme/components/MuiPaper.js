import { color } from "@/constants";

// theme/components/MuiPaper.js
const MuiPaper = {
  defaultProps: {
    elevation: 1,
    square: false,
    variant: "outlined", // 'elevation' | 'outlined'
  },
  styleOverrides: {
    root: {
      borderRadius: 12,
      padding: 8,
      backgroundColor: "#fdfdfd",
      border: "0px solid #e0e0e0",
      boxShadow: `0px px 16px 0px #2623381A`,
    },
    rounded: {
      borderRadius: 16,
    },
    outlined: {
      border: `1px solid`,
      borderColor: '#706b3b99',
    },
    // elevation0: {
    //   boxShadow: "none",
    // },
    // elevation1: {
    //   boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
    // },
    // elevation24: {
    //   boxShadow: "0px 11px 15px rgba(0,0,0,0.3)",
    // },
  },
};

export default MuiPaper;
