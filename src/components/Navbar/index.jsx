import { logout } from "../../state/slice/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function () {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };
  return <nav className="flex items-center justify-between w-full h-16 shadow-md md:flex-row" onClick={handleLogout}>
    <div>React</div>
    <ul className="flex flex-row items-center">
      <li className="mr-1">LOGIN</li>
      <li className="mr-1">SIGN UP</li>
    </ul>
  </nav>;
}
