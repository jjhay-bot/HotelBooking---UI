import {
  Landing,
  NotFound,
} from "@pages";
import { createBrowserRouter } from "react-router-dom";
import { UiDemo } from "@ui/index";
import Room from "@/pages/Room";

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
    path: "/test",
    element: <UiDemo />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
