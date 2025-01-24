import { useSelector } from "react-redux";
import { useGetRatingsQuery } from "../../state/api/reducer";
import { FadeLoader } from "react-spinners";

export default function () {
  const { data, error, isLoading } = useGetRatingsQuery();
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
            <div
              key={rating?._id}
              className="flex items-center justify-between p-2 mt-2 border-b border-gray-300"
            >
              <div className="flex items-center">
                <img
                  src={
                    rating?.product?.image[
                      Math.floor(Math.random() * rating?.product?.image?.length)
                    ].url
                  }
                  className="object-contain w-16 h-16 md:w-20 md:h-20"
                />
                <div className="ml-2">
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
              <div className="flex items-center">
                {Array.from({ length: rating?.rating }).map((_, index) => (
                  <i
                    key={index}
                    className="text-yellow-500 fa-solid fa-star"
                  ></i>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
