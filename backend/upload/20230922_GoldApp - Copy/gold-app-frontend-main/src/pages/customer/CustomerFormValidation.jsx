import * as yup from "yup";

export const customerFormSchema = yup.object({
  firstName: yup
    .string()
    .min(2)
    .max(15)
    .matches(/^[A-Za-z]*$/, "First Name can only contain letters")
    .required("Please Enter First Name"),
  lastName: yup
    .string()
    .min(2)
    .max(15)
    .matches(/^[A-Za-z]*$/, "Last Name can only contain letters")
    .required("Please Enter Last Name"),
  phoneNumber: yup.string().max(8).required("Please Enter Valid Phone No"),
  cellNumber: yup.string().required("Please Enter Valid Phone No"),
  phoneCode: yup.string().required("please select city Code"),
  cnic: yup
    .string()
    .matches(/^\d{5}-\d{7}-\d$/, "Invalid CNIC Format")
    .required("Please Provide your CNIC Number"),
  city: yup.string().required("Select your city"),
  address: yup.string().required("Please provide your address"),
});
