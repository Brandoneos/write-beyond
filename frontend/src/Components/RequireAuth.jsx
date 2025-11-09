// src/components/RequireAuth.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation(); // ← ADD THIS
  // console.log("RequireAuth: user =", user); // ← ADD THIS

  if (!user) {
    // console.log("No user → redirect to /login");
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

// Must export!
export default RequireAuth;