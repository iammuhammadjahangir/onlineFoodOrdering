require("dotenv").config();

const nodemailer = require("nodemailer");

exports.UniqueKey = () => {
	const key1 = `${Math.floor(1000 + Math.random() * 9000)}`;
	const key2 = `${Math.floor(1000 + Math.random() * 9000)}`;
	const key = key1 + key2;

	return key;
};

exports.sendEmail = async (emailAddress, htmlString, subject) => {

	console.log(emailAddress);
	const transporter = nodemailer.createTransport({
		host: " smtp.gmail.com",
		service: "gmail",
		auth: {
			user: process.env.EMAIL_ADDRESS,
			pass: process.env.PASSWORD,
		},
	});

	return transporter.sendMail({
		from: process.env.EMAIL_ADDRESS,
		to: emailAddress,
		subject: subject,
		html: htmlString,
	});


};
