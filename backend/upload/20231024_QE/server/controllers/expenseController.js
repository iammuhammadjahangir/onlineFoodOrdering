const expenseCounterModel = require("../models/expenseIncrementInvoiceModel");
const expenseModel = require("../models/expenseModel");
const godown = require("../models/godownModel");

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed in JavaScript
//=============================================//
//======CONTROLLER TO POST EXPENSES ==========//
//===========================================//
exports.postExpense = async (req, res) => {
  expenseCounterModel
    .findOneAndUpdate({ id: "autoval" }, { $inc: { seq: 1 } }, { new: true })
    .then((cd, err) => {
      console.log("counter value", cd);
      let seqId;
      if (cd == null) {
        const newval = new expenseCounterModel({ id: "autoval", seq: 10000 });
        newval.save();
        seqId = "Exp_" + 10000;
      } else {
        seqId = "Exp_" + cd.seq;
      }

      const newExpense = new expenseModel({
        invoiceNumber: seqId, // Set the id field based on the InvoiceNumber
        expenseLocation: req.body.transferFromObjectId,
        expenseCategory: req.body.expenseCategory,
        expenses: req.body.expenses,
        expenseTotal: req.body.expenseTotal,
      });
      newExpense.save();

      res.status(201).json({
        message: "Expense created successfully",
        newExpense,
      });
    })
    .catch((err) => {
      console.error("Error creating expense:", err);
      res
        .status(500)
        .json({ err: "An error occurred while creating the expense" });
    });
};

//=============================================//
//======CONTROLLER TO GET EXPENSES ===========//
//===========================================//
exports.getExpense = async (req, res) => {
  try {
    let result = await expenseModel.find().populate("expenseLocation");
    if (result) {
      res.send(result);
    }
  } catch (err) {
    res.send(err);
  }
};

//=============================================//
//====CONTROLLER TO GET EXPENSE BY ID ========//
//===========================================//
exports.getExpenseById = async (req, res) => {
  try {
    const result = await expenseModel.findOne({
      invoiceNumber: req.params.id,
    });
    if (result) {
      res.send(result);
    } else {
      res.send("No  Expense Found");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//==================================================//
//====CONTROLLER TO GET EXPENSE This Month ========//
//================================================//

exports.getTotalExpenseThisMonth = async (req, res) => {
  try {
    expenseModel
      .aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(currentDate.getFullYear(), currentMonth - 1, 1), // Start of the current month
              $lt: new Date(currentDate.getFullYear(), currentMonth, 1), // Start of the next month
            },
          },
        },
        {
          $group: {
            _id: null,
            totalExpenseValueValue: { $sum: "$expenseTotal" }, // Sum the total field for each document
            totalExpenses: { $sum: { $size: "$expenses" } }, // Count the products array for each document
          },
        },
      ])
      .then((result) => {
        if (result?.length > 0) {
          const { totalExpenseValueValue, totalExpenses } = result[0];
          res.status(200).json({ totalExpenseValueValue, totalExpenses });
        } else {
          res.status(200).json("No data found for the current month.");
        }
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getTotalExpenseThisMonthWithShop = async (req, res) => {
  try {
    const shopNo = req.params.shop;
    const data = await godown
      .find({ storageCode: req.params.shop })
      .then((result) => {
        expenseModel
          .aggregate([
            {
              $match: {
                expenseLocation: result[0]._id,
                createdAt: {
                  $gte: new Date(
                    currentDate.getFullYear(),
                    currentMonth - 1,
                    1
                  ),
                  $lt: new Date(currentDate.getFullYear(), currentMonth, 1),
                },
              },
            },
            {
              $group: {
                _id: null,
                totalExpenseValueValue: { $sum: "$expenseTotal" },
                totalExpenses: { $sum: { $size: "$expenses" } },
              },
            },
          ])
          .then((result) => {
            console.log(result);
            if (result?.length > 0) {
              const { totalExpenseValueValue, totalExpenses } = result[0];
              res.status(200).json({ totalExpenseValueValue, totalExpenses });
            } else {
              res.status(200).json("No data found for the current month.");
            }
          });
      });
  } catch (error) {
    res.status(500).json(error);
  }
};
