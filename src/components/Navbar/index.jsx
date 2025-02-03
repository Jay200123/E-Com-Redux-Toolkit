import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../state/api/reducer";

export default function () {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const [logout] = useLogoutMutation();

  const register = () => {
    navigate("/register");
  };

  const login = () => {
    navigate("/login");
  };

  const myCart = () => {
    navigate("/cart");
  };

  const handleOrders = () => {
    navigate("/user/orders");
  };

  const handleShop = () => {
    navigate("/shop");
  };

  const handleMenu = () => {
    navigate("/menu");
  };

  const handleLogout = async () => {
    await logout().unwrap();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const randomImage =
    auth?.user?.image[Math.floor(Math.random() * auth?.user.image.length)];

  return (
    <nav className="flex items-center justify-between w-full h-16 overflow-hidden shadow-md">
      <h3
        onClick={() => navigate("/")}
        className="text-sm font-medium truncate cursor-pointer md:text-2xl md:font-bold"
      >
        <i className="mr-1 fa-solid fa-screwdriver-wrench"></i>Tech Fix
      </h3>
      <div className="hidden md:block">
        <ul className="flex flex-row items-center overflow-x-auto">
          <li
            onClick={handleShop}
            className="mr-1 text-xs font-medium cursor-pointer md:font-bold md:mr-2 md:text-sm"
          >
            <i className="mr-[2px] fa-solid fa-bag-shopping"></i> Shop
          </li>
          {auth?.isAuthenticated ? (
            <>
              <li
                onClick={handleOrders}
                className="block mr-1 text-xs font-medium md:hidden md:font-bold md:mr-2 md:text-sm"
              >
                Orders
              </li>
              <li className="block mr-1 text-xs font-medium md:hidden md:font-bold md:mr-2 md:text-sm">
                Reviews
              </li>
            </>
          ) : (
            <></>
          )}

          <li className="mr-1 text-xs font-medium md:font-bold md:mr-2 md:text-sm">
            <i className="mr-1 fa-solid fa-circle-info"></i> About
          </li>
          <li className="mr-1 text-xs font-medium truncate md:font-bold md:mr-2 md:text-sm">
            <i className="mr-1 fa-solid fa-phone"></i>Contact Us
          </li>
        </ul>
      </div>
      <div className="hidden md:block">
        <ul className="flex flex-row items-center">
          {auth?.isAuthenticated ? (
            <>
              <li
                onClick={myCart}
                className="relative p-2 mr-4 text-lg font-medium cursor-pointer md:font-bold"
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
                <img
                  src={randomImage.url}
                  alt="avatar"
                  className="w-8 h-8 rounded-full md:w-10 md:h-10"
                />
              </li>
              <li
                onClick={handleLogout}
                className="p-1 ml-1 font-medium cursor-pointer md:p-2 md:font-bold"
              >
                <i className="text-lg fa-solid fa-right-from-bracket"></i>
              </li>
            </>
          ) : (
            <>
              <li
                onClick={myCart}
                className="relative p-2 mr-4 text-lg font-medium cursor-pointer md:font-bold"
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
                <i className="fa-solid fa-right-to-bracket mr-[2px]"></i>LOGIN
              </li>
              <li
                onClick={register}
                className="mr-1 text-xs font-medium truncate cursor-pointer md:mr-2 md:font-bold md:text-sm"
              >
                <i className="fa-solid fa-user-plus mr-[2px]"></i> SIGN UP
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="block p-1 mr-4 rounded-md md:hidden ">
        <ul className="flex flex-row items-center">
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
            className="p-1 transition-all duration-500 rounded-md hover:bg-gray-500 hover:text-white "
            onClick={handleMenu}
          >
            <i className="2xl fa-solid fa-bars"></i>
          </li>
        </ul>
      </div>
    </nav>
  );
}
