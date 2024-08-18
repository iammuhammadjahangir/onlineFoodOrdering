const productLocationModel = require("../models/productLocationModel");
const godownModel = require("../models/godownModel");
//========================================================//
//==========CONTROLLER TO POST PRODUCT LOCATION==========//
//======================================================//
exports.postProductLocation = async (req, res) => {
  try {
    console.log(req.body)
    const { product, colorId, shopAvalibility,godownAvalibility,  productQuantity } = req.body;

    const newProductLocation = new productLocationModel({
      product,
      colorId,
      shopAvalibility, // You can set it to null
      godownAvalibility,
      productQuantity
    })
    const savedProductLocation = await newProductLocation.save();

    res.status(201).json(savedProductLocation);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};


//========================================================//
//==========CONTROLLER TO GET PRODUCT LOCATION===========//
//======================================================//
exports.getProductLocation = async (req, res) => {
  try {


    const result = await productLocationModel.find({
      $or: [
        { godownAvalibility: null },
        { godownAvalibility: { $exists: true } },
      ],
      $or: [
        { shopAvalibility: null },
        { shopAvalibility: { $exists: true } },
      ],
    })
    .populate('godownAvalibility')
    .populate('shopAvalibility')
    .populate('colorId')
    .populate({
      path: 'product',
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

//========================================================//
//==========CONTROLLER TO GET PRODUCT LOCATION On Shop Type===========//
//======================================================//
exports.getProductLocationOnShopType = async (req, res) => {
  try {

    const result = await productLocationModel.find({
      $or: [
        { godownAvalibility: null },
        { godownAvalibility: { $exists: true } },
      ],
      $and: [
        { shopAvalibility: { $ne: null } },
        { shopAvalibility: { $exists: true } },
      ], // Only select records where shopAvalibility is not null
    })
      .populate('godownAvalibility')
      .populate('colorId')
      .populate({
        path: 'shopAvalibility',
        match: { shopType: 'shop' }, // Replace 'yourDesiredShopType' with the actual shop type you want to filter by
      })
      .populate({
        path: 'product',
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


//========================================================//
//==========CONTROLLER TO GET PRODUCT LOCATION ON GODOWN TYPE===========//
//======================================================//
exports.getProductLocationOnGodownType = async (req, res) => {
  try {

    const result = await productLocationModel.find({
      $and: [
        { godownAvalibility:{ $ne: null } },
        { godownAvalibility: { $exists: true } },
      ],
      $or: [
        { shopAvalibility: null  },
        { shopAvalibility: { $exists: true } },
      ], // Only select records where shopAvalibility is not null
    })
      // .populate('godownAvalibility')
      .populate({
        path: 'godownAvalibility',
        match: { storageType: 'store' }, // Replace 'yourDesiredShopType' with the actual shop type you want to filter by
      })
      .populate('colorId')
      .populate({
        path: 'product',
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




//========================================================//
//======CONTROLLER TO GET PRODUCT LOCATION  ON FOR SHOP======//
//======================================================//
exports.getProductLocationForShop = async (req, res) => {
  try {
    console.log(req.params.id)
    const shopId = req.params.id;
    const result = await productLocationModel.find({
      $or: [
        { shopAvalibility: null },
        { shopAvalibility: { $exists: true } },
      ],
      'shopAvalibility': shopId,
    })
    .populate('godownAvalibility')
    .populate('shopAvalibility')
    .populate('colorId')
    .populate({
      path: 'product',
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

//========================================================//
//======CONTROLLER TO GET PRODUCT LOCATION  ON FOR SHOP======//
//======================================================//
exports.getProductLocationForGodown = async (req, res) => {
  try {
    console.log(req.params.id)
    const godownId = req.params.id;
    const result = await productLocationModel.find({
      $or: [
        { godownAvalibility: null },
        { godownAvalibility: { $exists: true } },
      ],
      'godownAvalibility': godownId,
    })
    .populate('godownAvalibility')
    .populate('shopAvalibility')
    .populate('colorId')
    .populate({
      path: 'product',
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
//========================================================//
//======CONTROLLER TO UPDATE PRODUCT LOCATION BY ID======//
//======================================================//
exports.updateProductLocationById = async (req, res) => {
  try {
    const result = await productLocationModel.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.send({ "updated Product Location:": result });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//===========================================//
//====CONTROLLER TO DELETE Location BY ID =====//
//=========================================//
exports.deleteLocationById = async (req, res) => {
  try {
    const locationId = req.params.id
    const location= await productLocationModel.findById(locationId);
    if(!location)
    {
     return res.status(404).json({ error: 'location not found' })
    }
     await location.deleteOne();
     res.send({ message: 'Location Quantity deleted successfully' });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//========================================================//
//==CONTROLLER TO UPDATE PRODUCT LOCATION BY PRODUCT ID==//
//======================================================//
exports.updateProductLocationByProduct = async (req, res) => {
  try {
    const result = await productLocationModel.updateOne(
      { product: req.params.id },
      {
        $set: req.body,
      }
    );
    res.send({ "updated Product Location:": result });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//=====================================================//
//======CONTROLLER TO GET PRODUCT LOCATION BY  ID=====//
//===================================================//
exports.getProductLocationById = async (req, res) => {
  try {

    const result = await productLocationModel.findOne({
      $or: [
        { shopAvalibility: null },
        { shopAvalibility: { $exists: true } },
      ],
      _id: req.params.id
    })
    .populate('godownAvalibility')
    .populate('shopAvalibility')
    .populate('colorId')
    .populate({
      path: 'product',
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
    });














    // let result = await productLocationModel
    //   .findOne({ _id: req.params.id })
    //   .populate("product")
    //   .populate({
    //     path: "product",
    //     populate: [
    //       {
    //         path: "productColor",
    //         model: "color",
    //       },
    //       {
    //         path: "productCompany",
    //         model: "company",
    //       },
    //       {
    //         path: "productTypeName",
    //         model: "productType",
    //       },
    //     ],
    //   })
     
    if (result) {
      res.send(result);
    } else {
      res.send("No Product Location Found By Id");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//=====================================================//
//==CONTROLLER TO GET PRODUCT LOCATION BY PRODUCT ID==//
//===================================================//
exports.getProductLocationByProduct = async (req, res) => {
  try {
    let result = await productLocationModel
      .findOne({ product: req.params.id })
      .populate("product")
      .populate('colorId')
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
      res.send(result);
    } else {
      res.send("No Product Location Found By Id");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//=====================================================//
//==CONTROLLER TO GET PRODUCT LOCATION BY PRODUCT ID & LOCATION ID==//
//===================================================//
exports.getProductLocationByProductAndLocation = async (req, res) => {
  try {
    const id1 = req.params.id1;
    const id2 = req.params.id2;
    // res.send(id1);
    let result = await productLocationModel
      .findOne({ $and: [{ product: id1 }, { productAvalibility: id2 }] })
      .populate("product")
      .populate('colorId')
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
      res.send(result);
    } else {
      res.send("No Product Location Found By Id");
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

//=========================================================//
//==CONTROLLER TO UPDATE PRODUCT Location Quantity BY ID==//
//=======================================================//
exports.updateProductLocationQuantityById = async (req, res) => {
  try {
    const result = await productLocationModel.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.send({ "updated Product Location:": result });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

///===========================================================================================================///
///=====CONTROLLER TO UPDATE THE MULTITYPLE QUANTITIES ON THE BASIS OF PRODUCT AND PRODUCT LOCATION ID===///
///===========================================================================================================////
// Backend API to update product quantities for multiple products
//app.put('/api/products/updateQuantities',
exports.updateMultipleQuantities= async (req, res) => {
  try {
    const updatedProducts = req.body; // Assuming req.body is an array of objects with product and product location IDs and updated quantities

    // Loop through each updated product and update the quantity in the database
    for (const updatedProduct of updatedProducts) {
      const productId = updatedProduct.productId;
      const productAvailibilityId = updatedProduct.productAvailibilityId;
      const updatedQuantity = updatedProduct.productQuantity;

      // Perform the database update based on productId, productLocationId, and updatedQuantity
      // Your actual code for database update goes here
      console.log()
      await productLocationModel.updateOne(
        { productAvalibility: productAvailibilityId, product: productId },
        { $set: { productQuantity: updatedQuantity } }
      );
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      error,
    });
  }
};

///////////======================================================================///////////////
////////********** update Quantity on the basis of temp transfer Table *************/////////////
//////////=======================================================================///////////////
exports.updateTempTransferProductQuantityy = async (req, res) => {
  try {
    const { quantityidset, locationsetid } = req.params;
    const  newQuantity  = req.body.productQuantity;
   
    // Find the record by matching the quantityidset and locationsetid
    const existingRecord = await productLocationModel.findOne({
      'product': quantityidset,
      'productAvalibility': locationsetid,
    });
   
    if (!existingRecord) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await productLocationModel.updateOne(
      { productAvalibility: locationsetid, product: quantityidset },
      { $set: { productQuantity: newQuantity } }
    );

    res.json({ message: 'Product quantity updated successfully', updatedRecord: existingRecord });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

//////////==================================================================//////////
//////=========controller to update and post the quantity in product location========///////
//////////=========================================================================/////

exports.updateProductByProductAndLocation = async (req, res) => {
  try {

    let result1= req.body;
    console.log(result1)
    const productId = req.body.quantityidset;
    const colorId = req.body.colorId
    const shopId = req.body.shopAvalibility;
    const godownId = req.body.godownAvalibility

    console.log(shopId)
    console.log(godownId)
    if(shopId){

    let resultShop = await productLocationModel.findOne({
      $and : [{product : productId}, {colorId: colorId}, {shopAvalibility: shopId}]})

      if(resultShop){
        console.log('called Shop')
       const shopUpdate= await productLocationModel.updateOne(
          { product: productId, colorId: colorId, shopAvalibility: shopId },
          {$inc: { productQuantity: req.body.PurchaseQuantity }}
        )
        res.send(shopUpdate);
      }else{
        if(shopId){
          const result2=await productLocationModel( { shopAvalibility: shopId, colorId: colorId, product: productId, godownAvalibility: null, productQuantity: req.body.PurchaseQuantity })
          let reslt=await result2.save()
          res.send(reslt);
        }
      }
    }
    if(godownId){
      let resultGodown = await productLocationModel.findOne({
        $and : [{product: productId}, {colorId: colorId}, {godownAvalibility: godownId}]
      })

      if(resultGodown){
        console.log('called godown')
        const udpateGodown=await productLocationModel.updateOne(
          {
            product: productId, colorId: colorId, godownAvalibility: godownId
          },
          {$inc: { productQuantity: req.body.PurchaseQuantity}}
        )
        res.send(udpateGodown);
      }else{
        if(godownId){
          const result2=await productLocationModel( { shopAvalibility: null, colorId: colorId, product: productId, godownAvalibility: godownId, productQuantity: req.body.PurchaseQuantity })
          let reslt=await result2.save()
          res.send(reslt);
        }
      }
    }

  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};


exports.updateLocationOnSale = async (req, res) => {
  try {

    let result1= req.body;
    console.log(result1)
    const productId = req.body.quantityidset;
    const colorId= req.body.colorId;
    const shopId = req.body.shopAvalibility;
    if(shopId){

    let resultShop = await productLocationModel.findOne({
      $and : [{product : productId}, {colorId: colorId}, {shopAvalibility: shopId}]})
      console.log(resultShop)

      if(resultShop){
        console.log('called Shop')
       const shopUpdate= await productLocationModel.updateOne(
          { product: productId, colorId: colorId, shopAvalibility: shopId },
          {$inc: { productQuantity: req.body.PurchaseQuantity }}
        )
        res.send(shopUpdate);
      }
    }


  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};


exports.updateLocationOnGodownInTransfer = async (req, res) => {
  try {

    let result1= req.body;
    console.log(result1)
    const productId = req.body.quantityidset;
    const colorId = req.body.colorId
    const godownId = req.body.godownAvalibility;
    if(godownId){
    let resultGodown = await productLocationModel.findOne({
      $and : [{product : productId}, {colorId: colorId}, {godownAvalibility: godownId}]})

      if(resultGodown){
        console.log('called Shop')
       const godownUpdate= await productLocationModel.updateOne(
          { product: productId, colorId: colorId, godownAvalibility: godownId },
          {$inc: { productQuantity: req.body.PurchaseQuantity }}
        )
        res.send(godownUpdate);
      }
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};


exports.getShopRocordOnStorageCode = async (req, res)=>{
  try {
    console.log('called')
    let result = await godownModel.findOne({ storageCode: req.params.id });
    let  storageCode  = result._id;
    // let  storageCode  = req.params.id;
    // console.log(storageCode)

    // const query = {
    //         'productAvalibility.storageCode': storageCode, // Corrected field name
    //       };
    //       console.log(query)
    const productLocations = await productLocationModel.find({
      productAvalibility: storageCode,
    })
    .populate('colorId')
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
    .populate('productAvalibility');

    res.json(productLocations);
  
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

