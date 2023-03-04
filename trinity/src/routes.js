import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import ResultPage from "./pages/ResultPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import VoteEventsPage from "./pages/VoteEventsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import RegisterPage from "./pages/RegisterPage";
import CreateEvent from "./pages/CreateEvent";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" /> },
        { path: "app", element: <DashboardAppPage /> },
        { path: "user", element: <UserPage /> },
        { path: "vote", element: <VoteEventsPage /> },
        { path: "result", element: <ResultPage /> },
        { path: "event", element: <CreateEvent /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "Register",
      element: <RegisterPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
