const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmailSent = require("./uniqueKeyandEmailSender");
const { sendEmail } = require("../controllers/uniqueKeyandEmailSender");
const userModel = require("../models/userModel");
require("dotenv").config();
const { userChangePasswordEmailSchema, userChangePasswordSchema } = require("../validations/Uservalidation");

exports.forgotPasswordEmailVerify = async (req, res) => {
    try {
        const { emailAddress } = req.body

        console.log("ddd");
        await userChangePasswordEmailSchema.validate(req.body);
        console.log("ddd1");
        const emailAddress1 = emailAddress.toLowerCase();

        const existingUser = await userModel.findOne({ emailAddress1 });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });


        const pageStatus = "true";
        const id = `${existingUser._id}`;

        const htmlString = `<h1>GoldShop</h1> <br/>Press <a href=${process.env.BASE_URL_FRONTEND}/forgotPassword/${id}/${pageStatus}/>here </a> Verify Email Thanku`;
        sendEmail(existingUser.emailAddress1, htmlString, "Email Verification");
        console.log("mmmm");
        res.status(200).json({ message: `Email sent to ${existingUser.emailAddress1}` });
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

exports.protectForgotRoute = async (req, res) => {
    try {
        const { id } = req.body;

        const existingUser = await userModel.findOne({ _id: id });

        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        res.json({ "message": "verified" })
    }
    catch (e) {
        res.json(e);
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { ID, password, confirmPassword } = req.body;
        console.log(req.body);
        await userChangePasswordSchema.validate(req.body)
        const existingUser = await userModel.findOne({ _id: ID });

        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const salt = await bcrypt.genSalt();

        const hashPassword = await bcrypt.hash(password, salt);

        existingUser.hashPassword = hashPassword;
        await existingUser.save();

        res.json({ message: "Password Changed Successfully" })
    }
    catch (e) {
        res.json(e);
    }
}