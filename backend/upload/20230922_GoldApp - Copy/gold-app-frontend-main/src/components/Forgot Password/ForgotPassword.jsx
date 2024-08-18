import React from "react";
import { IconButton, InputAdornment, TextField, Typography, Button } from "@mui/material";
import style from "./ForgotPassword.module.css";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { changePassword, forgotPasswordEmailVerify } from "../../api";
import { userChangePassword, userChangePasswordEmail } from "../../validations/Uservalidation";
import { useNavigate } from "react-router-dom";

const initialData = {
	emailAddress: "",
	password: "",
	confirmPassword: "",
};
const ForgotPassword = () => {
	const navigate = useNavigate();
	const [isForgotScreen, setForgotScreen] = useState();
	const [forgotPasswordData, setForgotPasswordData] = useState(initialData);
	const [type, setType] = useState("password");
	const [type1, setType1] = useState("password");
	const [err1, setError] = useState("");

	const { id, pageStatus } = useParams();

	useEffect(() => {
		if (pageStatus == "true") {
			setForgotScreen(true);
		} else setForgotScreen(false);
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isForgotScreen) {
			try {
				await userChangePasswordEmail.validate(forgotPasswordData);

				const data = await forgotPasswordEmailVerify(forgotPasswordData);

				if (data !== undefined && typeof data === "object") {
					setError(data.message);
				} else {
					setError(data);
				}
				setForgotPasswordData({
					emailAddress: "",
				});
			} catch (e) {
				setError(e.errors);
			}
		} else {
			try {
				forgotPasswordData.ID = id;
				console.log(forgotPasswordData);
				await userChangePassword.validate(forgotPasswordData);
				const data = await changePassword(forgotPasswordData);
				if (data !== undefined && typeof data === "object") {
					setError(data.message);
					if (data.message === "Password Changed Successfully") {
						alert(data.message);
						navigate("/");
					}
				} else {
					setError(data);
				}
				setForgotPasswordData({
					password: "",
					confirmPassword: "",
				});
			} catch (e) {
				setError(e.errors);
			}
		}
		setTimeout(() => {
			setError("");
		}, 3000);
	};

	const handleChange = (e) => {
		setForgotPasswordData({
			...forgotPasswordData,
			[e.target.name]: e.target.value,
		});
	};

	// setEmailScreen(status);

	const handleShowPassword = () => {
		type === "password" ? setType("") : setType("password");
	};
	const handleShowPassword1 = () => {
		type1 === "password" ? setType1("") : setType1("password");
	};

	return (
		<>
			<div className={style.heading}>
				<div style={{ marginTop: "10%" }}></div>
				<Typography variant="h5">{!isForgotScreen ? "Enter Email Address" : "Reset Password"}</Typography>

				<form onSubmit={handleSubmit} className={style.form}>
					{!isForgotScreen ? (
						<TextField onChange={handleChange} value={forgotPasswordData.emailAddress} name="emailAddress" required variant="outlined" type="email" label="Enter Email" inputProps={{ autoCapitalize: "none" }} />
					) : (
						<>
							<TextField
								onChange={handleChange}
								name="password"
								required
								variant="outlined"
								value={forgotPasswordData.password}
								label="Enter Password"
								autoComplete="off"
								type={type === "password" ? "password" : "text"}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton onClick={handleShowPassword}>{type === "password" ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton>
										</InputAdornment>
									),
									autoCapitalize: "none",
								}}
							/>

							<TextField
								onChange={handleChange}
								name="confirmPassword"
								required
								variant="outlined"
								label="Confirm Password"
								autoComplete="off"
								value={forgotPasswordData.confirmPassword}
								type={type1 === "password" ? "password" : "text"}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton onClick={handleShowPassword1}>{type1 === "password" ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton>
										</InputAdornment>
									),
									autoCapitalize: "none",
								}}
							/>
						</>
					)}
					{err1 && <p style={{ color: "red" }}>{err1}</p>}

					<Button variant="contained" size="medium" sx={{ width: "200px" }} type="submit" onClick={handleSubmit}>
						{isForgotScreen ? "Submit" : "Reset Password "}
					</Button>
				</form>
			</div>
		</>
	);
};

export default ForgotPassword;
