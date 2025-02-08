import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import {
  increaseQuantity,
  decreaseQuantity,
  removeCart,
  clearCart,
} from "../../state/slice/cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function () {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeCart(id));
    toast.error("Product removed  from cart");
  };

  const handleClear = ()=>{
    dispatch(clearCart());
    toast.success("Cart cleared");  
  }

  const totalAmount = cart?.item?.reduce((acc, item) => {
    return acc + item?.product?.price * item?.orderQty;
  }, 0);

  const totalOrders = cart?.item?.reduce((acc, item) => {
    return acc + item?.orderQty;
  }, 0);


  let shipping = cart && cart?.item?.length > 0 ? 50 : 0;

  if (totalAmount > 5000) {
    shipping = 0;
  }

  return (
    <>
      <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{visible: 0.5}}
      exit={{ y: 100, opacity: 0 }}
       className="flex flex-col md:flex-row w-full max-h-[82rem] md:h-[32rem]">
        <div className="relative w-full h-[70%] overflow-y-auto md:h-full md:w-3/4 transition-all duration-700 ease-out">
          <div className="absolute flex justify-between w-full p-2">
            <h3 className="text-sm font-medium md:text-2xl md:font-bold">
              My Cart
            </h3>
          </div>
          {cart?.item?.length > 0 ? (
            cart?.item?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-full p-4 mt-2 mb-4 border border-gray-300 rounded-lg shadow-sm md:flex-row"
              >
                <div className="flex items-center justify-center w-full mb-4 md:w-1/4 md:mb-0">
                  <img
                    className="object-cover w-24 h-24 rounded-md cursor-pointer"
                    onClick={() => navigate(`/product/${item?.product?._id}`)}  
                    src={
                      item?.product?.image?.length > 1
                        ? item?.product?.image[
                            Math.floor(
                              Math.random() * item?.product?.image.length
                            )
                          ]?.url
                        : item?.product?.image[0]?.url || ""
                    }
                    alt={item?.product?.product_name || "Item Image"}
                  />
                </div>

                <div className="flex flex-col justify-between w-full space-y-2 md:w-3/4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold md:text-lg">
                      {item?.product?.product_name}
                    </p>
                    <FaTrash
                      className="text-xl text-red-500 cursor-pointer"
                      title="Remove Product"
                      onClick={() => handleRemove(item?.product?._id)}
                    />
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {item?.product?.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text- sm md:text-lg">
                      Unit Price:{" "}
                      <span className="font-bold">{item?.product?.price}</span>
                    </p>

                    <div className="flex items-center justify-between w-32 h-8 p-2 border rounded-md border-gray">
                      <FaPlus
                        onClick={() =>
                          dispatch(increaseQuantity(item?.product?._id))
                        }
                        className="w-[25%] text-green-500 cursor-pointer"
                      />
                      <p className="w-1/2 h-full text-lg text-center">
                        {item.orderQty}
                      </p>
                      {item.orderQty == 1 ? (
                        <FaMinus
                          onClick={() =>
                            toast.error("Minimum quantity reached")
                          }
                          className="w-[25%] text-gray-500 cursor-pointer"
                        />
                      ) : (
                        <FaMinus
                          onClick={() =>
                            dispatch(decreaseQuantity(item?.product?._id))
                          }
                          className="w-[25%] text-red-500 cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-right md:text-lg">
                    Subtotal:{" "}
                    <span className="font-bold underline">
                      {item?.orderQty * item?.product?.price}
                    </span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg font-medium text-center text-gray-600">
              No items in the cart
            </p>
          )}
        </div>
        <div className="w-full h-[30%] md:h-full md:w-3/12 transition-all duration-700 ease-out p-3">
          <h3 className="pb-2 text-xl font-semibold text-center">
            Order Details
          </h3>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between">
              <p className="text-gray-700">Order Subtotal:</p>
              <p className="font-medium">{totalAmount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Unit Quantity:</p>
              <p className="font-medium">{totalOrders}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">
                {shipping > 0 ? "Shipping:" : "Free Shipping:"}
              </p>
              <p className="font-medium">{shipping}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Total:</p>
              <p className="font-medium">{totalAmount + shipping}</p>
            </div>
            <div className="text-center">
              {cart?.item?.length > 0 ? (
                <>
                <button
                  onClick={()=>navigate(`/checkout`)}  
                  className="w-full px-4 py-2 text-white bg-red-600 rounded-md"
                >
                  Proceed to Checkout
                </button>
                 <button
                 onClick={handleClear}    
                 className="w-full px-4 py-2 mt-2 text-white bg-red-600 rounded-md"
               >
                 Clear Cart
               </button>
                </>
                
              ) : (
                <button
                  onClick={() => toast.error("No items in the cart")}
                  className="w-full px-4 py-2 text-white bg-gray-400 rounded-md"
                >
                  Proceed to Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
