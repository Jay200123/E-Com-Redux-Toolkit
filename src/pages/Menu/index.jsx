import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../state/slice/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";

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

  const back = () => {
    window.history.back();
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      width > 768 ? navigate("/") : navigate("/menu");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate]);

  const randomImage =
    auth?.user?.image[Math.floor(Math.random() * auth?.user.image.length)];

  return (
    <>
      <div className="relative flex flex-col w-full h-screen bg-white">
        <i
          onClick={back}
          className="absolute top-0 left-0 m-2 text-2xl cursor-pointer fa fa-arrow-left"
        ></i>
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
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 text-sm font-medium cursor-pointer md:text-base"
              >
                <i className="fa-solid fa-user"></i>User Profile
              </li>
              <li
                onClick={handleOrders}
                className="flex items-center gap-2 text-sm font-medium cursor-pointer md:text-base"
              >
                <i className="fa-solid fa-box"></i> Orders
              </li>
              <li
                onClick={() => navigate("/order/ratings")}
                className="flex items-center gap-2 text-sm font-medium cursor-pointer md:text-base"
              >
                <i className=" fa-regular fa-star"></i> Rate Products
              </li>
              <li
               onClick={()=>navigate("/user/ratings")} 
                className="flex items-center gap-2 text-sm font-medium cursor-pointer md:text-base"
              >
                <i className="mr-1 fa-solid fa-star"></i> Product Reviews
              </li>
              
            </>
          )}
          <li className="flex items-center gap-2 text-sm font-medium cursor-pointer md:text-base">
            <i className="fa-solid fa-circle-info"></i> About
          </li>
          <li className="flex items-center gap-2 text-sm font-medium cursor-pointer md:text-base">
            <i className="fa-solid fa-phone"></i> Contact Us
          </li>

          {auth?.isAuthenticated ? (
            <>
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
