const colorModel = require("../models/colorModel");
const productModel = require("../models/productModel");

//===========================================//
//======CONTROLLER TO GET COLOR ============//
//=========================================//
exports.getColor = async (req, res) => {
  try {
    let result = await colorModel.find();
    if (result?.length > 0) {
      res.send(result);
    } else {
      res.send("No Record Found");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//======CONTROLLER TO POST COLOR ===========//
//=========================================//
exports.postColor = async (req, res) => {
  try {
    let result = new colorModel(req.body);
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
//====CONTROLLER TO DELETE COLOR BY ID =====//
//=========================================//
exports.deleteColorById = async (req, res) => {
  try {
    const colorId = req.params.id;
    const color = await colorModel.findById(colorId);
    if (!color) {
      return res.status(404).json({ error: "Color not found" });
    }
    const hasReferences = await productModel.exists({ productColor: colorId });
    if (hasReferences) {
      return res.status(400).json({
        error: "Cannot delete the color as it is referenced by other records",
      });
    }

    await color.deleteOne();
    res.send({ message: "Color deleted successfully" });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//====CONTROLLER TO UPDATE COLOR BY ID =====//
//=========================================//
exports.updateColorById = async (req, res) => {
  try {
    let result = await colorModel.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.send({ "Record Updated": result });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//=====CONTROLLER TO GET COLOR BY ID =======//
//=========================================//
exports.getColorById = async (req, res) => {
  try {
    let result = await colorModel.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send("No color Found By Id");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//======CONTROLLER TO POST Colors FROM EXCEL=====//
//=========================================//
exports.PostColorsFromExcel = async (req, res, next) => {
  try {
    const { newJokes } = req.body;
    console.log(newJokes);
    await colorModel.insertMany(newJokes);
    res
      .status(200)
      .json({ success: true, message: "All Products Inserted Successfully" });
  } catch (error) {
    console.log("Product inserted error", error);
    res.status(500).json({ success: false, message: "internal Server Error" });
  }
};

//===========================================//
//======CONTROLLER TO Update Colors FROM EXCEL=====//
//=========================================//
exports.updateColorsFromExcel = async (req, res, next) => {
  try {
    const updatedJokes = req.body;
    const promises = updatedJokes?.updatedJokes?.map(async (item) => {
      const res = await colorModel.findByIdAndUpdate(item._id, {
        $set: { ...item },
      });
      return res;
    });

    Promise.all(promises)
      .then(() => {
        res.json({ success: true, message: "Colors Update Successfully" });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: error, message: "Internal Server Error" });
  }
};
