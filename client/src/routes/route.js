import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";

// Create Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

// Export
export default router;
