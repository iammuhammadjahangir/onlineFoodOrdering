import React from "react";
// import { useTranslation, initReactI18next } from "react-i18next";
import { Container, Input, Label, Button } from "semantic-ui-react";

const bottomBar = ({ rowCount }) => {
  // const { t, i18n } = useTranslation();
  console.log(rowCount);
  return (
    <div
      style={{
        position: "absolute",
        left: "5px",
        bottom: "5px",
        padding: "15px 10px",
        // backgroundColor: "#FBBD08",
        zIndex: "1",
        height: "auto",
        position: "fixed",
        borderRadius: "20px",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        backgroundColor: "rgba(0, 0, 0, 0)",
      }}
    >
      <label
        htmlFor="count"
        style={{
          backgroundColor: "rgba(33, 186, 69, 1)", // Green background
          color: "white",
          padding: "8px 20px",
          borderRadius: "20px 0 0 20px",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Total Records
        {/* {t("Total Records")} */}
      </label>
      <input
        value={rowCount}
        readOnly
        fontSize={"400%"}
        style={{
          width: "90px",
          fontSize: "1.9rem",
          fontWeight: "bold",
          padding: "0 10px",
          margin: "0",
          borderRadius: "0  20px 20px 0",
        }}
      />
    </div>
  );
};

export default bottomBar;
