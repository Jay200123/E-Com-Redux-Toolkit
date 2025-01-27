import { useDispatch } from "react-redux";
import { logout } from "../../state/slice/auth";
import { toast } from "react-toastify";

export default function () {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfully");
  };
  return <h3 onClick={handleLogout}>this is admin dashboard!</h3>;
}
