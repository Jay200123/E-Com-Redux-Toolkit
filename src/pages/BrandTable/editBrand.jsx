import {
  useGetBrandByIdQuery,
  useUpdateBrandMutation,
} from "../../state/api/reducer";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ImageOne from "../../assets/register.jpg";
import { useParams } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useGetBrandByIdQuery(id);
  const brand = data?.details;

  const [updateBrand] = useUpdateBrandMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      brand_name: brand?.brand_name || "",
      image: brand?.image || [],
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("brand_name", values.brand_name);
      values.image.forEach((image) => {
        formData.append("image", image);
      });

      const res = await updateBrand({ id: brand?._id, payload: formData });
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        navigate("/admin/brands");
      } else {
        toast.error(res?.data?.message);
      }
    },
  });

  const back = () => {
    window.history.back();
  };
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative flex flex-col w-full h-screen md:flex-row"
    >
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
        <h3 className="mb-1 text-2xl font-semibold">Brand Details</h3>

        <div className="flex justify-center mb-1">
          <img
            src={
              brand?.image[Math.floor(Math.random() * brand?.image?.length)].url
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.brand_name}
            className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-gray-700"
          />
          {formik.touched.brand_name && formik.errors.brand_name && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.brand_name}
            </p>
          )}
        </div>

        <div className="flex flex-col mb-1">
          <label
            htmlFor="image"
            className="mb-2 text-sm font-medium text-black md:text-base"
          >
            Upload Images
          </label>
          <input
            type="file"
            name="image"
            id="image"
            multiple
            onChange={(e) => {
              const files = Array.from(e.currentTarget.files || []);
              formik.setFieldValue("image", files);
            }}
            className="text-sm md:text-base"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-black rounded-md hover:bg-blue-600"
        >
          Update Brand
        </button>
      </div>
    </form>
  );
}
