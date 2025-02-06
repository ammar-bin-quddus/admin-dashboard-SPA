import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthProvider";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if(loading) {
    return <Loading />
  }

  if(user) {
    return children;
  }

  return <Navigate state={location.pathname} to='/login'></Navigate>;
};

export default ProtectedRoutes;