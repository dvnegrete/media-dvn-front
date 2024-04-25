import { useRoutes } from "react-router-dom";
import { Content } from "../pages/Content";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { FormCategory } from "../pages/FormCategory";
import { Dashboard } from "../pages/Dashboard";
import { ProfileAdmin } from "../pages/ProfileAdmin";
import { AdminThemes } from "../pages/AdminThemes";
import { FormNewContent } from "../components/FormNewContent";

export const AppRoute = () => {
  const router = useRoutes([

    { path: "/", element: <Content /> },
    { path: "/login", element: <Login /> },
    { path: "/sign_up", element: <Register /> },
    { path: "/nueva-categoria", element: <FormCategory /> },
    { path: "/tematicas", element: <AdminThemes /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/administracion", element: <ProfileAdmin /> },
    { path: "/nuevo-contenido", element: <FormNewContent /> },
    { path: "/contenido", element: <Content/> },

  ]);
  return router;
}