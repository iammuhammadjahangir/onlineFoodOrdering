const transferProductModel = require("../models/transferProductModel");
const transferIncrementInvoiceModel = require("../models/transferIncrementInvoiceModel");
const tempTransferModel = require("../models/tempTransferModel");
const productLoc = require("../models/productLocationModel");
//===========================================//
//==CONTROLLER TO POST TRANSFER PRODUCT ====//
//=========================================//
exports.postTransferProduct = async (req, res) => {
  transferIncrementInvoiceModel
    .findOneAndUpdate({ id: "autoval" }, { $inc: { seq: 1 } }, { new: true })
    .then((cd, err) => {
      console.log("counter value", cd);
      let seqId;
      if (cd == null) {
        const newval = new transferIncrementInvoiceModel({
          id: "autoval",
          seq: 10000,
        });
        newval.save();
        seqId = "T_" + 10000;
      } else {
        seqId = "T_" + cd.seq;
      }

      const newTranferProduct = new transferProductModel({
        id: seqId,
        tranferFrom: req.body.transferFrom,
        transferTo: req.body.transferTo,
        transferBy: req.body.transferBy,
        address: req.body.address,
        phoneNo: req.body.phoneNo,
        products: req.body.list,
      });
      newTranferProduct.save();

      res.status(201).json({
        message: "Transfer product created successfully",
        newTranferProduct,
      });
    })
    .catch((err) => {
      console.error("Error creating Transfer product:", err);
      res
        .status(500)
        .json({ err: "An error occurred while creating the Transfer product" });
    });
};

