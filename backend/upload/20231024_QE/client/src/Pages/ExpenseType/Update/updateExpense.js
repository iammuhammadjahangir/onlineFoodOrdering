import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Select, Modal } from "semantic-ui-react";
import { useCustomState } from "../../../Variables/stateVariables";
import MetaData from "../../../MetaData";
import {
  getColorDetails,
  // getExpenseDetails,
  getExpenses,
  updateColor,
  updateExpense,
} from "../../../Api";
import { useTranslation } from "react-i18next";
import {
  getExpenseDetails,
  updateExpenseType,
} from "../../../actions/expenseTypeAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { refreshTokken } from "../../../actions/userAction";
let isCalled = "false";
const UpdateExpense = () => {
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
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { t } = useTranslation();
  const params = useParams();

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

  const backPage = () => {
    navigate("/expense");
  };

  useEffect(() => {
    call();
  }, []);

  async function call() {
    // console.warn(params.id)
    const resp = await getExpenseDetails(params.id);
    setExpenseType(resp.expenseType);
    setExpenseDescription(resp.expenseDescription);

    //console.warn(resp);
  }

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);
  const UpdateExpensedata = async () => {
    // const sum= parseInt(rent) + parseInt(lunchExpenses) + parseInt(guestExpenses) + parseInt(billExpenses) + parseInt(otherExpenses)
    // console.warn(sum)
    updateExpenseType(params.id, expenseType, expenseDescription);
    // updateColor(params.id, rent, lunchExpenses, guestExpenses, billExpenses, otherExpenses, sum);
    navigate("/expense");
  };
  return (
    <>
      <MetaData title="QE ~~UpdateExpenseType" />{" "}
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
              onClick={UpdateExpensedata}
              type="button"
              className={`button button-add-product `}
            >
              {t("updateExpense")}&nbsp;&nbsp;
              <AddIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
    // <Modal open dimmer="inverted" size="tiny" closeIcon="close">
    //   <Modal.Header>{t("updateExpense")}</Modal.Header>
    //   <Modal.Content>
    //     <Form className={"color"}>
    //       <Form.Group widths="equal">
    //         <Form.Input
    //           label={t("expenseType")}
    //           type="text"
    //           placeholder={t("enterExpenseType")}
    //           name="Expense Type"
    //           maxLength="40"
    //           autoComplete="off"
    //           required
    //           value={expenseType}
    //           onChange={(e) => setExpenseType(e.target.value)}
    //         />
    //         <Form.Input
    //           label={t("expenseDescription")}
    //           type="text"
    //           placeholder={t("enterExpenseDescription")}
    //           name="Expense Description"
    //           maxLength="40"
    //           required
    //           autoComplete="off"
    //           value={expenseDescription}
    //           onChange={(e) => setExpenseDescription(e.target.value)}
    //         />
    //       </Form.Group>
    //       <Button
    //         color={"green"}
    //         onClick={UpdateExpensedata}
    //         type="button"
    //         className="button"
    //         floated="right"
    //       >
    //         {t("updateExpense")}
    //       </Button>
    //       <Button
    //         color={"green"}
    //         onClick={backPage}
    //         type="button"
    //         className="button"
    //         floated="left"
    //       >
    //         {t("back")}
    //       </Button>
    //       <br />
    //       <br />
    //     </Form>
    //   </Modal.Content>
    // </Modal>
  );
};

export default UpdateExpense;
