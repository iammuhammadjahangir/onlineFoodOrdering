import React, { useState } from "react";
import { useEffect } from "react";
// import "./tableSetting.css";
import { postTableRows } from "../../actions/tableSettingAction";
import { Button } from "semantic-ui-react";
let resp = [];
let loadUser = [];
let defaultOption = [];
const FormTableSetting = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const handleInput1Change = (event) => {
    setInput1(event.target.value);
  };

  const AddData = async () => {
    const resp = await postTableRows(input1);
    if (resp) {
      setInput1("");
    }
    console.log(resp);
  };

  return (
    <div className="customChange-Printer customchange-printersecond">
      <div className="setting-input-container">
        <label className="setting-input-label">Add Table Rows</label>
        <input
          type="text"
          className="setting-input-field"
          placeholder="Enter value for Input Field 1"
          value={input1}
          onChange={handleInput1Change}
        />
        <Button
          onClick={AddData}
          type="button"
          style={{
            fontSize: "17px",
            paddingLeft: "10px",
            paddingRight: "5px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
          floated="right"
        >
          {"Add"}
        </Button>
      </div>
    </div>
    // <div className="custom-div custom-third-div">
    //    <div className="input-container">
    //     <label className="input-label">Input Field 1</label>
    //     <input
    //       type="text"
    //       className="input-field"
    //       placeholder="Enter value for Input Field 1"
    //       value={input1}
    //       onChange={handleInput1Change}
    //     />
    //     <Button
    //             onClick={AddData}
    //             type="button"
    //             style={{fontSize: "17px", paddingLeft: "10px", paddingRight: "5px", paddingTop: "5px", paddingBottom: "5px" }}
    //             floated="right"
    //           >
    //             {"Add"}
    //           </Button>
    //   </div>
    // </div>
  );
};

export default FormTableSetting;
