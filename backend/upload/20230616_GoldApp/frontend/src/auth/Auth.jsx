import React, { useState, useEffect } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { authFormLogin } from "../actions/userAction";
import style from "./auth.module.css";
import {
  userSignUpSchema,
  userLoginSchema,
} from "../validations/Uservalidation";

const initialData = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  var err = "";

  const [type, setType] = useState("password");
  const [type1, setType1] = useState("password");
  const [authFormData, setAuthFormData] = useState(initialData);
  const [isSignup, switchmode] = useState(false);
  const [err1, setError] = useState("");

  useEffect(() => {
    localStorage.getItem("userData") && navigate("/adminupdate");
    // localStorage.setItem("userData", JSON.stringify(data1.result));

    // dispatch(storeAuthFormData(JSON.parse(obj)));
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignup) {
      try {
        await userLoginSchema.validate(authFormData);
        const data1 = await authFormLogin(authFormData);
        console.log(data1);
        if (data1 !== undefined && typeof data1 === "object") {
          if (!data1) {
            setAuthFormData({
              emailAddress: "",
              password: "",
            });
          }

          if (data1.success === true) {
            // dispatch(storeAuthFormData(data1.result));
            localStorage.setItem("userData", JSON.stringify(data1.success));

            navigate("/adminupdate");
          }
        }
      } catch (e) {
        setError(e.errors);
      }
    } else {
      try {
        await userSignUpSchema.validate(authFormData);

        const data = await authForm(authFormData);

        if (data !== undefined) {
          setAuthFormData({
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
            confirmPassword: "",
          });
          setError(data);
        }
      } catch (e) {
        setError(e.errors);
        err = e.name;
      }
    }
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const handleChange = (e) => {
    setAuthFormData({
      ...authFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = (e) => {
    type === "password" ? setType("") : setType("password");
  };

  const handleShowPassword1 = () => {
    type1 === "password" ? setType1("") : setType1("password");
  };

  const switchMode = (e) => {
    switchmode((prevState) => !prevState);
    setAuthFormData({
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
    });
    // handleShowPassword(false);
  };

  const pageStatus = "false";
  const id = "1233";

  return (
    <>
      <div className={style.heading}>
        {!isSignup && <div style={{ marginTop: "10%" }}></div>}
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form onSubmit={handleSubmit} className={style.form}>
          {isSignup && (
            <>
              <TextField
                onChange={handleChange}
                value={authFormData.firstName}
                name="firstName"
                autoFocus
                inputProps={{ autoCapitalize: "none" }}
                required
                variant="outlined"
                label="First Name"
              />
              <TextField
                onChange={handleChange}
                value={authFormData.lastName}
                name="lastName"
                required
                variant="outlined"
                label="Last Name"
                inputProps={{ autoCapitalize: "none" }}
              />
            </>
          )}
          <TextField
            onChange={handleChange}
            value={authFormData.emailAddress}
            name="emailAddress"
            required
            variant="outlined"
            type="email"
            label="Enter Email"
            inputProps={{ autoCapitalize: "none" }}
          />
          <TextField
            onChange={handleChange}
            name="password"
            required
            variant="outlined"
            value={authFormData.password}
            label="Enter Password"
            type={type === "password" ? "password" : "text"}
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              autoCapitalize: "none",
            }}
          />
          {isSignup && (
            <TextField
              onChange={handleChange}
              name="confirmPassword"
              required
              variant="outlined"
              label="Confirm Password"
              autoComplete="off"
              value={authFormData.confirmPassword}
              type={type1 === "password" ? "password" : "text"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword1}>
                      {type1 === "password" ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                autoCapitalize: "none",
              }}
            />
          )}
          {err1 && <p style={{ color: "red" }}>{err1}</p>}
          <Button
            variant="contained"
            size="medium"
            sx={{ width: "100px", backgroundColor: "#3c6e71" }}
            type="submit"
            onClick={handleSubmit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Button onClick={switchMode}>
            {isSignup
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </form>
      </div>
      {/* <DataPicker /> */}
    </>
  );
};

export default Auth;
