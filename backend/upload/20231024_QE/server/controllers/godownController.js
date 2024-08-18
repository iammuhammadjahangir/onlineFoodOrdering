const godownModel = require("../models/godownModel");
const productLocationModel = require("../models/productLocationModel");
//===========================================//
//======CONTROLLER TO POST GODOWN ==========//
//=========================================//
exports.postGodown = async (req, res) => {
  try {
    let result = new godownModel(req.body);
    result = await result.save();
    console.log(result);
    res.send(result);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//======CONTROLLER TO GET GODOWN ===========//
//=========================================//
exports.getGodown = async (req, res) => {
  try {
    let result = await godownModel.find().populate('shopId');
    if (result?.length > 0) {
      res.send(result);
    } else {
      res.send("No Godown found");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//====CONTROLLER TO UPDATE GODOWN BY ID=====//
//=========================================//
exports.updateGodownById = async (req, res) => {
  try {
    let result = await godownModel.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    console.log(result);
    res.send({ "Godown Updated": result });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//====CONTROLLER TO DELETE GODOWN BY ID=====//
//=========================================//
exports.deleteGodownById = async (req, res) => {
  try {
    const godownId = req.params.id
    const godown= await godownModel.findById(godownId);
    if(!godown)
    {
     return res.status(404).json({ error: 'Godown not found' })
    }
    const hasReferences = await productLocationModel.exists({ productAvalibility: godownId });
     if (hasReferences) {
       return res.status(400).json({ error: 'Cannot delete the Record as it is referenced by other records' });
     }
     
     await godownModel.deleteOne();
     res.send({ message: 'Record deleted successfully' });
    // const result = await godownModel.deleteOne({ _id: req.params.id });
    // if (result) {
    //   res.send({ "Godown Deleted": result });
    // } else {
    //   res.send("Godown does not delete");
    // }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//====CONTROLLER TO GET GODOWN BY ID========//
//=========================================//
exports.getGodownById = async (req, res) => {
  try {
    let result = await godownModel.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send("No Godown Found By Id");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};
