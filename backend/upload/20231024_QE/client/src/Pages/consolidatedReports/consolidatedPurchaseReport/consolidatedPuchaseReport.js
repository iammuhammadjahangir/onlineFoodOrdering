import React, { useEffect, useState, useRef } from "react";
// import { getPurchaseRecord } from "../../../Api/index";
import DatePicker from "react-datepicker";
import ReactToPrint from "react-to-print";
import "../../../stylee/tableStyling.css";
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
import MetaData from "../../../MetaData";
import { searchPurchaseConsolidatednvoiceData } from "../../../Components/searchComponent/ConsolidatedReportSearch/purchaseReportSeach";
import { Button, Form, Dropdown, Container, Search } from "semantic-ui-react";
import PrinterSelectionDropdown from "../../../purchaseRecipt/PrinterSelectionDropdown";
import PrintTableComponent from "../../../Components/tableComponent/printTableComponent";
import PrintLaserTable from "../../../Components/tableComponent/printLaserTable";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Typography, Box, ButtonGroup } from "@mui/material";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { getPurchaseConsolidatedRecord } from "../../../actions/purchaseAction";
import { refreshTokken } from "../../../actions/userAction";
import ConsolidatePurchaseData from "./consolidatePurchaseData";
import { getPermissionForRoles } from "../../user/rolesAssigned/RolesPermissionValidation";

