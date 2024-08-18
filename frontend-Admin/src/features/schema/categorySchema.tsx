import * as Yup from "yup";

export const categorySchema = Yup.object({
  name: Yup.string().required("Please provide category name"),
  description: Yup.string().required("Please provide category description"),
  priority: Yup.number().required("Please provide category priority"),
  image: Yup.mixed().required("Please Select category Image"),
  avalibleFrom: Yup.string().required("Please provide category available from"),
  avalibleTo: Yup.string().required("Please provide select Time Duration"),
  status: Yup.array()
    .of(Yup.string())
    .required("At least one Day is required")
    .min(1, "At least one Day must be selected"),
});
export const updatecategorySchema = Yup.object({
  name: Yup.string().required("Please provide category name"),
  description: Yup.string().required("Please provide category description"),
  priority: Yup.number().required("Please provide category priority"),
  avalibleFrom: Yup.string().required("Please provide category available from"),
  avalibleTo: Yup.string().required("Please provide select Time Duration"),
  status: Yup.array()
    .of(Yup.string())
    .required("At least one Day is required")
    .min(1, "At least one Day must be selected"),
});
