import {
  useGetUsersQuery,
  useGetProductsQuery,
  useGetOrdersQuery,
} from "../../state/api/reducer";
import {
  FaUser,
  FaBoxOpen,
  FaClipboardList,
  FaDollarSign,
} from "react-icons/fa";

export default function () {
  const { data: userDetails } = useGetUsersQuery();
  const users = userDetails?.details;
  const { data: productDetails } = useGetProductsQuery();
  const products = productDetails?.details;
  const { data: orderDetails } = useGetOrdersQuery();
  const orders = orderDetails?.details;

  const filteredOrders = orders?.filter(
    (order) => order.status.toLowerCase() === "delivered"
  );

  const revenue = filteredOrders?.reduce((acc, order) => {
    return acc?.price + order.price;
  });

  return (
    <div className="flex w-full p-2 mb-4shadow-md justify-evenly md:flex-row md:justify-between">
      <div className="flex flex-col overflow-hidden text-center border-r pl-1 border-gray-500  w-[25%] h-28 md:h-36">
        <h3 className="text-xs font-bold text-center md:font-medium md:text-lg">
          {" "}
          Number of Users
        </h3>
        <p className="text-xs text-center md:text-2xl">{users?.length}</p>
        <FaUser className="text-2xl text-green-500 md:text-4xl" />
      </div>
      <div className="flex flex-col overflow-hidden text-center border-r pl-1 border-gray-500    w-[25%]  h-28 md:h-36">
        <h3 className="text-xs font-bold text-center md:font-medium md:text-lg">
          {" "}
          Number of Products
        </h3>
        <p className="text-xs text-center md:text-2xl">{products?.length}</p>
        <FaBoxOpen className="text-2xl text-blue-500 md:text-4xl" />
      </div>
      <div className="flex flex-col w-[25%] overflow-hidden text-center border-r pl-1 border-gray-500  h-28 md:h-36">
        <h3 className="text-xs font-bold text-center md:font-medium md:text-lg">
          {" "}
          Number of Orders
        </h3>
        <p className="text-xs text-center md:text-2xl">{orders?.length}</p>
        <FaClipboardList className="text-2xl md:text-4xl text-[#FD7E14]" />
      </div>
      <div className="flex flex-col w-[25%] overflow-hidden text-center border-r pl-1 border-gray-500 h-28 md:h-36">
        <h3 className="text-xs font-bold text-center md:font-medium md:text-lg">
          {" "}
          Total Revenue
        </h3>
        <p className="text-sm text-center md:text-2xl">{revenue}</p>
        <FaDollarSign className="text-2xl text-black md:text-4xl" />
      </div>
    </div>
  );
}
