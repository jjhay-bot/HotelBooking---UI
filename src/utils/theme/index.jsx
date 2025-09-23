import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import palette from "./palette";
import typography from "./typography";
import components from "./components/index";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#ed5a29",
//     },
//     secondary: {
//       main: "#07a69c",
//     },
//   },
//   typography: {
//     fontSize: 10,
//     fontFamily: "Poppins",
//     h6: {
//       fontSize: "0.875rem", // 14px
//       fontWeight: 600,
//     },
//     body1: {
//       fontSize: "0.75rem", // 12px
//     },
//     body2: {
//       fontSize: "0.6875rem", // 11px
//     },
//     button: {
//       fontSize: "0.6875rem", // 11px
//       textTransform: "none",
//     },
//   },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900,
//       lg: 1200,
//       xl: 1536,
//       custom: 425,
//     },
//   },
//   components: {
//     MuiTooltip: {
//       styleOverrides: {
//         tooltip: {
//           fontSize: "8px",
//         },
//       },
//     },
//     MuiButton: {
//       defaultProps: {
//         size: "small",
//         variant: "contained",
//       },
//       styleOverrides: {
//         root: {
//           borderRadius: "16px",
//           textTransform: "none",
//         },
//         "&.Mui-disabled": {
//           backgroundColor: "#F7F7FC",
//           color: "#F7F7FC",
//         },
//       },
//     },
//   },
// });

const theme = createTheme({
  // @ts-ignore
  palette,
  // @ts-ignore
  typography,
  // shape: {
  //   borderRadius: 12,
  // },
  components,
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 900,
  //     lg: 1200,
  //     xl: 1536,
  //     custom: 425,
  //   },
  // },
});

export function AppThemeProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
