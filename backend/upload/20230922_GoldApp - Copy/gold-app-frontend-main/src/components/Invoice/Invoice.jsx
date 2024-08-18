import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const Invoice = () => {
	const navigate = useNavigate();
	const [obj, setObj] = useState({});
	const ComponentDiv = useRef();
	const bool = true;
	const data = JSON.parse(localStorage.getItem("values"));
	const { type } = useParams();
	useEffect(() => {
		// setObj(data);
		console.log(data);

		handlePrint();
		if (type === "purchase") {
			navigate("/purchase");
		} else {
			navigate("/trade");
		}
	}, []);

	const handlePrint = useReactToPrint({
		content: () => ComponentDiv.current,
		documentTitle: "Purchase-Data",
	});
	return (
		<>
			(
			{type === "purchase" ? (
				<div ref={ComponentDiv}>
					<h1>
						{console.log(obj)} Customer Name &nbsp; &nbsp;{data?.customer}
					</h1>
					<h1> Pond Weight &nbsp; &nbsp;{data?.pondWeight} </h1>
					<h1> Mail/Nagh &nbsp; &nbsp;{data?.mail} </h1>
					<h1> Final Weight &nbsp; &nbsp;{data?.finalWeight} </h1>
					<h1> Rate/Gram &nbsp; &nbsp;{data?.gramRate} </h1>
					<h1> Pure Weight &nbsp; &nbsp;{data?.pureWeight} </h1>
					<h1> Ratti &nbsp; &nbsp; {data?.ratti}</h1>
					<h1> Milli &nbsp; &nbsp;{data?.milli} </h1>
					<h1> Rate &nbsp; &nbsp;{data?.rate} </h1>
					<h1> Payment Method &nbsp; &nbsp;{data?.paymentMethod} </h1>
					<h1> Description &nbsp; &nbsp;{data?.desc} </h1>
				</div>
			) : (
				<div ref={ComponentDiv}>
					<h1> Name &nbsp; &nbsp;{data?.name} </h1>
					<h1> Type &nbsp; &nbsp;{data?.type} </h1>
					<h1> Weight &nbsp; &nbsp;{data?.weight} </h1>
					<h1> Rate &nbsp; &nbsp;{data?.rate} </h1>
					<h1> Packing Charges &nbsp; &nbsp;{data?.packingCharges} </h1>
					<h1> Cash &nbsp; &nbsp; {data?.cash}</h1>
					<h1> Description &nbsp; &nbsp;{data?.desc} </h1>
				</div>
			)}
			)
		</>
	);
};

export default Invoice;
