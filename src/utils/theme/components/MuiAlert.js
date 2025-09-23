import { color } from "@constants";

const MuiAlert = {
  styleOverrides: {
    standardSuccess: {
      backgroundColor: color.success,
    },
    standardError: {
      backgroundColor: color.error,
    },
    standardWarning: {
      backgroundColor: color.warning,
    },
  },
};

export default MuiAlert;
