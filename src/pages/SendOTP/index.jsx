import { useSendOtpMutation } from "../../state/api/reducer";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ImageOne from "../../assets/register.jpg";
import { sendOTPValidationSchema } from "../../validations";
import { motion } from "framer-motion";

export default function () {
  const navigate = useNavigate();
  const [sendOtp] = useSendOtpMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: sendOTPValidationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("email", values.email);

      const res = await sendOtp(formData);
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        navigate("/");
      } else {
        toast.error(res?.data?.message);
      }
    },
  });

  const back = () => {
    window.history.back();
  };
  return (
    <motion.form
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: "easeInOut",
        },
      }}
      onSubmit={formik.handleSubmit}
      className="relative flex flex-col w-full h-screen md:flex-row"
    >
      <h3
        onClick={back}
        className="absolute ml-1 text-sm font-bold cursor-pointer top-1 left-1 md:text-2xl"
      >
        <i className="mr-1 fa-solid fa-arrow-left"></i>Go Back
      </h3>

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.8,
            ease: "easeInOut",
          },
        }}
        className="hidden md:w-1/2 md:block"
      >
        <img
          src={ImageOne}
          alt="Image"
          className="object-cover w-full h-full rounded-sm"
        />
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.8,
            ease: "easeInOut",
          },
        }}
        className="flex flex-col justify-center w-full h-full p-4 md:w-1/2"
      >
        <h3 className="mb-1 text-2xl font-semibold">Reset Password</h3>

        <div className="flex flex-col mb-1">
          <label
            htmlFor="email"
            className="text-sm font-medium text-black md:text-base"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-gray-700"
          />
          {formik.touched.email && formik.errors.email && (
            <motion.p
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
              transition: { duration: 0.5 },
            }}
             className="mt-1 text-sm text-red-500">{formik.errors.email}</motion.p>
          )}
        </div>

        <button
          disabled={!formik.isValid || formik.isSubmitting}
          className={`text-[1rem] p-2 bg-black  transition-all duration-500 hover:opacity-75 rounded-md text-white mt-4 ${
            !formik?.isValid && "cursor-not-allowed opacity-50"
          }`}
          type="submit"
        >
          Send OTP
        </button>
      </motion.div>
    </motion.form>
  );
}
