import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import ResultPage from "./pages/ResultPage";

import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import VoteEventsPage from "./pages/VoteEventsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import RegisterPage from "./pages/RegisterPage";
import CreateEvent from "./pages/CreateEvent";
import Home from "./pages/Home";
import VerifyOtp from "./pages/VerifyOtp";
import EventId from "./pages/EventId";
import Modal from "./pages/Modal";
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" /> },
        { path: "app", element: <DashboardAppPage /> },
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
      path: "biometric",
      element: <RegisterPage />,
    },
    {
      path: "verify",
      element: <VerifyOtp />,
    },
    {
      path: "eventconfirm",
      element: <EventId />,
    },
    {
      path: "modal",
      element: <Modal/>,
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
