import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  handleClick?: () => void;
  className: string;
  type: "submit" | "reset" | "button";
  icon?: ReactNode;
}

const Button = ({ text, className, handleClick, type, icon }: ButtonProps) => {
  return (
    <button type={`${type}`} className={`${className}`} onClick={handleClick}>
      {text} <span>{icon}</span>
    </button>
  );
};

export default Button;
