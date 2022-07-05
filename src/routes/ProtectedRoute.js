import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, currentUser } = useAuth();
  if (!isLoggedIn) {
    console.log("came here", children);
    return <Navigate to="/login" replace />;
  }
  return children;
}
