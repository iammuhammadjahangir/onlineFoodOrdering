import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Select, Modal, Message } from "semantic-ui-react";
import swal from "sweetalert2";
import MetaData from "../../../MetaData";
// import { AddColor } from "../../../Api";
import "../../../Styling/AllStyle.css";
import { useCustomState } from "../../../Variables/stateVariables";
import { addExpenses, useTranslationForFunctions } from "../../../Api";
import { useTranslation } from "react-i18next";
import {
  getExpenses,
  postExpenseType,
} from "../../../actions/expenseTypeAction";
import "../expenseTypeCss/expenseType.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { refreshTokken } from "../../../actions/userAction";
let productMatch = "false";
let isCalled = "false";
const ExpenseForm = () => {
  const {
    expenseType,
    setExpenseType,
    expenseDescription,
    setExpenseDescription,
    guestExpenses,
    setGuestExpenses,
    billExpenses,
    setBillExpenses,
    otherExpenses,
    setOtherExpenses,
    total,
    setTotal,
  } = useCustomState();
  const { t } = useTranslation();
  const [colorTheme, setColorTheme] = useState("theme-white");
  // const translationFunctions = useTranslationForFunctions();
  const navigate = useNavigate();

  useEffect(() => {
    isCalled = "false";
  }, [expenseType, expenseDescription]);

  useEffect(() => {
    if (isCalled === "false") {
      isCalled = "true";
      getToken();
    }
  }, [isCalled]);
  const getToken = async () => {
    const token = await refreshTokken();
    if (token.data === "Please login to acces this resource") {
      navigate("/login");
    }
    console.log(token);
  };

  useEffect(() => {
    productMatch = "false";
  });

  const backPage = async () => {
    navigate("/expense");
  };

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  const handleSubmit = async () => {
    const expenseData = await getExpenses();
    console.log(expenseData);

    if (!expenseType || !expenseDescription) {
      return swal.fire({
        icon: "error",
        title: t("titleError"),
        text: t("textAllFieldsAreRequired"),
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    } else {
      expenseData?.map((expnse) => {
        const expenseNam = expnse.expenseType
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase();
        if (
          expenseNam === expenseType.replace(/\s+/g, " ").trim().toLowerCase()
        ) {
          productMatch = "true";
        }
      });
    }
    if (productMatch === "true") {
      return swal.fire({
        icon: "error",
        title: t("titleError"),
        text: "Product Type is already Available",
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    } else {
      const resp = await postExpenseType(expenseType, expenseDescription);
      console.log(resp);
      // console.warn(resp);
      navigate("/expense");
    }
  };
  return (
    <>
      <MetaData title="QE ~~AddExpenseType" />
      <div className={`expenseType ${colorTheme}`}>
        <div className="formInput">
          <div className="row">
            <div className="form1">
              <label>{t("expenseType")}</label>
              <input
                type="text"
                placeholder={t("enterExpenseType")}
                name="productType"
                autoComplete="off"
                maxLength="40"
                required
                value={expenseType}
                onChange={(e) => setExpenseType(e.target.value)}
              />
            </div>
            <div className="form1">
              <label>{t("expenseDescription")}</label>
              <input
                label={t("colorDescription")}
                type="text"
                placeholder={t("enterExpenseDescription")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={expenseDescription}
                onChange={(e) => setExpenseDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="expenseTypeButtons">
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
              onClick={handleSubmit}
              type="button"
              className={`button button-add-product `}
            >
              {t("add-expenses")}&nbsp;&nbsp;
              <AddIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseForm;
