import * as yup from "yup";

const createRatingValidationSchema = yup.object({
  user: yup.string().required("User is required"),
  product: yup.string().required("Product is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  order: yup.string().required("Order is required"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
});

export default createRatingValidationSchema;    
