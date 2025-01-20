import { logout } from "../../state/slice/auth";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);


  const register = () => {
    navigate("/register");
  };

  const login = () => {
    navigate("/login");
  };

  const myCart = ()=>{
    navigate("/cart");
  }

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };
  return (
    <nav className="flex items-center justify-between w-full h-16 overflow-hidden shadow-md">
      <h3
        onClick={() => navigate("/")}
        className="text-sm font-medium truncate cursor-pointer md:text-2xl md:font-bold"
      >
        <i class="fa-solid fa-screwdriver-wrench mr-1"></i>Tech Fix
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
              onClick={myCart}
              className="relative p-2 mr-4 text-lg font-medium md:font-bold"
            >
               <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 p-1 text-xs font-medium text-white bg-red-500 rounded-full cursor-pointer md:text-sm">
                {cart?.item?.length || 0}
              </span>
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
              onClick={myCart}
              className="relative p-2 mr-4 text-lg font-medium md:font-bold"
            >
              <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 p-1 text-sm font-medium text-white bg-red-500 rounded-full cursor-pointer">
                {cart?.item?.length || 0}
              </span>
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
