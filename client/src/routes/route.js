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
import ProductCategory from "../Pages/ProductCategory";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import SearchProductShow from "../Pages/SearchProductShow";
import MyOrders from "../Pages/MyOrders";
import MyAddress from "../Pages/MyAddress";

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
        path: "product-category/:categoryName",
        element: <ProductCategory />,
      },
      {
        path: "product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "search-product",
        element: <SearchProductShow />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "my-orders",
        element: (
          <ProtectedRoutes>
            <MyOrders />
          </ProtectedRoutes>
        ),
      },
      {
        path: "my-address",
        element: (
          <ProtectedRoutes>
            <MyAddress />
          </ProtectedRoutes>
        ),
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
