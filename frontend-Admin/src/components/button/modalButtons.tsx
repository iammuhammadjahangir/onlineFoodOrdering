import React from "react";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  color: string; // Color for the button text or icon
  hoverColor: string; // Background color on hover
  activeColor: string; // Background color on active
  textColor: string; // Text color
  backgroundColor: string; // Default background color
  beforeColor: string; // Color for the ::before pseudo-element
  icon?: React.ReactNode; // Optional icon
  children: React.ReactNode; // Button text or content
  isDisabled?: boolean;
  isIconRight?: boolean;
}

const ModalButton: React.FC<ButtonProps> = ({
  onClick,
  type = "button",
  color,
  hoverColor,
  activeColor,
  textColor,
  backgroundColor,
  beforeColor,
  icon,
  children,
  isDisabled = false,
  isIconRight = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cssbuttons-io ${isIconRight ? "textDirecion" : ""}`}
      disabled={isDisabled}
      style={{
        color: textColor,
        backgroundColor: backgroundColor,
        position: "relative",
        fontFamily: "inherit",
        fontWeight: "500",
        fontSize: "1rem",
        letterSpacing: "0.05em",
        borderRadius: "0.8em",
        cursor: "pointer",
        border: "none",
        overflow: "hidden",
        transition: "background-color 0.4s, color 0.4s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = hoverColor;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = backgroundColor;
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.backgroundColor = activeColor;
        e.currentTarget.style.transform = "scale(0.95)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.backgroundColor = hoverColor;
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {icon && (
        <span className="icon" style={{ marginRight: "0.5em" }}>
          {icon}
        </span>
      )}
      <span className="text">{children}</span>
    </button>
  );
};

export default ModalButton;
