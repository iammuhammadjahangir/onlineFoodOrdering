const purchaseProductModel = require("../models/purchaseProductModel");
const purchaseIncrementInvoiceModel = require("../models/purchaseIncrementInvoiceModel");
const tempPurhcaseModel = require("../models/tempPurhcaseModel");

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed in JavaScript
//=============================================//
//=====CONTROLLER TO POST TRANSFER PRODUCT ===//
//===========================================//
exports.postPurchaseProduct = async (req, res) => {
  purchaseIncrementInvoiceModel
    .findOneAndUpdate({ id: "autoval" }, { $inc: { seq: 1 } }, { new: true })
    .then((cd, err) => {
      console.log("counter value", cd);
      let seqId;
      if (cd == null) {
        const newval = new purchaseIncrementInvoiceModel({
          id: "autoval",
          seq: 10000,
        });
        newval.save();
        seqId = "P_" + 10000;
      } else {
        seqId = "P_" + cd.seq;
      }

      const newPurchaseProduct = new purchaseProductModel({
        id: seqId,
        address: req.body.address,
        phoneNo: req.body.phoneNo,
        clientName: req.body.clientName,
        purchaseReceiptNumber: req.body.purchaseReceiptNumber,
        purchaseCompany: req.body.purchaseCompany,
        purchaseDate: req.body.purchaseDate,
        shopNo: req.body.shopNo,
        storeIn: req.body.storeIn,
        purchasedBy: req.body.purchasedBy,
        products: req.body.listpurchase,
        total: req.body.total,
      });
      newPurchaseProduct.save();

      res.status(201).json({
        message: "Purchase Product created successfully",
        newPurchaseProduct,
      });
    })
    .catch((err) => {
      console.error("Error creating sales product:", err);
      res
        .status(500)
        .json({ err: "An error occurred while creating the sales product" });
    });
};

