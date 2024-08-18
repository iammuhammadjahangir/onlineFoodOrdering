import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { format, isEqual, formatISO, parseISO, toDate, parse } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
const DatePickerComponent = ({ pickDate }) => {
	const [startDate, setStartDate] = useState(new Date());

	const date1 = format(startDate, "MM/dd/yyyy hh:mm:ss");

	return (
		<DatePicker
			selected={startDate}
			onChange={(date) => {
				setStartDate(date);
				pickDate(startDate);
			}}
		/>
	);
};

export default DatePickerComponent;
