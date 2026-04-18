import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../src/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  // If there is no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the Watchlist (children)
  return children;
};

export default ProtectedRoute;