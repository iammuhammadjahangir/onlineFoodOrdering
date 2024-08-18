class ErrorHander extends Error {
  constructor(message, statusCode) {
    // console.error(message);
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ErrorHander;
