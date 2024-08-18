import React, { useEffect, useState, useRef } from "react";
import MetaData from "../../../MetaData";
// import { getExpense } from "../../../Api/index";
import { searchExpenseConsolidatednvoiceData } from "../../../Components/searchComponent/ConsolidatedReportSearch/expenseReportSearch";
import DatePicker from "react-datepicker";
import ReactToPrint from "react-to-print";
import "../../../stylee/tableStyling.css";
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
import { Button, Form, Dropdown } from "semantic-ui-react";
import PrinterSelectionDropdown from "../../../purchaseRecipt/PrinterSelectionDropdown";
import PrintTableComponent from "../../../Components/tableComponent/printTableComponent";
import PrintLaserTable from "../../../Components/tableComponent/printLaserTable";
import { useTranslation } from "react-i18next";

import { Typography, Box, ButtonGroup } from "@mui/material";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { getExpenseRecord } from "../../../actions/expenseAction";
import { refreshTokken } from "../../../actions/userAction";
import { useNavigate } from "react-router-dom";
import ConsolidatedExpenseData from "./consolidatedExpensedata";
import { getPermissionForRoles } from "../../user/rolesAssigned/RolesPermissionValidation";

import "../../Expensee/expenseCss/expense.css";
let expenseRecord = [];
let totalExpense = [];
let isCalledd = "false";
const ConsolidatedExpenseReport = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  //printerOption
  const [selectedPrinter, setSelectedPrinter] = useState();
  const [selected, setSelected] = useState(false);
  const [colorTheme, setColorTheme] = useState("theme-white");
  //General UseState
  const [isCalled, setIsCalled] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const consolidatedExpenseInvoice = useRef();

  //UseState For setting dropDowns values
  const [expenseTypeDropDown, setExpenseTypeDropDown] = useState("");
  const [expenseCategoryDropDown, setExpenseCategoryDropDown] = useState("");
  const [expenseShopNoDropDown, setExpenseShopNoDropDown] = useState("");
  const [expenseStartDateDropDown, setexpenseStartDateDropDown] =
    useState(null);
  const [expenseEndDateDropDown, setExpenseEndDateDropDown] = useState(null);

  //useStates For Seting dropdown data on page loading
  const [expenseTypeData, setExpenseTypeData] = useState([]);
  const [expenseShopNoData, setExpenseShopNoData] = useState([]);
  const [expenseConslidatedPermission, setExpenseConslidatedPermission] =
    useState(false);

  //ArrayForExpenseCategory
  const expenseCategoryArray = [
    { key: "Daily", text: "Daily", value: "Daily" },
    { key: "Monthly", text: "Monthly", value: "Monthly" },
  ];
  useEffect(() => {
    setExpenseConslidatedPermission(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles(
        "View Consolidated Expense Invoice"
      );
      setExpenseConslidatedPermission(permissionForAdd);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const currentColorTheme = localStorage.getItem("theme-color");
    if (currentColorTheme) {
      setColorTheme(currentColorTheme);
    }
  }, [colorTheme]);

  useEffect(() => {
    isCalledd = "false";
  });
  useEffect(() => {
    if (isCalledd === "false") {
      isCalledd = "true";
      getToken();
    }
  }, []);
  const getToken = async () => {
    const token = await refreshTokken();
    if (token.data === "Please login to acces this resource") {
      navigate("/login");
    }
    console.log(token);
  };

  ////////======================================================///////////////
  /////======== Handle All Daily, weekly, Monthly, Yearly Data ======////////
  ///////======================================================///////////////

  const DateOptions = [
    { key: "today", value: "Today", text: "Today" },
    { key: "week", value: "This Week", text: "This Week" },
    { key: "month", value: "This Month", text: "This Month" },
    { key: "year", value: "This Year", text: "This Year" },
    { key: "all", value: "All", text: "All" },
  ];
  const [yourData, setYourData] = useState();
  const [selectedOption, setSelectedOption] = useState();
  // const [yourData, setYourData] = useState([...]); // Your array of data

  // Function to filter data based on the selected option
  const filterData = (option) => {
    console.log(option);
    console.log("callled");
    const currentDate = new Date();
    let startDate, endDate;

    switch (option) {
      case "Today":
        startDate = new Date(currentDate);
        startDate.setHours(0, 0, 0, 0); // Set to 12:00 AM (midnight)
        endDate = new Date(currentDate);
        endDate.setHours(23, 59, 59, 999);
        console.log(startDate);
        console.log(endDate);
        break;
      case "This Week":
        startDate = new Date(currentDate);
        // Calculate the number of days to subtract to reach the start of the week (Saturday)
        const daysUntilSaturday = (6 - currentDate.getDay() + 1) % 7;
        console.log(currentDate.getDay());
        console.log(daysUntilSaturday);
        startDate.setDate(currentDate.getDate() - daysUntilSaturday);
        startDate.setHours(0, 0, 0, 0); // Set to 12:00 AM (midnight)

        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6); // End of the week (Saturday)
        endDate.setHours(23, 59, 59, 999); // Set to 11:59:59 PM (end of the day)
        break;
      case "This Month":
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        ); // Start of the month
        endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        ); // End of the month
        break;
      case "This Year":
        startDate = new Date(currentDate.getFullYear(), 0, 1); // Start of the year
        endDate = new Date(currentDate.getFullYear(), 11, 31); // End of the year
        console.log(startDate);
        console.log(endDate);
        break;
      default:
        startDate = null;
        endDate = null;
        break;
    }
    // Filter the data based on the date range
    const filteredData = yourData?.filter((item) => {
      const itemDate = new Date(item.createdAt); // Replace 'date' with the actual date field in your data

      return startDate && endDate
        ? itemDate >= startDate && itemDate <= endDate
        : true;
    });
    return filteredData;
  };

  // Handle the dropdown selection
  const handleDropdownChange = (event, { value }) => {
    console.log(value);
    setSelectedOption(value);
    const filteredData = filterData(value);
    expenseRecord = filteredData;
  };

  ////////======================================================///////////////
  /////========End of  Handle All Daily, weekly, Monthly, Yearly Data ======////////
  ///////======================================================///////////////

  //selectedPrinter
  const handleSelectPrinter = (printer) => {
    setSelectedPrinter(printer);
    setSelected(true);
  };

  //select language
  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
  }, []);

  //to load components on loading page
  useEffect(() => {
    isCalled &&
      getData().then(() => {
        expenseTypeFunctionFunction();
        getShopNoFunction();
      });
  }, []);

  //To get the Purchase array fom the data base
  const getData = async () => {
    let data = await getExpenseRecord();
    console.log(data);

    if (
      !JSON.parse(localStorage.getItem("isAdministrator")) ||
      !JSON.parse(localStorage.getItem("isSuperAdmin"))
    ) {
      console.log("chie");
      data = data?.reduce((filteredProducts, product) => {
        if (
          product.expenseLocation.shopCode ===
          JSON.parse(localStorage.getItem("shopId"))
        ) {
          filteredProducts.push(product);
        }
        return filteredProducts;
      }, []);
    }

    console.log(data);
    expenseRecord = data;
    setYourData([...data]);
    setIsCalled(false);
  };

  //Function to get Data of Shop No and Store them in an array
  const getShopNoFunction = () => {
    //map function only to get one column to show on dropDown
    const expenseShopArray = expenseRecord?.map(
      (item) => item.expenseLocation.shopCode
    );

    //Function to Return Unique value
    const uniqueShopNoArray = expenseShopArray?.filter(
      (code, index) => expenseShopArray.indexOf(code) === index
    );
    setExpenseShopNoData(uniqueShopNoArray.sort());
  };

  //Function to get expense Type
  const expenseTypeFunctionFunction = () => {
    const typesArray = [];

    // Loop through the mainArray and extract the codes and Company
    expenseRecord?.forEach((items) => {
      const products = items.expenses;
      products?.forEach((product) => {
        typesArray.push(product.expenseType);
      });
    });

    //Function to remove Dublicate DropDown Data
    const uniqueTypesArray = typesArray?.filter(
      (code, index) => typesArray.indexOf(code) === index
    );

    //set Code and Company for Drop Down Data
    setExpenseTypeData(uniqueTypesArray);
  };

  //Function To handle the Shop No Value that would be Purcahse in fiter
  const handleShopNovalue = (event, { value }) => {
    setExpenseShopNoDropDown(value);
  };
  //Function To handle the code Value that would be Purchase in fiter
  const handleExpenseTypevalue = (event, { value }) => {
    setExpenseTypeDropDown(value);
  };
  //Function To handle the Comapny Value that would be Purchase in fiter
  const handleExpenseCategoryvalue = (event, { value }) => {
    setExpenseCategoryDropDown(value);
  };

  //Function to set Starting Date
  const handleDateSelectChange = (date) => {
    setexpenseStartDateDropDown(date);
  };

  //Function to set Ending Date
  const handleSelectEndDateChange = (date) => {
    setExpenseEndDateDropDown(date);
  };

  //Function to search element
  const handleSearch = async () => {
    const finalDataForTable = await searchExpenseConsolidatednvoiceData(
      expenseRecord,
      expenseShopNoDropDown,
      expenseCategoryDropDown,
      expenseTypeDropDown,
      expenseStartDateDropDown,
      expenseEndDateDropDown
    );

    setTableData(finalDataForTable);

    //To calculate the total of all the Calculating value for Footer

    //Calculating Quantity
    totalExpense = finalDataForTable
      ?.reduce((sum, product) => sum + parseInt(product.expenseAmount, 10), 0)
      .toString();

    //To disabled All the Buttons when data is fetched till we clear table record
    setIsDisabled(true);
  };

  const columns = [
    { field: "expenseType", label: "Expense Type" },
    { field: "expenseAmount", label: "Expense Amount" },
    { field: "expenseCategory", label: "Category" },
    { field: "expenseLocation.shopCode", label: "Expense Location" },
  ];

  return (
    <>
      <MetaData title="QE ~~ExpenseInvoice" />
      <div className={`expense ${colorTheme}`}>
        {expenseConslidatedPermission && (
          <>
            <div className="contentt-box">
              <div className="heading-container">
                <h3>{t("textConsolidatedExpenseInvoice")}</h3>
              </div>
            </div>
            <div className="search-Purchase-box">
              {(JSON.parse(localStorage.getItem("isAdministrator")) ||
                JSON.parse(localStorage.getItem("isSuperAdmin"))) && (
                <Dropdown
                  options={expenseShopNoData?.map((element) => ({
                    key: element,
                    text: element,
                    value: element,
                  }))}
                  placeholder={t("selectShop")}
                  className="purchaseDropdown1"
                  fluid
                  search
                  selection
                  disabled={isDisabled}
                  value={expenseShopNoDropDown}
                  onChange={handleShopNovalue}
                />
              )}
              <Dropdown
                options={expenseTypeData?.map((element) => ({
                  key: element,
                  text: element,
                  value: element,
                }))}
                placeholder={t("textExpenseType")}
                fluid
                search
                className="purchaseDropdown"
                selection
                disabled={isDisabled}
                value={expenseTypeDropDown}
                onChange={handleExpenseTypevalue}
                style={{ zIndex: "9" }}
              />
              <Dropdown
                options={expenseCategoryArray?.map((element) => ({
                  key: element.key,
                  text: element.text,
                  value: element.value,
                }))}
                placeholder={t("textExpenseCategory")}
                fluid
                search
                className="purchaseDropdown"
                selection
                disabled={isDisabled}
                value={expenseCategoryDropDown}
                onChange={handleExpenseCategoryvalue}
                // style={{ flex: 1, width: "100px" }}
              />
              <DatePicker
                selected={expenseStartDateDropDown}
                onChange={handleDateSelectChange}
                placeholderText={t("startingDate")}
                dateFormat="dd/MM/yyyy"
                className="datePicker"
                disabled={isDisabled}
                // style={{ flex: 1 }}
              />
              <DatePicker
                selected={expenseEndDateDropDown}
                onChange={handleSelectEndDateChange}
                placeholderText={t("endingDate")}
                dateFormat="dd/MM/yyyy"
                // style={{ flex: 1 }}
                disabled={isDisabled}
                className="datePicker"
              />
              <Dropdown
                placeholder={t("selectTimePeriod")}
                fluid
                search
                className="consolidatePurchaseDropdown"
                selection
                options={DateOptions}
                value={selectedOption}
                onChange={handleDropdownChange}
              />
              <Button className="buttonPurchase" onClick={handleSearch}>
                {t("search")}&nbsp;&nbsp;{<SearchIcon />}
              </Button>
              <Button
                className="buttonPurchase"
                onClick={() => {
                  setTableData([]);
                  setExpenseShopNoDropDown("");
                  setExpenseCategoryDropDown("");
                  setExpenseTypeDropDown("");
                  setexpenseStartDateDropDown("");
                  setExpenseEndDateDropDown("");
                  setSelectedOption("");
                  setSelectedPrinter("");
                  setSelected(false);
                  setIsDisabled(false);
                }}
              >
                {t("clear")}&nbsp;&nbsp;{<ClearAllIcon />}
              </Button>
            </div>
            <div className="Purchase-table-container">
              <div className="consolidatedPritnterSection">
                {tableData?.length > 0 && (
                  <>
                    <div className="printerDropDown">
                      <PrinterSelectionDropdown
                        selectedPrinter={selectedPrinter}
                        onSelectPrinter={handleSelectPrinter}
                      />
                    </div>
                    <div className="consolidatePrintButton">
                      <ReactToPrint
                        trigger={() =>
                          selected ? (
                            <button className="bg-blue-500 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
                              Print / Downloads
                            </button>
                          ) : (
                            <h1></h1>
                          )
                        }
                        content={() => consolidatedExpenseInvoice.current}
                        onAfterPrint={() => {
                          setTableData([]);
                          setExpenseShopNoDropDown("");
                          setExpenseCategoryDropDown("");
                          setExpenseTypeDropDown("");
                          setexpenseStartDateDropDown("");
                          setExpenseEndDateDropDown("");
                          setSelectedPrinter("");
                          setSelectedOption("");
                          setSelected(false);
                          setIsDisabled(false);
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
              <div
                ref={consolidatedExpenseInvoice}
                className="consolidateMainTableDiv"
              >
                <div>
                  <ConsolidatedExpenseData
                    props={{
                      tableData: tableData,
                      selectedPrinter: selectedPrinter,
                      totalExpense: totalExpense,
                      expenseCategoryDropDown: expenseCategoryDropDown,
                      expenseShopNoDropDown: expenseShopNoDropDown,
                      expenseTypeDropDown: expenseTypeDropDown,
                      expenseStartDateDropDown: expenseStartDateDropDown,
                      expenseEndDateDropDown: expenseEndDateDropDown,
                    }}
                  />
                </div>
                <div>
                  {selectedPrinter === "thermal" ? (
                    <PrintTableComponent data={tableData} columns={columns} />
                  ) : (
                    <PrintLaserTable data={tableData} columns={columns} />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
    // <div className="div1Container">
    //   <div style={{ width: "75%" }}>
    //     <Stack spacing={2} direction="row" alignItems="center">
    //       <Typography
    //         className="typograpgy"
    //         style={{ color: "#000000", fontSize: 30 }}
    //       >
    //         {t("textConsolidatedExpenseInvoice")}
    //       </Typography>
    //     </Stack>
    //     <Stack
    //       backgroundColor="white"
    //       borderRadius="50px 50px 0 0"
    //       padding={1}
    //       marginTop={1}
    //     >
    //       <Stack
    //         direction={{ xs: "column", sm: "row" }}
    //         spacing={3}
    //         padding={3}
    //       >
    //         <Form style={{ width: "100%" }}>
    //           <Stack
    //             direction="row"
    //             sx={{
    //               display: "flex",
    //               flexDirection: "row",
    //               justifyContent: "space-between",
    //               width: "100%",
    //             }}
    //           >
    //             <Form.Group
    //               widths="equal"
    //               style={{ display: "flex", gap: "30px" }}
    //             >
    //               {JSON.parse(localStorage.getItem("isAdministrator")) && (
    //                 <Dropdown
    //                   options={expenseShopNoData?.map((element) => ({
    //                     key: element,
    //                     text: element,
    //                     value: element,
    //                   }))}
    //                   placeholder={t("selectShop")}
    //                   fluid
    //                   search
    //                   selection
    //                   clearable
    //                   disabled={isDisabled}
    //                   value={expenseShopNoDropDown}
    //                   onChange={handleShopNovalue}
    //                   style={{ flex: 1, padding: "10px", width: "200px" }}
    //                 />
    //               )}{" "}
    //               <Dropdown
    //                 options={expenseTypeData?.map((element) => ({
    //                   key: element,
    //                   text: element,
    //                   value: element,
    //                 }))}
    //                 placeholder={t("textExpenseType")}
    //                 fluid
    //                 search
    //                 selection
    //                 clearable
    //                 disabled={isDisabled}
    //                 value={expenseTypeDropDown}
    //                 onChange={handleExpenseTypevalue}
    //                 style={{ flex: 1, width: "100px" }}
    //               />
    //               <Dropdown
    //                 options={expenseCategoryArray?.map((element) => ({
    //                   key: element.key,
    //                   text: element.text,
    //                   value: element.value,
    //                 }))}
    //                 placeholder={t("textExpenseCategory")}
    //                 fluid
    //                 search
    //                 selection
    //                 clearable
    //                 disabled={isDisabled}
    //                 value={expenseCategoryDropDown}
    //                 onChange={handleExpenseCategoryvalue}
    //                 style={{ flex: 1, width: "100px" }}
    //               />
    //               <DatePicker
    //                 selected={expenseStartDateDropDown}
    //                 onChange={handleDateSelectChange}
    //                 placeholderText={t("startingDate")}
    //                 dateFormat="dd/MM/yyyy"
    //                 style={{
    //                   flex: 1,
    //                   backgroundColor: "transparent",
    //                   border: "1px solid rgba(0, 0, 0, 0.1)",
    //                   borderRadius: "20px 20px 20px 20px",
    //                 }}
    //                 disabled={isDisabled}
    //               />
    //               <DatePicker
    //                 selected={expenseEndDateDropDown}
    //                 onChange={handleSelectEndDateChange}
    //                 placeholderText={t("endingDate")}
    //                 dateFormat="dd/MM/yyyy"
    //                 style={{ flex: 1 }}
    //                 disabled={isDisabled}
    //               />
    //               <Dropdown
    //                    placeholder={t("selectTimePeriod")}
    //                    fluid
    //                    search
    //                    selection
    //                    clearable
    //                    style={{ flex: 1,width:"100px" }}
    //                   options={DateOptions}
    //                   value={selectedOption}
    //                   onChange={handleDropdownChange}
    //                 />
    //             </Form.Group>
    //             <Form.Group
    //               widths="equal"
    //               style={{ display: "flex", gap: "20px" }}
    //             >
    //               <Button
    //                 style={{
    //                   backgroundColor: "transparent",
    //                   border: "1px solid rgba(0, 0, 0, 0.1)",
    //                   borderRadius: "10px 10px 10px 10px",
    //                   fontWeight: "bold",
    //                 }}
    //                 onClick={handleSearch}
    //               >
    //                 {t("search")}&nbsp;&nbsp;{<SearchIcon />}
    //               </Button>
    //               <Button
    //                 style={{
    //                   backgroundColor: "transparent",
    //                   border: "1px solid rgba(0, 0, 0, 0.1)",
    //                   borderRadius: "10px 10px 10px 10px",
    //                   fontWeight: "bold",
    //                 }}
    //                 onClick={() => {
    //                   setTableData([]);
    //                   setExpenseShopNoDropDown("");
    //                   setExpenseCategoryDropDown("");
    //                   setExpenseTypeDropDown("");
    //                   setexpenseStartDateDropDown("");
    //                   setExpenseEndDateDropDown("");
    //                   setSelectedOption("")
    //                   setSelectedPrinter("");
    //                   setSelected(false);
    //                   setIsDisabled(false);
    //                 }}
    //               >
    //                 {t("clear")}&nbsp;&nbsp;{<ClearAllIcon />}
    //               </Button>
    //             </Form.Group>
    //           </Stack>
    //         </Form>
    //       </Stack>
    //     </Stack>
    //     <div className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200">
    //       {tableData?.length > 0 && (
    //         <>
    //           <PrinterSelectionDropdown
    //             selectedPrinter={selectedPrinter}
    //             onSelectPrinter={handleSelectPrinter}
    //           />
    //           <ReactToPrint
    //             trigger={() =>
    //               selected ? (
    //                 <button className="bg-blue-500 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
    //                   Print / Downloads
    //                 </button>
    //               ) : (
    //                 <h1></h1>
    //               )
    //             }
    //             content={() => consolidatedExpenseInvoice.current}
    //             onAfterPrint={() => {
    //               setTableData([]);
    //               setExpenseShopNoDropDown("");
    //               setExpenseCategoryDropDown("");
    //               setExpenseTypeDropDown("");
    //               setexpenseStartDateDropDown("");
    //               setExpenseEndDateDropDown("");
    //               setSelectedPrinter("");
    //               setSelectedOption("")
    //               setSelected(false);
    //               setIsDisabled(false);
    //             }}
    //           />
    //         </>
    //       )}

    //       <div ref={consolidatedExpenseInvoice} className="p-5">
    //       <ConsolidatedExpenseData
    //           props={{
    //             tableData: tableData,
    //             selectedPrinter: selectedPrinter,
    //             totalExpense: totalExpense,
    //             expenseCategoryDropDown: expenseCategoryDropDown,
    //             expenseShopNoDropDown: expenseShopNoDropDown,
    //             expenseTypeDropDown: expenseTypeDropDown,
    //             expenseStartDateDropDown: expenseStartDateDropDown,
    //             expenseEndDateDropDown: expenseEndDateDropDown
    //           }}
    //         />
    //         {tableData?.length > 0 ? (
    //           <>
    //             {selectedPrinter === "thermal" ? (
    //               <>
    //                 <table
    //                   className="mt-10 table1"
    //                   style={{ fontSize: "10px", whiteSpace: "nowrap" }}
    //                 >
    //                   <tr
    //                     style={{
    //                       marginTop: "-10px",
    //                       gap: "50px",
    //                       padding: "0px",
    //                       marginBottom: "-10px",
    //                     }}
    //                   >
    //                     <td
    //                       className="td1"
    //                       style={{
    //                         marginTop: "-30px",
    //                         marginBottom: "0px",
    //                         marginRight: "10px",
    //                       }}
    //                     >
    //                       {" "}
    //                       <span className="font-bold td1">
    //                         Total Expense:
    //                       </span>{" "}
    //                       {totalExpense}
    //                     </td>
    //                     {expenseCategoryDropDown ? (
    //                       <td
    //                         className="td1"
    //                         style={{
    //                           marginTop: "-30px",
    //                           marginBottom: "0px",
    //                           marginLeft: "10px",
    //                           paddingLeft: "50px",
    //                         }}
    //                       >
    //                         {" "}
    //                         <span className="font-bold td1">
    //                           Expense Category:
    //                         </span>{" "}
    //                         {expenseCategoryDropDown}
    //                       </td>
    //                     ) : (
    //                       <td></td>
    //                     )}
    //                   </tr>
    //                   <tr style={{ marginTop: "-30px", marginBottom: "0px" }}>
    //                     {expenseShopNoDropDown ? (
    //                       <td
    //                         className="td1"
    //                         style={{
    //                           marginTop: "-30px",
    //                           marginBottom: "0px",
    //                           marginLeft: "10px",
    //                           paddingLeft: "50px",
    //                         }}
    //                       >
    //                         {" "}
    //                         <span className="font-bold td1">Shop No:</span>{" "}
    //                         {expenseShopNoData}
    //                       </td>
    //                     ) : (
    //                       <td></td>
    //                     )}
    //                     {expenseTypeDropDown ? (
    //                       <td
    //                         className="td1"
    //                         style={{
    //                           marginTop: "-30px",
    //                           marginBottom: "0px",
    //                           marginLeft: "10px",
    //                           paddingLeft: "50px",
    //                         }}
    //                       >
    //                         {" "}
    //                         <span className="font-bold td1">
    //                           Expense Type:
    //                         </span>{" "}
    //                         {expenseTypeDropDown}
    //                       </td>
    //                     ) : (
    //                       <td></td>
    //                     )}
    //                   </tr>
    //                   <tr style={{ marginTop: "-30px", marginBottom: "0px" }}>
    //                     {expenseStartDateDropDown ? (
    //                       <td
    //                         className="td1"
    //                         style={{
    //                           marginTop: "-30px",
    //                           marginBottom: "0px",
    //                           marginLeft: "10px",
    //                           paddingLeft: "50px",
    //                         }}
    //                       >
    //                         {" "}
    //                         <span className="font-bold td1">
    //                           Starting Date:
    //                         </span>{" "}
    //                         {expenseStartDateDropDown.toLocaleDateString(
    //                           "en-GB"
    //                         )}
    //                       </td>
    //                     ) : (
    //                       <td></td>
    //                     )}
    //                     {expenseEndDateDropDown ? (
    //                       <td
    //                         className="td1"
    //                         style={{
    //                           marginTop: "-30px",
    //                           marginBottom: "0px",
    //                           marginLeft: "10px",
    //                           paddingLeft: "50px",
    //                         }}
    //                       >
    //                         {" "}
    //                         <span className="font-bold td1">
    //                           Ending Date:
    //                         </span>{" "}
    //                         {expenseEndDateDropDown.toLocaleDateString("en-GB")}
    //                       </td>
    //                     ) : (
    //                       <td></td>
    //                     )}
    //                   </tr>
    //                 </table>
    //               </>
    //             ) : (
    //               <>
    //                 <table className="table1" style={{ margin: 0 }}>
    //                   <tr className="tr1">
    //                     <td>
    //                       {" "}
    //                       <span className="font-bold td1">
    //                         Total Expense:
    //                       </span>{" "}
    //                       {totalExpense}
    //                     </td>
    //                     {expenseCategoryDropDown ? (
    //                       <td>
    //                         {" "}
    //                         <span className="td1">Expense Category:</span>{" "}
    //                         {expenseCategoryDropDown}
    //                       </td>
    //                     ) : (
    //                       <td></td>
    //                     )}
    //                   </tr>
    //                   <tr>
    //                     {expenseShopNoDropDown ? (
    //                       <td>
    //                         {" "}
    //                         <span className="font-bold td1">Shop No:</span>{" "}
    //                         {expenseShopNoDropDown}
    //                       </td>
    //                     ) : (
    //                       <td></td>
    //                     )}
    //                     {expenseTypeDropDown ? (
    //                       <td>
    //                         {" "}
    //                         <span className="font-bold td1">
    //                           Expense Type:
    //                         </span>{" "}
    //                         {expenseTypeDropDown}
    //                       </td>
    //                     ) : (
    //                       <td></td>
    //                     )}
    //                   </tr>
    //                   <tr>
    //                     {expenseStartDateDropDown ? (
    //                       <td>
    //                         {" "}
    //                         <span className="font-bold td1">
    //                           Starting Date:
    //                         </span>{" "}
    //                         {expenseStartDateDropDown.toLocaleDateString(
    //                           "en-GB"
    //                         )}
    //                       </td>
    //                     ) : (
    //                       <td></td>
    //                     )}
    //                     {expenseEndDateDropDown ? (
    //                       <td>
    //                         {" "}
    //                         <span className="font-bold td1">
    //                           Ending Date:
    //                         </span>{" "}
    //                         {expenseEndDateDropDown.toLocaleDateString("en-GB")}
    //                       </td>
    //                     ) : (
    //                       <td></td>
    //                     )}
    //                   </tr>
    //                 </table>
    //               </>
    //             )}
    //           </>
    //         ) : (
    //           <h1></h1>
    //         )}
    //         {selectedPrinter === "thermal" ? (
    //           <PrintTableComponent data={tableData} columns={columns} />
    //         ) : (
    //           <PrintLaserTable data={tableData} columns={columns} />
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ConsolidatedExpenseReport;
