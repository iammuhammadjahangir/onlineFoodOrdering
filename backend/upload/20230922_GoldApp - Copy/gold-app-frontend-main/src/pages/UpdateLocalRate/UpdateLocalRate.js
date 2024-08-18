import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateLocalRatesDetails } from "../../actions/localRatesActions";
import "./UpdateLocalRate.css";

const UpdateLocalRate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rawaSale, setRawaSale] = useState("");
  const [rawaPurchase, setRawaPurchase] = useState("");
  const [pieceSale, setPieceSale] = useState("");
  const [piecePurchase, setPiecePurchase] = useState("");
  const { loading, localRates } = useSelector((state) => state.localRates);

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
    if (localRates.success && loading === false) {
      navigate("/liveRates");
    }
  }, [localRates]);

  const handleSubmit = () => {
    // You can add your logic to submit the data here
    // For now, let's just display the data in the console
    dispatch(
      updateLocalRatesDetails(rawaSale, rawaPurchase, pieceSale, piecePurchase)
    );
    console.log({
      rawaSale,
      rawaPurchase,
      pieceSale,
      piecePurchase,
    });
  };

  return (
    <div className="centered-container">
      <div className="shadow-box">
        <h1>Update Local Rate</h1>
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
  );
};

export default UpdateLocalRate;
