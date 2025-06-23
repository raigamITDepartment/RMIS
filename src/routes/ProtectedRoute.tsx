// src/routes/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ERole } from "@types";
import { JSX } from "react";

interface IProps {
  roles: ERole[];
  children: JSX.Element;
}

export default function ProtectedRoute({ roles, children }: IProps) {
  const { user } = useAuth();

  const isAllowed = roles.some((role) => user?.roles.includes(role));

  if (!isAllowed) return <Navigate to="/notFound" />;

  return children;
}
