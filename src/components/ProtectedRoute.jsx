import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return <Navigate to="/" />;
  }

  if (allowedRoles.includes(user.role)) {
    return <Outlet />;
  }

  return <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
