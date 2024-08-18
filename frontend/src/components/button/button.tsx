import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  handleClick?: () => void;
  className: string;
  type: "submit" | "reset" | "button";
  icon?: ReactNode;
  isDisabled?: boolean;
}

const Button = ({
  text,
  className,
  handleClick,
  type,
  icon,
  isDisabled = false,
}: ButtonProps) => {
  return (
    <button
      type={`${type}`}
      className={`${className}`}
      onClick={handleClick}
      disabled={isDisabled}
      style={{
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.6 : 1, // Change opacity based on disabled state
      }}
    >
      {text} <span>{icon}</span>
    </button>
  );
};

export default Button;
