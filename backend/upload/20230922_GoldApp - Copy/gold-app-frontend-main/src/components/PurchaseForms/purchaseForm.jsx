import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@mui/material";

import style from "./purchaseForm.module.css";
import {
  TextField,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { RotatingLines } from "react-loader-spinner";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSelector } from "react-redux";
import { submitPurchaseForm, getAssignRolesByIdAndNames } from "../../api";
import { Outlet, useNavigate } from "react-router-dom";

//Below two lines for pressing enter input field change
const LENGTH = 12;
const clamp = (min, max, val) => Math.max(min, Math.min(val, max));

const PurchaseForm = () => {
  const [rattiMilli, setRattiMilli] = useState("Ratti");
  const navigate = useNavigate();

  const [permission, setPermission] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState("");
  const [pondWeight, setPondWeight] = useState();
  const [mail, setMail] = useState();
  const [finalWeight, setFinalWeight] = useState(0);
  const [gramRate, setGramRate] = useState();
  const [pureWeight, setPureWeight] = useState(0);
  const [rate, setRate] = useState();
  const [cash, setCash] = useState(0);
  const [ratti, setRatti] = useState("");
  const [milli, setMilli] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [desc, setdesc] = useState("");
  const [data] = useState([...Array(LENGTH).keys()]);

  const inputRefs = useRef([]);

  const handleKeyPress = (index) => () => {
    const nextIndex = clamp(0, data.length - 1, index + 1);
    console.log(nextIndex);
    console.log(data);
    console.log(data.length);
    inputRefs.current[nextIndex].focus();
  };

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("userRoleId")));
    // Define an asynchronous function inside useEffect
    async function getPermission() {
      try {
        const data = await getAssignRolesByIdAndNames(
          JSON.parse(localStorage.getItem("userRoleId")),
          "Purchase Gold"
        );
        console.log(data.data.status);
        setPermission(data.data.status);
        setLoading(true);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Call the async function
    getPermission();
  }, []);

  // Update final weight whenever pondWeight or mail changes
  useEffect(() => {
    setFinalWeight(pondWeight - mail);
  }, [pondWeight, mail]);
  useEffect(() => {
    console.log("hello");
    rattiMilli === "Ratti"
      ? setPureWeight(
          Math.abs((((ratti - 96) / 96) * (pondWeight - mail)).toFixed(3))
        )
      : setPureWeight(
          Math.abs((((milli * 96 - 96) / 96) * (pondWeight - mail)).toFixed(3))
        );
  }, [ratti, milli]);
  useEffect(() => {
    setCash(Math.abs((pondWeight - mail) * gramRate).toFixed(3));
  }, [pondWeight, mail, gramRate]);
  // const [PFormData, SetPFormData] = useState({

  // });
  // const { values, handleChange, handleSubmit, handleReset, errors } = useFormik(
  //   {
  //     initialValues: {
  //       customer: "",
  //       pondWeight: 0,
  //       mail: 0,
  //       finalWeight: 0,
  //       gramRate: 0,
  //       pureWeight: 0,
  //       rate: 0,
  //       cash: 0,
  //       desc: "",
  //       ratti: "",
  //       milli: "",
  //       paymentMethod: "Cash",
  //     },
  //     validationSchema: purchaseFormNonRattiMilli,
  //     onSubmit: async (values) => {
  //
  //     },
  //   }
  // );
  const handleRattiMilli = (e) => {
    setRattiMilli(e.target.value);
  };
  // console.log(values);
  // const handleChangeDisabled = (e) => {
  //   console.log(e.target.value);
  // };
  // console.log(errors);

  //   values.finalWeight = values.pondWeight - values.mail;

  // const loginUserName = useSelector((state) => {
  //   return state.authFormData.authFormData.name;
  // });

  // if (rattiMilli === "Ratti") {
  //   values.milli = "";
  // } else {
  //   values.ratti = "";
  // }
  const handleRattiMilliValue = (value, e) => {
    if (value === "Ratti") {
      // Ensure "Milli" is set to 0 if "Ratti" is empty
      if (e === "" || e === 0 || !e) {
        setMilli(0);
      } else {
        // Calculate "Milli" based on "Ratti"
        console.log(e);
        setMilli((e / 96).toFixed(3));
      }
    } else if (value === "Milli") {
      if (e === "" || e === 0 || !e) {
        setRatti(0);
      } else {
        // Calculate "Milli" based on "Ratti"
        setRatti((e * 96).toFixed(3));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const values = {
        customer,
        pondWeight,
        mail,
        finalWeight,
        gramRate,
        pureWeight,
        rate,
        cash,
        desc,
        ratti,
        milli,
        paymentMethod,
      };
      const data = await submitPurchaseForm(values);
      console.log(data);
      if (data?.status === 201) {
        // alert("Added Successfully");

        localStorage.setItem(
          "values",
          JSON.stringify({
            customerId: data.data.reportID,
            customer: customer,
            pondWeight: pondWeight,
            mail: mail,
            finalWeight: finalWeight,
            gramRate: gramRate,
            pureWeight: pureWeight,
            rate: rate,
            cash: cash,
            desc: desc,
            ratti: ratti,
            milli: milli,
            rattiMilli: rattiMilli,
            paymentMethod: paymentMethod,
            type: "purchase",
            navigate: "purchase",
          })
        );
        navigate("/thermalPrintComponent");
        // handleReset();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {loading ? (
        permission ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "85%" }}>
              <h1>Purchase</h1>
              <Box>
                <div style={{ display: "inline-block", width: "100%" }}>
                  <form autoComplete="off" noValidate className={style.form}>
                    <TextField
                      label="Customer"
                      variant="outlined"
                      value={customer}
                      onChange={(e) => {
                        setCustomer(e.target.value);
                      }}
                      name="customer"
                      size="small"
                      fullWidth
                      inputProps={{ onKeyPress: handleKeyPress(0) }}
                      inputRef={(ref) => (inputRefs.current[0] = ref)}
                    />
                    {/* <Typography
                variant="body"
                sx={{ color: "red", alignSelf: "flex-start", fontSize: "15px" }}
              >
                {errors.customer}
              </Typography> */}
                    <div className={style.pondWeight}>
                      <Box display={"flex"} flexDirection={"column"} flex={1}>
                        <TextField
                          label="Pondweight"
                          variant="outlined"
                          type="number"
                          value={pondWeight}
                          onChange={(e) => {
                            setPondWeight(e.target.value);
                          }}
                          name="pondWeight"
                          size="small"
                          inputProps={{ onKeyPress: handleKeyPress(1) }}
                          inputRef={(ref) => (inputRefs.current[1] = ref)}
                        />
                        {/* <Typography
                    variant="body"
                    sx={{ color: "red", fontSize: "15px", my: "3px" }}
                  >
                    {errors.pondWeight}
                  </Typography> */}
                      </Box>
                      <Box display={"flex"} flexDirection={"column"} flex={1}>
                        <TextField
                          label="Mail/Nagh"
                          type="number"
                          variant="outlined"
                          value={mail}
                          onChange={(e) => {
                            setMail(e.target.value);
                          }}
                          name="mail"
                          size="small"
                          sx={{ flex: 1 }}
                          inputProps={{ onKeyPress: handleKeyPress(2) }}
                          inputRef={(ref) => (inputRefs.current[2] = ref)}
                        />
                        {/* <Typography
                    variant="body"
                    sx={{ color: "red", fontSize: "15px", my: "3px" }}
                  >
                    {errors.mail}
                  </Typography> */}
                      </Box>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        gap: "50px",
                      }}
                    >
                      <Box display={"flex"} flex={1}>
                        <TextField
                          label="Final Weight"
                          type="number"
                          variant="outlined"
                          value={finalWeight}
                          name="finalWeight"
                          size="small"
                          sx={{ flex: 1 }}
                          inputProps={{ onKeyPress: handleKeyPress(3) }}
                          inputRef={(ref) => (inputRefs.current[3] = ref)}
                        />
                      </Box>
                      <Box display={"flex"} flex={1} flexDirection={"column"}>
                        <TextField
                          label="Rate/Gram"
                          type="number"
                          variant="outlined"
                          value={gramRate}
                          onChange={(e) => {
                            setGramRate(e.target.value);
                          }}
                          name="gramRate"
                          size="small"
                          sx={{ flex: 1 }}
                          inputProps={{ onKeyPress: handleKeyPress(4) }}
                          inputRef={(ref) => (inputRefs.current[4] = ref)}
                        />
                        {/* <Typography
                    variant="body"
                    sx={{ color: "red", fontSize: "15px", my: "3px" }}
                  >
                    {errors.gramRate}
                  </Typography> */}
                      </Box>
                    </div>

                    <div className={style.rmpureweight}>
                      <div
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          display: "flex",
                        }}
                      >
                        <RadioGroup
                          sx={{ flexDirection: "column" }}
                          className={style.radioText}
                          defaultValue="Ratti"
                          onChange={handleRattiMilli}
                        >
                          <FormControlLabel
                            value="Ratti"
                            control={<Radio />}
                            label="Ratti"
                          />
                          <FormControlLabel
                            value="Milli"
                            control={<Radio />}
                            label="Mili"
                          />
                        </RadioGroup>
                        <div className={style.autoRadio}>
                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <TextField
                              label=""
                              type="number"
                              variant="standard"
                              onChange={(e) => {
                                setRatti(e.target.value);
                                handleRattiMilliValue("Ratti", e.target.value);

                                // handleRattiMilliValue("Ratti", e);
                                // handleChange(e);
                                // console.log(values.ratti);
                                // console.log(e);
                                // const ratti = "Ratti";
                                // handleRattiMilliValue(ratti);
                                // // rattiMilli === "Ratti" ? handleChange() : () => {};
                              }}
                              name="ratti"
                              size="small"
                              sx={{ marginBottom: "10px" }}
                              value={ratti}
                              inputProps={{ onKeyPress: handleKeyPress(5) }}
                              inputRef={(ref) => (inputRefs.current[5] = ref)}
                            />
                            {/* <Typography
                        sx={{
                          margin: "0 5px",
                        }}
                        onClick={() => {
                          handleRattiMilliValue("Ratti");
                        }}
                      >
                        <KeyboardArrowDownIcon />
                      </Typography> */}
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                            }}
                          >
                            <TextField
                              label=""
                              type="number"
                              variant="standard"
                              onChange={(e) => {
                                setMilli(e.target.value);
                                handleRattiMilliValue("Milli", e.target.value);

                                // handleRattiMilliValue("Milli", e);
                                // handleChange(e);
                                // const Milli = "Milli";
                                // handleRattiMilliValue(Milli);
                                // // handleChange();
                                // // rattiMilli === "Milli" ? handleChange() : () => {};
                              }}
                              name="milli"
                              size="small"
                              value={milli}
                              inputProps={{ onKeyPress: handleKeyPress(6) }}
                              inputRef={(ref) => (inputRefs.current[6] = ref)}
                            />
                            {/* <Typography
                        sx={{
                          margin: "0 5px",
                          backgroundColor: "grey",
                          borderRadius: "25%",
                          alignItems: "center",
                          marginBottom: "0px",
                        }}
                        onClick={() => {
                          handleRattiMilliValue("Milli");
                        }}
                      >
                        <KeyboardArrowUpIcon />
                      </Typography> */}
                          </Box>
                        </div>
                      </div>
                      <TextField
                        label="Pure Weight"
                        type="number"
                        variant="outlined"
                        value={pureWeight}
                        onChange={(e) => {
                          setPureWeight(e.target.value);
                        }}
                        name="pureWeight"
                        size="medium"
                        className={style.pureWeight}
                        inputProps={{ onKeyPress: handleKeyPress(7) }}
                        inputRef={(ref) => (inputRefs.current[7] = ref)}
                      />
                    </div>
                    <TextField
                      label="Rate"
                      type="number"
                      variant="outlined"
                      value={rate}
                      onChange={(e) => {
                        setRate(e.target.value);
                      }}
                      name="rate"
                      size="small"
                      fullWidth
                      inputProps={{ onKeyPress: handleKeyPress(8) }}
                      inputRef={(ref) => (inputRefs.current[8] = ref)}
                    />
                    {/* <Typography
                variant="body"
                sx={{ color: "red", alignSelf: "flex-start", fontSize: "15px" }}
              >
                {errors.rate}
              </Typography> */}
                    <div className={style.paymentMethod}>
                      <Typography variant="h6" id={style.paymentLabel}>
                        Payment Method
                      </Typography>
                      <RadioGroup
                        sx={{ flexDirection: "row" }}
                        className={style.paymentLabelChoice}
                        defaultValue="Cash"
                        value={paymentMethod}
                        onChange={(e) => {
                          setPaymentMethod(e.target.value);
                        }}
                        name="paymentMethod"
                        inputProps={{ onKeyPress: handleKeyPress(9) }}
                        inputRef={(ref) => (inputRefs.current[9] = ref)}
                      >
                        <FormControlLabel
                          value="Pure"
                          control={<Radio />}
                          label="Pure"
                          sx={{ width: "25%" }}
                        />
                        <FormControlLabel
                          value="Cash"
                          control={<Radio />}
                          label="Cash"
                          sx={{ width: "25%" }}
                        />
                      </RadioGroup>
                    </div>
                    <TextField
                      label="Cash"
                      type="number"
                      variant="outlined"
                      value={cash}
                      name="cash"
                      size="small"
                      fullWidth
                      inputProps={{ onKeyPress: handleKeyPress(10) }}
                      inputRef={(ref) => (inputRefs.current[10] = ref)}
                    />
                    <TextField
                      label="Description"
                      variant="outlined"
                      value={desc}
                      onChange={(e) => {
                        setdesc(e.target.value);
                      }}
                      name="desc"
                      multiline
                      rows={2}
                      size="small"
                      fullWidth
                      inputProps={{ onKeyPress: handleKeyPress(11) }}
                      inputRef={(ref) => (inputRefs.current[11] = ref)}
                    />
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
                        onClick={() => {
                          setRattiMilli("Ratti");
                          setCustomer("");
                          setPondWeight(0);
                          setMail(0);
                          setFinalWeight(0);
                          setGramRate(0);
                          setPureWeight(0);
                          setRate(0);
                          setCash(0);
                          setRatti("");
                          setMilli("");
                          setPaymentMethod("Cash");
                          setdesc("");
                        }}
                      >
                        clear
                      </Button>
                    </div>
                  </form>
                </div>
              </Box>
            </Box>
          </Box>
        ) : (
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Not allowed By Admin
          </h1>
        )
      ) : (
        <Box textAlign="center">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="3"
            animationDuration="0.75"
            width="40"
            visible={true}
          />
        </Box>
      )}
    </>
  );
};

export default PurchaseForm;
