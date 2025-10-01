import { Navigate } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { initLoadingVar } from "@gql/reactiveVar";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const auth = useAuth();
  const { user, loading } = auth || {};
  const initLoading = useReactiveVar(initLoadingVar);  

  // Show loading while auth state is being determined or if auth context is not available
  if (!auth || loading || initLoading) return null;

  const authenticated = !!user;
  const admin = user?.role?.toLowerCase() === "admin";

  if (adminOnly) {
    if (!authenticated) return <Navigate to="/login" replace />;
    if (!admin && authenticated) return <Navigate to="/" replace />;
    return children;
  }

  // For non-admin routes, render children even if not authenticated
  return children;
};

export default ProtectedRoute;
