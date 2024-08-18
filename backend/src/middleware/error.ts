import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorClassHandler.js";
import { ControllerType } from "../types/types.js";

export const errorMiddleware = (
  err: ErrorHandler & { code?: number }, // Add 'code' property to the 'ErrorHandler' type
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  if (err.name === "CastError") {
    const castError = err as ErrorHandler & { path: string };
    castError.message = `Resource not Found . Invalid ${castError.path}`;
    err.message = castError.message;
  }
  //Mongoose Dublicate key error
  if (err.code === 11000) {
    const castError = err as ErrorHandler & { keyValue: object };
    const message = `Dublicate ${Object.keys(castError.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //Wrong JWT error
  if (err.name === "jsonWebTokenError") {
    const message = `Json Web Token is invalid, try Again`;
    err = new ErrorHandler(message, 400);
  }

  //Wrong JWT Expired
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, try Again`;
    err = new ErrorHandler(message, 400);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export const TryCatch =
  (func: ControllerType) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
