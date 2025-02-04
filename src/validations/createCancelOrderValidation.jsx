import * as yup from "yup";

const createCancelOrderValidationSchema = yup.object({
    reason: yup.string().required("Please enter the reason for cancellation"),  
});

export default createCancelOrderValidationSchema;