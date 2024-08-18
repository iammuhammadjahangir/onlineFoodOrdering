const mongoose = require("mongoose");

// const purchaseFormModel = require("../models/PurchaseFormModel");
const incModel = require("../models/incModel");
const { format, parseISO, parse } = require('date-fns')
require("dotenv").config();
exports.postPurchaseForm = async (req, res) => {
	try {
		console.log("hasnat");
		console.log(req.body);
		const seq = await inc();
		console.log(seq);
		const obj = { ...req.body, reportID: `PUR-${seq}` };
		const newRecord = new purchaseFormModel(obj);

		const pp = await newRecord.save();

		console.log(pp);
		res.status(201).json(newRecord);
		// await purchaseFormModel.deleteMany()

		console.log(seq);
	} catch (e) {
		console.log("mmm");
		console.log(e);
		res.status(400).json(e);
		// res.json("error");
	}
};


exports.getTotalPurchaseFormCash = async (req, res) => {

	try {

		const data = await purchaseFormModel.aggregate(
			[{ $match: { paymentMethod: "Pure" } },
			{ $group: { _id: "$paymentMethod", total: { $sum: "$pureWeight" } } }]
		);
		console.log(data);
		const data2 = await purchaseFormModel.aggregate(
			[{ $match: { paymentMethod: "Cash" } },
			{ $group: { _id: "$paymentMethod", total: { $sum: "$cash" } } }]
		);
		console.log(data2);
		res.json({
			"Pure": data[0].total,
			"Cash": data2[0].total

		})
	}
	catch (e) {
		console.log(e);
	}


}

exports.getPurchaseForm = async (req, res) => {
	try {
		const pageSize = 12;
		console.log(req.body);
		console.log(req.query.startDate);
		console.log(req.query.endDate);


		const page = parseInt(req.query.pageSize || 0);
		let startDate = req.query.startDate === 'null' ? "1970/01/01" : format(new Date(req.query.startDate), "yyyy/MM/dd");
		let endDate = req.query.endDate === 'null' ? "4070/01/01" : format(new Date(req.query.endDate), "yyyy/MM/dd");
		let reportID = req.query.reportID === "undefined" ? undefined : req.query.reportID;

		startDate = new Date(startDate + " 00:00");
		endDate = new Date(endDate + " 23:59");
		console.log(startDate);
		console.log(endDate);
		let data;

		if (reportID !== undefined) {
			console.log("else1");
			data = await purchaseFormModel
				.find({ reportID })
				.limit(pageSize)
				.skip(pageSize * page);
		} else if (startDate && endDate) {

			data = await purchaseFormModel
				.find({ createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) } })
				.limit(pageSize)
				.skip(pageSize * page);
		}

		const count = await purchaseFormModel.countDocuments({});

		res.status(201).json({ data, total: Math.ceil(count / pageSize) });
	} catch (e) {
		res.status(400).json(e);
	}
};

const inc = async () => {
	const { seq } = await incModel.findOneAndUpdate({ _id: "634a5bfe08f118d94aa0a43c" }, { $inc: { seq: 1 } }, { returnOriginal: false });
	return seq;
};

// exports.getPurchaseFormByName = async (req, res) => {
// 	try {
// 		// const newRecord = new purchaseFormModel(req.body);

// 		// const pp = await newRecord.save();
// 		console.log("pp");
// 		const data = await purchaseFormModel.find({ customer: "Ba" });
// 		res.status(201).json(data);
// 	} catch (e) {
// 		console.log("ee");
// 		res.status(400).json(e);
// 		// res.json("error");
// 	}
// };
