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

const router = createBrowserRouter([
  // LANDING PAGE PER SERVICE
  {
    path: "/",
    element: <Landing />,
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
  // ADMIN DASHBOARD
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/test",
    element: <UiDemo />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
