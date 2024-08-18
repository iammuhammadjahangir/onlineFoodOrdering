const productModel = require("../models/productModel");
const companyModel = require("../models/companyModel");
const productLocationModel = require("../models/productLocationModel");
//===========================================//
//=====CONTROLLER TO POST PRODUCT===========//
//=========================================//
exports.postProduct = async (req, res) => {
  try {
    let result = new productModel(req.body);
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
//======CONTROLLER TO GET PRODUCT===========//
//=========================================//
exports.getProduct = async (req, res) => {
  try {
    let result = await productModel
      .find()
      .populate("productTypeName")
      // .populate("productColor")
      .populate("productCompany");

    if (result) {
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
//===CONTROLLER TO UPDATE PRODUCT BY ID=====//
//=========================================//
exports.updateProductById = async (req, res) => {
  try {
    let result = await productModel.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.send({ "updated :": result });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//===CONTROLLER TO DELETE PRODUCT BY ID=====//
//=========================================//
exports.DeleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const hasReferences = await productLocationModel.exists({
      product: productId,
    });
    if (hasReferences) {
      return res.status(400).json({
        error: "Cannot delete the Product as it is referenced by other records",
      });
    }

    await product.deleteOne();
    res.send({ message: "Product deleted successfully" });
    // let result = await productModel.deleteOne({ _id: req.params.id });
    // res.send(result);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//======CONTROLLER TO GET PRODUCT BY ID=====//
//=========================================//
exports.getProductById = async (req, res) => {
  try {
    let result = await productModel
      .findOne({ _id: req.params.id })
      .populate("productTypeName")
      // .populate("productColor")
      .populate("productCompany");

    if (result) {
      res.send(result);
    } else {
      res.send("No Product Found By Id");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//======CONTROLLER TO GET PRODUCT BY Barcode of each Product=====//
//=========================================//
exports.getProductByBarcode = async (req, res) => {
  const barcodeValue = req.params.id;
  console.log(barcodeValue);
  try {
    const product = await productModel.findOne({ barcodeValue });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
      // res.send("Product Not Found")
    }
    return res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Error fetching product" });
  }
};

//===========================================//
//======CONTROLLER TO GET PRODUCT BY Company Code=====//
//=========================================//
exports.getProductOnCompanyName = async (req, res) => {
  try {
    let company = req.params.id;
    const companyNam = await companyModel.findOne({ companyName: company });
    console.log(companyNam);
    const companyId = companyNam._id;
    console.log(companyId);
    const products = await productModel
      .find({ productCompany: companyId })
      .populate("productTypeName")
      // .populate("productColor")
      .populate("productCompany");
    // const product = await productModel.findOne({ barcodeValue });
    // if (!product) {
    //   return res.status(404).json({ message: 'Product not found' });
    //   // res.send("Product Not Found")
    // }
    return res.json(products);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Error fetching product" });
  }
};

//===========================================//
//======CONTROLLER TO POST PRODUCT FROM EXCEL=====//
//=========================================//
exports.PostProductsFromExcel = async (req, res, next) => {
  try {
    const { newJokes } = req.body;
    console.log(newJokes);
    await productModel.insertMany(newJokes);
    res
      .status(200)
      .json({ success: true, message: "All Products Inserted Successfully" });
    // await productModel.insertMany(newJokes, (error, docs) => {
    //   if (docs) {
    //     res.status(200).json({
    //       success: true,
    //       message: "All Products Inserted Successfully",
    //     });
    //   }
    // });
  } catch (error) {
    console.log("Product inserted error", error);
    res.status(500).json({ success: false, message: "internal Server Error" });
  }
};

//===========================================//
//======CONTROLLER TO Update PRODUCT FROM EXCEL=====//
//=========================================//
exports.updateProductsFromExcel = async (req, res, next) => {
  try {
    const updatedJokes = req.body;
    const promises = updatedJokes?.updatedJokes?.map(async (item) => {
      const res = await productModel.findByIdAndUpdate(item._id, {
        $set: { ...item },
      });
      return res;
    });

    Promise.all(promises)
      .then(() => {
        res.json({ success: true, message: "Products Update Successfully" });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: error, message: "Internal Server Error" });
  }
};
