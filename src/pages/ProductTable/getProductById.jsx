import ImageOne from "../../assets/register.jpg";
import { useGetProductByIdQuery } from "../../state/api/reducer";
import { useParams } from "react-router-dom";

export default function () {
  const { id } = useParams();
  const { data: productData } = useGetProductByIdQuery(id);
  const product = productData?.details;

  const back = () => {
    window.history.back();
  };
  return (
    <div className="relative flex flex-col w-full h-[36rem] md:h-[44rem] md:flex-row">
      <h3
        onClick={back}
        className="absolute ml-1 text-sm font-bold cursor-pointer top-1 left-1 md:text-2xl"
      >
        <i className="mr-1 fa-solid fa-arrow-left"></i>Go Back
      </h3>

      <div className="hidden h-full border md:block md:w-1/2">
        <img
          src={ImageOne}
          alt="Image"
          className="object-cover w-full h-full overflow-hidden"
        />
      </div>

      <div className="flex flex-col w-full h-full p-4 overflow-y-auto md:w-1/2">
        <h3 className="mb-1 text-2xl font-semibold">Product Detail</h3>

        <div className="flex justify-center mb-1">
          <img
            src={
              product?.image[Math.floor(Math.random() * product?.image?.length)]
                .url
            }
            alt={
              product?.image[Math.floor(Math.random() * product?.image?.length)]
                .originalname
            }
            className="object-contain w-20 h-20 rounded-sm md:w-40 md:h-40"
          />
        </div>

        <div className="flex flex-col mb-1">
          <label
            htmlFor="brand"
            className="text-sm font-medium text-black md:text-base"
          >
            Brand
          </label>
          <input
            type="text"
            name="brand_name"
            id="brand_name"
            placeholder={product?.brand?.brand_name}
            className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-black"
          />
        </div>

        <div className="flex flex-col mb-1">
          <label
            htmlFor="category"
            className="text-sm font-medium text-black md:text-base"
          >
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            placeholder={product?.category}
            className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-black"
          />
        </div>

        <div className="flex flex-col mb-1">
          <label
            htmlFor="product_name"
            className="text-sm font-medium text-black md:text-base"
          >
            Product Name
          </label>
          <input
            type="text"
            name="product_name"
            id="product_name"
            placeholder={product?.product_name}
            className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-black"
          />
        </div>
        <div className="flex flex-col mb-1">
          <label
            htmlFor="product_name"
            className="text-sm font-medium text-black md:text-base"
          >
            Product Price
          </label>
          <input
            type="text"
            name="product_name"
            id="product_name"
            placeholder={product?.price}
            className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-black"
          />
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
            placeholder={product?.description}
            className="p-2 text-sm border border-gray-300 rounded-md md:text-base placeholder:text-black placeholder:italic focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={5}
          />
        </div>

        <div className="flex flex-col mb-1">
          <label
            htmlFor="product_name"
            className="text-sm font-medium text-black md:text-base"
          >
            Product Price
          </label>
          <input
            type="text"
            name="product_name"
            id="product_name"
            placeholder={product?.price}
            className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-black"
          />
        </div>

        <div className="flex flex-col mb-1">
          <label
            htmlFor="product_name"
            className="text-sm font-medium text-black md:text-base"
          >
            Product Quantity
          </label>
          <input
            type="text"
            name="product_name"
            id="product_name"
            placeholder={product?.quantity}
            className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-black"
          />
        </div>

        <div className="flex flex-col mb-1">
          <label
            htmlFor="isNewlyCreated"
            className="text-sm font-medium text-black md:text-base"
          >
            Product New ?
          </label>
          <input
            type="text"
            name="isNewlyCreated"
            id="isNewlyCreated"
            placeholder={product?.isNewlyCreated ? "Yes" : "No"}
            className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-black"
          />
        </div>
      </div>
    </div>
  );
}
