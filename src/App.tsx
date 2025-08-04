import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ToastProvider } from "./lib/toast-context";
import { ProtectedRoute } from "./components/protected-route/protected-route";

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ToastProvider>
  );
}
