import * as yup from "yup";

const createBrandValidation = yup.object({
    brand_name: yup.string().required("Brand name is required"),
});

export default createBrandValidation;   