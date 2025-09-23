import { RouterProvider } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import router from "@routes/routes";

export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
