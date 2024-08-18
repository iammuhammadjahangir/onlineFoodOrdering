import { Datepicker } from "flowbite-react";
import { useState } from "react";

interface DatepickerProps {
  title?: string;
  value?: string;
  labelClearButton?: string;
  maxDate?: Date;
  name: string;
  handleChange: (date: Date | null) => void;
  handleBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValues?: (field: string, value: string) => void;
  touched: boolean | undefined;
  errors: string | undefined;
  defaultValue: string | null;
}

const DatePickerDropdown = ({
  title = "Date Picker",
  maxDate = new Date(Date.now()),
  labelClearButton = "Clear",
  name,
  errors,
  handleBlur,
  handleChange,
  touched,
  setFieldValues,
  defaultValue,
}: DatepickerProps) => {
  // console.log(defaultValue);
  const [dateValue, setDateValue] = useState<string>(
    new Date(defaultValue || Date.now()).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  );
  const handleDropDownChange = (date: any) => {
    setDateValue(
      date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );
    console.log(date);
    if (date && setFieldValues) {
      setFieldValues(name, date);
    }
    if (date && handleChange) {
      handleChange({
        target: {
          name,
          value: date,
        },
      } as any);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Datepicker
        // type="date"
        name={name}
        title={title}
        value={dateValue}
        labelClearButton={labelClearButton}
        maxDate={maxDate}
        onSelectedDateChanged={handleDropDownChange}
        onBlur={handleBlur}
      />
      <p className="error">{touched && errors ? errors : null}</p>
    </div>
  );
};

export default DatePickerDropdown;
