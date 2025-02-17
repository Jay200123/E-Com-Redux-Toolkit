import { useChangePasswordOtpMutation } from "../../state/api/reducer";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { changePasswordValidationSchema } from "../../validations";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

export default function () {
  const navigate = useNavigate();
  const [changePasswordOtp] = useChangePasswordOtpMutation();

  const formik = useFormik({
    initialValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordValidationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("otp", values.otp);
      formData.append("password", values.password);

      if (values.confirmPassword !== values.password) {
        toast.error("Password does not match");
        return;
      }

      const res = await changePasswordOtp(formData);
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        navigate("/login");
      } else {
        toast.error(`${res?.error?.data?.error.message}`);
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const tooglePasssword = () => {
    setShowPassword(!showPassword);
  };

  const toogleConfirmPassword = () => {
    setConfirmPassword(!confirmPassword);
  };

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
      className="relative flex justify-center w-full h-full mt-4 overflow-hidden"
    >
      <h3
        onClick={back}
        className="absolute ml-1 text-sm font-bold cursor-pointer top-1 left-1 md:text-2xl"
      >
        <i className="mr-1 fa-solid fa-arrow-left"></i>Go Back
      </h3>

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
        className="flex flex-col overflow-hidden justify-center w-full md:w-1/2 p-4 border rounded-md h-[24rem] md:h-[27rem] border-gray"
      >
        <h3 className="mb-1 text-2xl font-semibold">Reset Password</h3>

        <div className="flex flex-col mb-1">
          <label
            htmlFor="otp"
            className="text-sm font-medium text-black md:text-base"
          >
            OTP Code
          </label>
          <input
            type="text"
            name="otp"
            id="otp"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.otp}
            className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-gray-700"
          />

          {formik.touched.otp && formik.errors.otp && (
            <motion.p
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
                transition: { duration: 0.5 },
              }}
              className="mt-1 text-sm text-red-500"
            >
              {formik.errors.otp}
            </motion.p>
          )}
        </div>

        <div className="flex flex-col mb-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-black md:text-base"
          >
            Password
          </label>
          <div className="flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              className="w-full p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-gray-700"
            />
            <motion.span
              key={showPassword ? "eye" : "eye-slash"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="text-lg cursor-pointer -ml-7"
              onClick={() => tooglePasssword()}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </motion.span>
          </div>

          {formik.touched.password && formik.errors.password && (
            <motion.p
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
                transition: { duration: 0.5 },
              }}
              className="mt-1 text-sm text-red-500"
            >
              {formik.errors.password}
            </motion.p>
          )}
        </div>

        <div className="flex flex-col mb-1">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-black md:text-base"
          >
            Confirm Password
          </label>
          <div className="flex items-center">
            <input
              type={confirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              className="w-full p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-gray-700"
            />

            <motion.span
              key={confirmPassword ? "eye" : "eye-slash"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="text-lg cursor-pointer -ml-7"
              onClick={() => toogleConfirmPassword()}
            >
              {confirmPassword ? <FaEye /> : <FaEyeSlash />}
            </motion.span>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <motion.p
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
                transition: { duration: 0.5 },
              }}
              className="mt-1 text-sm text-red-500"
            >
              {formik.errors.confirmPassword}
            </motion.p>
          )}
        </div>

        <button
          disabled={!formik.isValid || formik.isSubmitting}
          className={`text-[1rem] p-2 bg-black  transition-all duration-500 hover:opacity-75 rounded-md text-white mt-4 ${
            !formik?.isValid && "cursor-not-allowed opacity-50"
          }`}
          type="submit"
        >
          Reset Password
        </button>
      </motion.div>
    </motion.form>
  );
}
