import React, { useState } from "react";
import { useEffect } from "react";
import "./tableSetting.css";
import { Loader } from "semantic-ui-react";
// import { getAllPrinters, getSinglePrinter, updatePrinterStatus } from "../actions/printerSettingAction";
import { useSelector, useDispatch } from "react-redux";
import {
  getLoadUser,
  updatePrinterStatusId,
  updateTableRowsId,
} from "../../actions/userAction";
import {
  getAllTableSetting,
  getSingleTableRecord,
} from "../../actions/tableSettingAction";
let resp = [];
let loadUser = [];
let defaultOption = [];
const ChangeTableSetting = () => {
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected radio button option
  const [optionSelected, setOptionSelected] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const dataFromDatabase = [
    { printerType: "Option 1", status: "active" },
    { printerType: "Option 2", status: "inactive" },
    { printerType: "Option 3", status: "inactive" },
  ];

  useEffect(() => {
    getPrintersFromDatabase();
  });

  const getPrintersFromDatabase = async () => {
    loadUser = await getLoadUser();
    resp = await getAllTableSetting();
    console.log(loadUser);
    let singleTableRecord = await getSingleTableRecord(
      loadUser?.user?.tableRows?._id
    );
    console.log(resp);
    console.log(singleTableRecord);
    defaultOption = resp?.find((data) => data?._id === singleTableRecord?._id);
    console.log(defaultOption);
    if (defaultOption) {
      setSelectedOption(defaultOption.noOfRows);
      setOptionSelected(true);
      console.log("called");
    }
  };

  const handleOptionChange = (event) => {
    setOptionSelected(false);
    setSelectedOption(event.target.value);
    let selectedValue = event.target.value;
    console.log(selectedValue);
    resp?.map((data) => {
      console.log(data);
      console.log(selectedValue);
      if (data?.noOfRows === parseInt(selectedValue)) {
        console.log("hife");
        updateTableRowsId(loadUser?.user?._id, data?._id);
        // updatePrinterStatus(data?._id)
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
            <div key={data.noOfRows}>
              <label>
                <input
                  type="radio"
                  value={data.noOfRows}
                  checked={
                    defaultOption?.noOfRows === data?.noOfRows && optionSelected
                  }
                  onChange={handleOptionChange}
                />
                {data.noOfRows}
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

export default ChangeTableSetting;
