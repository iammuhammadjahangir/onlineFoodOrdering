import { useTranslation } from "react-i18next";
import swal from "sweetalert2";
import "../../Styling/AllStyle.css"
export const ShowSuccessMessage = () => {
    const { t } = useTranslation(); // Use the useTranslation hook here
  
    return (
      <div>
        { /* Replace "successMessage" with the appropriate translation key */ }
        <div>{t("successMessage")}</div>
      </div>
    );
  };
  
  // Now, you can use this component to display the success message
  const showSuccessMessage = () => {
    swal.fire({
      icon: "success",
      title: t("titleAdded"),
      text: <ShowSuccessMessage />, // Render the ShowSuccessMessage component here
      showConfirmButton: true,
      customClass: {
        popup: 'custom-swal-popup', // This is the custom class you're adding
      }
    });
  };