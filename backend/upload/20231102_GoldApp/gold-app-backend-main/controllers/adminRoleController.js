const userModel = require("../models/userModel");
require("dotenv").config();
const { sendEmail } = require("./uniqueKeyandEmailSender");
require("dotenv").config();
exports.getUnverifiedUser = async (req, res) => {
  try {
    const result = await userModel.find({
      isEmailVerified: true,
      isUserVerified: false,
    });

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      e,
    });
  }
};

exports.UserVerify = async (req, res) => {
  console.log("ddd");
  var { uniqueKey, status } = req.params;

  const user = await userModel.findOne({
    uniqueKey,
  });

  if (user && status === "true") {
    user.isUserVerified = true;
    await user.save();
    const subject = "Account Verification";
    const htmlString = `<h1>GoldShop <br/> Admin allowed you to access GoldShop Website </h1> <br/>Press <a href=${process.env.BASE_URL_FRONTEND}>here </a> to Login know ThankYou`;
    sendEmail(user.emailAddress1, htmlString, subject);
  } else if (user && status === "false") {
    const subject = "Account Verification";
    const htmlString =
      "`<h1>GoldShop <br/> Admin Doesn't Allowed You to Access GoldShop Website";
    sendEmail(user.emailAddress1, htmlString, subject);
    await user.deleteOne({
      uniqueKey: uniqueKey,
    });
  } else {
    res.json("error");
  }
};
