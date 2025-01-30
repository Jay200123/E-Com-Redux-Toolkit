import { logout } from "../../state/slice/auth";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const randomImage =
    auth?.user?.image[Math.floor(Math.random() * auth?.user.image.length)];

  return (
    <nav className="flex items-center justify-between w-full h-16 overflow-hidden shadow-md md:hidden">
      <div className="block md:hidden overflow-x-auto w-[75%]">
        <ul className="flex items-center overflow-x-auto justify-evenly">
          <li className="mr-2 text-xs font-medium cursor-pointer md:font-bold md:mr-2 md:text-sm">
          <i className="mr-1 fa-solid fa-chart-line"></i> Dashboard
          </li>

          <li onClick={()=> navigate("/admin/users")} className="mr-2 text-xs font-medium cursor-pointer md:font-bold md:mr-2 md:text-sm">
          <i className="mr-1 fa-solid fa-user"></i> Users
          </li>

          <li onClick={()=>navigate("/admin/brands")} className="mr-2 text-xs font-medium md:font-bold md:text-sm">
          <i className="mr-1 fa-solid fa-tag"></i> Brand
          </li>
          <li onClick={()=>navigate("/admin/products")} className="mr-2 text-xs font-medium md:font-bold md:text-sm">
          <i className="mr-1 fa-solid fa-pencil-alt"></i>Product
          </li>
          <li onClick={()=>navigate("/admin/orders")} className="mr-2 text-xs font-medium md:font-bold md:text-sm">
          <i className="mr-1 fa-solid fa-box"></i>Orders
          </li>
          <li onClick={()=>navigate("/admin/ratings")} className="mr-2 text-xs font-medium md:font-bold md:text-sm">
          <i className="mr-1 fa-regular fa-star"></i> Reviews
          </li>
        </ul>
      </div>

      <div className="block md:hidden w-[25%]"> 
        <ul className="flex flex-row items-center">
          <li
            onClick={() => navigate("/admin/profile")}
            className="space-x-1 text-xs font-medium cursor-pointer md:font-bold md:text-sm"
          >
            <img
              src={randomImage?.url}
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
        </ul>
      </div>
    </nav>
  );
}
