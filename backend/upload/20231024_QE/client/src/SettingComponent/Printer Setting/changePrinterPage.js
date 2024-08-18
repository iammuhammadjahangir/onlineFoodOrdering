import React, { useState } from "react";
import { useEffect } from "react";
// import './setting.css';
// import "./../Pages/Product/Css/app.css";
// import "./../Pages/Product/Css/Product.css";
import "./printerPage.css";
import { Loader } from "semantic-ui-react";
import {
  getAllPrinters,
  getSinglePrinter,
  updatePrinterStatus,
} from "../../actions/printerSettingAction";
import { useSelector, useDispatch } from "react-redux";
import { getLoadUser, updatePrinterStatusId } from "../../actions/userAction";
let resp = [];
let loadUser = [];
let defaultOption = [];
const ChangePrinterPage = () => {
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected radio button option
  const [optionSelected, setOptionSelected] = useState(false);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const dataFromDatabase = [
    { printerType: "Option 1", status: "active" },
    { printerType: "Option 2", status: "inactive" },
    { printerType: "Option 3", status: "inactive" },
  ];

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  useEffect(() => {
    getPrintersFromDatabase();
  });

  const getPrintersFromDatabase = async () => {
    loadUser = await getLoadUser();
    resp = await getAllPrinters();
    let singlePrinter = await getSinglePrinter(loadUser?.user?.printerId?._id);
    console.log(resp);
    console.log(singlePrinter);
    defaultOption = resp?.find(
      (data) => data.status === "active" && data?._id === singlePrinter?._id
    );
    if (defaultOption) {
      setSelectedOption(defaultOption.printerType);
      setOptionSelected(true);
      console.log("called");
    }
  };

  const handleOptionChange = (event) => {
    setOptionSelected(false);
    setSelectedOption(event.target.value);
    let selectedValue = event.target.value;
    resp?.map((data) => {
      if (data?.printerType === selectedValue) {
        updatePrinterStatusId(loadUser?.user?._id, data?._id);
        updatePrinterStatus(data?._id);
        setSelectedOption(selectedValue);
        getPrintersFromDatabase();
      }
    });
  };

  return (
    <div className="customChange-Printer customchange-printersecond">
      {optionSelected ? (
        <form>
          {resp?.map((data) => (
            <div key={data.printerType}>
              <label>
                <input
                  type="radio"
                  value={data.printerType}
                  checked={
                    defaultOption?.printerType === data?.printerType &&
                    optionSelected
                  }
                  onChange={handleOptionChange}
                />
                {data.printerType}
              </label>
            </div>
          ))}
        </form>
      ) : (
        <>
          <Loader active style={{ position: "center", marginTop: "30px" }}>
            Loading
          </Loader>
        </>
      )}
    </div>
  );
};

export default ChangePrinterPage;
