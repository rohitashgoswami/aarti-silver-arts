import { Navigate, useLocation } from "react-router-dom";
import { getAdminToken } from "../api/client";

export default function AdminRoute({ children }) {
  const token = getAdminToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ redirectTo: location.pathname }} />;
  }

  return children;
}

