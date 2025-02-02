import * as yup from "yup";

const createBrandValidationSchema = yup.object({
    brand_name: yup.string().required("Brand name is required"),
});

export default createBrandValidationSchema;   