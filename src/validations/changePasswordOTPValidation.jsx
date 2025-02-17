import * as yup from "yup";

const changePasswordValidationSchema = yup.object({
  otp: yup.string().required("OTP code required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default changePasswordValidationSchema;
