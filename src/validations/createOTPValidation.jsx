import * as yup from "yup";

const sendOTPValidationSchema = yup.object({
    email: yup.string().email().required("Email is required"),  
});

export default sendOTPValidationSchema;   