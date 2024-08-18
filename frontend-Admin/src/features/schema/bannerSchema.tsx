import * as Yup from "yup";

// Define the Yup schema for validation
export const bannerSchema = Yup.object()
  .shape({
    title: Yup.string().required("Title is required"),
    startDate: Yup.date().nullable().required("Date is required"),
    endDate: Yup.date()
      .nullable()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be after start date"),
    appBannerImage: Yup.mixed().nullable().notRequired(), // App image is optional
    webBannerImage: Yup.mixed().nullable().notRequired(), // Web image is optional
    priority: Yup.number()
      .required("Priority is required")
      .min(1, "Priority must be at least 1")
      .max(10, "Priority cannot exceed 10"), // Adjust priority range as needed
    linkedItem: Yup.string().nullable(),
    branches: Yup.array()
      .of(Yup.string())
      .required("At least one branch is required")
      .min(1, "At least one branch must be selected"),
    // Ensure at least one image is provided
  })
  .test(
    "at-least-one-image",
    "At least one image (app or web) must be provided",
    function (value) {
      const { appBannerImage, webBannerImage } = value;
      return !!appBannerImage || !!webBannerImage;
    }
  );
