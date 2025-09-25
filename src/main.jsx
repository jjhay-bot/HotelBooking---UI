import ReactDOM from "react-dom/client";
import { AppThemeProvider } from "@utils/theme";
import App from "@components/App";
import "@/assets/index.css";
import { Notification } from "@components/atoms/Notification";
import { ApolloProvider } from "@apollo/client";
import { client } from "@gql/client";
import Spinner from "@components/atoms/Spinner";
import QuickActions from "./components/molecules/QuickActions";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <AppThemeProvider>
      <App />
      <Notification />
      <Spinner />
    </AppThemeProvider>
  </ApolloProvider>,
  // </React.StrictMode>
);
