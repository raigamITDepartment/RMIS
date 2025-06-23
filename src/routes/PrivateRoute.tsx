import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "@components/ui/loader/loader";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (loading) return <Loader text="Loading..." />;

  if (!user || !token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
