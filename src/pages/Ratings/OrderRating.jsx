import { useGetOrdersQuery } from "../../state/api/reducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { data } = useGetOrdersQuery();
  const orders = data?.details;

  const auth = useSelector((state) => state.auth);

  const completedOrders = orders?.filter(
    (order) =>
      order?.status === "Delivered" && order?.user?._id === auth?.user?._id
  );

  return (
    <>
      <div className="w-full max-h-full overflow-y-auto">
        {completedOrders?.map((order) => (
          <div
            key={order?._id}
            className="w-full p-2 mt-2 mb-2 border-2 rounded-md "
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
                <h4 className="text-sm md:text-lg">Status: {order?.status}</h4>
              </div>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm md:text-lg">Ordered Items:</h4>
              {order?.products?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center w-full p-1 overflow-hidden border border-gray-400 rounded-md h-36 md:h-44"
                >
                  <div className="w-1/5 h-full p-2">
                    <img
                      src={
                        item?.product?.image[
                          Math.floor(
                            Math.random() * item?.product?.image.length
                          )
                        ]?.url
                      }
                      className="object-contain w-20 h-20 md:object-cover md:w-36 md:h-38"
                    />
                  </div>
                  <div className="flex flex-col w-4/5 h-full">
                    <h3 className="text-sm md:text-lg">
                      Product: {item?.product?.product_name}
                    </h3>
                    <h3 className="text-sm md:text-lg">
                      Price: {item?.product?.price}
                    </h3>
                    <h3 className="text-sm md:text-lg">x {item?.quantity}</h3>
                    <div className="flex justify-between mt-2">
                      { item?.isReviewed ? (
                         <div className="flex">
                         {Array.from({ length: item?.rating?.rating }).map(
                           (_, index) => (
                             <i
                               key={index}
                               className="mr-1 text-yellow-500 fa-solid fa-star" // Add margin-right for spacing
                             ></i>
                           )
                         )}
                       </div>
                      ) : (
                        <div className="flex">
                          <h3 className="text-lg md:text-sm">Product Not Reviewed Yet</h3>
                      </div>
                      )}
                     
                      <div className="flex">
                        {item?.isReviewed ? (
                          <button className="p-2 text-sm border rounded-md border-gray-50 md:text-lg">
                            ⭐Product Already Rated
                          </button>
                        ) : (
                          <button className="p-2 text-sm border rounded-md border-gray-50 md:text-lg">
                            ⭐Rate this Product
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => navigate(`/user/order/${order?._id}`)}
                className="p-2 text-sm text-white bg-black border rounded-md border-gray-50 md:text-lg"
              >
                View Order Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
