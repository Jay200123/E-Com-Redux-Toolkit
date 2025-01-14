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
      login(values)
        .then((res) => {
          if (res.data.success) {
            toast.success("Logged in successfully");
            navigate("/protectedtest");
            toast.success(`${res.data.message}`);
          } else {
            toast.error(`${res?.error?.data?.error?.message}`);
          }
        })
    },
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
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

      <div>
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
    </form>
  );
}
