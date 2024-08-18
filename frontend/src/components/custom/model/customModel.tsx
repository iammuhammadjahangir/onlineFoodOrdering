import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";

// Define the prop types for the CustomModal component
interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

// Define the CustomModal component with props type annotation
const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  // If the modal is not open, return null
  if (!isOpen) return null;

  // Render the modal using ReactDOM.createPortal
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close-button" onClick={onClose}>
          <IoMdClose />
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    // Use optional chaining to handle cases where document.getElementById('modal-root') is null
    document.getElementById("root")!
  );
};

export default CustomModal;
