const employeCommissionModel = require("../models/employeCommissionModel");
//=============================================//
//=====CONTROLLER TO POST commission  ===//
//===========================================//
exports.postEmployeeCommission = async (req, res) => {
  try {
    console.log("calihe");
    const newPurchaseProduct = new employeCommissionModel({
      employeName: req.body.employeName,
      totalCommission: req.body.totalCommission,
      shopNo: req.body.shopNo,
      percentage: req.body.percentage,
      record: req.body.record,
    });

    newPurchaseProduct.save();

    res.status(201).json({
      message: "Purchase Product created successfully",
      newPurchaseProduct,
    });
  } catch (error) {
    res.status(404).json("error occured", error);
  }
};

//=============================================//
//=====CONTROLLER TO GET Commission  ====//
//===========================================//
exports.getCommissionRecord = async (req, res) => {
  try {
    let result = await employeCommissionModel.find();
    if (result?.length > 0) {
      res.send(result);
    } else {
      res.send("No commission  found");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//===CONTROLLER TO GET PRODUCT TYPE BY ID===//
//=========================================//
exports.getCommissionByID = async (req, res) => {
  try {
    let result = await employeCommissionModel.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send("No Product Type Found By Id");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};
