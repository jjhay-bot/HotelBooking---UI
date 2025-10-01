import { RouterProvider } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import router from "@routes/routes";
import { AuthProvider } from "@/context/AuthContext";

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  );
}
