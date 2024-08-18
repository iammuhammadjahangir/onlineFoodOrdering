import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "semantic-ui-react";
// import "./setting.css";
import "./languageSetting.css";
import ChangeLanguage from "./changeLanguage";
const LanguageSettingPage = () => {
  const [showThirdDiv, setShowThirdDiv] = useState(false);
  const [dataToShow, setDataToShow] = useState(""); // You can set the data here
  const [colorTheme, setColorTheme] = useState("theme-white");
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
    setShowThirdDiv(!showThirdDiv);
    setDataToShow("Data to show in the third div"); // Replace with your data
  };

  return (
    <div className={`language ${colorTheme}`}>
      <div className="printerPage">
        <div className="setting-custom-div-first" onClick={handleFirstDivClick}>
          Change Language
        </div>
      </div>
      {showThirdDiv && <ChangeLanguage />}
    </div>
  );
};

export default LanguageSettingPage;
