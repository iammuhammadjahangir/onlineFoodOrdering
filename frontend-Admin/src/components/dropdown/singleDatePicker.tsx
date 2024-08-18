import React from "react";
import { DateRangePicker, DateRangePickerProps } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import subDays from "date-fns/subDays";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addMonths from "date-fns/addMonths";

interface SingleDatePickerProps {
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date, Date] | null) => void;
  error?: any;
  touched?: any;
  format?: string;
  placeholder?: string;
  isPredefinedRanges?: boolean;
}

const SingleDatePicker: React.FC<SingleDatePickerProps> = ({
  name,
  startDate,
  endDate,
  onChange,
  error,
  touched,
  format = "MM/dd/yyyy HH:mm",
  placeholder = "Select a date range",
  isPredefinedRanges = true,
}) => {
  const predefinedRanges: DateRangePickerProps["ranges"] = [
    {
      label: "Today",
      value: [new Date(), new Date()],
      placement: "left",
    },
    {
      label: "Yesterday",
      value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    },
    {
      label: "This week",
      value: [startOfWeek(new Date()), endOfWeek(new Date())],
    },
    {
      label: "Last 7 days",
      value: [subDays(new Date(), 6), new Date()],
      placement: "left",
    },
    {
      label: "Last 30 days",
      value: [subDays(new Date(), 29), new Date()],
      placement: "left",
    },
    {
      label: "This month",
      value: [startOfMonth(new Date()), new Date()],
      placement: "left",
    },
    {
      label: "Last month",
      value: [
        startOfMonth(addMonths(new Date(), -1)),
        endOfMonth(addMonths(new Date(), -1)),
      ],
      placement: "left",
    },
    {
      label: "This year",
      value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
      placement: "left",
    },
    {
      label: "Last year",
      value: [
        new Date(new Date().getFullYear() - 1, 0, 1),
        new Date(new Date().getFullYear(), 0, 0),
      ],
      placement: "left",
    },
    {
      label: "All time",
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
      placement: "left",
    },
    {
      label: "Last week",
      closeOverlay: false,
      value: (value: any) => {
        const [start = new Date()] = value || [];
        return [
          addDays(startOfWeek(start, { weekStartsOn: 0 }), -7),
          addDays(endOfWeek(start, { weekStartsOn: 0 }), -7),
        ];
      },
      placement: "left",
    },
    {
      label: "Next week",
      closeOverlay: false,
      value: (value: any) => {
        const [start = new Date()] = value || [];
        return [
          addDays(startOfWeek(start, { weekStartsOn: 0 }), 7),
          addDays(endOfWeek(start, { weekStartsOn: 0 }), 7),
        ];
      },
      placement: "left",
    },
  ];

  console.log(startDate, endDate);
  console.log(error);
  console.log(touched);

  return (
    <section className="datePicker">
      <p>{name}</p>
      <DateRangePicker
        format={format}
        appearance="subtle"
        ranges={isPredefinedRanges ? predefinedRanges : []}
        placeholder={placeholder}
        // style={{ width: "100%" }}
        size="lg"
        preventOverflow={true}
        onChange={onChange}
        // value={startDate && endDate ? [startDate, endDate] : null}
        defaultValue={
          startDate && endDate ? [new Date(startDate), new Date(endDate)] : null
        }
      />
      <p className="error">{touched && error ? error : null}</p>
    </section>
  );
};

export default SingleDatePicker;
