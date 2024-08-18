import React, { useEffect, useState, useRef } from "react";
// import { getTransferRecord } from "../../../Api/index";
import DatePicker from "react-datepicker";
import ReactToPrint from "react-to-print";
import "../../../stylee/tableStyling.css";
import MetaData from "../../../MetaData";
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
import { searchTransferConsolidatednvoiceData } from "../../../Components/searchComponent/ConsolidatedReportSearch/TransferReportSearch";
import { Button, Form, Dropdown, Container, Select } from "semantic-ui-react";
import PrinterSelectionDropdown from "../../../purchaseRecipt/PrinterSelectionDropdown";
import PrintTableComponent from "../../../Components/tableComponent/printTableComponent";
import PrintLaserTable from "../../../Components/tableComponent/printLaserTable";
import { getPermissionForRoles } from "../../user/rolesAssigned/RolesPermissionValidation";

import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { Typography, Box, ButtonGroup } from "@mui/material";
import Stack from "@mui/material/Stack";
import { json } from "react-router-dom";
import { getTransferRecord } from "../../../actions/transferAction";
import { useNavigate } from "react-router-dom";
import { refreshTokken } from "../../../actions/userAction";
import ConsolidatedTransferData from "./consolidatedTransferData";
import "../../../Transfer Recipt/transferReciptCss/transfer.css";
let isCalledd = "false";
// let tableData = [];
let transferRecord = [];
let selectedShop = [];
let seletedGodown = [];
let selectedTempShop = "";
const ConsolidatedTransferReport = () => {
  const action4 = "salePage";
  const { t, i18n } = useTranslation();
  //General UseState
  const [isCalled, setIsCalled] = useState(true);
  const [Productsarray, setProductsarray] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const [showComponent, setShowComponent] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const consolidatedTransferInvoice = useRef();
  const [selectedRadioOption, setSelectedRadioOption] = useState("");
  const [transferConsolidatedPermission, setTransferConsolidatedPermission] =
    useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setTransferConsolidatedPermission(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles(
        "View Consolidated Transfer Invoice"
      );
      setTransferConsolidatedPermission(permissionForAdd);
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

  ////////////==================================//////////
  /////////////////  shop selection ///////////////////////
  //////////==================================/////////
  const shopAsArray = [selectedShop];
  const shopCodes = shopAsArray?.map((shop) => shop);
  const godownCodes = seletedGodown.map((godown) => godown.storageCode);
  const combinedOptions = [...shopCodes, ...godownCodes];

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
    transferRecord = filteredData;
    // handleSearch()
    // Do something with the filtered data, e.g., update your component state or render it
  };

  ////////======================================================///////////////
  /////========End of  Handle All Daily, weekly, Monthly, Yearly Data ======////////
  ///////======================================================///////////////

  useEffect(() => {
    console.log(combinedOptions);
    if (combinedOptions?.length > 0 && !selectedRadioOption) {
      setSelectedRadioOption(combinedOptions[0]);
      console.log(combinedOptions[0]);
      selectedTempShop = combinedOptions[0];
    }
  }, [combinedOptions, selectedRadioOption]);

  useEffect(() => {
    selectedShop = JSON.parse(localStorage.getItem("shopId"));
    seletedGodown = JSON.parse(localStorage.getItem("godownId"));
    console.log(selectedShop);
    console.log(seletedGodown);
  });

  const handleSelectChange = (e, { value }) => {
    setSelectedRadioOption(value);
    setIsCalled(true);
  };

  //UseState For setting dropDowns values
  const [
    transferProductTrasferToDropDown,
    setTransferProductTrasferToDropDown,
  ] = useState("");
  const [transferProductCodeDropDown, setTransferProductCodeDropDown] =
    useState("");
  const [transferProductCompanyDropDown, setTransferProductCompanyDropDown] =
    useState("");
  const [transferStartingDateDropDown, setTransferStartingDateDropDown] =
    useState(null);
  const [
    transferProductEndingDateDropDown,
    setTransferProductEndingDateDropDown,
  ] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);

  //useStates For Seting dropdown data on page loading
  const [transferFromData, setTransferFromData] = useState([]);
  const [TransferProductCodeData, setTransferProductCodeData] = useState([]);
  const [transferProductcompanyData, setTransferProductcompanyData] = useState(
    []
  );

  //printerOption
  const [selectedPrinter, setSelectedPrinter] = useState();
  const [selected, setSelected] = useState(false);

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
        getTransferFromFunction();
        transferProductCodesAndCompanyFunction();
      });
  }, [selectedRadioOption]);

  const getData = async () => {
    //To get the transfer array fom the data base
    let data = await getTransferRecord();
    console.log(data);
    if (!JSON.parse(localStorage.getItem("isAdministrator"))) {
      if (selectedRadioOption?.length > 0) {
        console.log("called1");
        console.log(selectedRadioOption?.length);
        data = data?.reduce((filteredProducts, product) => {
          if (product.tranferFrom === selectedRadioOption) {
            filteredProducts.push(product);
          }
          return filteredProducts;
        }, []);
      } else {
        console.log("called2");
        data = data?.reduce((filteredProducts, product) => {
          if (
            product.tranferFrom === JSON.parse(localStorage.getItem("shopId"))
          ) {
            filteredProducts.push(product);
          }
          return filteredProducts;
        }, []);
      }
    }
    transferRecord = data;
    console.log(data);
    setYourData([...data]);
    setIsCalled(false);
  };

  //Function to get Data to transfer To and Store them in an array
  const getTransferFromFunction = () => {
    //map function only to get one column to show on dropDown
    const transferArray = transferRecord?.map((item) => item.transferTo);

    //Function to Return Unique value
    const uniqueTransferToArray = transferArray?.filter(
      (code, index) => transferArray.indexOf(code) === index
    );

    setTransferFromData(uniqueTransferToArray);
  };

  //Function to get Code From Transfer Products
  const transferProductCodesAndCompanyFunction = () => {
    // console.log(transferRecord);
    const codesArray = [];
    const companyArray = [];

    // Loop through the mainArray and extract the codes and Company
    transferRecord?.forEach((items) => {
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

    // console.log(uniqueCodesArray);
    // console.log(uniqueCompanyArray);

    //set Code and Company for Drop Down Data
    setTransferProductCodeData(uniqueCodesArray);
    setTransferProductcompanyData(uniqueCompanyArray);
  };

  //Function To handle the Transfer to Value that would be transfer in fiter
  const handleTransferTovalue = (event, { value }) => {
    setTransferProductTrasferToDropDown(value);
  };
  //Function To handle the code Value that would be transfer in fiter
  const handleTransferCodevalue = (event, { value }) => {
    setTransferProductCodeDropDown(value);
  };
  //Function To handle the Comapny Value that would be transfer in fiter
  const handleTransferComapnyvalue = (event, { value }) => {
    setTransferProductCompanyDropDown(value);
  };

  //Function to set Starting Date
  const handleDateSelectChange = (date) => {
    // console.log(date);
    setTransferStartingDateDropDown(date);
  };

  //Function to set Ending Date
  const handleSelectEndDateChange = (date) => {
    setTransferProductEndingDateDropDown(date);
  };

  //Function to search element
  const handleSearch = async () => {
    const finalDataForTable = await searchTransferConsolidatednvoiceData(
      transferRecord,
      transferProductTrasferToDropDown,
      transferProductCodeDropDown,
      transferProductCompanyDropDown,
      transferStartingDateDropDown,
      transferProductEndingDateDropDown
    );

    setTableData(finalDataForTable);
    // console.log(finalDataForTable);

    // Calculate the sum of the quantity column
    let totalQuantity = 0;
    for (const item of finalDataForTable) {
      totalQuantity += parseInt(item.PurchaseQuantity);
    }
    setTotalQuantity(totalQuantity);
    // console.log(totalQuantity);
    setIsDisabled(true);
    // console.log(finalDataForTable);
  };

  const columns = [
    { field: "Namee", label: "Name" },
    { field: "Code", label: "Code" },
    { field: "Color", label: "Color" },
    { field: "Company", label: "Company" },
    { field: "PurchaseQuantity", label: "Quantity" },
  ];

  return (
    <>
      <MetaData title="QE ~~TransferInvoice" />
      <div className={`transfer ${colorTheme}`}>
        {transferConsolidatedPermission && (
          <>
            <div className="contentt-box">
              <div className="heading-container">
                <h3>{t("consolidateTransferInvoice")}</h3>
              </div>
            </div>
            <div className="search-Purchase-box">
              {JSON.parse(localStorage.getItem("isAdministrator")) ||
              JSON.parse(localStorage.getItem("isSuperAdmin")) ? (
                <Dropdown
                  options={transferFromData?.map((element) => ({
                    key: element,
                    text: element,
                    value: element,
                  }))}
                  placeholder={t("transferFrom")}
                  className="purchaseDropdown1"
                  fluid
                  search
                  selection
                  disabled={isDisabled}
                  value={transferProductTrasferToDropDown}
                  onChange={handleTransferTovalue}
                />
              ) : (
                <Dropdown
                  options={combinedOptions.map((option) => ({
                    key: option,
                    text: option,
                    value: option,
                  }))}
                  placeholder={t("transferFrom")}
                  fluid
                  search
                  className="purchaseDropdown"
                  selection
                  disabled={isDisabled}
                  value={selectedRadioOption}
                  onChange={handleSelectChange}
                  style={{ zIndex: "9" }}
                />
              )}
              <Dropdown
                options={TransferProductCodeData?.map((element) => ({
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
                value={transferProductCodeDropDown}
                onChange={handleTransferCodevalue}
                // style={{ flex: 1, width: "100px" }}
              />
              <Dropdown
                options={transferProductcompanyData?.map((element) => ({
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
                value={transferProductCompanyDropDown}
                onChange={handleTransferComapnyvalue}
                // style={{ flex: 1, width: "100px" }}
              />
              <DatePicker
                selected={transferStartingDateDropDown}
                onChange={handleDateSelectChange}
                placeholderText={t("startingDate")}
                dateFormat="dd/MM/yyyy"
                className="datePicker"
                disabled={isDisabled}
                // style={{ flex: 1 }}
              />
              <DatePicker
                selected={transferProductEndingDateDropDown}
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
                  setTransferProductTrasferToDropDown("");
                  setTransferProductCodeDropDown("");
                  setTransferProductCompanyDropDown("");
                  setTransferStartingDateDropDown("");
                  setTransferProductEndingDateDropDown("");
                  setSelectedRadioOption([]);
                  setSelectedOption("");
                  setSelectedPrinter("");
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
                        content={() => consolidatedTransferInvoice.current}
                        onAfterPrint={() => {
                          setTableData([]);
                          setTransferProductTrasferToDropDown("");
                          setTransferProductCodeDropDown("");
                          setTransferProductCompanyDropDown("");
                          setTransferStartingDateDropDown("");
                          setTransferProductEndingDateDropDown("");
                          setSelectedOption("");
                          setIsDisabled(false);
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
              <div
                ref={consolidatedTransferInvoice}
                className="consolidateMainTableDiv"
              >
                <div>
                  <ConsolidatedTransferData
                    props={{
                      tableData: tableData,
                      selectedPrinter: selectedPrinter,
                      selectedRadioOption: selectedRadioOption,
                      transferProductCodeDropDown: transferProductCodeDropDown,
                      totalQuantity: totalQuantity,
                      transferProductCompanyDropDown:
                        transferProductCompanyDropDown,
                      transferProductTrasferToDropDown:
                        transferProductTrasferToDropDown,
                      transferStartingDateDropDown:
                        transferStartingDateDropDown,
                      transferProductEndingDateDropDown:
                        transferProductEndingDateDropDown,
                    }}
                  />
                </div>
                <div>
                  {selectedPrinter === "thermal" ? (
                    <PrintTableComponent data={tableData} columns={columns} />
                  ) : (
                    <PrintLaserTable data={tableData} columns={columns} />
                  )}
                  {tableData?.length > 0 && (
                    <h1
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: "10px",
                        marginLeft: "auto",
                      }}
                    >
                      TotalQuantity:{totalQuantity}{" "}
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
    //   <div className="div1Container">
    //   <div style={{width: "75%"}}>
    //       <Stack spacing={2} direction="row" alignItems="center">
    //           <Typography className="typograpgy" style={{ color: "#000000", fontSize: 30 }}>{t("consolidateTransferInvoice")}</Typography>
    //       </Stack>
    //       <Stack  backgroundColor="white"   borderRadius="50px 50px 0 0" padding={1} marginTop={1}>
    //         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} padding={3}>
    //          <Form style={{width:"100%"}}>
    //           <Stack direction="row" sx={{display:"flex",flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
    //               <Form.Group widths="equal" style={{ display: "flex", gap: "30px" }} >
    //               {JSON.parse(localStorage.getItem("isAdministrator")) ? (
    //                 <Dropdown
    //                   options={transferFromData?.map((element) => ({
    //                     key: element,
    //                     text: element,
    //                     value: element,
    //                   }))}
    //                   placeholder={t("transferFrom")}
    //                   fluid
    //                   search
    //                   selection
    //                   clearable
    //                   disabled={isDisabled}
    //                   value={transferProductTrasferToDropDown}
    //                   onChange={handleTransferTovalue}
    //                   style={{ flex: 1,padding:"10px" ,width:"150px" }}
    //                 />
    //               ):(
    //                 <Dropdown
    //                     options={combinedOptions.map((option) => ({
    //                       key: option,
    //                       text: option,
    //                       value: option,
    //                     }))}
    //                     placeholder={t("transferFrom")}
    //                     fluid
    //                   selection
    //                   disabled={isDisabled}
    //                     value={selectedRadioOption}
    //                     onChange={handleSelectChange}
    //                     style={{
    //                       marginBottom: "15px",
    //                       padding: '10px',
    //                       width: '150px',
    //                       height: '30px',
    //                     }}
    //                   />
    //               )}
    //                 <Dropdown
    //                   options={TransferProductCodeData?.map((element) => ({
    //                     key: element,
    //                     text: element,
    //                     value: element,
    //                   }))}
    //                 placeholder={t("code")}
    //                 fluid
    //                 search
    //                 selection
    //                 clearable
    //                 disabled={isDisabled}
    //                 value={transferProductCodeDropDown}
    //                 onChange={handleTransferCodevalue}
    //                 style={{
    //                   marginBottom: "15px",
    //                   padding: '10px',
    //                   width: '100px',
    //                   height: '30px',
    //                 }}
    //                 />
    //                 <Dropdown
    //                   options={transferProductcompanyData?.map((element) => ({
    //                     key: element,
    //                     text: element,
    //                     value: element,
    //                   }))}
    //                   placeholder={t("company")}
    //                   fluid
    //                   search
    //                   selection
    //                   clearable
    //                   disabled={isDisabled}
    //                   value={transferProductCompanyDropDown}
    //                   onChange={handleTransferComapnyvalue}
    //                   style={{
    //                     marginBottom: "15px",
    //                     padding: '10px',
    //                     width: '100px',
    //                     height: '30px',
    //                   }}
    //                 />
    //                 <DatePicker
    //                   selected={transferStartingDateDropDown}
    //                   onChange={handleDateSelectChange}
    //                   placeholderText={t("startingDate")}
    //                   dateFormat="dd/MM/yyyy"
    //                   style={{  flex: 1, backgroundColor: "transparent",  border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "20px 20px 20px 20px",  width: '100px',}}
    //                   disabled={isDisabled}
    //                 />
    //                 <DatePicker
    //                   selected={transferProductEndingDateDropDown}
    //                   onChange={handleSelectEndDateChange}
    //                   placeholderText={t("endingDate")}
    //                   dateFormat="dd/MM/yyyy"
    //                   style={{  flex: 1, backgroundColor: "transparent",  border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "20px 20px 20px 20px",  width: '100px',}}
    //                   disabled={isDisabled}
    //                 />
    //                  <Dropdown
    //                      placeholder={t("selectTimePeriod")}
    //                      fluid
    //                      search
    //                      selection
    //                      clearable
    //                      style={{ flex: 1,width:"100px" }}
    //                     options={DateOptions}
    //                     value={selectedOption}
    //                     onChange={handleDropdownChange}
    //                   />
    //                </Form.Group>
    //               <Form.Group widths="equal" style={{ display: "flex", gap: "20px" }}>
    //               <Button
    //                 style={{ backgroundColor: "transparent",  border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "10px 10px 10px 10px", fontWeight: "bold",}}
    //                 onClick={handleSearch}
    //               >
    //                 {t("search")}&nbsp;&nbsp;{<SearchIcon />}
    //               </Button>
    //               <Button
    //                 style={{ backgroundColor: "transparent",  border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "10px 10px 10px 10px", fontWeight: "bold",}}
    //                 onClick={() => {
    //                   setTableData([]);
    //                   setTransferProductTrasferToDropDown("");
    //                   setTransferProductCodeDropDown("");
    //                   setTransferProductCompanyDropDown("");
    //                   setTransferStartingDateDropDown("");
    //                   setTransferProductEndingDateDropDown("");
    //                   setSelectedRadioOption([])
    //                   setSelectedOption('')
    //                   setSelectedPrinter("");
    //                   setIsDisabled(false);
    //                 }}
    //               >
    //                 {t("clear")}&nbsp;&nbsp;{<ClearAllIcon />}
    //               </Button>
    //                 </Form.Group>
    //               </Stack>
    //           </Form>
    //           </Stack>
    //         </Stack>

    //       <div className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200">
    //         {tableData?.length > 0 && (
    //           <>
    //             <PrinterSelectionDropdown
    //               selectedPrinter={selectedPrinter}
    //               onSelectPrinter={handleSelectPrinter}
    //             />
    //             <ReactToPrint
    //               trigger={() =>
    //                 selected ? (
    //                   <button className="bg-blue-500 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
    //                     Print / Downloads
    //                   </button>
    //                 ) : (
    //                   <h1></h1>
    //                 )
    //               }
    //               content={() => consolidatedTransferInvoice.current}
    //               onAfterPrint={() => {
    //                 setTableData([]);
    //                 setTransferProductTrasferToDropDown("");
    //                 setTransferProductCodeDropDown("");
    //                 setTransferProductCompanyDropDown("");
    //                 setTransferStartingDateDropDown("");
    //                 setTransferProductEndingDateDropDown("");
    //                 setSelectedOption('')
    //                 setIsDisabled(false);
    //               }}
    //             />
    //           </>
    //         )}

    //         <div ref={consolidatedTransferInvoice} className="p-5">

    //         <ConsolidatePurchaseData
    //             props={{
    //               tableData: tableData,
    //               selectedPrinter: selectedPrinter,
    //               selectedRadioOption: selectedRadioOption,
    //               transferProductCodeDropDown: transferProductCodeDropDown,
    //               totalQuantity: totalQuantity,
    //               transferProductCompanyDropDown: transferProductCompanyDropDown,
    //               transferProductTrasferToDropDown: transferProductTrasferToDropDown,
    //               transferStartingDateDropDown: transferStartingDateDropDown,
    //               transferProductEndingDateDropDown: transferProductEndingDateDropDown,
    //               totalTaxAmount: totalTaxAmount,
    //               purchaseStartDateDropDown: purchaseStartDateDropDown,
    //               totalAmountIncludingAllPrices: totalAmountIncludingAllPrices,
    //               purchaseEndDateDropDown: purchaseEndDateDropDown,
    //             }}
    //           />

    //           {tableData?.length > 0 && (
    //             <>
    //               {selectedPrinter === "thermal" ? (
    //                 <>
    //                   <table
    //                     className="mt-10 table1"
    //                     style={{ fontSize: "10px", whiteSpace: "nowrap" }}
    //                   >
    //                       <tr
    //                       style={{
    //                         marginTop: "-10px",
    //                         gap: "50px",
    //                         padding: "0px",
    //                         marginBottom: "-10px",
    //                       }}
    //                     >
    //                       <td
    //                           className="td1"
    //                           style={{
    //                             marginTop: "-30px",
    //                             marginBottom: "0px",
    //                             marginRight: "10px",
    //                           }}
    //                         >
    //                           {" "}
    //                           <span className="font-bold td1">
    //                             Record Of:
    //                           </span>{" "}
    //                           {selectedRadioOption}
    //                         </td>
    //                     </tr>
    //                     <tr
    //                       style={{
    //                         marginTop: "-10px",
    //                         gap: "50px",
    //                         padding: "0px",
    //                         marginBottom: "-10px",
    //                       }}
    //                     >
    //                       {transferProductCodeDropDown ? (
    //                         <td
    //                           className="td1"
    //                           style={{
    //                             marginTop: "-30px",
    //                             marginBottom: "0px",
    //                             marginRight: "10px",
    //                           }}
    //                         >
    //                           {" "}
    //                           <span className="font-bold td1">
    //                             Product Code:
    //                           </span>{" "}
    //                           {transferProductCodeDropDown}
    //                         </td>
    //                       ) : (
    //                         <td></td>
    //                       )}
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
    //                           Total Quantity:
    //                         </span>{" "}
    //                         {totalQuantity}
    //                       </td>
    //                     </tr>
    //                     <tr
    //                       style={{
    //                         marginTop: "-10px",
    //                         gap: "50px",
    //                         padding: "0px",
    //                         marginBottom: "-10px",
    //                       }}
    //                     >
    //                       {transferProductCompanyDropDown && (
    //                         <td
    //                           className="td1"
    //                           style={{
    //                             marginTop: "-30px",
    //                             marginBottom: "0px",
    //                             marginRight: "10px",
    //                           }}
    //                         >
    //                           {" "}
    //                           <span className="font-bold td1">
    //                             Product Company:
    //                           </span>{" "}
    //                           {transferProductCompanyDropDown}
    //                         </td>
    //                       )}
    //                     </tr>
    //                     <tr
    //                       style={{
    //                         marginTop: "-10px",
    //                         gap: "50px",
    //                         padding: "0px",
    //                         marginBottom: "-10px",
    //                       }}
    //                     >
    //                       {transferProductTrasferToDropDown && (
    //                         <td
    //                           className="td1"
    //                           style={{
    //                             marginTop: "-30px",
    //                             marginBottom: "0px",
    //                             marginRight: "10px",
    //                           }}
    //                         >
    //                           {" "}
    //                           <span className="font-bold td1">
    //                             Transfer To:
    //                           </span>{" "}
    //                           {transferProductTrasferToDropDown}
    //                         </td>
    //                       )}
    //                     </tr>
    //                     <tr className="tr1">
    //                       {transferStartingDateDropDown && (
    //                         <td
    //                           className="td1"
    //                           style={{
    //                             marginTop: "-30px",
    //                             marginBottom: "0px",
    //                             marginRight: "10px",
    //                           }}
    //                         >
    //                           {" "}
    //                           <span className="font-bold td1">
    //                             Starting Date:
    //                           </span>{" "}
    //                           {transferStartingDateDropDown.toLocaleDateString(
    //                             "en-GB"
    //                           )}
    //                         </td>
    //                       )}
    //                       {transferProductEndingDateDropDown && (
    //                         <td
    //                           className="td1"
    //                           style={{
    //                             marginTop: "-30px",
    //                             marginBottom: "0px",
    //                             marginRight: "10px",
    //                           }}
    //                         >
    //                           {" "}
    //                           <span className="font-bold td1">
    //                             Ending Date:
    //                           </span>{" "}
    //                           {transferProductEndingDateDropDown.toLocaleDateString(
    //                             "en-GB"
    //                           )}
    //                         </td>
    //                       )}
    //                     </tr>
    //                   </table>
    //                 </>
    //               ) : (
    //                 <>
    //                   <table className="table1" style={{ margin: 0 }}>
    //                   {
    //                     !JSON.parse(localStorage.getItem("isAdministrator")) && (
    //                       <tr className="tr1">
    //                       <td>
    //                         {" "}
    //                         <span className="font-bold td1">
    //                           Record Of:
    //                         </span>{" "}
    //                         {selectedRadioOption?.length > 0 ? (selectedRadioOption) : (JSON.parse(localStorage.getItem("shopId")))}
    //                       </td>
    //                       <td></td>
    //                     </tr>
    //                     )
    //                   }

    //                     <tr className="tr1">
    //                       <td>
    //                         {" "}
    //                         <span className="font-bold td1">
    //                           Total Quantity:
    //                         </span>{" "}
    //                         {totalQuantity}
    //                       </td>
    //                       {transferProductCodeDropDown ? (
    //                         <td>
    //                           {" "}
    //                           <span className="font-bold td1">
    //                             Product Code:
    //                           </span>{" "}
    //                           {transferProductCodeDropDown}
    //                         </td>
    //                       ) : (
    //                         <td></td>
    //                       )}
    //                     </tr>
    //                     <tr>
    //                       {transferProductCompanyDropDown && (
    //                         <td>
    //                           {" "}
    //                           <span className="font-bold td1">
    //                             Product Company:
    //                           </span>{" "}
    //                           {transferProductCompanyDropDown}
    //                         </td>
    //                       )}
    //                     </tr>
    //                     <tr>
    //                       {transferProductTrasferToDropDown && (
    //                         <td>
    //                           {" "}
    //                           <span className="font-bold td1">
    //                             Transfer To:
    //                           </span>{" "}
    //                           {transferProductTrasferToDropDown}
    //                         </td>
    //                       )}
    //                     </tr>
    //                     <tr className="tr1">
    //                       {transferStartingDateDropDown && (
    //                         <td>
    //                           {" "}
    //                           <span className="font-bold td1">
    //                             Starting Date:
    //                           </span>{" "}
    //                           {transferStartingDateDropDown.toLocaleDateString(
    //                             "en-GB"
    //                           )}
    //                         </td>
    //                       )}
    //                       {transferProductEndingDateDropDown && (
    //                         <td>
    //                           {" "}
    //                           <span className="font-bold td1">
    //                             Ending Date:
    //                           </span>{" "}
    //                           {transferProductEndingDateDropDown.toLocaleDateString(
    //                             "en-GB"
    //                           )}
    //                         </td>
    //                       )}
    //                     </tr>
    //                   </table>
    //                 </>
    //               )}
    //             </>
    //           )}
    //           {selectedPrinter === "thermal" ? (
    //             <PrintTableComponent data={tableData} columns={columns} />
    //           ) : (
    //             <PrintLaserTable data={tableData} columns={columns} />
    //           )}

    //           {tableData?.length > 0 && (
    //             <h1
    //               style={{
    //                 fontWeight: "bold",
    //                 display: "flex",
    //                 justifyContent: "flex-end",
    //                 padding: "10px",
    //                 marginLeft: "auto",
    //               }}
    //             >
    //               TotalQuantity:{totalQuantity}{" "}
    //             </h1>
    //           )}
    //         </div>
    //       </div>
    //   </div>
    // </div>
  );
};

export default ConsolidatedTransferReport;

// <Stack  backgroundColor="white"   borderRadius="50px 50px 0 0" padding={1} marginTop={1}>
//           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} padding={3}>
//            <Form style={{width:"100%"}}>
//             <Stack direction="row" sx={{display:"flex",flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
//                 <Form.Group widths="equal" style={{ display: "flex", gap: "30px" }}>
//
//               </Form.Group>
//               <Form.Group  widths="equal" style={{ display: "flex", gap: "20px" }}>
//
//               </Form.Group>

//           </Stack>
//         </Form>
//       </Stack>
//       </Stack>
