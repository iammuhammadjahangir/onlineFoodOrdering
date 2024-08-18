const productColorModel = require("../models/ProductColorModel")


exports.postProductAndColor = async (req, res, next) =>{
    try{
    let result = new productColorModel(req.body)
    result = await result.save()
    res.send(result)
    }catch(error){
        console.log(error)
    }
}

//===========================================//
//======CONTROLLER TO GET PRODUCTAndColor===========//
//=========================================//
exports.getProductAndColor = async (req, res) => {
    try {
      let result = await productColorModel
        .find()
        .populate({
            path: 'productId',
            populate: [
              {
                path: 'productCompany',
                model: 'company',
              },
              {
                path: 'productTypeName',
                model: 'productType',
              },
            ],
          })
        .populate("colorId")
  
      if (result) {
        res.send(result);
      } else {
        res.send("No product found");
      }
    } catch (e) {
      res.status(500).json({
        message: "Something went wrong",
        e,
      });
    }
  };