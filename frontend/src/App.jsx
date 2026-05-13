import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./layouts/AppLayouts"

function DashboardWrapper() {
  return (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  );
}

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<DashboardWrapper />} />

    </Routes>
  );
}