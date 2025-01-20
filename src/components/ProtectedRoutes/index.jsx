import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function({ children, userRole }) {
  const auth = useSelector((state) => state.auth);

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userRole) {
    const isRoleAuthorized = Array.isArray(userRole)
      ? userRole.includes(auth?.user?.role)
      : auth?.user?.role === userRole;

    if (!isRoleAuthorized) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return <>{children}</>;
};
