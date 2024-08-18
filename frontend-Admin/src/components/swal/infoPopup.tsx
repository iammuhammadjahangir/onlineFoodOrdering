import Swal from "sweetalert2";

export const infoDialogue = async (
  title: string,
  htmlContent: string,
  htmlContainerClass: string,
  confirmButtonText: string
) => {
  Swal.fire({
    title: title,
    icon: "info",
    html: htmlContent,
    showCloseButton: true,
    showCancelButton: false,
    focusConfirm: false,
    confirmButtonText: confirmButtonText,
    customClass: {
      htmlContainer: htmlContainerClass,
    },
  });
};
