import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetRatingsQuery,
} from "../../state/api/reducer";
import { addCart } from "../../state/slice/cart";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";

export default function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data } = useGetProductByIdQuery(id);
  const product = data?.details;

  const { data: productDetails } = useGetProductsQuery();
  const products = productDetails?.details;

  const { data: ratingDetails } = useGetRatingsQuery();
  const ratings = ratingDetails?.details;

  const productRatings = ratings?.filter(
    (r) => r?.product?._id == product?._id
  );

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(quantity - 1);
  };

  const filteredProducts = products?.filter(
    (p) =>
      p?.product_name?.toLowerCase() ===
      (product?.product_name || "").toLowerCase()
  );

  const productColors = filteredProducts?.map((p) => p?.color?.toLowerCase());

  const back = () => {
    window.history.back();
  };

  const handleCart = (product, quantity) => {  
    dispatch(addCart({ product, orderQty: quantity }));
    toast.success("Product added to cart");
  }

  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative flex flex-col"
      >
        <i
          onClick={back}
          className="absolute m-2 text-2xl cursor-pointer fa fa-arrow-left"
        ></i>

        <div className="flex flex-col items-center w-full max-h-62rem md:max-h-[56rem] mt-3 md:flex-row">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex justify-center w-full h-full transition-all duration-500 ease-in-out md:w-1/2"
          >
            {product?.image && product?.image?.length > 1 ? (
              <img
                className="object-contain w-16rem h-[32rem] overflow-hidden"
                src={
                  product?.image[
                    Math.floor(Math.random() * product?.image?.length)
                  ]?.url
                }
                alt="test image"
              />
            ) : (
              <img
                className="object-contain w-16rem h-[32rem] overflow-hidden"
                src={product?.image[0]?.url || ""}
                alt="image"
              />
            )}
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col w-full h-full p-2 transition-all duration-700 ease-in-out md:w-1/2 justify-evenly"
          >
            <h3 className="text-lg text-center md:text-2xl">
              {product?.product_name}
            </h3>
            <h3 className="text-sm md:text-lg">Product Description:</h3>
            <p className="text-xs md:text-sm">{product?.description}</p>
            <h3 className="text-sm md:text-lg">Unit Price:</h3>
            <p className="text-xs md:text-sm">₱{product?.price}</p>
            <h3 className="text-sm md:text-lg">Colors Available:</h3>
            <div className="flex space-x-4">
              {productColors?.map((color, index) => (
                <div
                  key={`${color}-${index}`}
                  className="w-6 h-6 border border-black rounded-full md:w-8 md:h-8"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>

            <h3 className="text-sm md:text-lg">Available Stocks:</h3>
            <p className="text-xs md:text-sm">{product?.quantity} pcs</p>

            <div className="flex flex-col items-center w-full p-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-bold md:text-lg">Qty:</label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <motion.button
                    className="px-3 py-1 text-lg text-white bg-red-500 rounded-l-md"
                    onClick={decrementQuantity}
                    disabled={quantity === 0 ? true : false}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <AnimatePresence key={quantity} mode="exit">
                    <motion.input
                      type="number"
                      readOnly
                      className="w-12 text-center border-l border-r border-gray-300 outline-none"
                      value={quantity}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    />
                  </AnimatePresence>

                  <motion.button
                    className="px-3 py-1 text-lg text-white bg-green-500 rounded-r-md"
                    onClick={incrementQuantity}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
              </div>
              {product &&
                (product?.quantity === 0 ? (
                  <button
                    onClick={() => toast.error("Out of Stocks")}
                    className="w-full p-2 mt-4 text-sm text-white transition-all duration-500 bg-red-500 rounded-md opacity-50 md:text-lg hover:opacity-85"
                  >
                    Out of Stocks
                  </button>
                ) : (
                  <motion.button
                    onClick={() => handleCart(product, quantity)}
                    className="w-full p-2 mt-4 text-sm text-white transition-all duration-500 bg-black rounded-md md:text-lg hover:opacity-85"
                    whileHover={{
                      scale: 0.9,
                      transition: { duration: 0.8 },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Add to Cart
                  </motion.button>
                ))}
            </div>
          </motion.div>
        </div>
        <div className="flex flex-col w-full max-h3-[16rem] mt-4 transition-all duration-500 ease-in-out border border-gray">
          <h3 className="text-lg font-medium md:font-bold md:text-2xl">
            {productRatings?.length > 0
              ? "Product Reviews ⭐"
              : "No Reviews Yet 😞"}
          </h3>
          {productRatings?.map((r) => (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              key={r?._id}
              className="flex flex-col p-2 md:p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm md:text-lg">{r?.user?.fullname}</h3>
                <div className="text-xs md:text-lg">
                  {[...Array(r?.rating)].map((_, index) => (
                    <span key={index}>⭐</span>
                  ))}
                </div>
              </div>
              <p className="text-xs md:text-sm">{r?.description}</p>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {r?.image &&
                  r?.image?.map((i, index) => (
                    <img
                      key={index}
                      src={i?.url}
                      className="object-cover rounded w-14 h-14 md:w-16 md:h-16"
                      alt="rating image"
                    />
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
