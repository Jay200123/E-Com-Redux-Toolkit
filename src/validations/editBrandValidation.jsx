import * as yup from "yup";

const editBrandValidation = yup.object({
  brand_name: yup.string().required("Brand name is required"),
});

export default editBrandValidation;
