import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import UseAuth from "../hooks/UseAuth";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default ProtectedRoutes;
