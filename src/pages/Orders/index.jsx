import { useGetOrdersQuery } from "../../state/api/reducer";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function () {
  const { data } = useGetOrdersQuery();
  const orders = data?.details;

  const[status, setStatus] = useState("Processing"); 

  const handleStatus = (status) => {  
    setStatus(status);
  }
  
  const isProcessed  = status === "Processing";
  const isPacked = status === "Packed"; 
  const isShipped = status === "Shipped";
  const isDelivered = status === "Delivered";
  const isCancelled = status === "Cancelled";

  const auth = useSelector((state) => state.auth.user);

  const filteredOrders = orders?.filter(
    (order) => order?.user?._id === auth?._id
  );

  const orderedStatus = filteredOrders?.filter((order) => order?.status?.toLowerCase() === status?.toLowerCase());
  
  return (
    <>
      <div className="w-full h-full">
        <div className="w-full mt-2 mb-2">
          <ul className="flex justify-around mt-1 overflow-x-auto">
            <li onClick={()=>handleStatus("Processing")} className={`p-2 cursor-pointer text-center m-2 ${ isProcessed ? "bg-orange-500 text-white" : "bg-none text-black"} md:font-medium text-sm md:text-lg transition-all duration-500 rounded-md`}>
              <i className="mr-1 fa-solid fa-spinner"></i>Processed
            </li>
            <li onClick={()=>handleStatus("Packed")} className={`p-2 text-center cursor-pointer m-2 ${isPacked ? "bg-yellow-500 text-white" : "bg-none text-black"} md:font-medium transition-all duration-500 text-sm md:text-lg rounded-md`}>
              <i className="mr-1 fa-solid fa-boxes-stacked"></i>Packed
            </li>
            <li onClick={()=>handleStatus("Shipped")} className={`p-2 text-center cursor-pointer m-2 ${ isShipped ? "bg-blue-500 text-white" : "bg-none text-black"} md:font-medium text-sm md:text-lg transition-all duration-500 rounded-md`}>
              {" "}
              <i className="mr-1 fa-solid fa-truck"></i>Shipped
            </li>
            <li onClick={()=>handleStatus("Delivered")} className={`p-2 text-center cursor-pointer m-2 ${isDelivered ? "bg-green-500 text-white" : "bg-none text-black"} md:font-medium transition-all duration-500 text-sm md:text-lg rounded-md`}>
              <i className="mr-1 fa-solid fa-truck-fast"></i>Delivered
            </li>
            <li onClick={()=>handleStatus("Cancelled")} className={`p-2 text-center cursor-pointer m-2 ${isCancelled ? "bg-red-500 text-white" : "bg-none text-black"} md:font-medium transition-all duration-500 text-sm md:text-lg rounded-md`}>
              <i className="mr-1 fa-solid fa-xmark"></i>Cancelled
            </li>
          </ul>
        </div>
        <h3 className="text-sm md:text-3xl">My Orders</h3>
        <div className="flex flex-col items-center">
          {orderedStatus?.map((order) => (
            <div key={order?._id} className="w-full p-2 mt-2 border-2 rounded-md">
              <div className="flex justify-between">
                <div>
                  <h4 className="text-sm md:text-lg">Order No#: {order?.orderNumber}</h4>
                  <h4 className="text-sm md:text-lg">Order Date: {order?.date_placed}</h4>
                </div>
                <div>
                  <h4 className="text-sm md:text-lg">Status: {order?.status}</h4>
                </div>
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm md:text-lg">Ordered Items:</h4>
                <ul>
                  {order?.products?.map((item, index) => (
                    <li key={index} className="flex justify-between p-2 border border-gray-50">
                      <div className="flex items-center">
                        <img
                          src={item?.product?.image[Math.floor(Math.random() * item?.product?.image.length)].url}    
                          className="object-contain w-28 h-28"
                          alt="product"
                        />
                        <div>
                        <h4 className="text-sm md:text-lg">{item?.product?.product_name}</h4> 
                        <h4 className="text-sm md:text-lg">₱{item?.product?.price}</h4> 
                        </div>

                        </div>
                      
                      <h4 className="text-sm md:text-lg">x {item?.quantity}</h4>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))} 
        </div>
      </div>
    </>
  );
}
