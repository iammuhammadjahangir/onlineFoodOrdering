import * as yup from "yup";

export const purchaseFormNonRattiMilli = yup.object().shape({
  pondWeight: yup.number().required("Pond weight Required"),
  mail: yup.number().required("Mail Required"),
  gramRate: yup.number().required("Rate/Gram Required"),
});
