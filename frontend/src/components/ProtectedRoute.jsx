import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const role = localStorage.getItem("role"); // role stored on login/register

  if (!role) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    // Logged in but not allowed for this route
    return <Navigate to="/login" />; // or redirect to their dashboard
  }

  return children;
};

export default ProtectedRoute;
