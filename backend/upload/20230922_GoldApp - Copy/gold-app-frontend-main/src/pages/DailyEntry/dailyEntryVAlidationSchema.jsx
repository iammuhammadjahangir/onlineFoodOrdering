import * as yup from "yup";

export const dailyEntryValidationSchema = yup.object({
  customer: yup.string().required("Please select Customer"),
  goldIn: yup.number().required("Field cannot be empty"),
  goldout: yup.number().required("Field cannot be empty"),
  cashIn: yup.number().required("Field cannot be empty"),
  cashout: yup.number().required("Field cannot be empty"),
});
