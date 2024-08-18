import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "semantic-ui-react";
import "./tableSetting.css";
import ChangeTableSetting from "./changeTableSetting";
import FormTableSetting from "./formTableSetting";
const TableSettingPage = () => {
  const [colorTheme, setColorTheme] = useState("theme-white");
  const [showThirdDiv, setShowThirdDiv] = useState(false);
  const [showFourthDiv, setShowFourthDiv] = useState(false);
  const [dataToShow, setDataToShow] = useState(""); // You can set the data here

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  const handleFirstDivClick = () => {
    // Toggle the visibility of the third div and set data when the first div is clicked
    console.log(!showThirdDiv);
    console.log(showFourthDiv);
    setShowThirdDiv(!showThirdDiv);
    setShowFourthDiv(false);
    setDataToShow("Data to show in the third div"); // Replace with your data
  };

  const handleSecondDivClick = () => {
    // Toggle the visibility of the third div and set data when the first div is clicked
    console.log("hice");
    console.log(showThirdDiv);
    console.log(!showFourthDiv);
    setShowThirdDiv(false);
    setShowFourthDiv(!showFourthDiv);
    setDataToShow("Data to show in the third div"); // Replace with your data
  };

  return (
    <div className={`table ${colorTheme}`}>
      <div className="printerPage">
        <div className="setting-custom-div-first" onClick={handleFirstDivClick}>
          Change Table Rows Setting
        </div>
        <div
          className="setting-custom-div-second"
          onClick={handleSecondDivClick}
        >
          {" "}
          Add Table Rows Option
        </div>
      </div>
      {showThirdDiv && <ChangeTableSetting />}
      {showFourthDiv && <FormTableSetting />}
    </div>
  );
};

export default TableSettingPage;
