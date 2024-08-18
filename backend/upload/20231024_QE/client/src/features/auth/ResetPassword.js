import React, { Fragment } from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import {
  forgotPasswordSendEmail,
  login,
  loginUser,
  resetPasswordToken,
} from "../../actions/userAction";
import usePersist from "../../hooks/usePersist";
import "./ResetPassword.css";
import "../../stylee/login.css";
import loginImg from "../../../src/images/login.png";

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [passwordError, setPasswordError] = useState(
    "Password must contain a combination of letters, digits, and special characters."
  );
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState();
  const [confirmError, setConfirmError] = useState();
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    "Password Updated Successfully. \nPlease Login to continue"
  );
  const dispatch = useDispatch();
  const { forgotPassword } = useSelector((state) => state.forgotPassword);
  const params = useParams();

  const validatePassword = (input) => {
    // Define a regex pattern that enforces the requirements
    const pattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&!*_])[A-Za-z\d@#$%^&!*_]{8,15}$/;
    // Test the input against the pattern
    return pattern.test(input);
  };

  const handlePasswordChange = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);

    // Check if the input matches the pattern
    if (!validatePassword(inputValue)) {
      setError(true);
      setPasswordError(
        "Password must contain a combination of letters, digits, and special characters."
      );
    } else {
      setConfirmPasswordError("");
      setError(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const inputValue = e.target.value;
    setConfirmPassword(inputValue);
    // Check if the input matches the pattern
    if (inputValue === password) {
      setConfirmPasswordError("");
      setConfirmError(false);
      // Display an error message or apply some styling to indicate invalid input
    } else {
      setConfirmError(true);
      setConfirmPasswordError("Confirm Password Must Match with New Password");
    }
  };

  useEffect(() => {
    if (forgotPassword.length > 0) {
      console.log(forgotPassword);
    }
  }, [forgotPassword]);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    console.log("caile");
    if (!validatePassword(password)) {
      setError(true);
      setPasswordError(
        "Password must contain a combination of letters, digits, and special characters."
      );
    } else {
      const resp = await resetPasswordToken(
        params.token,
        password,
        confirmPassword
      );
      if (resp.success) {
        setSuccess(true);
        setPassword("");
        setConfirmPassword("");
      }
      console.log(resp);
    }
  };

  return (
    <Fragment>
      {/* <MetaData title="Change Password" /> */}
      <div className="resetPasswordContainer">
        <div className="resetPasswordBox">
          <h2 className="resetPasswordHeading">Update Password</h2>

          <form className="resetPasswordForm" onSubmit={handleSendEmail}>
            {error ? (
              <div
                style={{ fontSize: "12px", color: "red", marginTop: "-10px" }}
              >
                {passwordError}
              </div>
            ) : (
              <></>
            )}
            {success ? (
              <div
                style={{
                  fontSize: "12px",
                  color: "green",
                  marginTop: "-10px",
                }}
              >
                {successMessage}
              </div>
            ) : (
              <></>
            )}
            <div>
              <LockOpenIcon />
              <input
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <LockIcon />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            {confirmError ? (
              <div
                style={{ fontSize: "12px", color: "red", marginTop: "-10px" }}
              >
                {confirmPasswordError}
              </div>
            ) : (
              <></>
            )}
            <input type="submit" value="Update" className="resetPasswordBtn" />
          </form>
        </div>
      </div>
    </Fragment>
    // <div className="lContainer public">
    //   <div className="lItem">
    //     <header className="loginImage">
    //       <img
    //         src={loginImg}
    //         width="200"
    //         style={{ position: "relative", alignSelf: "center" }}
    //         alt="login"
    //       />
    //     </header>
    //     <main className="loginForm publicc login">
    //       <h2 style={{ display: "flex", justifyContent: "center" }}>
    //         Forgot Password
    //       </h2>
    //       <form
    //         className="forme login-form formColorUser form"
    //       >
    //         {success ? (<div style={{ fontSize: '12px', color: 'green', marginTop: '-10px' }}>{successMessage}</div>) : (<></>)}
    //         <label htmlFor="username">New Password</label>
    //         <input
    //           className="form__inputt"
    //           type="text"
    //           value={password}
    //           autoComplete="off"
    //           onChange={handlePasswordChange}
    //           requireds
    //         />
    //         {error ? (<div style={{ fontSize: '12px', color: 'red', marginTop: '-10px' }}>{passwordError}</div>) : (<></>)}
    //          <label htmlFor="username">Confirm Password</label>
    //          <input
    //           className="form__inputt"
    //           type="text"
    //           value={confirmPassword}
    //           autoComplete="off"

    //           onChange={handleConfirmPasswordChange}
    //           required
    //         />
    //         {confirmError ? (<div style={{ fontSize: '12px', color: 'red', marginTop: '-10px' }}>{confirmPasswordError}</div>) : (<></>)}
    //         <button
    //           className="form__submit-button"
    //           style={{
    //             backgroundColor: "blue",
    //             color: "whitesmoke",
    //             borderRadius: "25px",
    //             paddingTop: "10px",
    //             paddingBottom: "10px",
    //           }}
    //           onClick={handleSendEmail}
    //         >
    //           Change Password
    //         </button>
    //       </form>
    //     </main>
    //   </div>
    // </div>
  );
};
export default ResetPassword;
