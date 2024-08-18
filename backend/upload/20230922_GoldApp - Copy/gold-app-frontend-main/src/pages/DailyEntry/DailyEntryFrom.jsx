import React, { useState, useEffect } from "react";
import Clock from "../../components/Clock/Clock";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  Button,
  Typography,
} from "@mui/material";
import style from "./dailyEntryStyle.module.css";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Formik, useFormik } from "formik";
import { getCustomer, postDailyEntry } from "../../api";
import { dailyEntryValidationSchema } from "./dailyEntryVAlidationSchema";

const DailyEntryFrom = ({ props }) => {
  const [customerDropDownData, setcustomerDropDownData] = useState([]);
  const [alertMessage, setAlertMessage] = useState(false);
  const [notInsertMessage, setNotInsertMessage] = useState(false);

  //for setting form value
  const [customerId, setCustomerId] = useState("");
  const navigate = useNavigate();
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
      customer: props?.customerId,
      goldIn: 0,
      goldout: 0,
      cashIn: 0,
      cashout: 0,
    },
    validationSchema: dailyEntryValidationSchema,
    onSubmit: async (values, action) => {
      console.log(values);
      console.log("submitted", values);
      const data = await postDailyEntry(values);
      console.log(data);
      if (data.data === "Record Added") {
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

      action.resetForm();
      navigate("/dailyEntryReport");
    },
  });

  useEffect(() => {
    getCustomerdata();
  }, []);

  const getCustomerdata = async () => {
    //argument false is for gettig only that customers that are not deleted
    const res = await getCustomer(false);
    setcustomerDropDownData(res.data);
    console.log(res.data);
  };

  return (
    <>
      <Box
        sx={{
          width: "80%",
          // height: "100vh", // You can adjust the height as needed
          margin: "40px auto",
        }}
      >
        <Typography variant="h3" sx={{ textAlign: "left", margin: " 50px 0" }}>
          Daily Entry
        </Typography>

        <FormControl fullWidth>
          {!props?.customerName ? (
            <>
              <InputLabel id="demo-simple-select-label">Customer</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                label="Customer"
                name="customer"
                value={values.customer}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {customerDropDownData.map((customer) => (
                  <MenuItem key={customer._id} value={customer._id}>
                    {`${customer.firstName} ${customer.lastName}`}
                  </MenuItem>
                ))}
              </Select>
            </>
          ) : (
            <>
              <TextField
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                label="Customer"
                name="customer"
                value={props.customerName}
                disabled
              />
            </>
          )}

          <div className={style.RowDiv}>
            <Box className={style.multiItemsStyle}>
              <div className={style.errorMessageShow}>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Gold In"
                  variant="outlined"
                  size="small"
                  name="goldIn"
                  value={values.goldIn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ flex: 1, width: "100%" }}
                />
                {errors.goldIn && touched.goldIn ? (
                  <Typography
                    variant="body"
                    sx={{ color: "red", fontSize: "15px", my: "3px" }}
                  >
                    {errors.goldIn}
                  </Typography>
                ) : null}
              </div>
            </Box>

            <Box className={style.multiItemsStyle}>
              <div className={style.errorMessageShow}>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Gold Out"
                  variant="outlined"
                  size="small"
                  name="goldout"
                  value={values.goldout}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ flex: 1 }}
                />
                {errors.goldout && touched.goldout ? (
                  <Typography
                    variant="body"
                    sx={{ color: "red", fontSize: "15px", my: "3px" }}
                  >
                    {errors.goldout}
                  </Typography>
                ) : null}
              </div>
            </Box>
          </div>

          <div className={style.RowDiv}>
            <Box className={style.multiItemsStyle}>
              <div className={style.errorMessageShow}>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Cash In"
                  variant="outlined"
                  size="small"
                  name="cashIn"
                  value={values.cashIn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ flex: 1, width: "100%" }}
                />
                {errors.cashIn && touched.cashIn ? (
                  <Typography
                    variant="body"
                    sx={{ color: "red", fontSize: "15px", my: "3px" }}
                  >
                    {errors.cashIn}
                  </Typography>
                ) : null}
              </div>
            </Box>

            <Box className={style.multiItemsStyle}>
              <div className={style.errorMessageShow}>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Cash Out"
                  variant="outlined"
                  size="small"
                  name="cashout"
                  value={values.cashout}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ flex: 1 }}
                />
                {errors.cashout && touched.cashout ? (
                  <Typography
                    variant="body"
                    sx={{ color: "red", fontSize: "15px", my: "3px" }}
                  >
                    {errors.cashout}
                  </Typography>
                ) : null}
              </div>
            </Box>
          </div>
          {alertMessage && (
            <Alert
              severity="success"
              sx={{
                marginTop: "10px",
                position: "absolute",
                bottom: "-210px",
                right: "-230px",
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
                bottom: "-210px",
                right: "-230px",
              }}
            >
              Customer Record Not added — check it out!
            </Alert>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "50px",
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
        </FormControl>
      </Box>
    </>
  );
};

export default DailyEntryFrom;
