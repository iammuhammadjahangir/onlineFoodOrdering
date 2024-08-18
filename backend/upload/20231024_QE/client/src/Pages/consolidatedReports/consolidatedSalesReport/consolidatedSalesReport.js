import React, { useEffect, useState, useRef } from "react";
import MetaData from "../../../MetaData";
import { getSaleRecord } from "../../../Api/index";
import DatePicker from "react-datepicker";
import ReactToPrint from "react-to-print";
import "../../../stylee/tableStyling.css";
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
import { searchSalesConsolidatednvoiceData } from "../../../Components/searchComponent/ConsolidatedReportSearch/salesReportSearch";
import { Button, Form, Dropdown, Container } from "semantic-ui-react";
import PrinterSelectionDropdown from "../../../purchaseRecipt/PrinterSelectionDropdown";
import PrintTableComponent from "../../../Components/tableComponent/printTableComponent";
import PrintLaserTable from "../../../Components/tableComponent/printLaserTable";
import { getPermissionForRoles } from "../../user/rolesAssigned/RolesPermissionValidation";

import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { Typography, Box, ButtonGroup } from "@mui/material";
import Stack from "@mui/material/Stack";
import { getSaleConsolidatedRecord } from "../../../actions/saleProductAction";
import { useNavigate } from "react-router-dom";
import { refreshTokken } from "../../../actions/userAction";
import ConsolidatedSaleData from "./consolidatedSaleData";
import "../../../salesRecipt/SaleReciptCss/sale.css";
let salesRecord = [];

