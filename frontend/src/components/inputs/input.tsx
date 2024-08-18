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
  multiline?: boolean;
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
  multiline = false,
}: InputProps) => {
  const InputComponent = multiline ? (
    <textarea
      className={`custom-input ${icon && "marginIcon"} ${className}`}
      placeholder={placeholder}
      name={name}
      autoComplete={autoComplete}
      maxLength={Number(maxLength)}
      required={required}
      value={value as string}
      onKeyDown={onKeyDown}
      disabled={isDisabled}
      onChange={
        handleChange as (
          event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
        ) => void
      } // Fix: Update the type of handleChange to accept both input and textarea events
      onBlur={
        handleBlur as (
          event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
        ) => void
      } // Fix: Update the type of handleBlur to accept both input and textarea events
    />
  ) : (
    <input
      className={`custom-input ${icon && "marginIcon"} ${className}`}
      type={type}
      placeholder={placeholder}
      name={name}
      autoComplete={autoComplete}
      maxLength={Number(maxLength)}
      required={required}
      value={value as string}
      onKeyDown={onKeyDown}
      disabled={isDisabled}
      onChange={
        handleChange as (event: React.ChangeEvent<HTMLInputElement>) => void
      }
      onBlur={
        handleBlur as (event: React.ChangeEvent<HTMLInputElement>) => void
      }
    />
  );

  return (
    <div className="labeAndInputDiv">
      <label>{label}</label>
      <div className="inputDiv">
        {icon && icon}
        {InputComponent}
        <p className="error">{touched && errors ? errors : null}</p>
      </div>
    </div>
  );

  // return (
  //   <div className="labeAndInputDiv">
  //     <label>{label}</label>
  //     <div className="inputDiv">
  //       {icon ? icon : null}
  //       <input
  //         className={`custom-input ${icon && "marginIcon"} ${className} `}
  //         type={type}
  //         placeholder={placeholder}
  //         name={name}
  //         autoComplete={autoComplete}
  //         maxLength={Number(maxLength)}
  //         required={required} // Fix: Update the required prop to be of type boolean
  //         value={value}
  //         onKeyDown={onKeyDown}
  //         disabled={isDisabled}
  //         onChange={handleChange}
  //         onBlur={handleBlur}
  //       />
  //       <p className="error">{touched && errors ? errors : null}</p>
  //     </div>
  //   </div>
  // );
};

export default Input;
