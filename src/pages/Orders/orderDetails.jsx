import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../state/api/reducer";
export default function () {
  const { id } = useParams();
  const { data } = useGetOrderByIdQuery(id);
  const order = data?.details;

  const back = () => {
    window.history.back();
  };

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <h3
          onClick={back}
          className="ml-1 text-sm text-left cursor-pointer md:text-lg"
        >
          <i className="mr-1 fa-solid fa-arrow-left"></i>Go Back
        </h3>
        <nav className="flex flex-col items-center w-full h-[10rem] md:h-[14rem] overflow-hidden bg-white shadow-md">
          <h3 className="space-x-2 text-sm md:text-2xl">Order Details</h3>
          <div className="w-full h-[4rem] items-center flex justify-between px-4 md:px-8">
            <h3 className="space-x-2 text-sm md:text-lg">
              Order ID: <span className="ml-1">{order?.orderNumber}</span>
            </h3>
            <div className="flex items-center p-2 m-1 text-white">
              <button className="p-1 mr-2 text-sm transition-all duration-500 bg-blue-500 border border-gray-500 rounded-md md:p-2 md:font-medium md:text-lg hover:bg-white hover:text-blue-500">
                <i className="mr-1 fa-solid fa-file-invoice"></i>
                Generate Invoice
              </button>
              <button className="p-1 mr-2 text-sm transition-all duration-500 bg-blue-500 border border-gray-500 rounded-md md:p-2 md:font-medium md:text-lg hover:bg-white hover:text-blue-500">
                <i className="mr-1 fa-solid fa-circle-dot"></i>
                Track Order
              </button>
            </div>
          </div>
          <div className="w-full h-[4rem] items-center flex justify-between px-4 md:px-8">
            <h3 className="text-sm font-medium text-black md:text-lg md:font-bold">
              <i className="mr-1 fa-solid fa-calendar"></i>
              Date Placed:{" "}
              <span className="ml-1 font-medium underline text-md md:text-lg">
                {order
                  ? new Date(order.date_placed.toLocaleString())
                      .toISOString()
                      .split("T")[0]
                  : "Loading..."}
              </span>
            </h3>
            <h3 className="text-sm font-medium text-black md:text-lg md:font-bold">
              <i className="mr-1 fa-solid fa-calendar"></i>
              Order Subtotal:{" "}
              <span className="ml-1 font-medium underline text-md md:text-lg">
                ₱ {order?.price}
              </span>
            </h3>
          </div>
        </nav>
        {order?.products.map((p, index) => (
          <div
            key={index}
            className="flex flex-col w-full p-1 border border-gray-400 shadow-sm md:flex-row"
          >
            <div className="flex w-[30%]">
              {p?.product?.image?.length > 1 ? (
                <img
                  className="object-contain w-40 h-40 md:w-60 md:h-60"
                  src={
                    p?.product?.image[
                      Math.floor(Math.random() * p?.product?.image.length)
                    ]?.url
                  }
                  alt="test image"
                />
              ) : (
                <img
                  className="object-contain w-40 h-40 md:w-60 md:h-60"
                  src={p?.product?.image[0]?.url || ""}
                  alt="image"
                />
              )}
            </div>
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between w-full p-2 mb-2">
                <h3 className="text-sm md:text-lg">
                  {p?.product?.product_name}
                </h3>
                <h3 className="text-sm md:text-lg"> ₱ {p?.product?.price}</h3>
              </div>
              <div className="w-full p-2 mb-2">
                <p className="text-xs md:text-sm">{p?.product?.description}</p>
              </div>
              <div className="flex items-center justify-end w-full p-2 mb-2">
                <h3 className="text-sm md:text-lg">Qty: x{p?.quantity}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