//===========================================//
//===CONTROLLER TO GET TRANSFER PRODUCT ====//
//=========================================//
exports.getTransferProduct = async (req, res) => {
  try {
    let result = await transferProductModel.find();
    if (result?.length > 0) {
      res.send(result);
    } else {
      res.send("No Transfer Product found");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//=====CONTROLLER TO GET Temp Transfer BY ID =======//
//=========================================//
exports.getTemporaryTransferDetails = async (req, res) => {
  try {
    let result = await tempTransferModel.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send("No Temporary Purchase Record Found By Id");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//=============================================//
//==CONTROLLER TO GET TRANSFER PRODUCT BY ID==//
//===========================================//
exports.getTransferProductById = async (req, res) => {
  try {
    let result = await transferProductModel.findOne({ id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send("No Transfer Product Found By Id");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//========================================================//
//==========CONTROLLER TO GET PRODUCT LOCATION On Shop Type===========//
//======================================================//
exports.getProductLocationOnGodownAndProductId = async (req, res) => {
  try {
    const { productId, colorId, godownAvalibilityId } = req.params;
    console.log(productId);
    console.log(godownAvalibilityId);
    //     const shopAvalibilityIdToMatch = 'yourShopAvalibilityId'; // Replace with the actual shopAvalibilityId you want to match
    // const productIdToMatch = 'yourProductId'; // Replace with the actual productId you want to match
    console.log(godownAvalibilityId);
    console.log(productId);
    const result = await productLoc.findOne({
      godownAvalibility: godownAvalibilityId,
      colorId: colorId,
      product: productId,
    });
    console.log(result);

    if (result) {
      res.send(result);
    } else {
      res.send("No Product Location found");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//========================================================//
//==========CONTROLLER TO POST Temporary Transfer==========//
//======================================================//
exports.createTempTransfer = async (req, res) => {
  try {
    const {
      id,
      transferFrom,
      transferTo,
      transferBy,
      address,
      phoneNo,
      products,
    } = req.body;
    const newTempTransfer = new tempTransferModel({
      id: id,
      transferFrom: transferFrom,
      transferTo: transferTo,
      transferBy: transferBy,
      address: address,
      phoneNo: phoneNo,
      products: products,
    });
    console.log(newTempTransfer);
    // Save the new TempTransfer to the database
    await newTempTransfer.save();

    res.status(201).json(newTempTransfer);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

//========================================================//
//==========CONTROLLER TO GET Temporary Transfer============//
//======================================================//
exports.getTemporaryTransfer = async (req, res) => {
  try {
    let result = await tempTransferModel.find();

    if (result) {
      res.send(result);
    } else {
      res.send("No Product temp transfer found");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//////==================================================================/////////////////
/////////=========delete Temp Transfer Pendings ========//////////////
/////////========================================================///////////
exports.deleteTempTransferPendings = async (req, res) => {
  try {
    const tempTransfer = await tempTransferModel.findOne({
      _id: req.params.id,
    });
    if (!tempTransfer) {
      return res.status(404).json({ error: "No Record found" });
    }
    await tempTransfer.deleteOne();
    res.send({ message: "tempTransfer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

//===========================================//
//====CONTROLLER TO DELETE Temporary Transfer BY ID =====//
//=========================================//
exports.deleteTemporaryTransferById = async (req, res) => {
  try {
    const transferId = req.params.id;
    const transfer = await tempTransferModel.findById(transferId);
    if (!transfer) {
      return res.status(404).json({ error: "Temp Transfer not found" });
    }
    await transfer.deleteOne();
    res.send({ message: "Temp Transfer deleted successfully" });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//====CONTROLLER TO update Temporary Transfer BY two ids ID =====//
//=========================================//
exports.updateTempRecord = async (req, res) => {
  try {
    const id = req.params.id; // Get the recordId from the URL
    console.log(id);
    const newProducts = req.body;
    console.log(newProducts);
    // Find the existing record by recordId
    const existingRecord = await tempTransferModel.findById(id);

    if (!existingRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    console.log(existingRecord);
    existingRecord.products = existingRecord.products.concat(newProducts);
    // const updatedProducts = [...existingRecord.products];
    // updatedProducts.push(...newProducts);
    // existingRecord.products = updatedProducts;

    await existingRecord.save();

    res.json({
      message: "ProductList updated successfully",
      updatedRecord: existingRecord,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

//===========================================//
//====CONTROLLER TO DELETE all Temporary Transfer  =====//
//=========================================//
exports.DeleteAllTempRecord = async (req, res) => {
  try {
    const result = await tempTransferModel.deleteMany({});

    console.log(result);
    if (!result) {
      return res.status(404).json({ message: "Record not found" });
    }

    // // Delete the record from the database
    // await result.delete();

    res.send({ message: "Temp Transfer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

//////==================================================================/////////////////
/////////=========Update Temp transfer Product Quantity========//////////////
/////////========================================================///////////
exports.updateTempTransferProductQuantityy = async (req, res) => {
  try {
    const { quantityidset, colorId, locationsetid } = req.params;
    const newQuantity = req.body.PurchaseQuantity;
    console.log(colorId);
    console.log(quantityidset);
    console.log(locationsetid);
    // Find the record by matching the quantityidset and locationsetid
    const existingRecord = await tempTransferModel.findOne({
      "products.quantityidset": quantityidset,
      "products.productColor": colorId,
      "products.locationsetid": locationsetid,
    });
    console.log(existingRecord);
    if (!existingRecord) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the quantity of the matching product
    existingRecord?.products?.forEach((product) => {
      if (
        product.quantityidset === quantityidset &&
        product.locationsetid === locationsetid &&
        product.productColor === colorId
      ) {
        product.PurchaseQuantity = newQuantity;
      }
    });

    // Save the updated record
    await existingRecord.save();

    res.json({
      message: "Product quantity updated successfully",
      updatedRecord: existingRecord,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

//////==================================================================/////////////////
/////////=========delete Temp transfer Product ========//////////////
/////////========================================================///////////
exports.deleteTempTransferProduct = async (req, res) => {
  try {
    // const { quantityidset, locationsetid } = req.params;
    const { id1, id2 } = req.params;

    const existingRecord = await tempTransferModel.findOne({
      "products.id": id1,
      "products.locationsetid": id2,
    });
    if (!existingRecord) {
      return res.status(404).json({ message: "Product not found" });
    }
    let productDelete = [];

    existingRecord?.products?.forEach(async (product) => {
      if (product.id === id1 && product.locationsetid === id2) {
        await product.deleteOne();
      }
    });
    console.log(productDelete);
    // Save the updated record
    console.log;
    if (existingRecord?.products?.length > 0) {
      await existingRecord.save();
    } else {
      await existingRecord.deleteOne();
    }

    res.json({
      message: "Product deleted successfully",
      updatedRecord: existingRecord,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

exports.getInvoiceRocordOnStorageCode = async (req, res) => {
  try {
    // let result = await transferProductModel.find()
    let result = await transferProductModel.find({
      tranferFrom: req.params.id,
    });

    res.json(result);
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
