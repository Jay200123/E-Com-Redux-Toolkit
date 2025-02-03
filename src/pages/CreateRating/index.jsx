import { useFormik } from "formik";
import { useAddRatingMutation } from "../../state/api/reducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ImageOne from "../../assets/register.jpg";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createRatingValidationSchema } from "../../validations";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();

  const auth = useSelector((state) => state.auth.user);
  const product = useSelector((state) => state.rating?.product);

  const [addRating] = useAddRatingMutation();

  const formik = useFormik({
    initialValues: {
      user: auth?._id,
      product: product,
      description: "",
      rating: 0,
      image: [],
    },
    validationSchema: createRatingValidationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("user", values.user);
      formData.append("product", values.product);
      formData.append("description", values.description);
      formData.append("rating", values.rating);
      values.image.forEach((file) => {
        formData.append("image", file);
      });
      const res = await addRating({ id: id, payload: formData });

      if (res?.data?.success === true) {
        toast.success(res.data.message);
        navigate("/order/ratings");
      } else if (res?.error?.data?.success === false) {
        toast.error(`${res?.error?.data?.error.message}`);
      }
    },
  });

  const back = () => {
    window.history.back();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <form
      className="flex relative justify-center transition-all duration-700 w-full h-[36rem] md:h-[45rem] p-3 bg-white md:p-1 mt-2"
      onSubmit={formik.handleSubmit}
    >
      <i
        onClick={back}
        className="absolute top-0 left-0 m-2 text-2xl cursor-pointer fa fa-arrow-left"
      ></i>
      <div className="hidden md:w-1/2 md:block">
        <img
          className="object-cover w-full h-full rounded-sm"
          src={ImageOne}
          alt="Image"
        />
      </div>
      <div className="flex flex-col justify-center w-full p-4 rounded-md md:border md:border-gray-500 md:h-full md:w-1/2">
        <h3 className="text-lg md:text-3xl">Rate Product</h3>

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
            <p className="mt-1 text-sm text-red-500">{formik.errors.rating}</p>
          )}
        </div>

        <div className="flex flex-col mt-2">
          <label className="text-sm font-medium md:text-lg">Your Review</label>
          <textarea
            name="description"
            id="description"
            className="p-2 text-sm border border-black rounded-md"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.description}
            rows={5}
            placeholder="Tell us what you think about this product"
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
    </form>
  );
}
