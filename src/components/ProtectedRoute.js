import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// roles prop: array of allowed roles, e.g. ["admin", "superadmin", "editor"]
const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (roles && !roles.includes(user?.role)) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
