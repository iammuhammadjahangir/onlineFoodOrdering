const printerModel = require('../models/printerModel')

//===========================================//
//======CONTROLLER TO POST Printer ===========//
//=========================================//
exports.postPrinter = async (req, res) => {
    try {
        console.log(req.body)
      let result = new printerModel(req.body);
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
//======CONTROLLER TO Find Printer ===========//
//=========================================//
exports.getAllPrinters = async (req, res) => {
  try {
    console.log('hcie')
    let result = await printerModel.find();
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

 //===========================================//
//======CONTROLLER TO Find Printer on id===========//
//=========================================//
exports.getSinglePrinters = async (req, res) => {
  try {
    console.log('hcie')
    const id = req.params.id
    let result = await printerModel.findOne({_id: id});
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

  exports.updatePrinterStatus = async (req, res) => {
    const selectedPrinterId = req.params.id; // Assuming you pass the selected printer's _id in the request parameters
  
    try {
      // Update the selected printer's status to "active"
      const updatedSelectedPrinter = await printerModel.findByIdAndUpdate(
        selectedPrinterId,
        { status: 'active' },
        { new: true } // This option ensures that you get the updated document
      );
  
      // Update the status of all other printers to "inactive"
      // const updateOtherPrinters = await printerModel.updateMany(
      //   { _id: { $ne: selectedPrinterId } }, // Find all printers except the selected one
      //   { status: 'inactive' }
      // );
  
      // If the update operations were successful, you can send a response with the updated data
      res.json({
        selectedPrinter: updatedSelectedPrinter,
        message: 'Printer statuses updated successfully.',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'An error occurred while updating printer statuses.',
        error: error.message,
      });
    }
  };