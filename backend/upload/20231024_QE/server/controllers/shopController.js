const shopModel = require('../models/shopModel')
const productLocationModel = require('../models/productLocationModel')
const userModel = require('../models/userModel')
//===========================================//
//======CONTROLLER TO POST Shop==========//
//=========================================//
exports.postShop = async (req, res) => {
    try {
      let result = new shopModel(req.body);
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
//======CONTROLLER TO GET Shop ===========//
//=========================================//
exports.getShop = async (req, res) => {
    try {
      let result = await shopModel.find();
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
//====CONTROLLER TO GET Shop BY ID========//
//=========================================//
exports.getShopById = async (req, res) => {
  try {
    let result = await shopModel.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send("No Shop Found By Id");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};





  //===========================================//
//====CONTROLLER TO UPDATE shop BY ID=====//
//=========================================//
exports.updateShopById = async (req, res) => {
    try {
        console.log('called')
      let result = await shopModel.updateOne(
        { _id: req.params.id },
        {
          $set: req.body,
        }
      );
      console.log(result);
      res.send({ "shop Updated": result });
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
exports.deleteShopById = async (req, res) => {
    try {
      const shopId = req.params.id
      const shop= await shopModel.findById(shopId);
      if(!shop)
      {
       return res.status(404).json({ error: 'Godown not found' })
      }
      const hasReferences = await productLocationModel.exists({ productAvalibility: shopId });
      const hasReferenc = await userModel.exists({ shopNo: shopId });
      
       if (hasReferences || hasReferenc) {
         return res.status(400).json({ error: 'Cannot delete the Record as it is referenced by other records' });
       }
       
       await shopModel.deleteOne();
       res.send({ message: 'Record deleted successfully' });
    } catch (e) {
      res.status(500).json({
        message: "Something went wrong",
        e,
      });
    }
  };