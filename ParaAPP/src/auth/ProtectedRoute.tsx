// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import authStore from "./authStore";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const isAuth = authStore((state) => state.isAuth);

  return isAuth ? <>{element}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
