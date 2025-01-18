import { useFormik } from "formik";
import { useAddUserMutation } from "../../state/api/reducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ImageOne from "../../assets/register.jpg";
import { useState } from "react";

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

    onSubmit: async (values) => {
      const res = await addUser(values);
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("adress", values.address);
      formData.append("city", values.city);
      formData.append("contact_number", values.contact_number);
      formData.append("email", values.email);
      formData.append("password", values.password);
      values.image.forEach((file) => {
        formData.append("image", file);
      });

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

  return (
    <form
      className="flex justify-center transition-all duration-700 w-full h-[16rem] md:h-[45rem] p-3 bg-white md:p-1 mt-2"
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
        <h3 className="text-lg md:text-3xl">Sign Up</h3>
        <p className="mb-4 text-xs md:text-[1rem]">
          Already have an account?
          <span onClick={signIn} className="ml-1 font-bold underline cursor-pointer">
            Sign In
          </span>
        </p>
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
          className="text-[1rem] p-2 bg-black  transition-all duration-500 hover:opacity-75 rounded-md text-white mt-4"
          type="submit"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
