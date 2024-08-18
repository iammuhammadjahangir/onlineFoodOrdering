import Swal from "sweetalert2";

export const confirmationDialogue = async (
  callback: () => Promise<any>,
  deleteConfirmationText: string,
  deleteButtonText: string,
  cancelButtonText: string,
  savedButtonText: string,
  cancelDialogueText: string
) => {
  Swal.fire({
    title: deleteConfirmationText,
    showDenyButton: true,
    confirmButtonText: deleteButtonText,
    denyButtonText: cancelButtonText,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await callback();
      if ("data" in response) {
        Swal.fire(savedButtonText, "", "success");
      }
      if ("error" in response) {
        if ("data" in response.error) {
          Swal.fire((response.error.data as any).message, "", "error");
        }
      }
    } else if (result.isDenied) {
      Swal.fire(cancelDialogueText, "", "info");
    }
  });
};
