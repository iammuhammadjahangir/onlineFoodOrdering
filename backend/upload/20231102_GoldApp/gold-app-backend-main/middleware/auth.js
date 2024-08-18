const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // let decodedData;
    // console.log(decodedData);
    console.log(token);

    if (token) {
      console.log("hasnat");
      decodedData = jwt.verify(token, "test");
      console.log(decodedData);
      req.userID = decodedData?.id;
      if (
        decodedData.role === "Administrator" ||
        decodedData.role === "admin" ||
        decodedData.role === "user"
      )
        next();
    }
  } catch (e) {
    console.log("hasnat1");
    res.status(400).json(e);
  }
};
exports.authAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // let decodedData;
    // console.log(decodedData);
    console.log(token);
    // console.log(req.params);
    if (token) {
      console.log("hasnat");
      decodedData = jwt.verify(token, "test");
      console.log(decodedData);
      req.userID = decodedData?.id;
      if (
        decodedData.role === "Administrator" ||
        decodedData.role === "admin" ||
        decodedData.role === "user"
      )
        next();
    }
  } catch (e) {
    console.log("hasnat1");
    res.status(400).json(e);
  }
};
