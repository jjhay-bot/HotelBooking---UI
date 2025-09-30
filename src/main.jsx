import ReactDOM from "react-dom/client";
import { AppThemeProvider } from "@utils/theme";
import App from "@components/App";
import "@/assets/index.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "@gql/client";
import Spinner from "@components/atoms/Spinner";
import { SnackbarProvider } from "notistack";
import { Toaster } from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AppThemeProvider>
          <App />
          <Spinner />
          <Toaster
            // position="top-right"
            position="bottom-center"
            toastOptions={{
              duration: 3000,
              style: { zIndex: 1401 },
            }}
            limit={3}
          />
        </AppThemeProvider>
      </LocalizationProvider>
    </SnackbarProvider>
  </ApolloProvider>,
  // </React.StrictMode>
);
