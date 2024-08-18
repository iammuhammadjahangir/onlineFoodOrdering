import AsyncSelect from "react-select/async";
import { ShopDropDown } from "../../types/types";

interface dropDownProps {
  options: any;
  isMulti: boolean;
  styles?: any;
  name: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValues?: (field: string, value: string) => void;
  touched: boolean | undefined;
  errors: string | undefined;
  value: any;
  defaultValue: ShopDropDown | null | any;
}

const DropDown = ({
  options,
  isMulti = false,
  handleChange,
  setFieldValues,
  name,
  touched,
  errors,
  defaultValue,
}: dropDownProps) => {
  console.log(name);
  console.log(defaultValue);
  const colorStyles = {
    control: (styles: Record<string, any>) => ({
      ...styles,
      backgroundColor: "white",
      padding: "0.3rem",
      borderRadius: "0.4rem",
      border: "1px solid #black",
    }),
    option: (
      styles: Record<string, any>,
      {
        data,
      }: {
        data: any;
        isDisabled: boolean;
        isFocused: boolean;
        isSelected: boolean;
      }
    ) => {
      return { ...styles, color: data.color };
    },
    multiValue: (styles: Record<string, any>, { data }: { data: any }) => {
      return {
        ...styles,
        backgroundColor: data.color,
        color: "#fff",
      };
    },
    multiValueLabel: (styles: Record<string, any>) => {
      return {
        ...styles,
        color: "#fff",
      };
    },
    multiValueRemove: (styles: Record<string, any>) => {
      return {
        ...styles,
        color: "#fff",
        cursor: "pointer",
        ":hover": {
          color: "#fff",
        },
      };
    },
  };

  const handleDropDownChange = (selectedOption: any) => {
    // console.log(selectedOption);
    if (selectedOption.value && setFieldValues) {
      setFieldValues(name, selectedOption.value);
    }
    if (selectedOption && handleChange) {
      handleChange({
        target: {
          name,
          value: Array.isArray(selectedOption)
            ? selectedOption.map((option: any) => option.value)
            : selectedOption.value,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const loadOptions = (searchValue: string, callback: Function) => {
    // console.log(searchValue);
    if (!searchValue) {
      callback(options);
    } else {
      const filteredOptions = options.filter((option: any) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      callback(filteredOptions);
    }
  };
  return (
    <div className="dropDownContainer">
      <AsyncSelect
        loadOptions={loadOptions}
        defaultOptions={options}
        isMulti={isMulti}
        defaultValue={defaultValue || null}
        onChange={handleDropDownChange}
        styles={colorStyles}
      />
      <p className="error">{touched && errors ? errors : null}</p>
    </div>
  );
};

export default DropDown;
