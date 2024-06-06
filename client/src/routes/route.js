import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import AdminPanel from "../Pages/AdminPanel";
import AllUsers from "../Pages/AllUsers";
import AllProducts from "../Pages/AllProducts";

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
      {
        path: "admin",
        element: (
          <ProtectedRoutes>
            <AdminPanel />
          </ProtectedRoutes>
        ),
        children: [
          { path: "all-users", element: <AllUsers /> },
          { path: "all-products", element: <AllProducts /> },
        ],
      },
      {
        path: "login",
        element: (
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        ),
      },
    ],
  },
]);

// Export
export default router;