//=============================================//
//=====CONTROLLER TO GET TRANSFER PRODUCT ====//
//===========================================//
exports.getPurchaseProduct = async (req, res) => {
  try {
    let result = await purchaseProductModel.find();
    if (result?.length > 0) {
      res.send(result);
    } else {
      res.send("No Purchase Product found");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//=====CONTROLLER TO GET TempPurchase BY ID =======//
//=========================================//
exports.getTemporaryPurchaseDetails = async (req, res) => {
  try {
    let result = await tempPurhcaseModel.findOne({ _id: req.params.id });
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

//===========================================//
//=====CONTROLLER TO GET TempPurchase BY ID =======//
//=========================================//
exports.getTemporaryPurchaseRecord = async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.params);
    let result = await tempPurhcaseModel.find({ shopNo: req.params.id });
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

//=================================================//
//=====CONTROLLER TO GET TRANSFER PRODUCT BY ID===//
//===============================================//
exports.getPurchaseProductById = async (req, res) => {
  try {
    let result = await purchaseProductModel.findOne({ id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send("No Purchase Product Found");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//====================================================//
//=====CONTROLLER TO UPDATE TRANSFER PRODUCT BY ID===//
//==================================================//
exports.updatePurchaseProductById = async (req, res) => {
  try {
    let result = await purchaseProductModel.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    console.log(result);
    res.send({ "Purchase Product Updated": result });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//====================================================//
//=====CONTROLLER TO DELETE TRANSFER PRODUCT BY ID===//
//==================================================//
exports.deletePurchaseProductById = async (req, res) => {
  try {
    let result = await purchaseProductModel.deleteOne({ _id: req.params.id });
    if (result) {
      res.send({ "Purchase Product Deleted": result });
    } else {
      res.send("Purchase Product does not delete");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//========================================================//
//==========CONTROLLER TO POST Temporary Purchase==========//
//======================================================//
exports.createTempPurchase = async (req, res) => {
  try {
    const {
      // id,
      clientName,
      purchaseReceiptNumber,
      purchaseCompany,
      purchaseDate,
      address,
      phoneNo,
      shopNo,
      storeIn,
      shopId,
      godownId,
      purchasedBy,
      products,
    } = req.body;
    console.log(products);
    const newTempTransfer = new tempPurhcaseModel({
      // id: id,
      clientName: clientName,
      purchaseReceiptNumber: purchaseReceiptNumber,
      purchaseCompany: purchaseCompany,
      purchaseDate: purchaseDate,
      shopNo: shopNo,
      address: address,
      phoneNo: phoneNo,
      storeIn: storeIn,
      shopId: shopId,
      godownId: godownId,
      purchasedBy: purchasedBy,
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
//==========CONTROLLER TO GET Temporary Purchase============//
//======================================================//
exports.getTemporaryPurchase = async (req, res) => {
  try {
    let result = await tempPurhcaseModel.find();

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
    const existingRecord = await tempPurhcaseModel.findById(id);

    if (!existingRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    console.log(existingRecord);
    existingRecord.products = existingRecord.products.concat(newProducts);

    await existingRecord.save();

    res.json({
      message: "ProductList updated successfully",
      updatedRecord: existingRecord,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

//////==================================================================/////////////////
/////////=========delete Temp Purchase Pendings ========//////////////
/////////========================================================///////////
exports.deleteTempPurchasePendings = async (req, res) => {
  try {
    const tempPurchase = await tempPurhcaseModel.findOne({
      _id: req.params.id,
    });
    if (!tempPurchase) {
      return res.status(404).json({ error: "No Record found" });
    }
    await tempPurchase.deleteOne();
    res.send({ message: "tempPurchase deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

//===========================================//
//====CONTROLLER TO DELETE all Temporary Transfer  =====//
//=========================================//
exports.DeleteAllTempPurchaseRecord = async (req, res) => {
  try {
    const purchaseId = req.params.id;
    const purchaseRecord = await tempPurhcaseModel.findById(purchaseId);
    if (!purchaseRecord) {
      return res.status(404).json({ error: "Temp Purchase not found" });
    }
    const result = await purchaseRecord.deleteOne();

    console.log(result);
    if (!result) {
      return res.status(404).json({ message: "Record not found" });
    }

    // // Delete the record from the database
    // await result.delete();

    res.send({ message: "Temp Purchase deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

//////==================================================================/////////////////
/////////=========delete Temp Purchase Product ========//////////////
/////////========================================================///////////
exports.deleteTempPurchaseProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingRecord = await tempPurhcaseModel.findOne({
      "products.id": id,
    });
    if (!existingRecord) {
      return res.status(404).json({ message: "Product not found" });
    }
    let productDelete = [];

    existingRecord?.products?.forEach(async (product) => {
      if (product.id === id) {
        await product.deleteOne();
      }
    });
    console.log(productDelete);
    // Save the updated record
    console.log;
    if (existingRecord.products?.length > 0) {
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

//=========================================================//
//====CONTROLLER TO Get Total sale for current month =====//
//=======================================================//
exports.getTotalPurchaseCurrentMonth = async (req, res) => {
  try {
    purchaseProductModel
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
            totalPurchaseValue: { $sum: "$total" }, // Sum the total field for each document
            totalQuantity: { $sum: { $sum: "$products.PurchaseQuantity" } }, // Sum the PurchaseQuantity field for each product
          },
        },
      ])
      .then((result) => {
        if (result?.length > 0) {
          const { totalPurchaseValue, totalQuantity } = result[0];
          res.status(200).json({ totalPurchaseValue, totalQuantity });
        } else {
          res.status(200).json("No data found for the current month.");
        }
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
exports.getTotalPurchaseCurrentMonthWithUser = async (req, res) => {
  try {
    const shop = req.params.shop;

    purchaseProductModel
      .aggregate([
        {
          $match: {
            shopNo: shop,
            createdAt: {
              $gte: new Date(currentDate.getFullYear(), currentMonth - 1, 1), // Start of the current month
              $lt: new Date(currentDate.getFullYear(), currentMonth, 1), // Start of the next month
            },
          },
        },
        {
          $group: {
            _id: null,
            totalPurchaseValue: { $sum: "$total" }, // Sum the total field for each document
            totalQuantity: { $sum: { $sum: "$products.PurchaseQuantity" } }, // Sum the PurchaseQuantity field for each product
          },
        },
      ])
      .then((result) => {
        if (result?.length > 0) {
          const { totalPurchaseValue, totalQuantity } = result[0];
          res.status(200).json({ totalPurchaseValue, totalQuantity });
        } else {
          res.status(200).json("No data found for the current month.");
        }
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
