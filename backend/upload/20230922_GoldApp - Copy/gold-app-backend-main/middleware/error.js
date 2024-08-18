const ErrorHander = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //====================================================//
  //===============MONGODB CAST ERROR =================//
  //==================================================//

  // console.log(err.errors);
  if (err.name === "CastError") {
    // console.log(err);
    // const errorMsg = err.errors;
    // console.log(errorMsg);
    const message = `Resource not Found . Invalid ${err.path}`;
    // const message = `Resource not Found . Invalid ${err}`;
    // console.log(message);
    err = new ErrorHander(message, 400);
  }

  //Mongoose Dublicate key error
  if (err.code === 11000) {
    const message = `Dublicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHander(message, 400);
  }

  //Wrong JWT error
  if (err.name === "jsonWebTokenError") {
    const message = `Json Web Token is invalid, try Again`;
    err = new ErrorHander(message, 400);
  }

  //Wrong JWT Expired
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, try Again`;
    err = new ErrorHander(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    // error: err.stack,
    message: err.message,
  });
};
