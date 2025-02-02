import * as yup from "yup";

const editBrandValidationSchema = yup.object({
  brand_name: yup.string().required("Brand name is required"),
});

export default editBrandValidationSchema;
