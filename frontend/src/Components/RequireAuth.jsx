import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const token = localStorage.getItem("jwt");

  // later: add check for token validity/expiration
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;