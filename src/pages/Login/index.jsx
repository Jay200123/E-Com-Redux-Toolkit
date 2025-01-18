import { useFormik } from "formik";
import { useLoginMutation } from "../../state/api/reducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ImageOne from "../../assets/login.jpg";
import { useState } from "react";

export default function () {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const [isShow, setIsShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      const res = await login(values);

      if (res?.data?.success === true) {
        toast.success(res.data.message);
        navigate("/protectedtest");
      } else if (res?.error?.data?.success === false) {
        toast.error(`${res?.error?.data?.error.message}`);
      }
    },
  });

  const tooglePassword = () => {
    setIsShow(!isShow);
  };

  const signUp = () => {
    navigate("/register");
  }

  return (
    <form
      className="flex justify-center transition-all duration-700 w-full h-[30rem] md:h-[32rem] p-3 bg-white md:p-1"
      onSubmit={formik.handleSubmit}
    >
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
          <span onClick={signUp} className="ml-1 font-bold underline cursor-pointer">
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
          className="text-[1rem] p-2 bg-black border transition-all duration-500 hover:opacity-75 rounded-md text-white mt-4"
          type="submit"
        >
          login
        </button>
      </div>
    </form>
  );
}
