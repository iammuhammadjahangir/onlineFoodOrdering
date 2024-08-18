const yup = require("yup");

exports.userSignUpSchema = yup.object().shape({
	confirmPassword: yup
		.string()
		.required("Confirm Password Required")
		.oneOf([yup.ref("password"), null], "Password must be matched"),
	password: yup.string().required("Password Required").min(4).max(18),
	emailAddress: yup.string().email().required("Email required"),
	lastName: yup.string().required("Last Name Required"),
	firstName: yup.string().required("First Name Required"),
});

exports.userLoginSchema = yup.object().shape({
	password: yup.string().required("Password Required").min(4).max(18),
	emailAddress: yup.string().email().required("Email required"),
});

exports.userChangePasswordEmailSchema = yup.object().shape({

	emailAddress: yup.string().email().required("Email required"),


});
exports.userChangePasswordSchema = yup.object().shape({

	confirmPassword: yup
		.string()
		.required("Confirm Password Required")
		.oneOf([yup.ref("password"), null], "Password must be matched"),
	password: yup.string().required("Password Required").min(4).max(18),
	ID: yup.string().required("ID Required").min(20, "ID must be valid").max(26, "ID must be valid")
});