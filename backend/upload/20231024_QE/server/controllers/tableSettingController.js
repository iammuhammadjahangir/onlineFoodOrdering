const tableSettingModel = require("../models/tableSettingModel")

//===========================================//
//======CONTROLLER TO POST Table Options ===========//
//=========================================//
exports.postTable = async (req, res) => {
    try {
    console.log(req.body)
    let result = new tableSettingModel(req.body);
    console.log(result)
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
//======CONTROLLER TO Find Table Rows ===========//
//=========================================//
exports.getAllTableRows = async (req, res) => {
  try {
    console.log('hcie')
    let result = await tableSettingModel.find();
    console.log('hcie')
    console.log(result)
    if(!result){
      return res.status(200).json('No Record Found')
    }
    // console.log(result)
    // result = await result.save();
    // console.log(result);
    res.send(result);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};


 //===========================================//
//======CONTROLLER TO Find Table Rows Record on id===========//
//=========================================//
exports.getSingleTableRows = async (req, res) => {
  try {
    console.log('hcie')
    const id = req.params.id
    let result = await tableSettingModel.findOne({_id: id});
    console.log('hcie')
    console.log(result)
    if(!result){
      return res.status(200).json('No Printers Found')
    }
    // console.log(result)
    // result = await result.save();
    // console.log(result);
    res.send(result);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

