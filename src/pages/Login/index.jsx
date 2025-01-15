import { useFormik } from "formik";
import { useLoginMutation } from "../../state/api/reducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

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

  return (
    <form
      className="flex justify-center w-full h-full"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col items-center p-4 border border-black rounded-sm">
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
        <button type="submit">login</button>
      </div>
    </form>
  );
}
