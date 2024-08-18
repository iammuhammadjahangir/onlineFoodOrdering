import { Response } from "express";
import { NewUserRequestBody } from "../types/types.js";

//Create token for saving in cookie
export const sendToken = (
  user: NewUserRequestBody,
  statusCode: number,
  res: Response
) => {
  const token = user.getJWTToken();

  //Cookies option
  const options = {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    // expires: new Date(
    //   Date.now() + Number(process.env.JWT_COOKIE!) * 20 * 60 * 60 * 1000
    // ),
    httpOnly: true,
  };

  return res.status(statusCode).cookie("token", token, options).json({
    status: true,
    user: user,
    isAuthenticated: true,
    token,
  });
};
