// theme/components/MuiCard.js

const MuiCard = {
  defaultProps: {
    raised: false,
    variant: "elevation", // 'elevation' | 'outlined'
  },
  styleOverrides: {
    root: {
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      transition: "box-shadow 0.3s ease-in-out",
      "&:hover": {
        boxShadow: "0 6px 24px rgba(0, 0, 0, 0.15)",
      },
    },
  },
};

const MuiCardHeader = {
  defaultProps: {
    titleTypographyProps: {
      variant: "h6",
    },
    subheaderTypographyProps: {
      variant: "body2",
    },
  },
  styleOverrides: {
    root: {
      padding: "16px",
    },
    title: {
      fontWeight: 600,
    },
    subheader: {
      color: "#666",
    },
    action: {
      marginTop: "0px",
    },
  },
};

const MuiCardContent = {
  styleOverrides: {
    root: {
      padding: "16px",
      "&:last-child": {
        paddingBottom: "16px",
      },
    },
  },
};

const MuiCardActions = {
  styleOverrides: {
    root: {
      padding: "8px 16px",
      justifyContent: "flex-end",
      gap: "8px",
    },
  },
};

export { MuiCard, MuiCardHeader, MuiCardContent, MuiCardActions };
