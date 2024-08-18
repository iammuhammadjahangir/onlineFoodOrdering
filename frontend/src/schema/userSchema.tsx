import * as Yup from "yup";

export const updateProfileSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  dob: Yup.string(),
  gender: Yup.string(),
});

export const addressSchema = Yup.object().shape({
  // reciverName: Yup.string().required("Please Provide reciver Name"),
  addressDetail: Yup.string().required("Please provide address Detail"),
  // phoneNo: Yup.string()
  //   .required("Please enter your phone number")
  //   .min(13, "Ph Number must be at least 13 characters"),
  // landMark: Yup.string(),
  // addressType: Yup.string().required("Address Type is Required"),
  // province: Yup.string().required("Please Provide Province"),
  city: Yup.string().required("City is Required"),
  area: Yup.string().required("Area is Required"),
  // homeDefault: Yup.boolean(),
  // billingDefault: Yup.boolean(),
});
export const addressSchemaNonExistingCustomer = Yup.object().shape({
  addressDetail: Yup.string().required("Please provide address Detail"),

  city: Yup.string().required("City is Required"),
  area: Yup.string().required("Area is Required"),
});
