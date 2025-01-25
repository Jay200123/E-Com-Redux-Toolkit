import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../state/slice/auth";
import { toast } from "react-toastify";

export default function () {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

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

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const randomImage =
    auth?.user?.image[Math.floor(Math.random() * auth?.user.image.length)];

  return (
    <>
      <div className="flex flex-col w-full h-screen bg-white">
        {auth?.isAuthenticated ? (
          <div className="p-2 mt-2 mb-2">
            <img
              src={randomImage?.url}
              alt="avatar"
              className="object-contain w-24 h-24 rounded-full"
            />
            <h3 className="text-sm font-medium truncate cursor-pointer md:text-2xl md:font-bold">
              {auth?.user?.fullname}
            </h3>
          </div>
        ) : (
          <></>
        )}

        <ul className="flex flex-col justify-start w-full gap-4 mt-4">
          <li
            onClick={handleShop}
            className="flex items-center gap-2 text-sm font-medium cursor-pointer md:text-base"
          >
            <i className="fa-solid fa-bag-shopping"></i> Shop
          </li>
          {auth?.isAuthenticated && (
            <>
              <li
                onClick={handleOrders}
                className="flex items-center gap-2 text-sm font-medium cursor-pointer md:text-base"
              >
                <i className="fa-solid fa-box"></i> Orders
              </li>
              <li className="flex items-center gap-2 text-sm font-medium cursor-pointer md:text-base">
                <i className="fa-solid fa-star"></i> Reviews
              </li>
            </>
          )}
          <li className="flex items-center gap-2 text-sm font-medium cursor-pointer md:text-base">
            <i className="fa-solid fa-circle-info"></i> About
          </li>
          <li className="flex items-center gap-2 text-sm font-medium cursor-pointer md:text-base">
            <i className="fa-solid fa-phone"></i> Contact Us
          </li>
        </ul>

        <ul className="flex flex-col justify-end w-full gap-4 mt-4">
          {auth?.isAuthenticated ? (
            <>
              <li
                onClick={myCart}
                className="relative text-sm font-medium cursor-pointer md:text-base"
              >
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full -top-1 -right-2">
                  {cart?.item?.length || 0}
                </span>
                <i className="fa-solid fa-cart-shopping"></i> My Cart
              </li>
              <li
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-red-500 cursor-pointer md:text-base"
              >
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </li>
            </>
          ) : (
            <>
              <li
                onClick={login}
                className="flex items-center gap-2 text-sm font-medium cursor-pointer md:text-base"
              >
                <i className="fa-solid fa-right-to-bracket"></i> Login
              </li>
              <li
                onClick={register}
                className="flex items-center gap-2 text-sm font-medium cursor-pointer md:text-base"
              >
                <i className="fa-solid fa-user-plus"></i> Sign Up
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}
