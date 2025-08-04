import React from "react";
import { Navigate } from "react-router-dom";
import { STORAGE_KEYS } from "../../lib/constants";

interface Props {
  children: React.ReactElement;
}

export const ProtectedRoute = ({ children }: Props) => {
  const token = localStorage.getItem(`${STORAGE_KEYS.TODO_TOKEN}`);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};
