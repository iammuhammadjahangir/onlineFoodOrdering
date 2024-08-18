import { useRef, Fragment, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import {
  forgotPasswordSendEmail,
  login,
  loginUser,
} from "../../actions/userAction";
import usePersist from "../../hooks/usePersist";
import "./forgotPassword.css";
// import "../../stylee/login.css";
import loginImg from "../../../src/images/login.png";

const ForgotPasswordEmail = () => {
  const [email, setEmail] = useState();

  const dispatch = useDispatch();
  const { forgotPassword, error } = useSelector(
    (state) => state.forgotPassword
  );

  // useEffect(()=>{
  //   console.log(forgotPassword)
  //   if(forgotPassword.length > 0){
  //     console.log(forgotPassword)
  //   }
  // }, [forgotPassword])

  const handleSendEmail = async (e) => {
    e.preventDefault();
    console.log(email);
    if (!email) {
      console.log("hi");
    } else {
      dispatch(forgotPasswordSendEmail(email));
    }
  };

  return (
    <Fragment>
      {/* <MetaData title="Forgot Password" /> */}
      <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
          <h2 className="forgotPasswordHeading">Forgot Password</h2>

          <form className="forgotPasswordForm" onSubmit={handleSendEmail}>
            {forgotPassword?.success ? (
              <div
                style={{ fontSize: "12px", color: "green", marginTop: "-10px" }}
              >
                {forgotPassword?.message}
              </div>
            ) : (
              <></>
            )}
            {error ? (
              <div
                style={{ fontSize: "12px", color: "red", marginTop: "-10px" }}
              >
                {error?.data}
              </div>
            ) : (
              <></>
            )}
            <div className="forgotPasswordEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input type="submit" value="Send" className="forgotPasswordBtn" />
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
    //          {forgotPassword?.success ? (<div style={{ fontSize: '12px', color: 'green', marginTop: '-10px' }}>{forgotPassword?.message}</div>) : (<></>)}
    //          {error ? (<div style={{ fontSize: '12px', color: 'red', marginTop: '-10px' }}>{error?.data}</div>) : (<></>)}
    //         <label htmlFor="username">Enter Email:</label>
    //         <input
    //           className="form__input"
    //           type="text"
    //           id="email"
    //           value={email}
    //           autoComplete="off"
    //           onChange={(e)=> setEmail(e.target.value)}
    //           required
    //         />

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
    //           Send Email
    //         </button>
    //       </form>
    //     </main>
    //   </div>
    // </div>
  );
};
export default ForgotPasswordEmail;
