import React, { useState } from "react";
import { useEffect } from "react";
// import './setting.css';
// import "./../Pages/Product/Css/app.css";s
import { Loader } from "semantic-ui-react";
import "./languageSetting.css";
// import {
//   getAllPrinters,
//   getSinglePrinter,
//   updatePrinterStatus,
// } from "../actions/printerSettingAction";
// import { useSelector, useDispatch } from "react-redux";
// import { getLoadUser, updatePrinterStatusId } from "../actions/userAction";
import LanguageSwitcher from "../../locales/localeDropDownOption/LanguageDropDown";
let resp = [];
let loadUser = [];
let defaultOption = [];
const ChangeLanguage = () => {
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected radio button option
  const [optionSelected, setOptionSelected] = useState(false);
  const [colorTheme, setColorTheme] = useState("theme-white");

  return (
    <div className="customChange-Printer customchange-printersecond">
      <LanguageSwitcher />
    </div>
  );
};

export default ChangeLanguage;
