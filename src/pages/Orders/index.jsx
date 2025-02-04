import { useGetOrdersQuery } from "../../state/api/reducer";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { data } = useGetOrdersQuery();
  const orders = data?.details;

  const [status, setStatus] = useState("Processing");

  const handleStatus = (status) => {
    setStatus(status);
  };

  const isProcessed = status === "Processing";
  const isPacked = status === "Packed";
  const isShipped = status === "Shipped";
  const isDelivered = status === "Delivered";
  const isCancelled = status === "Cancelled";

  const auth = useSelector((state) => state.auth.user);

  const filteredOrders = orders?.filter(
    (order) => order?.user?._id === auth?._id
  );

  const orderedStatus = filteredOrders?.filter(
    (order) => order?.status?.toLowerCase() === status?.toLowerCase()
  );

  return (
    <>
      <div className="w-full md:max-h-[36rem] overflow-y-auto">
        <div className="w-full mt-2 mb-2">
          <ul className="flex justify-around mt-1 overflow-x-auto">
            <li
              onClick={() => handleStatus("Processing")}
              className={`p-2 cursor-pointer text-center m-2 ${
                isProcessed ? "bg-orange-500 text-white" : "bg-none text-black"
              } md:font-medium text-sm md:text-lg transition-all duration-500 rounded-md`}
            >
              <i className="mr-1 fa-solid fa-spinner"></i>Processed
            </li>
            <li
              onClick={() => handleStatus("Packed")}
              className={`p-2 text-center cursor-pointer m-2 ${
                isPacked ? "bg-yellow-500 text-white" : "bg-none text-black"
              } md:font-medium transition-all duration-500 text-sm md:text-lg rounded-md`}
            >
              <i className="mr-1 fa-solid fa-boxes-stacked"></i>Packed
            </li>
            <li
              onClick={() => handleStatus("Shipped")}
              className={`p-2 text-center cursor-pointer m-2 ${
                isShipped ? "bg-blue-500 text-white" : "bg-none text-black"
              } md:font-medium text-sm md:text-lg transition-all duration-500 rounded-md`}
            >
              {" "}
              <i className="mr-1 fa-solid fa-truck"></i>Shipped
            </li>
            <li
              onClick={() => handleStatus("Delivered")}
              className={`p-2 text-center cursor-pointer m-2 ${
                isDelivered ? "bg-green-500 text-white" : "bg-none text-black"
              } md:font-medium transition-all duration-500 text-sm md:text-lg rounded-md`}
            >
              <i className="mr-1 fa-solid fa-truck-fast"></i>Delivered
            </li>
            <li
              onClick={() => handleStatus("Cancelled")}
              className={`p-2 text-center cursor-pointer m-2 ${
                isCancelled ? "bg-red-500 text-white" : "bg-none text-black"
              } md:font-medium transition-all duration-500 text-sm md:text-lg rounded-md`}
            >
              <i className="mr-1 fa-solid fa-xmark"></i>Cancelled
            </li>
          </ul>
        </div>
        <h3 className="text-sm md:text-3xl">My Orders</h3>
        <div className="flex flex-col items-center overflow-y-auto h-[44rem] md:h-full">
          {orderedStatus?.map((order) => (
            <div
              key={order?._id}
              className="w-full p-2 mt-2 mb-2 transition-all duration-500 border-2 rounded-md"
            >
              <div className="flex justify-between">
                <div>
                  <h4 className="text-sm md:text-lg">
                    Order No#: {order?.orderNumber}
                  </h4>
                  <h4 className="text-sm md:text-lg">
                    Order Date:{" "}
                    {
                      new Date(order?.date_placed.toLocaleString())
                        .toISOString()
                        .split("T")[0]
                    }
                  </h4>
                </div>
                <div>
                  <h4 className="text-sm md:text-lg">
                    Status: {order?.status}
                  </h4>
                </div>
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm md:text-lg">Ordered Items:</h4>
                <ul>
                  {order?.products?.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between p-2 mt-2 border rounded-md border-gray-50"
                    >
                      <div className="flex items-center">
                        <img
                          src={
                            item?.product?.image[
                              Math.floor(
                                Math.random() * item?.product?.image.length
                              )
                            ].url
                          }
                          className="object-contain w-28 h-28"
                          alt="product"
                        />
                        <div>
                          <h4 className="text-xs md:text-lg">
                            {item?.product?.product_name}
                          </h4>
                          <h4 className="text-xs md:text-lg">
                            ₱{item?.product?.price}
                          </h4>
                        </div>
                      </div>

                      <h4 className="text-xs md:text-lg">x{item?.quantity}</h4>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end mt-2">
                {order?.status === "Processing" ? (
                  <button
                    onClick={() => navigate(`/order/cancel/${order?._id}`)}
                    className="p-2 mr-1 text-sm text-white bg-red-500 border rounded-md md:text-lg"
                  >
                    <i className="mr-1 fa-solid fa-trash"></i>Cancel Order
                  </button>
                ) : (
                  <> </>
                )}
                <button
                  onClick={() => navigate(`/user/order/${order?._id}`)}
                  className="p-2 text-sm text-white bg-black border rounded-md border-gray-50 md:text-lg"
                >
                  <i className="mr-1 fa-solid fa-circle-info"></i>Order Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
