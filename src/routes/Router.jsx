import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import AllUsers from "../pages/AllUsers";
import Products from "../pages/Products";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ProtectedRoutes from "../protectedRoutes/ProtectedRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/allUsers",
        element: <ProtectedRoutes><AllUsers /></ProtectedRoutes>,
      },
      {
        path: "/products",
        element: <ProtectedRoutes><Products /></ProtectedRoutes>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]);
