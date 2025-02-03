import { useFormik } from "formik";
import { useLoginMutation } from "../../state/api/reducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ImageOne from "../../assets/login.jpg";
import { useSelector } from "react-redux";
import { useState } from "react";
import { SignInValidationSchema } from "../../validations";

export default function () {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const cart = useSelector((state) => state.cart);
  const [isShow, setIsShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInValidationSchema,
    onSubmit: async (values) => {
      const res = await login(values);

      if (res?.data?.success === true && res?.data?.details?.role === "User") {
        if (cart.item.length > 0) {
          navigate("/checkout");
          toast.success(res?.data?.message);
        } else {
          navigate("/profile");
          toast.success(res?.data?.message);
        }
      } else if (
        res?.data?.success === true &&
        res?.data?.details?.role === "Admin"
      ) {
        navigate("/admin/dashboard");
        toast.success(res?.data?.message);
      } else {
        toast.error(`${res?.error?.data?.error.message}`);
      }
    },
  });

  const tooglePassword = () => {
    setIsShow(!isShow);
  };

  const signUp = () => {
    navigate("/register");
  };

  const back = () => {
    window.history.back();
  };

  return (
    <form
      className="flex relative justify-center transition-all duration-700 w-full h-[30rem] md:h-[32rem] p-3 bg-white md:p-1 mt-2"
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
        <h3 className="text-lg md:text-3xl">Sign In</h3>
        <p className="mb-4 text-xs md:text-[1rem]">
          Don't have an account yet?
          <span
            onClick={signUp}
            className="ml-1 font-bold underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
        <div className="flex flex-col mt-4">
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
            <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>

        <div className="flex flex-col mt-4">
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
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.password}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between w-full mt-4">
          <div className="flex items-center">
            <input type="checkbox" onClick={tooglePassword} />
            <label className="ml-1 text-xs md:text-sm">Show Password</label>
          </div>
          <div>
            <a className="text-xs cursor-pointer md:text-sm">Forgot Password</a>
          </div>
        </div>
        <button
          disabled={!formik.isValid || formik.isSubmitting}
          className={`text-[1rem] p-2 bg-black  transition-all duration-500 hover:opacity-75 rounded-md text-white mt-4 ${
            !formik?.isValid && "cursor-not-allowed opacity-50"
          }`}
          type="submit"
        >
          login
        </button>
      </div>
    </form>
  );
}
