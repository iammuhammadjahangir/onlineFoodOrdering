const userModel = require("../models/userModel");
const { sendEmail } = require("./uniqueKeyandEmailSender");
require("dotenv").config();

exports.EmailVerify = async (req, res) => {
  var { uniqueKey } = req.params;

  const user = await userModel.findOne({ uniqueKey });
  if (user) {
    console.log("found");
    user.isEmailVerified = true;
    await user.save();

    res.redirect(`${process.env.BASE_URL_FRONTEND}/redirectPage`);
    const htmlString = `<h1>GoldShop</h1> <br/>A user Want to Login Press <a href=${process.env.BASE_URL_FRONTEND}/admin/unverifiedUserList/>here </a> to Allow or Deny hum <br/ >`;
    sendEmail(
      "muhammadjahangir643@gmail.com",
      htmlString,
      "Account Verification"
    );
  }
};
