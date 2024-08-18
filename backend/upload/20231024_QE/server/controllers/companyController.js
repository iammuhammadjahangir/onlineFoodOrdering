const companyModel = require("../models/companyModel");
const productModel = require("../models/productModel");
//===========================================//
//=====CONTROLLER TO POST COMPANY ===========//
//=========================================//
exports.postCompany = async (req, res) => {
  try {
    let result = new companyModel(req.body);
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
//=====CONTROLLER TO GET COMPANY ===========//
//=========================================//
exports.getCompany = async (req, res) => {
  try {
    let result = await companyModel.find();
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
//==CONTROLLER TO DELETE COMPANY BY ID======//
//=========================================//
exports.deleteCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await companyModel.findById(companyId);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    const hasReferences = await productModel.exists({
      productCompany: companyId,
    });
    if (hasReferences) {
      return res.status(400).json({
        error: "Cannot delete the company as it is referenced by other records",
      });
    }

    await company.deleteOne();
    res.send({ message: "Company deleted successfully" });
    // const result = await companyModel.deleteOne({ _id: req.params.id });
    // if (result) {
    //   res.send({ "Company Deleted": result });
    // } else {
    //   res.send("Company Does not delete");
    // }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//==CONTROLLER TO UPDATE COMPANY BY ID======//
//=========================================//
exports.updateCompanyById = async (req, res) => {
  try {
    const result = await companyModel.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    console.log(result);
    res.send({ "Company Updated": result });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//==CONTROLLER TO GET COMPANY BY ID======//
//=========================================//
exports.getCompanyById = async (req, res) => {
  try {
    const result = await companyModel.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send("No Company Found By Id");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//======CONTROLLER TO POST Company FROM EXCEL=====//
//=========================================//
exports.PostCompanyFromExcel = async (req, res, next) => {
  try {
    const { newJokes } = req.body;
    console.log(newJokes);
    await companyModel.insertMany(newJokes);
    res
      .status(200)
      .json({ success: true, message: "All Products Inserted Successfully" });
  } catch (error) {
    console.log("Product inserted error", error);
    res.status(500).json({ success: false, message: "internall Server Error" });
  }
};

//===========================================//
//======CONTROLLER TO Update Company FROM EXCEL=====//
//=========================================//
exports.updateCompanyFromExcel = async (req, res, next) => {
  try {
    const updatedJokes = req.body;
    const promises = updatedJokes?.updatedJokes?.map(async (item) => {
      const res = await companyModel.findByIdAndUpdate(item._id, {
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
