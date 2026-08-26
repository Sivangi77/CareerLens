import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Applications from "../pages/Applications";
import ApplicationDetails from "../pages/ApplicationDetails";
import Resume from "../pages/Resume";
import Analytics from "../pages/Analytics";
import Demo from "../pages/Demo";
import HowItWorks from "../pages/HowItWorks";

function AppRoutes() {
    return (
        <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/demo" element={<Demo />} />
    <Route path="/how-it-works" element={<HowItWorks />} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/applications/:id" element={<ApplicationDetails />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/analytics" element={<Analytics />} />
    </Route>
</Routes>
    );
}

export default AppRoutes;