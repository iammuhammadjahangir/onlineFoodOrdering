const mongoose = require("mongoose");

const purchaseFormModel = require("../models/PurchaseFormModel");
const { utcToZonedTime, format } = require("date-fns-tz");
const incModel = require("../models/incModel");
// const { format, parseISO, parse } = require("date-fns");
const options = { timeZone: "Asia/Karachi" }; // GMT+5 time zone
const gmt5DateTime = new Date().toLocaleString("en-US", options);

require("dotenv").config();
exports.postPurchaseForm = async (req, res) => {
  try {
    console.log("hasnat");
    console.log(req.body);
    const seq = await inc();
    console.log(seq);
    // const gmt5CreatedAt = new Date(gmt5DateTime);
    console.log(gmt5DateTime);
    const obj = { ...req.body, reportID: `P-${seq}` };
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
    // const page = parseInt(req.query.pageSize || 0);
    console.log("====================================");
    console.log("jahangir");
    console.log(req.query.checked);
    const timeZone = "Asia/Karachi";
    const now = new Date();
    const nowInPKT = utcToZonedTime(now, timeZone);
    const startOfDayInPKT = new Date(nowInPKT).setHours(0, 0, 0, 0);
    const endOfDayInPKT = new Date(nowInPKT).setHours(23, 59, 59, 999);
    // console.log();
    console.log("====================================");
    let startDate =
      req.query.startDate === "null"
        ? format(startOfDayInPKT, "yyyy/MM/dd")
        : format(new Date(req.query.startDate), "yyyy/MM/dd");
    let endDate =
      req.query.endDate === "null"
        ? format(endOfDayInPKT, "yyyy/MM/dd")
        : format(new Date(req.query.endDate), "yyyy/MM/dd");
    // let reportID = req.query.reportID === "undefined" ? undefined : req.query.reportID;

    // startDate = new Date(startDate + " 00:00");
    // endDate = new Date(endDate + " 23:59");
    console.log(startDate);
    console.log(endDate);

    const data = await purchaseFormModel.aggregate([
      {
        $match: {
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      {
        $group: { _id: "$deleteStatus", total: { $sum: "$pureWeight" } },
      },
    ]);
    // console.log(data);
    const data2 = await purchaseFormModel.aggregate([
      {
        $match: {
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      {
        $group: { _id: "$deleteStatus", total: { $sum: "$cash" } },
      },
    ]);

    const data3 = await purchaseFormModel.aggregate([
      {
        $match: {
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },

      {
        $group: {
          _id: "pondWeight",
          pondWeight: { $sum: "$pondWeight" },
        },
      },
    ]);
    const data4 = await purchaseFormModel.aggregate([
      {
        $match: {
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      {
        $group: {
          _id: "mail",
          mail: { $sum: "$mail" },
        },
      },
    ]);
    const data5 = await purchaseFormModel.aggregate([
      {
        $match: {
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      {
        $group: {
          _id: "finalWeight",
          finalWeight: { $sum: "$finalWeight" },
        },
      },
    ]);
    // console.log(quizTo);
    console.log(data);
    console.log("Hasnat");
    // console.log(data3);
    // console.log(data2);
    // console.log(data4);
    // console.log(data5);

    res.json({
      Pure: data[0]?.total || 0,
      Cash: data2[0]?.total || 0,
      Mail: data4[0]?.mail || 0,
      OrignalPond: data3[0]?.pondWeight || 0,
      FinalPond: data5[0]?.finalWeight || 0,
    });
  } catch (e) {
    console.log(e);
  }
};
exports.delete = async (req, res) => {
  try {
    console.log("====================================");
    console.log(req.body.status);
    console.log("====================================");
    const resp = await purchaseFormModel.updateOne(
      { _id: req.params.id },
      { deleteStatus: req.body.status }
    );

    if (!!resp) {
      res.status(200).json({
        message: "Record Deleted",
      });
    } else {
      res.status(500).json({
        message: "Record Not Deleted",
      });
    }
  } catch (e) {
    res.status(400).json({
      message: "Record Not Deleted",
      e,
    });
  }
};
exports.getPurchaseForm = async (req, res) => {
  try {
    const pageSize = 12;
    console.log(req.body);
    console.log(req.query.startDate);
    console.log(req.query.endDate);
    console.log(req.query.checked);
    console.log(typeof req.query.checked);
    const timeZone = "Asia/Karachi";
    const now = new Date();
    const nowInPKT = utcToZonedTime(now, timeZone);
    const startOfDayInPKT = new Date(nowInPKT).setHours(0, 0, 0, 0);
    const endOfDayInPKT = new Date(nowInPKT).setHours(23, 59, 59, 999);
    const page = parseInt(req.query.pageSize || 0);
    let startDate =
      req.query.startDate === "null"
        ? format(startOfDayInPKT, "yyyy/MM/dd")
        : format(new Date(req.query.startDate), "yyyy/MM/dd");
    let endDate =
      req.query.endDate === "null"
        ? format(endOfDayInPKT, "yyyy/MM/dd")
        : format(new Date(req.query.endDate), "yyyy/MM/dd");
    let reportID =
      req.query.reportID === "undefined" ? undefined : req.query.reportID;

    startDate = new Date(startDate + " 00:00");
    endDate = new Date(endDate + " 23:59");
    console.log(startDate);
    console.log(endDate);
    console.log("........", req.query.checked);
    let data;

    if (reportID !== undefined) {
      console.log("else1");
      data = await purchaseFormModel
        .find({
          reportID: { $regex: reportID, $options: "i" },
          deleteStatus: req.query.checked === "true" ? true : false,
        })
        .sort({ createdAt: "desc" })
        .limit(pageSize)
        .skip(pageSize * page);
    } else if (startDate && endDate) {
      data = await purchaseFormModel
        .find({
          createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) },
          deleteStatus: req.query.checked === "true" ? true : false,
        })
        .sort({ createdAt: "desc" })
        .limit(pageSize)
        .skip(pageSize * page);
    }

    const count = await purchaseFormModel.countDocuments({});
    console.log(data);
    res.status(201).json({ data, total: Math.ceil(count / pageSize) });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

//Function for filtering data based on today,this month,this year
exports.getpurchaseDateWise = async (req, res) => {
  try {
    const timeZone = "Asia/Karachi";
    const now = new Date();
    const nowInPKT = utcToZonedTime(now, timeZone);
    const startOfDayInPKT = new Date(nowInPKT).setHours(0, 0, 0, 0);
    const endOfDayInPKT = new Date(nowInPKT).setHours(23, 59, 59, 999);

    let startDate = null,
      endDate = null;

    if (req.params.id === "today") {
      startDate = new Date(startOfDayInPKT);
      endDate = new Date(endOfDayInPKT);
    } else if (req.params.id === "thisMonth") {
      startDate = new Date(nowInPKT.getFullYear(), nowInPKT.getMonth(), 1);
      endDate = new Date(nowInPKT.getFullYear(), nowInPKT.getMonth() + 1, 0);
    } else if (req.params.id === "thisYear") {
      startDate = new Date(nowInPKT.getFullYear(), 0, 1);
      endDate = new Date(nowInPKT.getFullYear(), 11, 31, 23, 59, 59, 999);
    } else if (req.params.id === "thisWeek") {
      const currentDay = nowInPKT.getDay();
      startDate = new Date(nowInPKT);
      startDate.setDate(nowInPKT.getDate() - currentDay); // Start of the week (Sunday)
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // End of the week (Saturday)
      endDate.setHours(23, 59, 59, 999);
    }

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log(typeof req.params.checked);

    const match = {
      deleteStatus: req.params.checked === "true" ? true : false,
    };

    if (startDate !== null && endDate !== null) {
      console.log("enter");
      match.createdAt = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const data = await purchaseFormModel
      .aggregate([
        {
          $match: match,
        },
      ])
      .sort({ createdAt: "desc" });
    console.log(data);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const inc = async () => {
  const seq = await incModel
    .findOneAndUpdate(
      { autoVal: "autoval" },
      { $inc: { seq: 1 } },
      { new: true }
    )
    .then((value, error) => {
      //calls only when increment has no value and first data has to be enter
      if (!value) {
        const seq = new incModel({
          autoVal: "autoval",
          seq: 1,
        });
        seq.save();
        return 1;
      }

      console.log(value.seq);
      // return this when there is already data added
      return value.seq;
    });
  console.log(seq);
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
