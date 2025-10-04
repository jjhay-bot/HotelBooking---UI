import {
  Landing,
  Login,
  NotFound,
} from "@pages";
import { createBrowserRouter } from "react-router-dom";
import { UiDemo } from "@ui/index";
import Room from "@/pages/Room";
import Register from "@/pages/Register";
import AdminDashboard from "@/pages/AdminDashboard.jsx";
import ContactUs from "@/pages/ContactUs";
import ProtectedRoute from "@/components/ProtectedRoute";
import SplashScreen from "@/components/SplashScreen";
import UserRecords from "@/pages/UserRecords";
import SecurityDemo from "@/demo/SecurityDemo";

const router = createBrowserRouter([
  // LANDING PAGE PER SERVICE
  {
    path: "/explore",
    element: <Landing />,
  },
  {
    path: "/",
    element: <SplashScreen />,
  },
  {
    path: "/room/:id",
    element: <Room />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/contact",
    element: <ContactUs />,
  },
  {
    path: "/user/records",
    element: <UserRecords />
  },
  // ADMIN DASHBOARD ROUTES FOR TABBED NAVIGATION
  {
    path: "/admin/bookings",
    element: <ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>,
  },
  {
    path: "/admin/users",
    element: <ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>,
  },
  {
    path: "/admin/rooms",
    element: <ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>,
  },
  // Optionally keep the old dashboard route for backward compatibility
  {
    path: "/admin/dashboard",
    element: <ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>,
  },
  {
    path: "/test",
    element: <UiDemo />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  // demo and ui test
  {
    path: "/demo/security",
    element: <SecurityDemo />,
  }
]);

export default router;
