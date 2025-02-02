import * as yup from "yup";

const createProductValidationSchema = yup.object({
  brand: yup.string().required("Brand is required"),
  product_name: yup.string().required("Product name is required"),
  price: yup.number().required("Price is required"),
  description: yup.string().required("Description is required"),
  color: yup.string().required("Color is required"),
  category: yup.string().required("Category is required"),
  quantity: yup.number().required("Quantity is required"),
});

export default createProductValidationSchema;
