import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";

import UserPage from "./pages/customer/CustomerPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/product/ProductPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import DashboardAppPatient from "./pages/DashboardAppPatient";
import WelcomePage from "./pages/WelcomePage";
import CustomerRegisterPage from "./pages/CustomerRegisterPage";
import CategoryPage from "./pages/category/CategoryPage";
import BrandPage from "./pages/brand/BrandPage";
import Product from "./pages/ProductsPage";
import PurchasePage from "./pages/purchase/PurchasePage";
import AdminPage from "./pages/admin/AdminPage";
import LoanPage from "./pages/loan/LoanPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import PropertiesGrid from "./pages/properties/PropertiesGrid";
import DashboardAppAdminPage from "./pages/admindashboard/DashboardAppAdminPage";
import AdsForAdmin from "./pages/adsforadmin/AdsForAdmin";
import Audittrace from "./pages/Audittrace";
import FeedbacksPage from "./pages/Feedbacks/FeedbacksPage";
import AddApp from "./pages/app/AddApp";
import Appointment from "./pages/app/Appointment";
import PatientPage from "./pages/patient/PatientPage";
import Techicianspage from "./pages/techicians/TechiciansPage";
import Doc from "./pages/doc/Doc";
import TestPage from "./pages/test/TestPage";
import DashboardAppDoctor from "./pages/DashboardAppDoctor";
import UploadResult from "./pages/test/UploadResult";
import axios from "axios";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/patient",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/patient/dashboard" />, index: true },
        { path: "", element: <Navigate to="/patient/dashboard" /> },
        { path: "dashboard", element: <DashboardAppPatient /> },
        { path: "appointment", element: <AddApp /> },
        { path: "test", element: <Appointment /> },
      ],
    },
    {
      path: "/doctor",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/doctor/dashboard" />, index: true },
        { path: "", element: <Navigate to="/doctor/dashboard" /> },
        { path: "dashboard", element: <DashboardAppDoctor /> },
        { path: "appointment", element: <UploadResult /> },
      ],
    },
    {
      path: "/admin",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/admin/dashboard" />, index: true },
        { path: "", element: <Navigate to="/admin/dashboard" /> },
        { path: "dashboard", element: <DashboardAppAdminPage /> },
        { path: "patient", element: <PatientPage /> },
        { path: "doctor", element: <Doc /> },
        { path: "technician", element: <Techicianspage /> },
        { path: "test", element: <TestPage /> },
      ],
    },
    {
      path: "/",
      element: <SimpleLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <CustomerRegisterPage /> },
        { path: "404", element: <Page404 /> },
        { path: "/", element: <WelcomePage /> },
        { path: "*", element: <Navigate to="/404" /> },
        { path: "verify/:token", element: <EmailVerificationPage /> },
      ],
    },
  ]);

  return routes;
}
