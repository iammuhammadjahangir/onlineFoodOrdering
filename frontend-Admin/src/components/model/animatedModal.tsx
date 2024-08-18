import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  animation:
    | "unfolding"
    | "revealing"
    | "uncovering"
    | "blowUp"
    | "meepMeep"
    | "sketch"
    | "bond";
  size: "small" | "medium" | "large";
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  animation,
  size,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-active");
    } else {
      document.body.classList.remove("modal-active");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="modal-container"
      className={`${animation} ${size} ${isOpen ? "in" : "out"}`}
    >
      <div className="modal-background" onClick={onClose}>
        <div className="modalSection" onClick={(e) => e.stopPropagation()}>
          {children}
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/3d-fluency/94/cancel.png"
            alt="cancel"
            className="closeIcon"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
