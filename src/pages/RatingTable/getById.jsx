import { useGetRatingByIdQuery } from "../../state/api/reducer";
import { useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { FaStar } from "react-icons/fa";
import ImageOne from "../../assets/register.jpg";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetRatingByIdQuery(id);
  const rating = data?.details;
  const back = () => {
    window.history.back();
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <FadeLoader color="#808080" loading={true} height={15} width={5} />
        </div>
      ) : (
        <div className="relative flex flex-col w-full h-screen md:flex-row">
          <h3
            onClick={back}
            className="absolute ml-1 text-sm font-bold cursor-pointer top-1 left-1 md:text-2xl"
          >
            <i className="mr-1 fa-solid fa-arrow-left"></i>Go Back
          </h3>

          <div className="hidden h-screen border md:block md:w-1/2">
            <img
              src={ImageOne}
              alt="Image"
              className="object-cover w-full  h-[42rem] overflow-hidden"
            />
          </div>

          <div className="flex flex-col justify-center w-full h-full p-4 md:w-1/2">
            <h3 className="mb-1 text-2xl font-semibold">Rating Detail</h3>

            <div className="flex justify-center mb-1">
              <img
                src={
                  rating?.image[
                    Math.floor(Math.random() * rating?.image?.length)
                  ].url
                }
                alt={
                  rating?.image[
                    Math.floor(Math.random() * rating?.image?.length)
                  ].originalname
                }
                className="object-contain w-20 h-20 rounded-sm md:w-40 md:h-40"
              />
            </div>

            <div className="flex flex-col mb-1">
              <label
                htmlFor="user"
                className="text-sm font-medium text-black md:text-base"
              >
                User
              </label>
              <input
                type="text"
                name="user"
                id="user"
                readOnly
                placeholder={rating?.user?.fullname}
                className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-black"
              />
            </div>
            <div className="flex flex-col mb-1">
              <label
                htmlFor="product"
                className="text-sm font-medium text-black md:text-base"
              >
                Product
              </label>
              <input
                type="text"
                name="product"
                id="product"
                readOnly
                placeholder={rating?.product?.product_name}
                className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-black"
              />
            </div>

            <div className="flex flex-col mb-1">
              <label
                htmlFor="product"
                className="text-sm font-medium text-black md:text-base"
              >
                Ratings
              </label>

              <div className="flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <FaStar
                      key={index}
                      className={`text-sm md:text-lg ${
                        index < Math.floor(rating.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
              </div>
            </div>
            <div className="flex flex-col mb-1">
              <label
                htmlFor="description"
                className="mb-2 text-sm font-medium text-black md:text-base"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                placeholder={rating?.description}
                className="p-2 text-sm border border-gray-300 rounded-md md:text-base placeholder:text-black placeholder:italic focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={5}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
