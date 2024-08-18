import * as Yup from "yup";

export const NewBranchStep1ValidationSchema = Yup.object().shape({
  warehouseId: Yup.string().nullable(),
});
export const NewBranchStep2ValidationSchema = Yup.object().shape({
  // branchDescription: Yup.string().required("Branch description is required"),

  branchAddress: Yup.object().shape({
    latitude: Yup.number()
      .required("Latitude is required")
      .typeError("Latitude must be a number"),
    longitude: Yup.number()
      .required("Longitude is required")
      .typeError("Longitude must be a number"),
    houseNo: Yup.string().required("House/shop number is required"),
    street: Yup.string().required("Street address is required"),
    area: Yup.string().required("Area is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    postalCode: Yup.string().required("Postal/zip code is required"),
  }),
});

export const NewBranchStep3ValidationSchema = Yup.object().shape({
  branchDescription: Yup.string().required("Branch description is required"),

  branchSettings: Yup.object().shape({
    asapOnly: Yup.boolean().required("ASAP Only setting is required"),
    preOrderOnly: Yup.boolean().required("Pre-order Only setting is required"),
    sameDayPreOrder: Yup.boolean().required(
      "Same-day Pre-order setting is required"
    ),
    minPreOrderTime: Yup.number()
      .nullable()
      .typeError("Minimum Pre-order Time must be a number"),
    maxPreOrderTime: Yup.number()
      .nullable()
      .typeError("Maximum Pre-order Time must be a number"),
    otherSettings: Yup.object().shape({
      swsDeliveryModule: Yup.boolean().required(
        "SWS Delivery Module setting is required"
      ),
      taxPercentage: Yup.number()
        .nullable()
        .min(0, "Tax percentage cannot be negative")
        .max(100, "Tax percentage cannot exceed 100")
        .typeError("Tax percentage must be a number"),
    }),
  }),
  branchType: Yup.string()
    .oneOf(
      ["branch", "store"],
      "Branch type must be either 'branch' or 'store'"
    )
    .required("Branch type is required"),

  customerSupport: Yup.object().shape({
    contactEmail: Yup.string().nullable().email("Invalid email format"),
    contactNumber: Yup.string()
      .nullable()
      .matches(/^\+?[1-9]\d{1,14}$/, "Invalid contact number"),
  }),
});

export const NewBranchStep4ValidationSchema = Yup.object().shape({
  branchTiming: Yup.object().shape({
    days: Yup.array()
      .of(
        Yup.string().oneOf(
          [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          "Invalid day"
        )
      )
      .required("Please provide open days"),

    firstHalfOpenTime: Yup.string().required(
      "First half open time is required"
    ),
    firstHalfCloseTime: Yup.string().required(
      "First half close time is required"
    ),
    secondHalfOpenTime: Yup.string(),
    secondHalfCloseTime: Yup.string(),
  }),

  activityStatus: Yup.boolean().required("Activity status is required"),
});

export const getValidationSchema = (step: number) => {
  switch (step) {
    case 0:
      return NewBranchStep1ValidationSchema;
    case 1:
      return NewBranchStep2ValidationSchema;
    case 2:
      return NewBranchStep3ValidationSchema;
    case 3:
      return NewBranchStep4ValidationSchema;
    default:
      return NewBranchStep1ValidationSchema;
  }
};
