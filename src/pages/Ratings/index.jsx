import { useSelector } from "react-redux";
import { useGetRatingsQuery } from "../../state/api/reducer";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

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
          {userRatings?.map((rating) => (
            <div key={rating?._id} className="flex flex-col w-full p-2 overflow-hidden border border-gray-400 rounded-md">
              <div
                className="flex flex-col items-center justify-between p-2 mt-2 md:flex-row "
              >
                <div className="flex flex-col items-center md:flex-row">
                  <img
                    src={
                      rating?.product?.image[
                        Math.floor(
                          Math.random() * rating?.product?.image?.length
                        )
                      ].url
                    }
                    className="object-contain w-16 h-16 md:w-20 md:h-20"
                  />
                  <div className="w-1/2 p-4 ml-2 md:p-0">
                    <h1 className="text-xs font-medium md:text-sm">
                      {rating?.product?.product_name}
                    </h1>

                    <h3 className="text-xs font-medium md:text-sm">
                      ₱{rating?.product?.price}
                    </h3>

                    <p className="text-xs text-gray-500 truncate md:text-sm">
                      {rating?.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center w-1/2">
                  {Array.from({ length: rating?.rating }).map((_, index) => (
                    <i
                      key={index}
                      className="text-yellow-500 fa-solid fa-star"
                    ></i>
                  ))}
                </div>
              </div>
              <div className="flex justify-end w-full">
                <button onClick={()=>navigate(`/rating/edit/${rating?._id}`)} className="p-1 mt-2 text-xs text-white bg-blue-500 rounded-md md:text-sm">
                  ⭐Edit Rating
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
