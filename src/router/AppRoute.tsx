import { useRoutes } from "react-router-dom";
import { Content } from "../pages/Content";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { FormCategory } from "../pages/FormCategory";
import { Dashboard } from "../pages/Dashboard";
import { ProfileAdmin } from "../pages/ProfileAdmin";
import { AdminThemes } from "../pages/AdminThemes";
import { FormNewContent } from "../components/FormNewContent";
import { SelectedContent } from "../pages/SelectedContent";

export const AppRoute = () => {
  const router = useRoutes([

    { path: "/*", element: <Dashboard /> },
    { path: "/", element: <Dashboard /> },
    { path: "login", element: <Login /> },
    { path: "sign_up", element: <Register /> },
    { path: "nueva-categoria", element: <FormCategory /> },
    { path: "tematicas", element: <AdminThemes /> },
    { path: "administracion", element: <ProfileAdmin /> },
    { path: "contenido", element: <Content /> },
    { path: "nuevo-contenido", element: <FormNewContent /> },
    { path: "contenido/:id", element: <SelectedContent /> },

  ]);
  return router;
}