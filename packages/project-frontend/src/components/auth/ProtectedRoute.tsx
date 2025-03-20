import { Navigate } from "react-router";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  authToken: string;
  children: ReactNode;
}

export function ProtectedRoute(props: ProtectedRouteProps) {
  if (!props.authToken) {
    return <Navigate to="/login" replace />;
  }

  return props.children;
}
