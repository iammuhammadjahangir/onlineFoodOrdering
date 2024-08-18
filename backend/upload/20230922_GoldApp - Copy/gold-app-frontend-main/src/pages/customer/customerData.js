import React, { useState } from "react";
import Clock from "../../components/Clock/Clock";
import "./customerForm.css";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  Button,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { pakistanCityNames } from "./cityCodes";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Formik, useFormik } from "formik";
import { customerFormSchema } from "./CustomerFormValidation";
import InputLabel from "@mui/material/InputLabel";
import { postCustomer } from "../../api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { display } from "@mui/system";
import { phoneCode } from "./phoneCode";
import { useNavigate } from "react-router-dom";

const CustomerData = ({ props }) => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(false);
  const [notInsertMessage, setNotInsertMessage] = useState(false);
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    touched,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneCode: "",
      phoneNumber: "",
      cellNumber: "",
      cnic: "",
      city: "",
      address: "",
    },
    validationSchema: customerFormSchema,
    onSubmit: async (values, action) => {
      console.log("submitted", values);
      values.phoneNumber = values.phoneCode + "-" + values.phoneNumber;
      console.log(values.phoneCode);
      console.log(values.phoneNumber);
      const data = await postCustomer(values);
      if (data.status === 200) {
        setAlertMessage(true); // Set the alert message to true

        // After 3 seconds, reset the alert message to false
        setTimeout(() => {
          setAlertMessage(false);
          props.setOpen(false);
        }, 2000);
      } else {
        setNotInsertMessage(true);
        // After 3 seconds, reset the alert message to false
        setTimeout(() => {
          setNotInsertMessage(false);
          props.setOpen(false);
        }, 2000);
      }

      action.resetForm({
        values: {
          firstName: "",
          lastName: "",
          phoneCode: "", // Clear the phoneCode field
          phoneNumber: "",
          cellNumber: "",
          cnic: "",
          city: "",
          address: "",
        },
      });
    },
  });
  return (
    <>
      <Clock name="custmer" />
      <Box
        sx={{
          width: "80%",
          // height: "100vh", // You can adjust the height as needed
          margin: "40px auto",
        }}
      >
        <Typography variant="h3" sx={{ textAlign: "left", margin: "30px 0" }}>
          Customer Form
        </Typography>

        <form className="form">
          <div className="RowDiv">
            <Box className="multiItemsStyle">
              <div className="errorMessageShow">
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="First Name"
                  variant="outlined"
                  size="small"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ flex: 1, width: "100%" }}
                />
                {errors.firstName && touched.firstName ? (
                  <Typography
                    variant="body"
                    sx={{ color: "red", fontSize: "15px", my: "3px" }}
                  >
                    {errors.firstName}
                  </Typography>
                ) : (
                  <h1></h1>
                )}
              </div>
            </Box>

            <Box className="multiItemsStyle">
              <div className="errorMessageShow">
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Last Name"
                  variant="outlined"
                  size="small"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ flex: 1 }}
                />
                {errors.lastName && touched.lastName ? (
                  <Typography
                    variant="body"
                    sx={{ color: "red", fontSize: "15px", my: "3px" }}
                  >
                    {errors.lastName}
                  </Typography>
                ) : (
                  <h1></h1>
                )}
              </div>
            </Box>
          </div>
          <div className="RowDiv">
            <Box className="multiItemsStyle">
              <div className="errorMessageShow">
                <FormControl
                  fullWidth
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <Autocomplete
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    options={phoneCode}
                    label="City Code"
                    sx={{ flex: 1 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Codes"
                        name="phoneCode"
                        value={values.phoneCode}
                        onChange={(values.phoneCode = params.inputProps.value)}
                        onBlur={handleBlur}
                      />
                    )}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Ph Number"
                    placeholder="e.g. 042-1234567"
                    name="phoneNumber"
                    sx={{ flex: 5 }}
                    value={values.phoneNumber}
                    onChange={handleChange}
                    // onChange={() => values.cityCode + "-" + values.phoneNumber}
                    onBlur={handleBlur}
                  />
                </FormControl>
                {errors.phoneNumber && touched.phoneNumber ? (
                  <Typography
                    variant="body"
                    sx={{ color: "red", fontSize: "15px", my: "3px" }}
                  >
                    {errors.phoneNumber}
                  </Typography>
                ) : (
                  <h1></h1>
                )}
                {errors.phoneCode && touched.phoneCode ? (
                  <Typography
                    variant="body"
                    sx={{ color: "red", fontSize: "15px", my: "3px" }}
                  >
                    {errors.phoneCode}
                  </Typography>
                ) : (
                  <h1></h1>
                )}
              </div>
            </Box>
            <Box className="multiItemsStyle" sx={{ width: "100%" }}>
              <div className="errorMessageShow" style={{ width: "100%" }}>
                <PhoneInput
                  placeholder="e.g. +92 300-1234567"
                  country={"pk"}
                  id="cellNumber"
                  name="cellNumber"
                  value={values.cellNumber}
                  onChange={(phone) => (values.cellNumber = `+${phone}`)}
                  onBlur={handleBlur}
                  sx={{ width: "1000%" }}
                />
                {errors.cellNumber && touched.cellNumber ? (
                  <Typography
                    variant="body"
                    sx={{ color: "red", fontSize: "15px", my: "3px" }}
                  >
                    {errors.cellNumber}
                  </Typography>
                ) : (
                  <h1></h1>
                )}
              </div>
            </Box>
          </div>
          <div className="RowDiv">
            <Box className="multiItemsStyle">
              <div className="errorMessageShow">
                <TextField
                  variant="outlined"
                  size="small"
                  label="CNIC (xxxxx-xxxxxxx-x)"
                  placeholder="CNIC"
                  name="cnic"
                  value={values.cnic}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ flex: 1 }}
                />
                {errors.cnic && touched.cnic ? (
                  <Typography
                    variant="body"
                    sx={{ color: "red", fontSize: "15px", my: "3px" }}
                  >
                    {errors.cnic}
                  </Typography>
                ) : (
                  <h1></h1>
                )}
              </div>
            </Box>
            <Box className="multiItemsStyle">
              <Box className="errorMessageShow">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">City</InputLabel>
                  <Select
                    label="City"
                    placeholder="City"
                    variant="outlined"
                    size="small"
                    sx={{ flex: 1, color: "black" }}
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {pakistanCityNames.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.city && touched.city ? (
                  <Typography
                    variant="body"
                    sx={{ color: "red", fontSize: "15px", my: "3px" }}
                  >
                    {errors.city}
                  </Typography>
                ) : (
                  <h1></h1>
                )}
              </Box>
            </Box>
          </div>

          <div className="multiItemsStyle">
            <div className="errorMessageShow">
              <TextField
                label="Address"
                variant="outlined"
                multiline
                rows={2}
                size="small"
                fullWidth
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.address && touched.address ? (
                <Typography
                  variant="body"
                  sx={{ color: "red", fontSize: "15px", my: "3px" }}
                >
                  {errors.address}
                </Typography>
              ) : (
                <h1></h1>
              )}
            </div>
          </div>
          {alertMessage && (
            <Alert
              severity="success"
              sx={{
                marginTop: "10px",
                position: "absolute",
                bottom: "-80px",
                right: "-140px",
              }}
            >
              Customer is added successfully — check it out!
            </Alert>
          )}
          {notInsertMessage && (
            <Alert
              severity="error"
              sx={{
                marginTop: "10px",
                position: "absolute",
                bottom: "-80px",
                right: "-140px",
              }}
            >
              Customer is not Added — check it out!
            </Alert>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              size="medium"
              sx={{ width: "80px", backgroundColor: "gray" }}
              onClick={handleSubmit}
            >
              save
            </Button>
            <Button
              variant="contained"
              size="medium"
              sx={{ width: "80px" }}
              onClick={handleReset}
            >
              clear
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};
export default CustomerData;
