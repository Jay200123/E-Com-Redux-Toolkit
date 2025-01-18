import { logout } from "../../state/slice/auth";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const register = () => {
    navigate("/register");
  };

  const login = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };
  return (
    <nav className="flex items-center justify-between w-full h-16 overflow-hidden shadow-md md:flex-row">
      <h3
        onClick={() => navigate("/")}
        className="text-sm font-medium truncate cursor-pointer md:text-lg md:font-bold"
      >
        IT Shop
      </h3>
      <ul className="flex flex-row items-center">
        <li className="mr-1 text-xs font-medium md:font-bold md:mr-2 md:text-sm">
          Home
        </li>
        <li className="mr-1 text-xs font-medium md:font-bold md:mr-2 md:text-sm">
          About
        </li>
        <li className="mr-1 text-xs font-medium truncate md:font-bold md:mr-2 md:text-sm">
          Contact Us
        </li>
      </ul>
      <ul className="flex flex-row items-center">
        {auth?.isAuthenticated ? (
          <>
            <li
              onClick={() => console.log("cart")}
              className="mr-1 text-xs font-medium md:font-bold md:text-sm"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </li>
            <li
              onClick={handleLogout}
              className="mr-1 text-xs font-medium md:font-bold md:text-sm"
            >
              LOGOUT
            </li>
          </>
        ) : (
          <>
            <li
              onClick={() => console.log("cart")}
              className="mr-1 text-xs font-medium md:mr-2 md:font-bold md:text-sm"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </li>
            <li
              onClick={login}
              className="mr-1 text-xs font-medium cursor-pointer md:mr-2 md:font-bold md:text-sm"
            >
              LOGIN
            </li>
            <li
              onClick={register}
              className="mr-1 text-xs font-medium truncate cursor-pointer md:mr-2 md:font-bold md:text-sm"
            >
              SIGN UP
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
