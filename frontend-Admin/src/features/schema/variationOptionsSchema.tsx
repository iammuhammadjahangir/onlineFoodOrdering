import * as Yup from "yup";

export const variationOptionSchema = Yup.object({
  name: Yup.string().required("Please provide variation option name"),
  price: Yup.number()
    .typeError("Please provide a valid number for variation option price")
    .required("Please provide variation option price"),
});

export const variationSchema = Yup.object().shape({
  itemID: Yup.string().required("Item ID is required"),
  subOption: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Please provide a variation name"),
        isRequired: Yup.boolean().required(
          "Please specify whether the variation is required"
        ),
        items: Yup.array()
          .of(
            Yup.object().shape({
              name: Yup.string().required(
                "Please provide a variation option name"
              ),
              price: Yup.number()
                .required("Please provide a variation option price")
                .min(0, "Price must be greater than or equal to 0"),
            })
          )
          .min(1, "At least one variation option is required"),
      })
    )
    .min(1, "At least one variation is required"),
});
