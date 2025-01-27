import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ({ children, userRole }) {
  const auth = useSelector((state) => state.auth);

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userRole) {
    const isRoleAuthorized = Array.isArray(userRole)
      ? userRole.includes(auth?.user?.role)
      : auth?.user?.role === userRole;

    if (!isRoleAuthorized) {
      if(auth?.user?.role === "User"){
        return <Navigate to="/profile" replace />;  
      } else if (auth?.user?.role === "Admin"){
        return <Navigate to="/admin/dashboard" replace />;  
      }else {
        return <Navigate to="/login" replace />;
      }
    }
  }

  return <>{children}</>;
}
