import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/isAuthenticated";
import { useReactiveVar } from "@apollo/client";
import { initLoadingVar } from "@gql/reactiveVar";

const ProtectedRoute = ({ children }) => {
  // const authenticated = isAuthenticated();
  // const initLoading = useReactiveVar(initLoadingVar);

  // if (initLoading) return;

  // if (!authenticated) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
