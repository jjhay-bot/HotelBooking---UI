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
import { Notification } from "./components/atoms/Notification";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <HelmetProvider>
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
            <Notification />
          </AppThemeProvider>
        </LocalizationProvider>
      </SnackbarProvider>
    </ApolloProvider>
  </HelmetProvider>
  // </React.StrictMode>
);