//Below variables for calculating total of the values that we want to display in table
let quantity = [];
let discount = [];
let totalPriceExculdingTax = [];
let totalTaxAmount = [];
let totalAmountIncludingAllPrices = [];
let isCalledd = "false";
const ConsolidatedSalesReport = () => {
  const action4 = "ConsolReport";
  const { t, i18n } = useTranslation();

  //General UseState
  const [isCalled, setIsCalled] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [showComponent, setShowComponent] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [salesConsolidatedPermission, setSalesConsolidatedPermission] =
    useState(false);
  const consolidatedSalesInvoice = useRef();

  //UseState For setting dropDowns values
  const [salesProductShopNoDropDown, setsalesProductShopNoDropDown] =
    useState("");
  const [salesProductCodeDropDown, setSalesProductCodeDropDown] = useState("");
  const [salesProductCompanyDropDown, setsalesProductCompanyDropDown] =
    useState("");
  const [salesStartDateDropDown, setSalesStartDateDropDown] = useState(null);
  const [salesEndDateDropDown, setSalesEndDateDropDown] = useState(null);

  //printerOption
  const [selectedPrinter, setSelectedPrinter] = useState();
  const [selected, setSelected] = useState(false);
  const [colorTheme, setColorTheme] = useState("theme-white");
  //useStates For Seting dropdown data on page loading
  const [shopNoData, setShopNoData] = useState([]);
  const [salesProductCodeData, setSalesProductCodeData] = useState([]);
  const [salesProductcompanyData, setSalesProductcompanyData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setSalesConsolidatedPermission(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles(
        "View Consolidated Sale Invoice"
      );
      setSalesConsolidatedPermission(permissionForAdd);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    isCalledd = "false";
  });

  useEffect(() => {
    const currentColorTheme = localStorage.getItem("theme-color");
    if (currentColorTheme) {
      setColorTheme(currentColorTheme);
    }
  }, [colorTheme]);

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
    salesRecord = filteredData;
    // handleSearch()
    // Do something with the filtered data, e.g., update your component state or render it
  };

  ////////======================================================///////////////
  /////========End of  Handle All Daily, weekly, Monthly, Yearly Data ======////////
  ///////======================================================///////////////

  //to load components on loading page
  useEffect(() => {
    isCalled &&
      getData().then(() => {
        getShopNoFunction();
        salesProductCodesAndCompanyFunction();
      });
  }, []);

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

  //To get the transfer array fom the data base
  const getData = async () => {
    let data = await getSaleConsolidatedRecord();

    if (!JSON.parse(localStorage.getItem("isAdministrator"))) {
      data = data.reduce((filteredProducts, product) => {
        if (product.shopNo === JSON.parse(localStorage.getItem("shopId"))) {
          filteredProducts.push(product);
        }
        return filteredProducts;
      }, []);
    }

    console.log(data);
    salesRecord = data;
    setYourData([...data]);
    setIsCalled(false);
  };

  //Function to get Data of Shop No and Store them in an array
  const getShopNoFunction = () => {
    //map function only to get one column to show on dropDown
    const salesArray = salesRecord?.map((item) => item.shopNo);

    //Function to Return Unique value
    const uniqueShopNoArray = salesArray?.filter(
      (code, index) => salesArray.indexOf(code) === index
    );

    setShopNoData(uniqueShopNoArray);
  };

  //Function to get Code From Transfer Products
  const salesProductCodesAndCompanyFunction = () => {
    const codesArray = [];
    const companyArray = [];

    // Loop through the mainArray and extract the codes and Company
    salesRecord?.forEach((items) => {
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
    setSalesProductCodeData(uniqueCodesArray);
    setSalesProductcompanyData(uniqueCompanyArray);
  };

  //Function To handle the Shop No Value that would be sales in fiter
  const handleShopNovalue = (event, { value }) => {
    setsalesProductShopNoDropDown(value);
  };
  //Function To handle the code Value that would be sales in fiter
  const handleSalesCodevalue = (event, { value }) => {
    setSalesProductCodeDropDown(value);
  };
  //Function To handle the Comapny Value that would be sales in fiter
  const handleSalesComapnyvalue = (event, { value }) => {
    setsalesProductCompanyDropDown(value);
  };

  //Function to set Starting Date
  const handleDateSelectChange = (date) => {
    setSalesStartDateDropDown(date);
  };

  //Function to set Ending Date
  const handleSelectEndDateChange = (date) => {
    setSalesEndDateDropDown(date);
  };

  //Function to search element
  const handleSearch = async () => {
    const finalDataForTable = await searchSalesConsolidatednvoiceData(
      salesRecord,
      salesProductShopNoDropDown,
      salesProductCodeDropDown,
      salesProductCompanyDropDown,
      salesStartDateDropDown,
      salesEndDateDropDown
    );

    setTableData(finalDataForTable);
    console.log(finalDataForTable);

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
      ?.reduce((sum, product) => sum + parseInt(product.Discount, 10), 0)
      .toString();

    //Calculating Total Price Without Tax
    totalPriceExculdingTax = finalDataForTable
      ?.reduce((sum, product) => sum + parseInt(product.totalAmounnt, 10), 0)
      .toString();

    //Calculating Tax Amount
    totalTaxAmount = finalDataForTable
      ?.reduce((sum, product) => sum + parseInt(product.taxAmount, 10), 0)
      .toString();

    //Calculating Total Amount Including All prices
    totalAmountIncludingAllPrices = finalDataForTable
      ?.reduce((sum, product) => sum + parseInt(product.amount, 10), 0)
      .toString();

    //To disabled All the Buttons when data is fetched till we clear table record
    setIsDisabled(true);
  };

  const columns = [
    { field: "Code", label: "Code" },
    { field: "Namee", label: "Name" },
    { field: "Company", label: "Company" },
    { field: "PurchaseQuantity", label: "Quantity" },
    { field: "excludeTaxPrice", label: "Price" },
    { field: "Discount", label: "Discount" },
    { field: "totalAmounnt", label: "Total Price" },
    { field: "taxAmount", label: "Tax Amount" },
    { field: "amount", label: "Total Amount" },
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
      <MetaData title="QE ~~SaleInvoice" />
      <div className={`sale ${colorTheme}`}>
        {salesConsolidatedPermission && (
          <>
            <div className="contentt-box">
              <div className="heading-container">
                <h3>{t("consolidateSaleInvoice")}</h3>
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
                  value={salesProductShopNoDropDown}
                  onChange={handleShopNovalue}
                />
              )}
              <Dropdown
                options={salesProductCodeData?.map((element) => ({
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
                value={salesProductCodeDropDown}
                onChange={handleSalesCodevalue}
                style={{ zIndex: "9" }}
              />
              <Dropdown
                options={salesProductcompanyData?.map((element) => ({
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
                value={salesProductCompanyDropDown}
                onChange={handleSalesComapnyvalue}
                // style={{ flex: 1, width: "100px" }}
              />
              <DatePicker
                selected={salesStartDateDropDown}
                onChange={handleDateSelectChange}
                placeholderText={t("startingDate")}
                dateFormat="dd/MM/yyyy"
                className="datePicker"
                disabled={isDisabled}
                // style={{ flex: 1 }}
              />
              <DatePicker
                selected={salesEndDateDropDown}
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
                  setsalesProductShopNoDropDown("");
                  setSalesProductCodeDropDown("");
                  setsalesProductCompanyDropDown("");
                  setSalesStartDateDropDown("");
                  setSalesEndDateDropDown("");
                  setSelectedOption("");
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
                        content={() => consolidatedSalesInvoice.current}
                        onAfterPrint={() => {
                          setTableData([]);
                          setsalesProductShopNoDropDown("");
                          setSalesProductCodeDropDown("");
                          setsalesProductCompanyDropDown("");
                          setSalesStartDateDropDown("");
                          setSelectedOption("");
                          setSalesEndDateDropDown("");
                          setSelectedPrinter("");
                          setIsDisabled(false);
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
              <div
                ref={consolidatedSalesInvoice}
                className="consolidateMainTableDiv"
              >
                <div>
                  <ConsolidatedSaleData
                    props={{
                      tableData: tableData,
                      selectedPrinter: selectedPrinter,
                      quantity: quantity,
                      salesProductCodeDropDown: salesProductCodeDropDown,
                      discount: discount,
                      salesProductCompanyDropDown: salesProductCompanyDropDown,
                      totalPriceExculdingTax: totalPriceExculdingTax,
                      salesProductShopNoDropDown: salesProductShopNoDropDown,
                      totalTaxAmount: totalTaxAmount,
                      salesStartDateDropDown: salesStartDateDropDown,
                      totalAmountIncludingAllPrices:
                        totalAmountIncludingAllPrices,
                      salesEndDateDropDown: salesEndDateDropDown,
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
    //         {t("consolidateSaleInvoice")}
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
    //                   value={salesProductShopNoDropDown}
    //                   onChange={handleShopNovalue}
    //                   style={{ flex: 1, padding: "10px", width: "200px" }}
    //                 />
    //               )}{" "}
    //               <Dropdown
    //                 options={salesProductCodeData?.map((element) => ({
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
    //                 value={salesProductCodeDropDown}
    //                 onChange={handleSalesCodevalue}
    //                 style={{ flex: 1, width: "100px" }}
    //               />
    //               <Dropdown
    //                 options={salesProductcompanyData?.map((element) => ({
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
    //                 value={salesProductCompanyDropDown}
    //                 onChange={handleSalesComapnyvalue}
    //                 style={{ flex: 1, width: "100px" }}
    //               />
    //               <DatePicker
    //                 selected={salesStartDateDropDown}
    //                 onChange={handleDateSelectChange}
    //                 placeholderText={t("startingDate")}
    //                 dateFormat="dd/MM/yyyy"
    //                 style={{ flex: 1 }}
    //                 disabled={isDisabled}
    //               />
    //               <DatePicker
    //                 selected={salesEndDateDropDown}
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
    //                   setsalesProductShopNoDropDown("");
    //                   setSalesProductCodeDropDown("");
    //                   setsalesProductCompanyDropDown("");
    //                   setSalesStartDateDropDown("");
    //                   setSalesEndDateDropDown("");
    //                   setSelectedOption("");
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

    // <div className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200">
    //   {tableData?.length > 0 && (
    //     <>
    //       <PrinterSelectionDropdown
    //         selectedPrinter={selectedPrinter}
    //         onSelectPrinter={handleSelectPrinter}
    //       />
    //       <ReactToPrint
    //         trigger={() =>
    //           selected ? (
    //             <button className="bg-blue-500 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
    //               Print / Downloads
    //             </button>
    //           ) : (
    //             <h1></h1>
    //           )
    //         }
    //         content={() => consolidatedSalesInvoice.current}
    //         onAfterPrint={() => {
    //           setTableData([]);
    //           setsalesProductShopNoDropDown("");
    //           setSalesProductCodeDropDown("");
    //           setsalesProductCompanyDropDown("");
    //           setSalesStartDateDropDown("");
    //           setSelectedOption("");
    //           setSalesEndDateDropDown("");
    //           setSelectedPrinter("");
    //           setIsDisabled(false);
    //         }}
    //       />
    //     </>
    //   )}

    //   <div ref={consolidatedSalesInvoice} className="p-5">
    //     <ConsolidatedSaleData
    //       props={{
    //         tableData: tableData,
    //         selectedPrinter: selectedPrinter,
    //         quantity: quantity,
    //         salesProductCodeDropDown: salesProductCodeDropDown,
    //         discount: discount,
    //         salesProductCompanyDropDown: salesProductCompanyDropDown,
    //         totalPriceExculdingTax: totalPriceExculdingTax,
    //         salesProductShopNoDropDown: salesProductShopNoDropDown,
    //         totalTaxAmount: totalTaxAmount,
    //         salesStartDateDropDown: salesStartDateDropDown,
    //         totalAmountIncludingAllPrices: totalAmountIncludingAllPrices,
    //         salesEndDateDropDown: salesEndDateDropDown,
    //       }}
    //     />
    //     {selectedPrinter === "thermal" ? (
    //       <PrintTableComponent
    //         data={tableData}
    //         columns={columns}
    //         column2={column2}
    //         action4={action4}
    //         ConsolidatedInvoiceTotalquantity={quantity}
    //         ConsolidatedInvoiceTotaldiscount={discount}
    //         ConsolidatedInvoiceTotaltotalPriceExculdingTax={
    //           totalPriceExculdingTax
    //         }
    //         ConsolidatedInvoiceTotaltotalTaxAmount={totalTaxAmount}
    //         ConsolidatedInvoiceTotalIncludingAllPrices={
    //           totalAmountIncludingAllPrices
    //         }
    //       />
    //     ) : (
    //       <PrintLaserTable
    //         data={tableData}
    //         columns={columns}
    //         action4={action4}
    //         ConsolidatedInvoiceTotalquantity={quantity}
    //         ConsolidatedInvoiceTotaldiscount={discount}
    //         ConsolidatedInvoiceTotaltotalPriceExculdingTax={
    //           totalPriceExculdingTax
    //         }
    //         ConsolidatedInvoiceTotaltotalTaxAmount={totalTaxAmount}
    //         ConsolidatedInvoiceTotalIncludingAllPrices={
    //           totalAmountIncludingAllPrices
    //         }
    //       />
    //     )}
    //   </div>
    // </div>
  );
};

export default ConsolidatedSalesReport;
