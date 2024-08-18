const saleProductModel = require("../models/saleProductModel");
const salesIncrementInvoiceModel = require("../models/salesIncrementInvoiceModel");
const productLoc = require("../models/productLocationModel");
const tempSaleModel = require("../models/tempSaleModel");

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed in JavaScript

//=============================================//
//======CONTROLLER TO POST SALES PRODUCT =====//
//===========================================//
exports.postSaleProduct = async (req, res) => {
  salesIncrementInvoiceModel
    .findOneAndUpdate({ id: "autoval" }, { $inc: { seq: 1 } }, { new: true })
    .then((cd, err) => {
      // console.log("counter value", cd);
      let seqId;
      if (cd == null) {
        const newval = new salesIncrementInvoiceModel({
          id: "autoval",
          seq: 10000,
        });
        newval.save();
        seqId = "S_" + 10000;
      } else {
        seqId = "S_" + cd.seq;
      }

      const newSalesProduct = new saleProductModel({
        id: seqId,
        invoiceNumber: req.body.InvoiceNumber,
        shopNo: req.body.shopNo,
        customerName: req.body.clientName,
        customerNumber: req.body.clientAddress,
        address: req.body.address,
        phoneNo: req.body.phoneNo,
        saleBy: req.body.saleBy,
        products: req.body.list,
        total: req.body.total,
      });
      newSalesProduct.save();

      res.status(201).json({
        message: "Sales product created successfully",
        newSalesProduct,
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
//======CONTROLLER TO GET SALES PRODUCT ======//
//===========================================//
exports.getSaleProduct = async (req, res) => {
  try {
    let result = await saleProductModel.find();
    if (result?.length > 0) {
      res.send(result);
    } else {
      res.send("No sales Product found");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//============================================================//
//======CONTROLLER TO GET SALES PRODUCT product Loc to get the old
//quantity of prodduct and use to update it======//
//========================================================//
exports.getSaleProductByIdproductLocc = async (req, res) => {
  try {
    const result = await productLoc
      .findOne({ product: req.params.id })
      .populate("product")
      .populate({
        path: "product",
        populate: [
          {
            path: "productColor",
            model: "color",
          },
          {
            path: "productCompany",
            model: "company",
          },
          {
            path: "productTypeName",
            model: "productType",
          },
        ],
      })
      .populate("productAvalibility");
    if (result) {
      // console.log(result);
      res.send(result);
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
exports.getProductLocationOnShopAndProductId = async (req, res) => {
  try {
    const { productId, colorId, shopAvalibilityId } = req.params;
    console.log(productId);
    console.log(colorId);
    console.log(shopAvalibilityId);
    //     const shopAvalibilityIdToMatch = 'yourShopAvalibilityId'; // Replace with the actual shopAvalibilityId you want to match
    // const productIdToMatch = 'yourProductId'; // Replace with the actual productId you want to match

    const result = await productLoc.findOne({
      shopAvalibility: shopAvalibilityId,
      colorId: colorId,
      product: productId,
    });

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

//=============================================//
//====CONTROLLER TO GET SALES PRODUCT BY ID===//
//===========================================//
exports.getSaleProductById = async (req, res) => {
  try {
    const result = await saleProductModel.findOne({ id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send("No  Sales Product Found");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//=============================================//
//==CONTROLLER TO UPDATE SALES PRODUCT BY ID==//
//===========================================//
exports.updateSaleProductById = async (req, res) => {
  try {
    let result = await saleProductModel.updateOne(
      { id: req.params.id },
      {
        $set: req.body,
      }
    );
    // console.log(result);
    res.send({ "Sales Product Updated": result });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//=============================================//
//==CONTROLLER TO UPDATE SALES PRODUCT BY ID==//
//===========================================//
exports.updateSaleProductByIdproductLoc = async (req, res) => {
  try {
    const result = await productLoc.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.send({ "Sales Product Updated": result });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//=============================================//
//==CONTROLLER TO UPDATE SALES PRODUCT BY ID
//(update the product quantity after we delete it from the list...
//purchase and old quantity will sum up and we update new quantity by using this api)==//
//===========================================//
exports.updateSaleProductByIdproductLocc = async (req, res) => {
  try {
    const result = await productLoc.updateOne(
      { product: req.params.id },
      {
        $set: req.body,
      }
    );
    // console.log(result);
    res.send({ "Sales Product Updated": result });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//=============================================//
//==CONTROLLER TO DELETE SALES PRODUCT BY ID==//
//===========================================//
exports.deleteSaleProductById = async (req, res) => {
  try {
    let result = await saleProductModel.deleteOne({ _id: req.params.id });
    if (result) {
      res.send({ "Sales Product Deleted": result });
    } else {
      res.send("Sales Product does not delete");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//========================================================//
//==========CONTROLLER TO POST Temporary sales==========//
//======================================================//
exports.createTempSales = async (req, res) => {
  try {
    const {
      shopNo,
      customerName,
      customerNumber,
      address,
      phoneNo,
      shopId,
      products,
    } = req.body;
    const newTempTransfer = new tempSaleModel({
      shopNo: shopNo,
      customerName: customerName,
      customerNumber: customerNumber,
      address: address,
      phoneNo: phoneNo,
      shopId: shopId,
      products: products,
    });
    // console.log(newTempTransfer);
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

//===========================================//
//=====CONTROLLER TO GET TempPurchase BY ID =======//
//=========================================//
exports.getTemporarySaleDetails = async (req, res) => {
  try {
    let result = await tempSaleModel.findOne({ _id: req.params.id });
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
exports.getTemporarySaleRecord = async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.params);
    let result = await tempSaleModel.find({ shopNo: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send("No Temporary Sale Record Found By Id");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//========================================================//
//==========CONTROLLER TO GET Temporary Transfer============//
//======================================================//
exports.getTemporarySale = async (req, res) => {
  try {
    let result = await tempSaleModel.find();

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
    // console.log(id);
    const newProducts = req.body;
    // console.log(newProducts);
    // Find the existing record by recordId
    const existingRecord = await tempSaleModel.findById(id);

    if (!existingRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    // console.log(existingRecord);
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

//////==================================================================/////////////////
/////////=========delete Temp Sale Pendings ========//////////////
/////////========================================================///////////
exports.deleteTempSalePendings = async (req, res) => {
  try {
    const tempSale = await tempSaleModel.findOne({ _id: req.params.id });
    if (!tempSale) {
      return res.status(404).json({ error: "No Record found" });
    }
    await tempSale.deleteOne();
    res.send({ message: "tempSale deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

//////==================================================================/////////////////
/////////=========Update Temp Sale Product Quantity========//////////////
/////////========================================================///////////
exports.updateTempSaleProductQuantityy = async (req, res) => {
  try {
    const { quantityidset, locationsetid } = req.params;
    const newRecord = req.body;
    // console.log(newRecord);
    // console.log(newRecord.PurchaseQuantity);
    //Find the record by matching the quantityidset and locationsetid
    const existingRecord = await tempSaleModel.findOne({
      "products.quantityidset": quantityidset,
      "products.locationsetid": locationsetid,
    });

    if (!existingRecord) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the quantity of the matching product
    existingRecord.products.forEach((product) => {
      if (
        product.quantityidset === quantityidset &&
        product.locationsetid === locationsetid
      ) {
        // console.log(product.PurchaseQuantity);
        product.PurchaseQuantity = newRecord.PurchaseQuantity;
        product.amount = newRecord.amount;
        product.Discount = newRecord.Discount;
        product.excludeTaxPrice = newRecord.excludeTaxPrice;
        product.totalAmounnt = newRecord.totalAmounnt;
        product.taxAmount = newRecord.taxAmount;
        product.shopIdForData = newRecord.shopIdForData;
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
exports.deleteTempSaleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const existingRecord = await tempSaleModel.findOne({
      "products.id": id,
    });
    if (!existingRecord) {
      return res.status(404).json({ message: "Product not found" });
    }
    let productDelete = [];

    existingRecord.products.forEach(async (product) => {
      if (product.id === id) {
        await product.deleteOne();
      }
    });
    // console.log(productDelete);
    // Save the updated record
    // console.log;
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

//===========================================//
//====CONTROLLER TO DELETE all Temporary sale  =====//
//=========================================//
exports.DeleteAllTempRecord = async (req, res) => {
  try {
    const saleId = req.params.id;
    const sale = await tempSaleModel.findById(saleId);
    // console.log(sale);
    if (!sale) {
      return res.status(404).json({ error: "Temp Sale not found" });
    }
    const result = await sale.deleteOne();
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

//===========================================//
//====CONTROLLER TO Get top products  =====//
//=========================================//
exports.getTopProducts = async (req, res) => {
  try {
    saleProductModel
      .aggregate([
        { $unwind: "$products" }, // Unwind the products array
        {
          $group: {
            _id: "$products.Code", // Group by product name
            productName: { $first: "$products.Namee" },

            totalSales: { $sum: "$products.PurchaseQuantity" }, // Sum the sales quantities
            totalAmount: { $sum: { $toDouble: "$products.totalAmounnt" } },
          },
        },
        { $sort: { totalSales: -1 } }, // Sort in descending order
        { $limit: 4 }, // Limit the results to the top 4 products
      ])
      .then((result) => {
        res.status(200).json(result);
        // console.log(result);
        // The result will be an array of objects with _id (product ID) and totalSales (total sales quantity)
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
exports.getTopProductswithShop = async (req, res) => {
  try {
    const shopNo = req.params.shop;
    saleProductModel
      .aggregate([
        { $match: { shopNo: shopNo } }, // Match records with the specified shopNo
        { $unwind: "$products" }, // Unwind the products array
        {
          $group: {
            _id: "$products.Code", // Group by product name
            productName: { $first: "$products.Namee" },

            totalSales: { $sum: "$products.PurchaseQuantity" }, // Sum the sales quantities
            totalAmount: { $sum: { $toDouble: "$products.totalAmounnt" } },
          },
        },
        { $sort: { totalSales: -1 } }, // Sort in descending order
        { $limit: 4 }, // Limit the results to the top 4 products
      ])
      .then((result) => {
        res.status(200).json(result);
        // console.log(result);
        // The result will be an array of objects with _id (product ID) and totalSales (total sales quantity)
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

//=========================================================//
//====CONTROLLER TO Get Total sale for current month =====//
//=======================================================//
exports.getTotalSaleCurrentMonth = async (req, res) => {
  try {
    saleProductModel
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
            totalSaleValue: { $sum: "$total" }, // Sum the total field for each document
            totalProducts: { $sum: { $size: "$products" } }, // Count the products array for each document
            totalQuantity: { $sum: { $sum: "$products.PurchaseQuantity" } }, // Sum the PurchaseQuantity field for each product
          },
        },
      ])
      .then((result) => {
        if (result?.length > 0) {
          const { totalSaleValue, totalProducts, totalQuantity } = result[0];
          res
            .status(200)
            .json({ totalSaleValue, totalProducts, totalQuantity });
        } else {
          res.status(200).json("No data found for the current month.");
        }
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
//=========================================================//
//====CONTROLLER TO Get Total sale for current month =====//
//=======================================================//
exports.getTotalSaleCurrentMonthwithShop = async (req, res) => {
  try {
    const shopNodata = req.params.shop;
    saleProductModel
      .aggregate([
        {
          $match: {
            shopNo: shopNodata,
            createdAt: {
              $gte: new Date(currentDate.getFullYear(), currentMonth - 1, 1), // Start of the current month
              $lt: new Date(currentDate.getFullYear(), currentMonth, 1), // Start of the next month
            },
          },
        },
        {
          $group: {
            _id: null,
            totalSaleValue: { $sum: "$total" }, // Sum the total field for each document
            totalProducts: { $sum: { $size: "$products" } }, // Count the products array for each document
            totalQuantity: { $sum: { $sum: "$products.PurchaseQuantity" } }, // Sum the PurchaseQuantity field for each product
          },
        },
      ])
      .then((result) => {
        if (result?.length > 0) {
          const { totalSaleValue, totalProducts, totalQuantity } = result[0];
          res
            .status(200)
            .json({ totalSaleValue, totalProducts, totalQuantity });
        } else {
          res.status(200).json("No data found for the current month.");
        }
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
