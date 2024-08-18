exports.noInternet = (req, res, next) => {

    // let isNotConnected = require('dns').promises.resolve('google.com').catch(() => { });
    // if (isNotConnected) {
    //     res.status(500).json({
    //         status: "noInternet"
    //     });
    //     console.log("nooo");
    // }
    // else {

    mongoose.connect("mongodb+srv://hasnat100:123hasnat@cluster0.pslss.mongodb.net/GoldShopApp")
    next();
    // }
}
