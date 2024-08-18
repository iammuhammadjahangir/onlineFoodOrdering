import CreatableSelect from "react-select/creatable";
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

const DynamicSelectDropdown = ({
  isMulti = false,
  handleChange,
  setFieldValues,
  name,
  touched,
  errors,
  defaultValue,
}: dropDownProps) => {
  const handleDropDownChange = (selectedOption: any) => {
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

  return (
    <div className="dropDownContainer">
      <CreatableSelect
        isClearable
        isMulti={isMulti}
        defaultValue={defaultValue}
        onChange={handleDropDownChange}
        // styles={colorStyles}
      />

      <p className="error">{touched && errors ? errors : null}</p>
    </div>
  );
};

//   <AsyncSelect
//     loadOptions={loadOptions}
//     defaultOptions={options}
//     isMulti={isMulti}
//     defaultValue={defaultValue || null}
//     onChange={handleDropDownChange}
//     styles={colorStyles}
//   />
export default DynamicSelectDropdown;
