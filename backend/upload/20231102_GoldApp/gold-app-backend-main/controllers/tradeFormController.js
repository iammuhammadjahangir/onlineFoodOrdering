const mongoose = require("mongoose");
const options = { timeZone: "Asia/Karachi" }; // GMT+5 time zone
const gmt5DateTime = new Date().toLocaleString("en-US", options);
const tradeFormModel = require("../models/TradeFormModel");
const incModel = require("../models/incModel2");
const { utcToZonedTime } = require("date-fns-tz");

const { format, parseISO, parse } = require("date-fns");
require("dotenv").config();
exports.postTradeForm = async (req, res) => {
  try {
    console.log("hasnat");
    console.log(req.body);
    const seq = await inc();
    console.log(seq);
    const gmt5CreatedAt = new Date(gmt5DateTime);
    const obj = { ...req.body, reportID: `T-${seq}` };
    const newRecord = new tradeFormModel(obj);

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
exports.delete = async (req, res) => {
  try {
    console.log("====================================");
    console.log(req.body.status);
    console.log("====================================");
    const resp = await tradeFormModel.updateOne(
      { _id: req.params.id },
      { deleteStatus: req.body.status }
    );

    if (!!resp) {
      res.status(200).json({
        message: "Record Updated",
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
exports.getTradeForm = async (req, res) => {
  try {
    const pageSize = 12;
    console.log(req.body);
    console.log(req.query.startDate);
    console.log(req.query.endDate);
    console.log("=================vvv===================");
    console.log(req.query.reportID);
    console.log("==================vvv==================");

    const page = parseInt(req.query.pageSize || 0);

    let startDate =
      req.query.startDate === "null"
        ? format(new Date(), "yyyy/MM/dd")
        : format(new Date(req.query.startDate), "yyyy/MM/dd");
    let endDate =
      req.query.endDate === "null"
        ? format(new Date(), "yyyy/MM/dd")
        : format(new Date(req.query.endDate), "yyyy/MM/dd");
    let reportID = req.query.reportID === "undefined" ? "" : req.query.reportID;

    startDate = new Date(startDate + " 00:00");
    endDate = new Date(endDate + " 23:59");
    console.log("===================startDate=================");
    console.log(startDate);
    console.log("====================================");
    console.log(startDate);
    console.log(endDate);
    let data;

    // if (reportID !== undefined) {
    //     console.log("else1");
    //     data = await tradeFormModel
    //         .find({ $or: [{ "reportID": { "$regex": reportID, "$options": "i" } }, { "type": { "$regex": reportID, "$options": "i" } }], deleteStatus: req.query.checked === "true" ? true : false })
    //         .sort({ createdAt: "desc" })
    //         .limit(pageSize)
    //         .skip(pageSize * page);
    // }
    if (startDate && endDate) {
      console.log("================ttt====================");
      console.log(reportID);
      console.log("==================ttt==================");
      console.log("else3");
      data = await tradeFormModel
        .find({
          $or: [
            { reportID: { $regex: reportID, $options: "i" } },
            { type: { $regex: reportID, $options: "i" } },
          ],
          createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) },
          deleteStatus: req.query.checked === "true" ? true : false,
        })
        .sort({ createdAt: "desc" })
        .limit(pageSize)
        .skip(pageSize * page);
    }

    console.log("====================================");
    console.log(data);
    console.log("====================================");
    const count = await tradeFormModel.countDocuments({});

    res.status(201).json({ data, total: Math.ceil(count / pageSize) });
  } catch (e) {
    res.status(400).json(e);
  }
};
exports.calTradeFormCashAndWeight = async (req, res) => {
  try {
    // const page = parseInt(req.query.pageSize || 0);
    let startDate =
      req.query.startDate === "null"
        ? format(new Date(), "yyyy/MM/dd")
        : format(new Date(req.query.startDate), "yyyy/MM/dd");
    let endDate =
      req.query.endDate === "null"
        ? format(new Date(), "yyyy/MM/dd")
        : format(new Date(req.query.endDate), "yyyy/MM/dd");
    // let reportID = req.query.reportID === "undefined" ? undefined : req.query.reportID;

    // startDate = new Date(startDate + " 00:00");
    // endDate = new Date(endDate + " 23:59");
    // console.log(startDate);
    // console.log(endDate);
    const sellRawaWeight = await tradeFormModel.aggregate([
      {
        $match: {
          type: "sellRawa",
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      { $group: { _id: "$type", totalGold: { $sum: "$weight" } } },
    ]);
    // console.log(sellRawaWeight);
    const sellRawaCash = await tradeFormModel.aggregate([
      {
        $match: {
          type: "sellRawa",
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      { $group: { _id: "$type", totalCash: { $sum: "$cash" } } },
    ]);
    const buyRawaWeight = await tradeFormModel.aggregate([
      {
        $match: {
          type: "buyRawa",
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      { $group: { _id: "$type", totalGold: { $sum: "$weight" } } },
    ]);
    // co
    const buyRawaCash = await tradeFormModel.aggregate([
      {
        $match: {
          type: "buyRawa",
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      { $group: { _id: "$type", totalCash: { $sum: "$cash" } } },
    ]);
    const sellGoldReceiveCash = await tradeFormModel.aggregate([
      {
        $match: {
          $or: [
            { type: "sellRawa" },
            { type: "sellPCS" },
            { type: "sellGrami" },
          ],
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      {
        $group: {
          _id: "cash",
          cashReceived: { $sum: "$cash" },
          goldSold: { $sum: "$weight" },
        },
      },
    ]);
    const buyGoldPayCash = await tradeFormModel.aggregate([
      {
        $match: {
          $or: [{ type: "buyRawa" }, { type: "buyPCS" }, { type: "buyGrami" }],
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      {
        $group: {
          _id: "cash",
          cashPaid: { $sum: "$cash" },
          goldBought: { $sum: "$weight" },
        },
      },
    ]);
    console.log(sellGoldReceiveCash);
    console.log(buyGoldPayCash);
    // console.log(sellRawaCash);

    const sellPCSWeight = await tradeFormModel.aggregate([
      {
        $match: {
          type: "sellPCS",
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      { $group: { _id: "$type", totalGold: { $sum: "$weight" } } },
    ]);
    const buyPCSWeight = await tradeFormModel.aggregate([
      {
        $match: {
          type: "buyPCS",
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      { $group: { _id: "$type", totalGold: { $sum: "$weight" } } },
    ]);
    // console.log(sellPCSWeight);
    const sellPCSCash = await tradeFormModel.aggregate([
      {
        $match: {
          type: "sellPCS",
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      { $group: { _id: "$type", totalCash: { $sum: "$cash" } } },
    ]);
    const buyPCSCash = await tradeFormModel.aggregate([
      {
        $match: {
          type: "buyPCS",
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      { $group: { _id: "$type", totalCash: { $sum: "$cash" } } },
    ]);
    // console.log(sellPCSCash);

    const sellGramiWeight = await tradeFormModel.aggregate([
      {
        $match: {
          type: "sellGrami",
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      { $group: { _id: "$type", totalGold: { $sum: "$weight" } } },
    ]);
    const buyGramiWeight = await tradeFormModel.aggregate([
      {
        $match: {
          type: "buyGrami",
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      { $group: { _id: "$type", totalGold: { $sum: "$weight" } } },
    ]);
    // console.log(sellGramiWeight);
    const sellGramiCash = await tradeFormModel.aggregate([
      {
        $match: {
          type: "sellGrami",
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      { $group: { _id: "$type", totalCash: { $sum: "$cash" } } },
    ]);
    const buyGramiCash = await tradeFormModel.aggregate([
      {
        $match: {
          type: "buyGrami",
          deleteStatus: req.query.checked === "true" ? true : false,
          createdAt: {
            $gte: new Date(startDate + " 00:00"),
            $lt: new Date(endDate + " 23:59"),
          },
        },
      },
      { $group: { _id: "$type", totalCash: { $sum: "$cash" } } },
    ]);
    // console.log(sellGramiCash);

    res.json({
      sellRawaGold: sellRawaWeight[0]?.totalGold || 0,
      buyRawaGold: buyRawaWeight[0]?.totalGold || 0,
      sellRawaCash: sellRawaCash[0]?.totalCash || 0,
      buyRawaCash: buyRawaCash[0]?.totalCash || 0,
      sellPCSGold: sellPCSWeight[0]?.totalGold || 0,
      buyPCSGold: buyPCSWeight[0]?.totalGold || 0,
      sellPCSCash: sellPCSCash[0]?.totalCash || 0,
      buyPCSCash: buyPCSCash[0]?.totalCash || 0,
      sellGramiGold: sellGramiWeight[0]?.totalGold || 0,
      buyGramiGold: buyGramiWeight[0]?.totalGold || 0,
      sellGramiCash: sellGramiCash[0]?.totalCash || 0,
      buyGramiCash: buyGramiCash[0]?.totalCash || 0,
      cashPaid: buyGoldPayCash[0]?.cashPaid || 0,
      goldBought: buyGoldPayCash[0]?.goldBought || 0,
      goldSold: sellGoldReceiveCash[0]?.goldSold || 0,
      cashReceived: sellGoldReceiveCash[0]?.cashReceived || 0,
    });
  } catch (e) {
    console.log(e);
  }
};

//Function for filtering data based on today,this month,this year
exports.getTradeDateWise = async (req, res) => {
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
    const data = await tradeFormModel
      .aggregate([
        {
          $match: match,
        },
      ])
      .sort({ createdAt: "desc" });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Function for filtering data based on today, this month, this year, or this week
exports.getTradeSpecificType = async (req, res) => {
  try {
    const data = await tradeFormModel.aggregate([
      {
        $match: {
          deleteStatus: req.params.checked === "true" ? true : false,
          type: { $regex: req.params.type, $options: "i" },
        },
      },
    ]);

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
