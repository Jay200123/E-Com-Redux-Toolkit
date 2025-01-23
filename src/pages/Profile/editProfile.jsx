import { useSelector } from "react-redux";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../state/api/reducer";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function () {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { data } = useGetUserByIdQuery(auth?.user?._id);
  const user = data?.details;
  const [updateUser] = useUpdateUserMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullname: user?.fullname || "", 
      contact_number: user?.contact_number || "",
      address: user?.address || "",
      city: user?.city || "",
      email: user?.email || "",
      image: user?.image || [],
    },

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("contact_number", values.contact_number);
      formData.append("address", values.address);
      formData.append("city", values.city);
      formData.append("email", values.email);
      values.image.forEach((image) => {
        formData.append("image", image);
      });

      const res = await updateUser({ id: user?._id, payload: formData });
      if (res?.data?.success === true) {
        toast.success(res.data.message);
        navigate("/profile");
      } else if (res?.error?.data?.success === false) {
        toast.error(`${res?.error?.data?.error.message}`);
      }
    },
  });

  const randomImage =
    auth?.user?.image[Math.floor(Math.random() * auth?.user.image.length)];
  
    const back = () => {
      window.history.back();
    }
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex items-center justify-center w-full h-full p-4 overflow-hidden"
    >
      <div className="relative flex flex-col transition-all duration-700 md:flex-row w-[75rem] border border-gray-500 shadow-lg rounded-lg h-[48rem] md:h-[24rem]">
      <i
        onClick={back}
        className="absolute m-2 text-2xl cursor-pointer fa fa-arrow-left"
      ></i>
        <div className="w-full h-full md:w-[30%]">
          <div className="flex flex-col items-center justify-center w-full h-full p-4">
            <img
              src={randomImage.url}
              alt={randomImage.originalname}
              className="object-contain border border-gray-500 rounded-full w-36 h-36 md:w-60 md:h-60"
            />
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
        </div>
        <div className="flex flex-col w-full h-full md:w-[70%] p-2">
          <h3 className="font-bold md:text-3xl">Edit Profile Information</h3>
          <div className="flex flex-col w-full md:flex-row">
            <div className="w-full p-2 md:w-1/2">
              <label className="font-semibold">First Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="w-full p-2 text-xs border border-gray-500 rounded-md md:p-2 md:text-sm"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fullname}
              />
            </div>
            <div className="w-full p-2 md:w-1/2">
              <label className="font-semibold">Contact Number</label>
              <input
                type="text"
                id="contact_number"
                name="contact_number"
                className="w-full p-2 text-xs border border-gray-500 rounded-md md:p-2 md:text-sm"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.contact_number}
              />
            </div>
          </div>
          <div className="flex flex-col w-full md:flex-row ">
            <div className="w-full p-2 md:w-1/2">
              <label className="font-semibold">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className="w-full p-2 text-xs border border-gray-500 rounded-md md:p-2 md:text-sm"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </div>
            <div className="w-full p-2 md:w-1/2">
              <label className="font-semibold">City</label>
              <input
                type="text"
                id="city"
                name="city"
                className="w-full p-2 text-xs border border-gray-500 rounded-md md:p-2 md:text-sm"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </div>
          </div>
          <div className="flex flex-col w-full md:flex-row">
            <div className="w-full p-2 md:w-1/2">
              <label className="font-semibold">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                className="w-full p-2 text-xs border border-gray-500 rounded-md md:p-2 md:text-sm"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            <div className="w-full p-2 md:w-1/2">
              <button
                type="submit"
                className="w-full p-2 text-sm text-white bg-black rounded-md md:mt-5 md:text-lg"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
