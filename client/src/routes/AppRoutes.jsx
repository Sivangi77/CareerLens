import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Applications from "../pages/Applications";
import AddApplication from "../pages/AddApplication";
import ApplicationDetails from "../pages/ApplicationDetails";
import Resume from "../pages/Resume";
import Analytics from "../pages/Analytics";
import Demo from "../pages/Demo";
import HowItWorks from "../pages/HowItWorks";
import Profile from "../pages/Profile";
import Preparation from "../pages/Preparation.jsx";
import MainLayout from "../components/layout/MainLayout";
import DemoDashboard from "../pages/DemoDashboard";
import DemoApplications from "../pages/DemoApplications";
import DemoApplicationDetails from "../pages/DemoApplicationDetails";
import DemoPreparation from "../pages/DemoPreparation";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/demo/dashboard" element={<DemoDashboard />} />
      <Route path="/demo/applications" element={<DemoApplications />} />
      <Route
        path="/demo/applications/:id"
        element={<DemoApplicationDetails />}
      />
      <Route
        path="/demo/applications/:id/preparation"
        element={<DemoPreparation />}
      />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/new" element={<AddApplication />} />
          <Route path="/applications/:id" element={<ApplicationDetails />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route
            path="/applications/:id/preparation"
            element={<Preparation />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
