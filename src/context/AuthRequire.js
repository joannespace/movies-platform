import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useInitialize from "../hooks/useInitialize";

function AuthRequire({ children }) {
  let location = useLocation();

  const { isLoggedIn } = useInitialize();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AuthRequire;
