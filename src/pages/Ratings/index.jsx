import { useSelector } from "react-redux";
import { useGetRatingsQuery } from "../../state/api/reducer";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetRatingsQuery();
  const ratings = data?.details;

  const auth = useSelector((state) => state.auth.user);

  const userRatings = ratings?.filter((r) => r?.user?._id === auth?._id);

  return (
    <div className="w-full h-full">
      <h3 className="mt-3 text-lg md:3xl">Your Product Reviews</h3>
      {isLoading ? (
        <div className="flex justify-center">
          <FadeLoader color="#000" loading={true} height={15} width={5} />
        </div>
      ) : (
        <div className="flex flex-col overflow-x-auto p-2 max-h-[28rem] md:max-h-[36rem] border-b border-gray-300">
          <AnimatePresence>
            {userRatings?.map((rating) => (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                key={rating?._id}
                className="flex flex-col h-[14rem] md:h-[10rem] items-center justify-between mt-2 md:flex-row "
              >
                <div className="flex items-center justify-center w-1/5 h-full">
                  <img
                    src={
                      rating?.product?.image[
                        Math.floor(
                          Math.random() * rating?.product?.image?.length
                        )
                      ]?.url
                    }
                    className="object-contain w-16 h-16 rounded-sm md:w-20 md:h-20"
                    alt="Product"
                  />
                </div>
                <div className="flex flex-col w-4/5 h-full">
                  <h3 className="text-sm md:text-lg">
                    {rating?.product?.product_name}
                  </h3>
                  <p className="text-xs md:text-sm">{rating?.description}</p>
                  <div className="flex justify-between w-full">
                    <div className="mt-1">
                      {Array.from({ length: rating?.rating }).map(
                        (_, index) => (
                          <i
                            key={index}
                            className="text-yellow-500 fa-solid fa-star"
                          ></i>
                        )
                      )}
                    </div>
                    <div className="mt-1">
                      <button
                        onClick={() => navigate(`/rating/edit/${rating?._id}`)}
                        className="p-1 mt-2 text-xs text-white bg-blue-500 rounded-md md:text-sm"
                      >
                        ⭐Edit Rating
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
