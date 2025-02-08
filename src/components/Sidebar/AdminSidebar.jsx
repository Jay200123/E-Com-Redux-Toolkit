import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../../state/api/reducer";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function () {
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth?.user);

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout().unwrap();
    toast.success("Logged out successfully");
    navigate("/login");
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ visible: 0.8, once: false }}
      className="flex flex-col items-center justify-between w-full h-full overflow-hidden"
    >
      <div className="flex flex-col justify-center w-full p-2 mt-2">
        <div className="flex justify-center mb-2">
          <img
            onClick={() => navigate("/admin/profile")}
            src={
              auth?.image[Math.floor(Math.random() * auth?.image?.length)]?.url
            }
            className="object-contain cursor-pointer w-28 h-28 md:w-40 md:h-40"
          />
        </div>

        <h3 className="text-sm font-medium md:text-lg">
          Welcome, {auth?.role} <span className="ml-1">{auth?.fullname}</span>
        </h3>

        <ul className="w-full p-1">
          <li
            onClick={() => navigate("/admin/dashboard")}
            className="p-2 mt-2 text-sm transition-all duration-500 rounded-md cursor-pointer md:text-lg md:font-medium hover:bg-black hover:text-white"
          >
            <i className="mr-1 fa-solid fa-chart-line"></i>Dashboard
          </li>

          <li
            onClick={() => navigate("/admin/users")}
            className="p-2 mt-2 text-sm transition-all duration-500 rounded-md cursor-pointer md:text-lg md:font-medium hover:bg-black hover:text-white"
          >
            <i className="mr-1 fa-solid fa-user"></i>Users
          </li>
          <li
            onClick={() => navigate("/admin/brands")}
            className="p-2 mt-2 text-sm transition-all duration-500 rounded-md cursor-pointer md:text-lg md:font-medium hover:bg-black hover:text-white"
          >
            <i className="mr-1 fa-solid fa-tag"></i>Brands
          </li>
          <li
            onClick={() => navigate("/admin/products")}
            className="p-2 mt-2 text-sm transition-all duration-500 rounded-md cursor-pointer md:text-lg md:font-medium hover:bg-black hover:text-white"
          >
            <i className="mr-1 fa-solid fa-boxes-stacked"></i>Products
          </li>
          <li
            onClick={() => navigate("/admin/orders")}
            className="p-2 mt-2 text-sm transition-all duration-500 rounded-md cursor-pointer md:text-lg md:font-medium hover:bg-black hover:text-white"
          >
            <i className="mr-1 fa-solid fa-receipt"></i> Orders
          </li>
          <li
            onClick={() => navigate("/orders/cancel")}
            className="p-2 mt-2 text-sm transition-all duration-500 rounded-md cursor-pointer md:text-lg md:font-medium hover:bg-black hover:text-white"
          >
            <i className="mr-1 fa-solid fa-xmark"></i> Cancelled Orders
          </li>
          <li
            onClick={() => navigate("/admin/ratings")}
            className="p-2 mt-2 text-sm transition-all duration-500 rounded-md cursor-pointer md:text-lg md:font-medium hover:bg-black hover:text-white"
          >
            <i className="mr-1 fa-regular fa-star"></i> Product Reviews
          </li>
          <li
            onClick={() => navigate("/admin/profile/edit")}
            className="p-2 mt-2 text-sm transition-all duration-500 rounded-md cursor-pointer md:text-lg md:font-medium hover:bg-black hover:text-white"
          >
            <i className="mr-1 fa-solid fa-gear"></i> Edit Profile
          </li>
        </ul>
      </div>

      <ul className="w-full p-1">
        <li
          onClick={handleLogout}
          className="p-2 mt-2 text-sm transition-all duration-500 rounded-md cursor-pointer md:text-lg md:font-medium hover:bg-black hover:text-white"
        >
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </li>
      </ul>
    </motion.div>
  );
}
