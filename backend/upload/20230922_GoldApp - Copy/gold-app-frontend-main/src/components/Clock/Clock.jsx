import React from "react";
import { useState } from "react";
import { format, isEqual, formatISO, parseISO, toDate, parse } from "date-fns";
import style from "./Clock.module.css";
const Clock = (props) => {
	const [date, setDate] = useState(format(new Date(), "dd/MM/yyyy hh:mm:ss"));

	setInterval(() => {
		setDate(format(new Date(), "dd/MM/yyyy hh:mm:ss a"));
	}, 1000);

	return (
		<>
			<div className={style.innerDiv}>{date}</div>
		</>
	);
};

export default Clock;