import "../../Product/Css/app.css";
import "../../../purchaseRecipt/PurchaseCss/purchase.css";
let PurchaseRecord = [];
let isCalledd = "false";
let quantity = [];
let discount = [];
let totalPriceExculdingTax = [];
let totalTaxAmount = [];
let totalAmountIncludingAllPrices = [];
const ConsolidatedPuchaseReport = (props) => {
  const action4 = "ConsolReport";
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  //printerOption
  const [selectedPrinter, setSelectedPrinter] = useState();
  const [selected, setSelected] = useState(false);
  const [colorTheme, setColorTheme] = useState("theme-white");
  //General UseState
  const [isCalled, setIsCalled] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [showComponent, setShowComponent] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const consolidatedPurchaseInvoice = useRef();
  const [purchaseConsolidatedPermission, setPurchaseConsolidatedPermission] =
    useState(false);

  //UseState For setting dropDowns values

  const [purchaseProductShopNoDropDown, setPurchaseProductShopNoDropDown] =
    useState("");
  const [purchaseProductCodeDropDown, setPurchaseProductCodeDropDown] =
    useState("");
  const [purchaseProductCompanyDropDown, setPurchaseProductCompanyDropDown] =
    useState("");
  const [purchaseStartDateDropDown, setPurchaseStartDateDropDown] =
    useState(null);
  const [purchaseEndDateDropDown, setPurchaseEndDateDropDown] = useState(null);

  //useStates For Seting dropdown data on page loading
  const [shopNoData, setShopNoData] = useState([]);
  const [purchaseProductCodeData, setPurchaseProductCodeData] = useState([]);
  const [purchaseProductcompanyData, setPurchaseProductcompanyData] = useState(
    []
  );

  useEffect(() => {
    setPurchaseConsolidatedPermission(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles(
        "View Consolidated Purchase Invoice"
      );
      setPurchaseConsolidatedPermission(permissionForAdd);
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
    PurchaseRecord = filteredData;
    // handleSearch()
    // Do something with the filtered data, e.g., update your component state or render it
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
        getShopNoFunction();
        PurchaseProductCodesAndCompanyFunction();
      });
  }, []);

  //To get the Purchase array fom the data base
  const getData = async () => {
    // let data = await getPurchaseRecord();
    let data = await getPurchaseConsolidatedRecord();

    if (!JSON.parse(localStorage.getItem("isAdministrator"))) {
      data = data?.reduce((filteredProducts, product) => {
        if (product.shopNo === JSON.parse(localStorage.getItem("shopId"))) {
          filteredProducts.push(product);
        }
        return filteredProducts;
      }, []);
    }

    console.log(data);
    PurchaseRecord = data;
    setYourData([...data]);
    setIsCalled(false);
  };

  //Function to get Data of Shop No and Store them in an array
  const getShopNoFunction = () => {
    //map function only to get one column to show on dropDown
    const salesArray = PurchaseRecord?.map((item) => item.shopNo);

    //Function to Return Unique value
    const uniqueShopNoArray = salesArray?.filter(
      (code, index) => salesArray.indexOf(code) === index
    );
    setShopNoData(uniqueShopNoArray);
  };

  //Function to get Code From Purchase Products
  const PurchaseProductCodesAndCompanyFunction = () => {
    const codesArray = [];
    const companyArray = [];

    // Loop through the mainArray and extract the codes and Company
    PurchaseRecord?.forEach((items) => {
      const products = items.products;
      products?.forEach((product) => {
        codesArray.push(product.Code);
        companyArray.push(product.Company);
      });
    });

    //Function to remove Dublicate DropDown Data
    const uniqueCodesArray = codesArray?.filter(
      (code, index) => codesArray.indexOf(code) === index
    );
    const uniqueCompanyArray = companyArray?.filter(
      (code, index) => companyArray.indexOf(code) === index
    );

    //set Code and Company for Drop Down Data
    setPurchaseProductCodeData(uniqueCodesArray);
    setPurchaseProductcompanyData(uniqueCompanyArray);
  };

  //Function To handle the Shop No Value that would be Purcahse in fiter
  const handleShopNovalue = (event, { value }) => {
    setPurchaseProductShopNoDropDown(value);
  };
  //Function To handle the code Value that would be Purchase in fiter
  const handlePurchasesCodevalue = (event, { value }) => {
    setPurchaseProductCodeDropDown(value);
  };
  //Function To handle the Comapny Value that would be Purchase in fiter
  const handlePurchaseComapnyvalue = (event, { value }) => {
    setPurchaseProductCompanyDropDown(value);
  };

  //Function to set Starting Date
  const handleDateSelectChange = (date) => {
    setPurchaseStartDateDropDown(date);
  };

  //Function to set Ending Date
  const handleSelectEndDateChange = (date) => {
    setPurchaseEndDateDropDown(date);
  };

  //Function to search element
  const handleSearch = async () => {
    const finalDataForTable = await searchPurchaseConsolidatednvoiceData(
      PurchaseRecord,
      purchaseProductShopNoDropDown,
      purchaseProductCodeDropDown,
      purchaseProductCompanyDropDown,
      purchaseStartDateDropDown,
      purchaseEndDateDropDown
    );

    setTableData(finalDataForTable);

    //To calculate the total of all the Calculating value for Footer

    //Calculating Quantity
    quantity = finalDataForTable
      ?.reduce(
        (sum, product) => sum + parseInt(product.PurchaseQuantity, 10),
        0
      )
      .toString();

    //Calculating Discount
    discount = finalDataForTable
      ?.reduce(
        (sum, product) => sum + parseInt(product.purchaseTotalDiscount, 10),
        0
      )
      .toString();

    //Calculating Total Price Without Tax
    totalPriceExculdingTax = finalDataForTable
      ?.reduce(
        (sum, product) => sum + parseInt(product.purchaseQuantityPrice, 10),
        0
      )
      .toString();

    //Calculating Tax Amount
    totalTaxAmount = finalDataForTable
      ?.reduce(
        (sum, product) => sum + parseInt(product.purchaseTotalTax, 10),
        0
      )
      .toString();

    totalTaxAmount = Number(totalTaxAmount);
    totalTaxAmount = totalTaxAmount.toFixed(2);
    //Calculating Total Amount Including All prices
    totalAmountIncludingAllPrices = finalDataForTable
      .reduce(
        (sum, product) => sum + parseInt(product.purchaseTotalAmount, 10),
        0
      )
      .toString();

    //To disabled All the Buttons when data is fetched till we clear table record
    setIsDisabled(true);
  };

  const columns = [
    { field: "Code", label: "Code" },
    { field: "Namee", label: "Name" },
    { field: "Company", label: "Company" },
    { field: "PurchaseQuantity", label: "Quantity" },
    { field: "purchasePrice", label: "Price" },
    { field: "purchaseTotalDiscount", label: "Discount" },
    { field: "purchaseQuantityPrice", label: "Total Price" },
    { field: "purchaseTotalTax", label: "Tax Amount" },
    { field: "purchaseTotalAmount", label: "Total Amount" },
  ];
  const column2 = [
    { field: "PurchaseQuantity", label: "Qty" },
    { field: "purchaseTotalDiscount", label: "Discount" },
    { field: "purchaseQuantityPrice", label: "Ttl_Price" },
    { field: "purchaseTotalTax", label: "Tax_Amount" },
    { field: "purchaseTotalAmount", label: "Total_Amount" },
  ];

  return (
    <>
      <MetaData title="QE ~~PurchaseInvoice" />
      <div className={`purchase ${colorTheme}`}>
        {purchaseConsolidatedPermission && (
          <>
            <div className="contentt-box">
              <div className="heading-container">
                <h3>{t("consolidatePurcahseInvoice")}</h3>
              </div>
            </div>
            <div className="search-Purchase-box">
              {(JSON.parse(localStorage.getItem("isAdministrator")) ||
                JSON.parse(localStorage.getItem("isSuperAdmin"))) && (
                <Dropdown
                  options={shopNoData?.map((element) => ({
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
                  value={purchaseProductShopNoDropDown}
                  onChange={handleShopNovalue}
                />
              )}
              <Dropdown
                options={purchaseProductCodeData?.map((element) => ({
                  key: element,
                  text: element,
                  value: element,
                }))}
                placeholder={t("code")}
                fluid
                search
                className="purchaseDropdown"
                selection
                disabled={isDisabled}
                value={purchaseProductCodeDropDown}
                onChange={handlePurchasesCodevalue}
                style={{ zIndex: "9" }}
              />
              <Dropdown
                options={purchaseProductcompanyData?.map((element) => ({
                  key: element,
                  text: element,
                  value: element,
                }))}
                placeholder={t("company")}
                fluid
                search
                className="purchaseDropdown"
                selection
                disabled={isDisabled}
                value={purchaseProductCompanyDropDown}
                onChange={handlePurchaseComapnyvalue}
                // style={{ flex: 1, width: "100px" }}
              />
              <DatePicker
                selected={purchaseStartDateDropDown}
                onChange={handleDateSelectChange}
                placeholderText={t("startingDate")}
                dateFormat="dd/MM/yyyy"
                className="datePicker"
                disabled={isDisabled}
                // style={{ flex: 1 }}
              />
              <DatePicker
                selected={purchaseEndDateDropDown}
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
                  setPurchaseProductShopNoDropDown("");
                  setPurchaseProductCodeDropDown("");
                  setPurchaseProductCompanyDropDown("");
                  setPurchaseStartDateDropDown("");
                  setPurchaseEndDateDropDown("");
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
                        content={() => consolidatedPurchaseInvoice.current}
                        onAfterPrint={() => {
                          setTableData([]);
                          setPurchaseProductShopNoDropDown("");
                          setPurchaseProductCodeDropDown("");
                          setPurchaseProductCompanyDropDown("");
                          setPurchaseStartDateDropDown("");
                          setPurchaseEndDateDropDown("");
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
                ref={consolidatedPurchaseInvoice}
                className="consolidateMainTableDiv"
              >
                <div>
                  <ConsolidatePurchaseData
                    props={{
                      tableData: tableData,
                      selectedPrinter: selectedPrinter,
                      quantity: quantity,
                      purchaseProductCodeDropDown: purchaseProductCodeDropDown,
                      discount: discount,
                      purchaseProductCompanyDropDown:
                        purchaseProductCompanyDropDown,
                      purchaseProductCompanyDropDown:
                        purchaseProductCompanyDropDown,
                      totalPriceExculdingTax: totalPriceExculdingTax,
                      purchaseProductShopNoDropDown:
                        purchaseProductShopNoDropDown,
                      totalTaxAmount: totalTaxAmount,
                      purchaseStartDateDropDown: purchaseStartDateDropDown,
                      totalAmountIncludingAllPrices:
                        totalAmountIncludingAllPrices,
                      purchaseEndDateDropDown: purchaseEndDateDropDown,
                    }}
                  />
                </div>
                <div>
                  {selectedPrinter === "thermal" ? (
                    <PrintTableComponent
                      data={tableData}
                      columns={columns}
                      column2={column2}
                      action4={action4}
                      ConsolidatedInvoiceTotalquantity={quantity}
                      ConsolidatedInvoiceTotaldiscount={discount}
                      ConsolidatedInvoiceTotaltotalPriceExculdingTax={
                        totalPriceExculdingTax
                      }
                      ConsolidatedInvoiceTotaltotalTaxAmount={totalTaxAmount}
                      ConsolidatedInvoiceTotalIncludingAllPrices={
                        totalAmountIncludingAllPrices
                      }
                    />
                  ) : (
                    <PrintLaserTable
                      data={tableData}
                      columns={columns}
                      action4={action4}
                      ConsolidatedInvoiceTotalquantity={quantity}
                      ConsolidatedInvoiceTotaldiscount={discount}
                      ConsolidatedInvoiceTotaltotalPriceExculdingTax={
                        totalPriceExculdingTax
                      }
                      ConsolidatedInvoiceTotaltotalTaxAmount={totalTaxAmount}
                      ConsolidatedInvoiceTotalIncludingAllPrices={
                        totalAmountIncludingAllPrices
                      }
                    />
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
    //         {t("consolidatePurcahseInvoice")}
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
    //                   options={shopNoData?.map((element) => ({
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
    //                   value={purchaseProductShopNoDropDown}
    //                   onChange={handleShopNovalue}
    //                   style={{ flex: 1, padding: "10px", width: "200px" }}
    //                 />
    //               )}{" "}
    //               <Dropdown
    //                 options={purchaseProductCodeData?.map((element) => ({
    //                   key: element,
    //                   text: element,
    //                   value: element,
    //                 }))}
    //                 placeholder={t("code")}
    //                 fluid
    //                 search
    //                 selection
    //                 clearable
    //                 disabled={isDisabled}
    //                 value={purchaseProductCodeDropDown}
    //                 onChange={handlePurchasesCodevalue}
    //                 style={{ flex: 1, width: "100px" }}
    //               />
    //               <Dropdown
    //                 options={purchaseProductcompanyData?.map((element) => ({
    //                   key: element,
    //                   text: element,
    //                   value: element,
    //                 }))}
    //                 placeholder={t("company")}
    //                 fluid
    //                 search
    //                 selection
    //                 clearable
    //                 disabled={isDisabled}
    //                 value={purchaseProductCompanyDropDown}
    //                 onChange={handlePurchaseComapnyvalue}
    //                 style={{ flex: 1, width: "100px" }}
    //               />
    //               <DatePicker
    //                 selected={purchaseStartDateDropDown}
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
    //                 selected={purchaseEndDateDropDown}
    //                 onChange={handleSelectEndDateChange}
    //                 placeholderText={t("endingDate")}
    //                 dateFormat="dd/MM/yyyy"
    //                 style={{ flex: 1 }}
    //                 disabled={isDisabled}
    //               />
    //               <Dropdown
    //                 placeholder={t("selectTimePeriod")}
    //                 fluid
    //                 search
    //                 selection
    //                 clearable
    //                 style={{ flex: 1, width: "100px" }}
    //                 options={DateOptions}
    //                 value={selectedOption}
    //                 onChange={handleDropdownChange}
    //               />
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
    //                   setPurchaseProductShopNoDropDown("");
    //                   setPurchaseProductCodeDropDown("");
    //                   setPurchaseProductCompanyDropDown("");
    //                   setPurchaseStartDateDropDown("");
    //                   setPurchaseEndDateDropDown("");
    //                   setSelectedOption("");
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
    //             content={() => consolidatedPurchaseInvoice.current}
    //             onAfterPrint={() => {
    //               setTableData([]);
    //               setPurchaseProductShopNoDropDown("");
    //               setPurchaseProductCodeDropDown("");
    //               setPurchaseProductCompanyDropDown("");
    //               setPurchaseStartDateDropDown("");
    //               setPurchaseEndDateDropDown("");
    //               setSelectedOption("");
    //               setSelected(false);
    //               setIsDisabled(false);
    //             }}
    //           />
    //         </>
    //       )}

    //       <div ref={consolidatedPurchaseInvoice} className="p-5">
    //         <ConsolidatePurchaseData
    //           props={{
    //             tableData: tableData,
    //             selectedPrinter: selectedPrinter,
    //             quantity: quantity,
    //             purchaseProductCodeDropDown: purchaseProductCodeDropDown,
    //             discount: discount,
    //             purchaseProductCompanyDropDown: purchaseProductCompanyDropDown,
    //             purchaseProductCompanyDropDown: purchaseProductCompanyDropDown,
    //             totalPriceExculdingTax: totalPriceExculdingTax,
    //             purchaseProductShopNoDropDown: purchaseProductShopNoDropDown,
    //             totalTaxAmount: totalTaxAmount,
    //             purchaseStartDateDropDown: purchaseStartDateDropDown,
    //             totalAmountIncludingAllPrices: totalAmountIncludingAllPrices,
    //             purchaseEndDateDropDown: purchaseEndDateDropDown,
    //           }}
    //         />
    //         {selectedPrinter === "thermal" ? (
    //           <PrintTableComponent
    //             data={tableData}
    //             columns={columns}
    //             column2={column2}
    //             action4={action4}
    //             ConsolidatedInvoiceTotalquantity={quantity}
    //             ConsolidatedInvoiceTotaldiscount={discount}
    //             ConsolidatedInvoiceTotaltotalPriceExculdingTax={
    //               totalPriceExculdingTax
    //             }
    //             ConsolidatedInvoiceTotaltotalTaxAmount={totalTaxAmount}
    //             ConsolidatedInvoiceTotalIncludingAllPrices={
    //               totalAmountIncludingAllPrices
    //             }
    //           />
    //         ) : (
    //           <PrintLaserTable
    //             data={tableData}
    //             columns={columns}
    //             action4={action4}
    //             ConsolidatedInvoiceTotalquantity={quantity}
    //             ConsolidatedInvoiceTotaldiscount={discount}
    //             ConsolidatedInvoiceTotaltotalPriceExculdingTax={
    //               totalPriceExculdingTax
    //             }
    //             ConsolidatedInvoiceTotaltotalTaxAmount={totalTaxAmount}
    //             ConsolidatedInvoiceTotalIncludingAllPrices={
    //               totalAmountIncludingAllPrices
    //             }
    //           />
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ConsolidatedPuchaseReport;
