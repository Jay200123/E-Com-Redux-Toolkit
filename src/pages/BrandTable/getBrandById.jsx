import { useGetBrandByIdQuery } from "../../state/api/reducer";
import { useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";  
import ImageOne from "../../assets/register.jpg";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetBrandByIdQuery(id);
  const brand = data?.details;
  const back = () => {
    window.history.back();
  };

  console.log(data);  
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
              className="object-cover w-full  h-[56rem]"
            />
          </div>

          <div className="flex flex-col justify-center w-full h-full p-4 md:w-1/2">
            <h3 className="mb-1 text-2xl font-semibold">Brand Detail</h3>

            <div className="flex justify-center mb-1">
              <img
                src={
                  brand?.image[Math.floor(Math.random() * brand?.image?.length)]
                    .url
                }
                alt={
                  brand?.image[Math.floor(Math.random() * brand?.image?.length)]
                    .originalname
                }
                className="object-contain w-20 h-20 rounded-sm md:w-40 md:h-40"
              />
            </div>

            <div className="flex flex-col mb-1">
              <label
                htmlFor="brand_name"
                className="text-sm font-medium text-black md:text-base"
              >
                Brand Name
              </label>
              <input
                type="text"
                name="brand_name"
                id="brand_name"
                readOnly
                placeholder={brand?.brand_name}
                className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-black"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
