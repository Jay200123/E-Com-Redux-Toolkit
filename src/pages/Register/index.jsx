import { useFormik } from "formik";
import { useAddUserMutation } from "../../state/api/reducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ImageOne from "../../assets/register.jpg";
import { SignUpValidationSchema } from "../../validations";
import { useState } from "react";
import { motion } from "framer-motion";

export default function () {
  const navigate = useNavigate();
  const [addUser] = useAddUserMutation();

  const [isShow, setIsShow] = useState(false);

  const tooglePassword = () => {
    setIsShow(!isShow);
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      address: "",
      city: "",
      contact_number: "",
      email: "",
      password: "",
      role: "User",
      image: [],
    },
    validationSchema: SignUpValidationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("address", values.address);
      formData.append("city", values.city);
      formData.append("contact_number", values.contact_number);
      formData.append("email", values.email);
      formData.append("password", values.password);
      values.image.forEach((file) => {
        formData.append("image", file);
      });

      const res = await addUser(formData);

      if (res?.data?.success === true) {
        toast.success(res.data.message);
        navigate("/login");
      } else if (res?.error?.data?.success === false) {
        toast.error(`${res?.error?.data?.error.message}`);
      }
    },
  });

  const signIn = () => {
    navigate("/login");
  };

  const back = () => {
    window.history.back();
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ visible: 0.5 }}
    >
      <form
        className="flex relative justify-center transition-all duration-700 w-full h-[36rem] md:h-[45rem] p-3 bg-white md:p-1 mt-2"
        onSubmit={formik.handleSubmit}
      >
        <i
          onClick={back}
          className="absolute top-0 left-0 m-2 text-2xl cursor-pointer fa fa-arrow-left"
        ></i>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ amount: 0.5, once: false }}
          className="hidden md:w-1/2 md:block"
        >
          <img
            className="object-cover w-full h-full rounded-sm"
            src={ImageOne}
            alt="Image"
          />
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ amount: 0.5, once: false }}
          className="flex flex-col justify-center w-full p-4 overflow-y-auto rounded-md md:border md:border-gray-500 md:h-full md:w-1/2"
        >
          <h3 className="text-lg md:text-3xl">Sign Up</h3>
          <motion.p
            whileHover={{
              scale: 0.9,
              transition: { duration: 0.8 },
              animate: {
                ease: "easeInOut",
              },
            }}
            whileTap={{ scale: 0.9 }}
            className="mb-4 text-xs md:text-[1rem]"
          >
            Already have an account?
            <span
              onClick={signIn}
              className="ml-1 font-bold underline cursor-pointer"
            >
              Sign In
            </span>
          </motion.p>
          <div className="flex flex-col mt-2">
            <label className="text-sm font-medium md:text-lg">Fullname</label>
            <input
              name="fullname"
              id="fullname"
              className="p-2 text-sm border border-black rounded-md"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.fullname}
              type="text"
            />
            {formik.touched.fullname && formik.errors.fullname && (
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
                {formik.errors.fullname}
              </motion.p>
            )}
          </div>
          <div className="flex flex-col mt-2">
            <label className="text-sm font-medium md:text-lg">
              Contact Number
            </label>
            <input
              name="contact_number"
              id="contact_number"
              className="p-2 text-sm border border-black rounded-md"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.contact_number}
              type="text"
            />
            {formik.touched.contact_number && formik.errors.contact_number && (
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
                {formik.errors.contact_number}
              </motion.p>
            )}
          </div>
          <div className="flex flex-col mt-2">
            <label className="text-sm font-medium md:text-lg">Address</label>
            <input
              name="address"
              id="address"
              className="p-2 text-sm border border-black rounded-md"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.address}
              type="text"
            />
            {formik.touched.address && formik.errors.address && (
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
                {formik.errors.address}
              </motion.p>
            )}
          </div>
          <div className="flex flex-col mt-2">
            <label className="text-sm font-medium md:text-lg">City</label>
            <input
              name="city"
              id="city"
              className="p-2 text-sm border border-black rounded-md"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.city}
              type="text"
            />
            {formik.touched.city && formik.errors.city && (
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
                {formik.errors.city}
              </motion.p>
            )}
          </div>
          <div className="flex flex-col mt-2">
            <label className="text-sm font-medium md:text-lg">Email</label>
            <input
              name="email"
              id="email"
              className="p-2 text-sm border border-black rounded-md"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="text"
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
                className="mt-1 text-sm text-red-500"
              >
                {formik.errors.email}
              </motion.p>
            )}
          </div>

          <div className="flex flex-col mt-2">
            <label className="text-sm font-medium md:text-lg">Password</label>
            <input
              name="password"
              id="password"
              className="p-2 text-sm border border-black rounded-md"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type={isShow ? "text" : "password"}
            />
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

          <motion.button
            whileHover={{
              scale: 0.9,
              transition: { duration: 0.8 },
            }}
            whileTap={{ scale: 0.9 }}
            disabled={!formik.isValid || formik.isSubmitting}
            className={`text-[1rem] p-2 bg-black  transition-all duration-500 hover:opacity-75 rounded-md text-white mt-4 ${
              !formik?.isValid && "cursor-not-allowed opacity-50"
            }`}
            type="submit"
          >
            Sign Up
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
}
