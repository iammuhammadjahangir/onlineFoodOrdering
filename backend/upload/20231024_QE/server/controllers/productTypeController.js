const productTypeModel = require("../models/productTypeModel");
const productModel = require("../models/productModel");
//===========================================//
//====CONTROLLER TO POST PRODUCT TYPE=======//
//=========================================//
exports.postProductType = async (req, res) => {
  try {
    let result = new productTypeModel(req.body);
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
//====CONTROLLER TO GET PRODUCT TYPE========//
//=========================================//
exports.getProductType = async (req, res) => {
  try {
    let result = await productTypeModel.find();
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
//=CONTROLLER TO UPDATE PRODUCT TYPE BY ID==//
//=========================================//
exports.updateProductTypeById = async (req, res) => {
  try {
    let result = await productTypeModel.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    console.log(result);
    res.send({ "Product Type Updated": result });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//=CONTROLLER TO DELETE PRODUCT TYPE BY ID==//
//=========================================//
exports.deleteProductTypeById = async (req, res) => {
  try {
    const productTypeId = req.params.id;
    const producttype = await productTypeModel.findById(productTypeId);
    if (!producttype) {
      return res.status(404).json({ error: "Product Type not found" });
    }
    const hasReferences = await productModel.exists({
      productTypeName: productTypeId,
    });
    if (hasReferences) {
      return res.status(400).json({
        error:
          "Cannot delete the Product Type as it is referenced by other records",
      });
    }

    await producttype.deleteOne();
    res.send({ message: "Product Type deleted successfully" });
    // let result = await productTypeModel.deleteOne({ _id: req.params.id });
    // if (result) {
    //   res.send({ "Product Type Deleted": result });
    // } else {
    //   res.send("Product Type does not delete");
    // }
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
exports.getProductTypeById = async (req, res) => {
  try {
    let result = await productTypeModel.findOne({ _id: req.params.id });
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

//===========================================//
//======CONTROLLER TO POST Colors FROM EXCEL=====//
//=========================================//
exports.PostProductTypeFromExcel = async (req, res, next) => {
  try {
    const { newJokes } = req.body;
    console.log(newJokes);
    await productTypeModel.insertMany(newJokes);
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
exports.updateProductTypeFromExcel = async (req, res, next) => {
  try {
    const updatedJokes = req.body;
    const promises = updatedJokes?.updatedJokes?.map(async (item) => {
      const res = await productTypeModel.findByIdAndUpdate(item._id, {
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
