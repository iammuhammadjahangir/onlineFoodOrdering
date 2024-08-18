import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomState } from "../../../Variables/stateVariables";
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
import { useTranslation } from "react-i18next";
import Stack from "@mui/material/Stack";
import { Loader } from "semantic-ui-react";
import "../../../table.css";
import {
  deleteExpenseType,
  getExpenses,
} from "../../../actions/expenseTypeAction";
import "../expenseTypeCss/expenseType.css";
import { refreshTokken } from "../../../actions/userAction";
let isCalled = "false";
const ExpenseTable = () => {
  const { colorName, setColorName, loading, setLoading, data, setData } =
    useCustomState();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const linkk = "updateExpense";
  const actionUpdate = "Update";
  const action3 = "Delete";

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  useEffect(() => {
    isCalled = "false";
  }, [data]);

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
    console.log("called");
    call();
  }, []);

  const call = async () => {
    console.log("call");
    const resp = await getExpenses();
    // console.warn(resp);
    setData(resp);
    setLoading(true);
  };

  const deleteExp = async (id) => {
    const data = await deleteExpenseType(id);
    console.log(data);
  };
  const columns = [
    { field: "expenseType", label: t("expenseType") },
    { field: "expenseDescription", label: t("expenseDescription") },
  ];

  const actions = [
    {
      label: "Delete",
      color: "yellow",
      handler: (itemId) => deleteExp(itemId),
    },
    {
      label: "Update",
      color: "green",
      url: (itemId) => `/updateExpense/${itemId}`,
    },
  ];
  return (
    <>
      <div className={`expenseType ${colorTheme}`}>
        <div className="search-withouInputfields-box"></div>

        <div className="table-container">
          {loading ? (
            <TableComponentId
              data={data}
              columns={columns}
              actions={actions}
              linkk={linkk}
              actionUpdate={actionUpdate}
              action3={action3}
            />
          ) : (
            <Loader active>Loading</Loader>
          )}
        </div>
      </div>
    </>
    // <>
    // <Stack  backgroundColor="white"   borderRadius="50px 50px 0 0" padding={1} marginTop={1}>
    //       <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} padding={3}>

    //       </Stack>
    //   </Stack>

    //   <div>
    //     {loading ? (
    //       <TableComponentId
    //         data={data}
    //         columns={columns}
    //         actions={actions}
    //         linkk={linkk}
    //         actionUpdate={actionUpdate}
    //         action3={action3}
    //       />
    //     ) : (
    //       <Loader active>Loading</Loader>
    //     )}
    //   </div>
    // </>
  );
};

export default ExpenseTable;
