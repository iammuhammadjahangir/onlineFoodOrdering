import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//for material ui DropDown
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { updateLocalRatesDetails } from "../../actions/ratesMetalLocalAction";
import "./LocalRatesUpdate.css";

let message;
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const LocalRatesUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [rawaSale, setRawaSale] = useState("");
  const [rawaPurchase, setRawaPurchase] = useState("");
  const [pieceSale, setPieceSale] = useState("");
  const [piecePurchase, setPiecePurchase] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const { loading, updateLocalRates } = useSelector(
    (state) => state.UpdateLocalRates
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "rawaSale":
        setRawaSale(value);
        break;
      case "rawaPurchase":
        setRawaPurchase(value);
        break;
      case "pieceSale":
        setPieceSale(value);
        break;
      case "piecePurchase":
        setPiecePurchase(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log("====================================");
    console.log(localStorage.getItem("userData"));
    console.log(typeof localStorage.getItem("userData"));
    console.log("====================================");
    if (localStorage.getItem("userData") === "true") {
      setAutoLogin(true);
    } else {
      setAutoLogin(false);
      // navigate("/");
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (updateLocalRates.success && loading === false) {
      navigate("/");
    }
  }, [updateLocalRates]);

  const handleSubmit = () => {
    if (
      rawaSale === "" ||
      rawaPurchase === "" ||
      pieceSale === "" ||
      piecePurchase === ""
    ) {
      message = "Please Fill All the Fields";
      setOpen(true);
    } else if (rawaSale < rawaPurchase) {
      message = "Rawa sale must be greater than Rawa Purchase";
      setOpen(true);
    } else if (pieceSale < piecePurchase) {
      message = "Piece sale must be greater than Piece Purchase";
      setOpen(true);
    } else {
      dispatch(
        updateLocalRatesDetails(
          rawaSale,
          rawaPurchase,
          pieceSale,
          piecePurchase
        )
      );
      // console.log({
    }
    //   rawaSale,
    //   rawaPurchase,
    //   pieceSale,
    //   piecePurchase,
    // });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      {autoLogin && (
        <div>
          <div className="centered-container">
            <div className="shadow-box">
              <h2>Update Local Rate</h2>
              <div className="input-section">
                <label>Rawa Sale:</label>
                <input
                  type="number"
                  name="rawaSale"
                  value={rawaSale}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-section">
                <label>Rawa Purchase:</label>
                <input
                  type="number"
                  name="rawaPurchase"
                  value={rawaPurchase}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-section">
                <label>Piece Sale:</label>
                <input
                  type="number"
                  name="pieceSale"
                  value={pieceSale}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-section">
                <label>Piece Purchase:</label>
                <input
                  type="number"
                  name="piecePurchase"
                  value={piecePurchase}
                  onChange={handleInputChange}
                />
              </div>
              <button onClick={handleSubmit} role="button" className="button">
                Submit
              </button>
            </div>
          </div>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      )}
    </>
  );
};

export default LocalRatesUpdate;
