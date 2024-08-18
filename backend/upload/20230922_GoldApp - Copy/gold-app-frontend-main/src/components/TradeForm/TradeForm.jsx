import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";

import style from "./trade.module.css";
import {
  TextField,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Clock from "../Clock/Clock";
import { useFormik } from "formik";
import { submitTradeForm, getAssignRolesByIdAndNames } from "../../api";
import { RotatingLines } from "react-loader-spinner";

import { useNavigate } from "react-router-dom";

//Below two lines for pressing enter input field change
const LENGTH = 12;
const clamp = (min, max, val) => Math.max(min, Math.min(val, max));
const TradeForm = () => {
  const [test, settest] = useState(false);
  const navigate = useNavigate();
  const [permission, setPermission] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [rate, setRate] = useState(0);
  const [type, setType] = useState("sellRawa");
  const [cash, setCash] = useState(0);
  const [desc, setDesc] = useState("");
  const [packingCharges, setPackingCharges] = useState(0);
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
          "Trade Gold"
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
  useEffect(() => {
    settest(false);
  }, []);
  const handleSubmit = async () => {
    try {
      const values = {
        name,
        weight,
        rate,
        type,
        cash,
        desc,
        packingCharges,
      };
      const data = await submitTradeForm(values);
      console.log(data);
      if (data.status === 201) {
        localStorage.setItem(
          "values",
          JSON.stringify({
            id: data.data.reportID,
            name: name,
            weight: weight,
            rate: rate,
            type: type,
            cash: cash,
            packingCharges: packingCharges,
            desc: desc,
            type: "trade",
            category: type,
            navigate: "trade",
          })
        );
        navigate("/thermalPrintComponent");
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
              <h1>Trade</h1>
              <div>
                <form autoComplete="off" noValidate className={style.form}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    name="name"
                    size="small"
                    fullWidth
                    inputProps={{ onKeyPress: handleKeyPress(0) }}
                    inputRef={(ref) => (inputRefs.current[0] = ref)}
                  />
                  <RadioGroup
                    sx={{ width: "100%", height: "auto" }}
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    name="type"
                    inputProps={{ onKeyPress: handleKeyPress(1) }}
                    inputRef={(ref) => (inputRefs.current[1] = ref)}
                  >
                    <div className={style.sellBuy}>
                      <p>Rawa</p>
                      <FormControlLabel
                        value="sellRawa"
                        control={<Radio />}
                        label="Sell"
                      />
                      <FormControlLabel
                        value="buyRawa"
                        control={<Radio />}
                        label="Buy"
                      />
                    </div>
                    <div className={style.sellBuy}>
                      <p>PCS</p>
                      <FormControlLabel
                        value="sellPCS"
                        control={<Radio />}
                        label="Sell"
                        sx={{ marginLeft: "1px" }}
                      />
                      <FormControlLabel
                        value="buyPCS"
                        control={<Radio />}
                        label="Buy"
                      />
                    </div>
                    <div className={style.sellBuy}>
                      <p>Grami</p>
                      <FormControlLabel
                        value="sellGrami"
                        control={<Radio />}
                        label="Sell"
                      />
                      <FormControlLabel
                        value="buyGrami"
                        control={<Radio />}
                        label="Buy"
                      />
                    </div>
                  </RadioGroup>
                  <TextField
                    label="Weight"
                    type="number"
                    variant="outlined"
                    value={weight}
                    onChange={(e) => {
                      setWeight(e.target.value);
                      setCash(((e.target.value * rate) / 11.664).toFixed(3));
                      setPackingCharges(0);

                      console.log(e);
                    }}
                    name="weight"
                    size="small"
                    fullWidth
                    inputProps={{ onKeyPress: handleKeyPress(2) }}
                    inputRef={(ref) => (inputRefs.current[2] = ref)}
                  />
                  <TextField
                    label="Rate"
                    type="number"
                    variant="outlined"
                    value={rate}
                    onChange={(e) => {
                      setRate(e.target.value);
                      setPackingCharges(0);
                      if (weight > 0 && e.target.value > 0) {
                        setCash(
                          ((weight * e.target.value) / 11.664).toFixed(3)
                        );
                      } else {
                        setCash(0);
                      }
                    }}
                    name="rate"
                    size="small"
                    fullWidth
                    inputProps={{ onKeyPress: handleKeyPress(3) }}
                    inputRef={(ref) => (inputRefs.current[3] = ref)}
                  />
                  <TextField
                    label="Packing Charges"
                    type="number"
                    variant="outlined"
                    value={packingCharges}
                    disabled={type === "sellGrami" ? false : true}
                    onChange={(e) => {
                      setPackingCharges(e.target.value);
                    }}
                    name="packingCharges"
                    size="small"
                    fullWidth
                    onBlur={() => {
                      setCash(
                        (parseFloat(cash) + parseFloat(packingCharges)).toFixed(
                          3
                        )
                      );
                    }}
                    inputProps={{ onKeyPress: handleKeyPress(4) }}
                    inputRef={(ref) => (inputRefs.current[4] = ref)}
                  />
                  <TextField
                    label="Cash"
                    type="number"
                    variant="outlined"
                    // disabled={true}
                    value={cash}
                    onChange={(e) => {
                      setCash(e.target.value);
                      e.target.value === ""
                        ? setWeight(0)
                        : setWeight(
                            (
                              ((e.target.value - packingCharges) / rate) *
                              11.664
                            ).toFixed(3)
                          );
                    }}
                    name="cash"
                    size="small"
                    fullWidth
                    inputProps={{ onKeyPress: handleKeyPress(5) }}
                    inputRef={(ref) => (inputRefs.current[5] = ref)}
                  />
                  <TextField
                    label="Description"
                    variant="outlined"
                    value={desc}
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                    name="desc"
                    multiline
                    rows={2}
                    size="small"
                    fullWidth
                    inputProps={{ onKeyPress: handleKeyPress(6) }}
                    inputRef={(ref) => (inputRefs.current[6] = ref)}
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
                      sx={{ width: "80px" }}
                      onClick={handleSubmit}
                    >
                      save
                    </Button>
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{ width: "80px" }}
                      onClick={() => {
                        settest(false);
                        setName("");
                        setWeight("");
                        setRate("");
                        setType("sellRawa");
                        setCash("");
                        setDesc("");
                        setPackingCharges("");
                      }}
                    >
                      clear
                    </Button>
                  </div>
                </form>
              </div>
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

export default TradeForm;
