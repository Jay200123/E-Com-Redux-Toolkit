import * as yup from "yup";

const signUpValidationSchema = yup.object({
  fullname: yup.string().required("Fullname is required"),
  contact_number: yup.string().required("Contact number is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default signUpValidationSchema;
