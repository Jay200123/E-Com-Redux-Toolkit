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
    navigate("/login");
  };

  const randomImage = auth?.user?.image[Math.floor(Math.random() * auth?.user.image.length)]; 

  return (
    <nav className="flex items-center justify-between w-full h-16 overflow-hidden shadow-md">
      <h3
        onClick={() => navigate("/")}
        className="text-sm font-medium truncate cursor-pointer md:text-2xl md:font-bold"
      >
        <i className="mr-1 fa-solid fa-screwdriver-wrench"></i>Tech Fix
      </h3>
      <ul className="flex flex-row items-center overflow-hidden overflow-x-auto ">  
        <li className="mr-1 text-xs font-medium md:truncate md:font-bold md:mr-2 md:text-sm">
          Home
        </li>
        <li className="mr-1 text-xs font-medium md:truncate md:font-bold md:mr-2 md:text-sm">
          About
        </li>
        <li className="mr-1 text-xs font-medium truncate md:font-bold md:mr-2 md:text-sm">
          Contact Us
        </li>
        <li className="block mr-1 text-xs font-medium md:truncate md:hidden md:font-bold md:mr-2 md:text-sm">
          Orders
        </li>
        <li className="block mr-1 text-xs font-medium truncate md:hidden md:font-bold md:mr-2 md:text-sm">
          Product Review
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
            onClick={() => navigate("/profile")}  
              className="space-x-1 text-xs font-medium cursor-pointer md:font-bold md:text-sm"
            >
              <img src={randomImage.url} alt="avatar" className="w-8 h-8 rounded-full" />  
            </li>
            <li
              onClick={handleLogout}
              className="p-1 ml-1 font-medium md:p-2 md:font-bold"
            >
              <i className="text-lg fa-solid fa-right-from-bracket"></i>
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
