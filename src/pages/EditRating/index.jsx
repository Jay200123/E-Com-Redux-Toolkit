import {
  useGetRatingByIdQuery,
  useUpdateRatingMutation,
} from "../../state/api/reducer";
import { useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import ImageOne from "../../assets/register.jpg";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editRatingValidationSchema } from "../../validations";
import { motion } from "framer-motion";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetRatingByIdQuery(id);
  const rating = data?.details;
  const [updateRating] = useUpdateRatingMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user: rating?.user?._id || "",
      product: rating?.product?._id || "",
      order: rating?.order?._id || "",
      description: rating?.description || "",
      rating: rating?.rating || 0,
      image: rating?.image || [],
    },
    validationSchema: editRatingValidationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("user", values.user);
      formData.append("product", values.product);
      formData.append("order", values.order);
      formData.append("description", values.description);
      formData.append("rating", values.rating);
      values.image.forEach((image) => {
        formData.append("image", image);
      });

      const res = await updateRating({ id: rating?._id, payload: formData });
      if (res?.data?.success === true) {
        toast.success("Rating updated successfully");
        navigate("/user/ratings");
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } else {
        toast.error(res?.data?.message);
      }
    },
  });

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
        <motion.form
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: "easeInOut",
            },
          }}
          onSubmit={formik.handleSubmit}
          className="relative flex flex-col w-full h-full md:flex-row"
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
              className="object-cover w-full  h-[42rem] overflow-hidden"
            />
          </div>

          <div className="flex flex-col justify-center w-full h-full p-4 md:w-1/2">
            <h3 className="mb-1 text-2xl font-semibold">Edit Rating Detail</h3>

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
                placeholder={rating?.product?.product_name}
                className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-black"
              />
            </div>

            <div className="flex flex-col mt-2">
              <label className="text-sm font-medium md:text-lg">
                Product Rating
              </label>
              <div className="flex mt-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <i
                    key={index}
                    onChange={formik.handleChange}
                    onClick={() => formik.setFieldValue("rating", index + 1)}
                    className={`text-2xl cursor-pointer ${
                      index < formik.values.rating
                        ? "text-yellow-500 fa-solid fa-star"
                        : "text-gray-400 fa-regular fa-star"
                    }`}
                  ></i>
                ))}
              </div>
              {formik.touched.rating && formik.errors.rating && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.rating}
                </p>
              )}
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
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
                className="p-2 text-sm border border-gray-300 rounded-md md:text-base placeholder:text-black placeholder:italic focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={5}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.description}
                </p>
              )}
            </div>
            <div className="flex flex-col mt-2">
              <input
                type="file"
                name="image"
                multiple
                className="text-xs md:text-sm"
                onChange={(e) => {
                  const files = Array.from(e.currentTarget.files || []);
                  formik.setFieldValue("image", files);
                }}
              />
            </div>
            <button
              disabled={!formik.isValid || formik.isSubmitting}
              className={`text-[1rem] p-2 bg-black  transition-all duration-500 hover:opacity-75 rounded-md text-white mt-4 ${
                !formik?.isValid && "cursor-not-allowed opacity-50"
              }`}
              type="submit"
            >
              Review Product
            </button>
          </div>
        </motion.form>
      )}
    </>
  );
}
