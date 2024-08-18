const mongoose = require("mongoose");
const customerDataModel = require("../models/customerFormModel");
const customerIncrementModel = require("../models/customerIncrementModel");

//================================================//
//======Controller to post customer data ========//
//==============================================//
exports.postCustomer = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      cellNumber,
      cnic,
      address,
      city,
      status,
    } = req.body;

    //to call function which gets the customer sequenc id
    await customerIncrementValue().then((customerId) => {
      const customerData = new customerDataModel({
        customerId,
        firstName,
        lastName,
        phoneNumber,
        cellNumber,
        cnic,
        address,
        city,
        status,
      });
      customerData.save().then((result) => {
        res.status(200).send(result);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

//================================================//
//======Controller to get customer data ========//
//==============================================//
exports.getCustomer = async (req, res, next) => {
  try {
    let statusreq;

    if (req.params.status === "true") {
      statusreq = true;
    }
    if (req.params.status === "false") {
      statusreq = false;
    }
    const getCustmer = await customerDataModel.find({
      deletedStatus: statusreq,
    });

    getCustmer.length <= 0
      ? res.status(200).send(getCustmer)
      : res.status(200).send(getCustmer);
  } catch (error) {
    console.log(error);
  }
};
//================================================//
//======Controller to get customer data Names Only ========//
//==============================================//
exports.getCustomerNames = async (req, res, next) => {
  try {
    let statusreq;

    if (req.params.status === "true") {
      statusreq = true;
    }
    if (req.params.status === "false") {
      statusreq = false;
    }
    const getCustmer = await customerDataModel.find({
      deletedStatus: statusreq,
    });

    const customerNames = getCustmer.map((customer) => {
      return `${customer.firstName} ${customer.lastName}`;
    });

    res.status(200).send(customerNames);
  } catch (error) {
    console.log(error);
  }
};

//================================================//
//====Controller to delete customer data ========//
//==============================================//
exports.deleteCustomer = async (req, res, next) => {
  try {
    console.log(req.params.id);
    console.log(req.params.status);

    const deletevalue = Boolean(req.params.status);
    console.log(deletevalue);
    const updatedCustomer = await customerDataModel.findOneAndUpdate(
      { _id: req.params.id },
      { deletedStatus: req.params.status },
      { new: true }
    );

    console.log(updatedCustomer);
    updatedCustomer.deletedStatus === true
      ? res.status(200).send({ message: "Deleted " })
      : res.status(200).send({ message: "Record not Found " });
  } catch (error) {
    res.send(error);
  }
};

//================================================//
//======Controller to update customer data ======//
//==============================================//
exports.updateCustomer = (req, res) => {
  try {
    res.status(200).send({ message: "Working fine update" });
  } catch (error) {
    res.status(404).send(error);
  }
};

//================================================//
//===Controller to get bu id customer data ======//
//==============================================//

exports.getCustomerById = (req, res, next) => {
  try {
    res.status(200).send({ message: "working fine by get id" });
  } catch (error) {
    res.status(404).send(error);
  }
};

//================================================//
//function to get increment value for customer id//
//==============================================//
const customerIncrementValue = async () => {
  const seq = await customerIncrementModel
    .findOneAndUpdate(
      { autoVal: "autoval" },
      { $inc: { seq: 1 } },
      { new: true }
    )
    .then((value, error) => {
      //calls only when increment has no value and first data has to be enter
      if (!value) {
        const seq = new customerIncrementModel({
          autoVal: "autoval",
          seq: 1,
        });
        seq.save();
        return 1;
      }

      console.log(value.seq);
      // return this when there is already data added
      return value.seq;
    });

  return seq;
};
