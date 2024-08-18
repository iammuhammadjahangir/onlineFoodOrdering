const mongoose = require("mongoose");
const dailyEntryModel = require("../models/dailyEntryModel");

exports.postDailyEntry = async (req, res) => {
  try {
    const { customer, goldIn, goldout, cashIn, cashout } = req.body;

    const dublicate = await dailyEntryModel.find({
      customer: req.body.customer,
    });

    //variable for sending response
    let data;
    if (dublicate.length > 0) {
      await dailyEntryModel
        .findOneAndUpdate(
          { customer: customer },
          {
            $inc: {
              goldIn: goldIn,
              goldout: goldout,
              cashIn: cashIn,
              cashout: cashout,
            },
          },
          { new: true }
        )
        .then(() => {
          data = "Customer already added .. update record only";
        });
    } else {
      //to post record in database
      const dailtEntry = await new dailyEntryModel({
        customer,
        goldIn,
        goldout,
        cashIn,
        cashout,
      });

      await dailtEntry.save();
      data = "Record Added";
    }
    res.status(200).send(data);
  } catch (e) {
    console.log("error", e);
  }
};

exports.postCustomersDailyEntry = async (req, res) => {
  try {
    const { customer, goldIn, goldout, cashIn, cashout } = req.body;

    //to post record in database
    const dailtEntry = await new dailyEntryModel({
      customer,
      goldIn,
      goldout,
      cashIn,
      cashout,
    });

    await dailtEntry.save();
    data = "Record Added";
    res.status(200).send(data);
  } catch (e) {
    console.log("error", e);
  }
};

exports.getDailyEntry = async (req, res) => {
  try {
    const getDailyEntry = await dailyEntryModel.find().populate("customer");

    const Filtered = await getDailyEntry.filter((data) => {
      if (data.customer.deletedStatus === false) {
        return true;
      }
      return false;
    });
    console.log(Filtered);
    res.status(200).send(Filtered);
  } catch (e) {
    console.log("error", e);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateDailyEntry = async (req, res) => {
  const { custID, reqGoldIn, reqGoldOut, reqCashIn, reqCashOut } = req.params;
  console.log(custID, reqGoldIn, reqGoldOut, reqCashIn, reqCashOut);
  const updateDailyEntry = await dailyEntryModel.findOneAndUpdate(
    { customer: custID },
    {
      $inc: {
        goldIn: reqGoldIn,
        goldout: reqGoldOut,
        cashIn: reqCashIn,
        cashout: reqCashOut,
      },
    },
    { new: true }
  );
  res.status(200).send(updateDailyEntry);
};
