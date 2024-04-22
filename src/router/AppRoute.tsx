import { useRoutes } from "react-router-dom";
import { Content } from "../pages/Content";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { FormCategory } from "../pages/FormCategory";
import { FormNewTheme } from "../pages/FormNewTheme";
import { Dashboard } from "../pages/Dashboard";
import { ProfileAdmin } from "../pages/ProfileAdmin";

export const AppRoute = () => {
  const router = useRoutes([

    { path: "/", element: <Content /> },
    { path: "/login", element: <Login /> },
    { path: "/sign_up", element: <Register /> },
    { path: "/nueva-categoria", element: <FormCategory /> },
    { path: "/nueva-tematica", element: <FormNewTheme /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/administracion", element: <ProfileAdmin /> },
    // { path: "/sign_up", element: <Register /> },

  ]);
  return router;
}