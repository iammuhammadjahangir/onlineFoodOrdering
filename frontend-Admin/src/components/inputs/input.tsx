type InputProps = {
  label: string;
  className: string;
  type: string;
  placeholder: string;
  name: string;
  autoComplete: string;
  maxLength: string;
  required: boolean;
  value: string | number;
  onKeyDown: any;
  isDisabled: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  touched: any;
  errors: any;
  icon?: React.ReactNode | undefined;
};

const Input = ({
  label,
  className,
  type,
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
}: InputProps) => {
  return (
    <div className="labeAndInputDiv">
      <label>{label}</label>
      <div className="inputDiv">
        {icon ? icon : null}
        <input
          className={`custom-input ${icon && "marginIcon"} ${className} `}
          type={type}
          placeholder={placeholder}
          name={name}
          autoComplete={autoComplete}
          maxLength={Number(maxLength)}
          required={required} // Fix: Update the required prop to be of type boolean
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

export default Input;
