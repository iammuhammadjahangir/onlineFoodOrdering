const expenseTypeModel = require("../models/expenseTypeModel");

//=================================================//
//======CONTROLLER TO POST EXPENSE TYPE ==========//
//===============================================//
exports.postExpenseType = async (req, res) => {
  try {
    let product = new expenseTypeModel(req.body);
    result = await product.save();
    console.log(result);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

//=================================================//
//======CONTROLLER TO GET= EXPENSE TYPE ==========//
//===============================================//
exports.getExpenseType = async (req, res) => {
  try {
    let result = await expenseTypeModel.find();
    if (result) {
      res.send(result);
    }
  } catch (err) {
    res.send(err);
  }
};

//=================================================//
//======CONTROLLER TO GET EXPENSE TYPE BY ID==========//
//===============================================//
exports.getExpenseTypeById = async (req, res) => {
  const result = await expenseTypeModel.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  }
};

//===================================================//
//======CONTROLLER TO Update EXPENSE TYPE ==========//
//=================================================//
exports.updateExpenseType = async (req, res) => {
  const result = await expenseTypeModel.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send({ "updated :": result });
};

//===================================================//
//======CONTROLLER TO DELETE EXPENSE TYPE ==========//
//=================================================//
exports.deleteExpenseType = async (req, res) => {
  const result = await expenseTypeModel.deleteOne({ _id: req.params.id });
  if (result) {
    res.send({ message: "Expense deleted successfully" });
  } else {
    res.send("Record does not delete");
  }
};
