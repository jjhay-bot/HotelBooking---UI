import { Navigate } from "react-router-dom";
import { isAdmin, isAuthenticated } from "../utils/isAuthenticated";
// You may have a user context or similar; adjust as needed
import { useReactiveVar } from "@apollo/client";
import { initLoadingVar } from "@gql/reactiveVar";
// import { currentUserVar } from "@gql/reactiveVar"; // Example if you have a user var

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const authenticated = isAuthenticated();
  const admin = isAdmin();
  const initLoading = useReactiveVar(initLoadingVar);

  if (initLoading) return null;

  if (adminOnly) {
    if (!authenticated) return <Navigate to="/login" replace />;
    if (!admin && authenticated) return <Navigate to="/" replace />;
    return children;
  }

  // For non-admin routes, render children even if not authenticated
  return children;
};

export default ProtectedRoute;
