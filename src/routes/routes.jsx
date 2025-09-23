import {
  Landing,
  NotFound,
} from "@pages";
import { createBrowserRouter } from "react-router-dom";
import { UiDemo } from "@ui/index";

const router = createBrowserRouter([
  // LANDING PAGE PER SERVICE
  {
    path: "/",
    element: <Landing />,
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
