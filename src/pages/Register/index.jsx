import { useFormik } from "formik";
import { useAddProductMutation } from "../../state/api/reducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const [addProduct] = useAddProductMutation();

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
      const res = await addProduct(values);
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

  return (
    <form
      className="flex justify-center w-full h-full"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col items-center p-4 border border-black rounded-sm">
        <div className="flex flex-col">
          <label>Full Name</label>
          <input
            name="fullname"
            id="fullname"
            className="border border-black"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.fullname}
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>Contact Number</label>
          <input
            name="contact_number"
            id="contact_number"
            className="border border-black"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.contact_number}
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>Address</label>
          <input
            name="address"
            id="address"
            className="border border-black"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.address}
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>City</label>
          <input
            name="city"
            id="city"
            className="border border-black"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.city}
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            name="email"
            id="email"
            className="border border-black"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            type="text"
          />
        </div>

        <div className="flex flex-col">
          <label>Password</label>
          <input
            name="password"
            id="password"
            className="border border-black"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
          />
        </div>

        <div className="flex flex-col">
          <label>Image</label>
          <input
            type="file"
            name="image"
            id="image"
            multiple
            onChange={(e) => {
              const files = Array.from(e.currentTarget.files || []);
              formik.setFieldValue("image", files);
            }}
            className="text-sm md:text-base"
          />
        </div>

        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
