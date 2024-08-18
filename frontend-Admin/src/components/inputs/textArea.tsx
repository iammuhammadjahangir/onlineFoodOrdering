import React from "react";

type TextareaProps = {
  label: string;
  className: string;
  placeholder: string;
  name: string;
  autoComplete: string;
  maxLength: string;
  required: boolean;
  value: string | number;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isDisabled: boolean;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  touched: boolean;
  errors: string;
  icon?: React.ReactNode;
};

const Textarea = ({
  label,
  className,
  placeholder,
  name,
  autoComplete,
  maxLength,
  required,
  value,
  onKeyDown,
  isDisabled,
  handleChange,
  handleBlur,
  errors,
  touched,
  icon,
}: TextareaProps) => {
  return (
    <div className="labelAndTextareaDiv">
      <label>{label}</label>
      <div className="textareaDiv">
        {icon ? icon : null}
        <textarea
          className={`custom-textarea ${icon && "marginIcon"} ${className}`}
          placeholder={placeholder}
          name={name}
          autoComplete={autoComplete}
          maxLength={Number(maxLength)}
          required={required}
          value={value}
          onKeyDown={onKeyDown}
          disabled={isDisabled}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <p className="error">{touched && errors ? errors : null}</p>
      </div>
    </div>
  );
};

export default Textarea;
