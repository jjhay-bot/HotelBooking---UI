import ReactDOM from "react-dom/client";
import { AppThemeProvider } from "@utils/theme";
import App from "@components/App";
import "@/assets/index.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "@gql/client";
import Spinner from "@components/atoms/Spinner";
import { SnackbarProvider } from "notistack";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <AppThemeProvider>
        <App />
        <Spinner />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { zIndex: 1401 },
          }}
          limit={3}
        />
      </AppThemeProvider>
    </SnackbarProvider>
  </ApolloProvider>,
  // </React.StrictMode>
);
