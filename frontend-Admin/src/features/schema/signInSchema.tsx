import * as Yup from "yup";

export const signInSchema = Yup.object({
  username: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(8).required("Please enter your password"),
});

export const emailVerificationSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
});
export const newPasswordSchema = Yup.object({
  password: Yup.string().min(8).required("Please enter your password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
export const updatePasswordSchema = Yup.object({
  oldPassword: Yup.string().min(8).required("Please enter old password"),
  password: Yup.string().min(8).required("Please enter your password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
export const registerUserSchema = Yup.object({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),

  // password: Yup.string(),
  dob: Yup.string().required("Please enter your date of birth"),
  photo: Yup.object().shape({
    url: Yup.string().required("Please upload your photo URL"),
    blurHash: Yup.string(),
  }),
  gender: Yup.string().required("Please select your gender"),
  role: Yup.string().required("Please select your role"),
  phoneNo: Yup.string()
    .required("Please enter your phone number")
    .min(13, "Ph Number must be at least 13 characters"),
  whatsappNo: Yup.string()
    .required("Please enter your WhatsApp number")
    .min(13, "WhatsApp Number must be at least 13 characters"),
  printer: Yup.string().required("Please enter your printer details"),
  tableRows: Yup.number().required("Please enter number of table rows"),
  shopNo: Yup.string().required("Please enter your shop number"),
  // posId: Yup.string().required("Please enter your POS ID"),
});
