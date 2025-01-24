import Logo from "../../assets/web-logo.png";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const handleOrders = () => {
    navigate("/user/orders");
  };

  const handleRatings = () => {
    navigate("/user/ratings");
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full overflow-hidden">
      <div className="flex justify-center w-full p-2 mt-2">
        <img src={Logo} className="object-contain w-28 h-28 md:w-36 md:h-36" />
      </div>
      <ul className="w-full p-1">
        <li
          onClick={handleProfile}
          className="p-2 mt-2 text-sm transition-all duration-500 rounded-md cursor-pointer md:text-lg md:font-medium hover:bg-black hover:text-white"
        >
          <i className="mr-1 fa-solid fa-user"></i>User Profile
        </li>
        <li
          onClick={handleEditProfile}
          className="p-2 mt-2 text-sm transition-all duration-500 rounded-md cursor-pointer md:text-lg md:font-medium hover:bg-black hover:text-white"
        >
          <i className="mr-1 fa-solid fa-pencil-alt"></i>Edit Profile
        </li>
        <li
          onClick={handleOrders}
          className="p-2 mt-2 text-sm transition-all duration-500 rounded-md cursor-pointer md:text-lg md:font-medium hover:bg-black hover:text-white"
        >
          <i className="mr-1 fa-solid fa-box"></i> Orders
        </li>
        <li
          onClick={handleRatings}
          className="p-2 mt-2 text-sm transition-all duration-500 rounded-md cursor-pointer md:text-lg md:font-medium hover:bg-black hover:text-white"
        >
          <i className="mr-1 fa-solid fa-star"></i> Product Reviews
        </li>
      </ul>

      <ul className="w-full p-1">
        <li className="p-2 mt-2 text-sm transition-all duration-500 rounded-md cursor-pointer md:text-lg md:font-medium hover:bg-black hover:text-white">
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </li>
      </ul>
    </div>
  );
}
