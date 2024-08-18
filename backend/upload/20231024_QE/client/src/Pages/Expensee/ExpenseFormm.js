import React, { useContext, useEffect, useState } from "react";
import MetaData from "../../MetaData";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Dropdown,
  Form,
  Select,
  Modal,
  Message,
} from "semantic-ui-react";
import swal from "sweetalert2";
import "./expenseCss/expense.css";
import { useCustomState } from "../../Variables/stateVariables";
// import { getExpenses } from "../../Api";
// import { State } from "../../purchaseRecipt/context/stateContext";
import { Statee } from "./context/stateContext";
import { useTranslation } from "react-i18next";

import "../../../src/Styling/AllStyle.css";
import Stack from "@mui/material/Stack";
import { TextField, Typography, Box, ButtonGroup } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { getExpenses } from "../../actions/expenseTypeAction";
let expenseeType = [];
const ExpenseFormm = () => {
  const {
    expenses,
    setExpense,
    expenseType,
    setExpenseType,
    expenseDescription,
    setExpenseDescription,
    expenseAmount,
    setExpenseAmount,
    expenseTotal,
    setExpenseTotal,
    handleSubmitt,
  } = useContext(Statee);
  const [expenseTypee, setExpenseTypee] = useState();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [colorTheme, setColorTheme] = useState("theme-white");

  const handleTypeSelectChange = (event, { value }) => {
    setExpenseType(value);
  };

  const backPage = async () => {
    navigate("/expensee");
  };
  useEffect(() => {
    callExpenseType();
    //  console.warn(expenseAmount)
  });

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  async function callExpenseType() {
    expenseeType = await getExpenses();
    setExpenseTypee(expenseeType);
  }
  const addExpense = async () => {
    if (!expenseType || !expenseAmount) {
      swal.fire({
        icon: "error",
        title: t("titleOops"),
        text: t("textExpenseAmountNOtNull"),
        confirmButtonText: "ok",
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    } else {
      handleSubmitt();
      navigate("/expensee");
    }
  };
  return (
    <>
      <MetaData title="QE ~~AddExpense" />
      <div className={`purchase ${colorTheme}`}>
        <div className="formInput">
          <div className="row">
            <div className="form1">
              <label>{t("expenseType")}</label>
              <Dropdown
                className="dropdown"
                options={expenseTypee?.map((element) => ({
                  key: element.expenseType,
                  text: element.expenseType,
                  value: element.expenseType,
                }))}
                placeholder={t("enterExpenseType")}
                selection
                search
                required
                autoComplete="off"
                value={expenseType}
                onChange={handleTypeSelectChange}
              />
            </div>
            <div className="form1">
              <label>{t("expenseAmount")}</label>
              <input
                type="text"
                placeholder={t("enterExpenseAmount")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="form1">
              <label>{t("expenseDescription")}</label>
              <input
                type="text"
                placeholder={t("enterExpenseDescription")}
                name="productType"
                autoComplete="off"
                maxLength="40"
                required
                value={expenseDescription}
                onChange={(e) => setExpenseDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="row"></div>
          <div className="purchaseButtons">
            <Button
              color={"green"}
              onClick={backPage}
              className="button button-back"
              type="button"
            >
              <ArrowBackIcon />
              &nbsp; &nbsp;&nbsp;{t("back")}
            </Button>
            <Button
              onClick={addExpense}
              type="button"
              className={`button button-add-product `}
            >
              {t("add-expenses")}&nbsp;&nbsp;
              <AddIcon />
            </Button>
            {/* {showModalconfirm && <Showconfrm />} */}
          </div>
        </div>
      </div>
    </>
    // <Modal open dimmer="inverted" size="tiny" closeIcon="close">
    //    <Stack  backgroundColor="#ECECEC">
    //     <Stack spacing={2} direction="row" marginLeft={2} alignItems="center" marginTop={1}>
    //       <Typography variant="h5" gutterBottom style={{ color: "#000000"}}>{t("add-expenses")}</Typography>
    //     </Stack>
    //   <Stack padding={3}>

    //   <Modal.Content>
    //     <Form className={"formColorUser"}>
    //       <Form.Group widths="equal">
    //         <Form.Field
    //           control={Select}
    //           label={t("expenseType")}
    //           options={expenseTypee?.map((element) => ({
    //             key: element.expenseType,
    //             text: element.expenseType,
    //             value: element.expenseType,
    //           }))}
    //           required
    //           placeholder={t("enterExpenseType")}
    //           selection
    //           value={expenseType}
    //           onChange={handleTypeSelectChange}
    //         />
    //         <Form.Input
    //           label={t("expenseAmount")}
    //           type="Number"
    //           placeholder={t("enterExpenseAmount")}
    //           name="Expense Amount"
    //           maxLength="40"
    //           autoComplete="off"
    //           required
    //           value={expenseAmount}
    //           onChange={(e) => setExpenseAmount(e.target.value)}
    //         />
    //       </Form.Group>
    //       <Form.Group widths="equal">
    //         <Form.Input
    //           label={t("expenseDescription")}
    //           type="text"
    //           placeholder={t("enterExpenseDescription")}
    //           name="Expense Description"
    //           maxLength="40"
    //           autoComplete="off"
    //           value={expenseDescription}
    //           onChange={(e) => setExpenseDescription(e.target.value)}
    //         />
    //       </Form.Group>
    //       <Button
    //         color={"green"}
    //         onClick={addExpense}
    //         style={{fontSize: "17px", paddingLeft: "10px", paddingRight: "5px", paddingTop: "5px", paddingBottom: "5px" }}
    //         type="button"
    //         className="button"
    //         floated="right"
    //       >
    //         {t("add-expenses")}&nbsp;&nbsp;<AddIcon />
    //       </Button>
    //       <Button
    //         color={"green"}
    //         onClick={backPage}
    //         style={{fontSize: "17px", paddingLeft: "5px", paddingRight: "10px", paddingTop: "5px", paddingBottom: "5px" }}
    //         type="button"
    //         className="button"
    //         floated="left"
    //       >
    //         <ArrowBackIcon />&nbsp;{t("back")}
    //       </Button>
    //       <br />
    //       <br />
    //     </Form>
    //   </Modal.Content>
    //   </Stack>
    //   </Stack>
    // </Modal>
  );
};

export default ExpenseFormm;
