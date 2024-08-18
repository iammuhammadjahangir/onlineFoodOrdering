import React from "react";
import { Dropdown } from "semantic-ui-react";

const printerOptions = [
  { key: "laser", text: "Laser Printer", value: "laser" },
  { key: "thermal", text: "Thermal Printer", value: "thermal" },
];

const PrinterSelectionDropdown = ({ selectedPrinter, onSelectPrinter }) => {
  const handleChange = (event, data) => {
    const selectedValue = data.value;
    onSelectPrinter(selectedValue);
  };

  return (
    <Dropdown
      // style={{marginLeft: "10px"}}
      // className="printerDropDown"
      placeholder="--Select Printer--"
      selection
      clearable
      options={printerOptions}
      value={selectedPrinter}
      onChange={handleChange}
    />
  );
};

export default PrinterSelectionDropdown;
