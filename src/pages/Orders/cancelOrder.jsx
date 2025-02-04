import { useCancelOrderMutation } from "../../state/api/reducer";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { createCancelOrderValidationSchema } from "../../validations";
import ImageOne from "../../assets/register.jpg";
import { useNavigate } from "react-router-dom";

export default function () {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cancelOrder] = useCancelOrderMutation();

  const formik = useFormik({
    initialValues: {
      reason: "",
    },
    validationSchema: createCancelOrderValidationSchema,
    onSubmit: async (values) => {
      const res = await cancelOrder({ id: id, payload: values });
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        navigate("/user/orders");
      } else {
        toast.error(res?.data?.message);
      }
    },
  });

  const back = () => {  
    window.history.back();  
  }
  
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
        <h3 className="mb-1 text-2xl font-semibold">
          Reason for Cancelling Order
        </h3>

        <div className="flex flex-col mb-1">
          <label
            htmlFor="reason"
            className="text-sm font-medium text-black md:text-base"
          >
            Reason
          </label>
          <textarea
            type="text"
            name="reason"
            id="reason"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.reason}
            rows={5}
            className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-gray-700"
          />
          {formik.touched.reason && formik.errors.reason && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.reason}</p>
          )}
        </div>
        <button
          disabled={!formik.isValid || formik.isSubmitting}
          className={`text-[1rem] p-2 bg-black  transition-all duration-500 hover:opacity-75 rounded-md text-white mt-4 ${
            !formik?.isValid && "cursor-not-allowed opacity-50"
          }`}
          type="submit"
        >
          Cancel Order
        </button>
      </div>
    </form>
  );
}
