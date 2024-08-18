import { useContext, useEffect, useRef, useState } from "react";
// import TableForm from "./TableForm";
import MetaData from "../../MetaData";
import ReactToPrint from "react-to-print";
import { baseQuery } from "../../app/api/apiSlice";
import "./printDiv.css";
import { useCustomState } from "../../Variables/stateVariables";
import { useSelector } from "react-redux";
import {
  Button,
  Form,
  Dropdown,
  Select,
  Modal,
  Message,
} from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import TableForm from "./TableForm";
import "./expenseCss/expense.css";
import PrinterSelectionDropdown from "../../purchaseRecipt/PrinterSelectionDropdown";
// import { State } from "../../purchaseRecipt/context/stateContext";
import { Statee } from "./context/stateContext";
import Header from "./Headers";
import Table from "./Table";
import Dates from "./Dates";
import swal from "sweetalert2";
import "../../Styling/AllStyle.css";
import { getStorage } from "../../Api";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { gettStorage } from "../../actions/storageAction";
import { postExpense } from "../../actions/expenseAction";
import { refreshTokken } from "../../actions/userAction";
import { gettShop } from "../../actions/shopAction";
import { getPermissionForRoles } from "../user/rolesAssigned/RolesPermissionValidation";

let storage = [];
let isCalledd = "false";
function App() {
  const [isCalled, setIsCalled] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const [canViewExpenses, setCanViewExpenses] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setCanViewExpenses(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles("Can Add Expense");
      setCanViewExpenses(permissionForAdd);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  // const [selectedPrinter, setSelectedPrinter] = useState("laser");

  // const handleSelectPrinter = (printer) => {
  //   setSelectedPrinter(printer);
  // };

  const categoryOptions = [
    { key: "1", text: "Monthly", value: "Monthly" },
    { key: "2", text: "Daily", value: "Daily" },
  ];
  // const [expenses, setExpenses]=useState([]);
  const {
    expenses,
    setExpense,
    setExpenseType,
    setExpenseDescription,
    setExpenseAmount,
    expenseTotal,
    setExpenseTotal,
    expenseCategory,
    setExpenseCategory,
    componentRef,
    transferFrom,
    setTransferFrom,
    transferLocationName,
    setTransferLocationName,
    StorageLocation,
    setStorageLocation,
    transferFromObjectId,
    setTransferFromObjectId,
    setInvoiceNumber,
  } = useContext(Statee);
  const buttonRef = useRef(null);
  const handleCategoryChange = (event, { value }) => {
    setExpenseCategory(value);
  };

  useEffect(() => {
    if (isCalledd === "false") {
      isCalledd = "true";
      getToken();
    }
  }, [expenses, expenseCategory]);
  const getToken = async () => {
    const token = await refreshTokken();
    if (token.data === "Please login to acces this resource") {
      navigate("/login");
    }
    console.log(token);
  };

  useEffect(() => {
    const currentColorTheme = localStorage.getItem("theme-color");
    if (currentColorTheme) {
      setColorTheme(currentColorTheme);
    }
  }, [colorTheme]);

  useEffect(() => {
    isCalledd = "false";
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
  }, [expenses, expenseCategory]);

  useEffect(() => {
    setButtonClicked(false);
    isCalled && callStorage();
  });
  async function callStorage() {
    let result = await gettShop();

    setStorageLocation(result);
    storage = result;
    console.log(result);
    if (
      (result && !JSON.parse(localStorage.getItem("isAdministrator"))) ||
      !JSON.parse(localStorage.getItem("isSuperAdmin"))
    ) {
      const filteredElement = storage?.filter((data) =>
        data.shopCode.includes(JSON.parse(localStorage.getItem("shopId")))
      );

      //to verify that an location is matched with our user location
      // console.log(filteredElement);
      console.log(filteredElement);
      if (filteredElement?.length > 0) {
        setTransferFrom(filteredElement[0]?.shopCode);
        setTransferLocationName(filteredElement[0]?.shopAddress);
        setTransferFromObjectId(filteredElement[0]?._id);
      }
    }
    setIsCalled(false);
  }

  //handle expense Location
  const handleExpenseLocation = (event, { value }) => {
    console.log(value);
    setTransferFromObjectId(value);
  };

  const handlePrintDownload = async () => {
    try {
      setButtonClicked(true);
      await addExpense();
      return new Promise((resolve) => {
        // Delay the resolution of the promise to ensure state update
        setTimeout(() => {
          resolve();
        }, 0);
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const addExpense = async () => {
    try {
      if (!expenses || !expenseCategory) {
        return swal.fire({
          icon: "error",
          title: t("titleError"),
          text: t("textNoExpenseAddedYet"),
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: "custom-swal-popup", // This is the custom class you're adding
          },
        });
      } else {
        const response = await postExpense(
          transferFromObjectId,
          expenseCategory,
          expenses,
          expenseTotal
        );
        console.log(response);
        if (response.message === "Expense created successfully") {
          setInvoiceNumber(response.newExpense.invoiceNumber);
        }
      }
    } catch (error) {
    } finally {
      // Set the focus out of the button
      buttonRef.current.blur();
    }
  };

  return (
    <>
      <MetaData title="QE ~~Expense" />
      <div className={`expense ${colorTheme}`}>
        {canViewExpenses && (
          <>
            <div className="productActivity-Heading-container">
              <h3>{t("expenses")}</h3>
            </div>
            <div className="productActivityFormInput">
              <div className="productActivityRow">
                <div className="productActivityform1">
                  <label htmlFor="transferfrom">{t("invoiceType")}</label>
                  <Dropdown
                    className="productActivityDropdown"
                    placeholder={t("invoiceType")}
                    fluid
                    search
                    selection
                    clearable
                    // disabled={disableDropdowns}
                    options={categoryOptions}
                    value={expenseCategory}
                    onChange={handleCategoryChange}
                    required
                  />
                </div>
                <div className="productActivityform1">
                  <label>{t("location")}</label>
                  {JSON.parse(localStorage.getItem("isAdministrator")) ||
                  JSON.parse(localStorage.getItem("isSuperAdmin")) ? (
                    <Dropdown
                      control={Select}
                      placeholder={t("location")}
                      className="productActivityDropdown"
                      fluid
                      selection
                      clearable
                      options={storage?.map((data) => ({
                        key: data.shopCode,
                        text: data.shopCode,
                        value: data._id,
                      }))}
                      value={transferFromObjectId}
                      onChange={handleExpenseLocation}
                      required
                    />
                  ) : (
                    <input
                      style={{ padding: "10px" }}
                      placeholder={t("location")}
                      value={`${transferFrom} (${transferLocationName})`}
                      disabled
                      required
                    />
                  )}
                </div>
                {/* <div className="productActivityform1">
              <label htmlFor="trasfer to">{t("transferTo")}</label>
              <Dropdown
                className="productActivityDropdown"
                label={t("transferTo")}
                options={mergedArray
                  ?.filter(
                    (element) => element.shopCode !== selectedRadioOption
                  )
                  ?.map((element) => ({
                    key: element.shopCode,
                    text: `${element.shopCode} (${element.shopAddress})`,
                    value: element.shopCode,
                  }))}
                placeholder={t("enterTransferTo")}
                fluid
                search
                selection
                clearable
                value={transferTo}
                disabled={disableDropdowns}
                onChange={(event, data) => {
                  handleprodCodeSelectChangeto(data.value);
                  // Pass the selected value as a parameter
                }}
                required
              />
            </div> */}
              </div>
            </div>
            <div className="product-Activity-table-section">
              {expenseCategory ? (
                <>
                  <TableForm />
                  <div
                    // className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200 "
                    style={{
                      marginTop: "30px",
                      display: "flex",
                      gap: "30px",
                    }}
                  >
                    <ReactToPrint
                      trigger={() =>
                        expenses && expenses?.length > 0 ? (
                          <button
                            ref={buttonRef}
                            disabled={buttonClicked}
                            style={{ backgroundColor: "#F1B248" }}
                            className="text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400"
                          >
                            Generate Invoice
                          </button>
                        ) : (
                          <h1></h1>
                        )
                      }
                      content={() => componentRef.current}
                      onBeforeGetContent={handlePrintDownload}
                      onAfterPrint={() => {
                        setExpense([]);
                        setExpenseAmount("");
                        setExpenseType("");
                        setExpenseDescription("");
                        setExpenseCategory("");
                        setExpenseTotal("");
                        setInvoiceNumber("");
                      }}
                    />
                  </div>
                </>
              ) : (
                <h1 style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  {t("purchaseMessage")}
                </h1>
              )}
            </div>

            {user?.user?.printerId?.printerTyper === "laser" ? (
              <div className="print-only-container">
                <div ref={componentRef} className="p-5">
                  <div
                    style={{
                      border: "2px solid black",
                      marginRight: "20px",
                      padding: "15px",
                      paddingBottom: "0px",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Header />
                    <Dates />
                    <Table />
                    <div style={{ paddingTop: "550px" }}>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        Powered By Soft Wise Solutions +92 334 096 0444{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="print-only-container">
                <div ref={componentRef} className="p-5">
                  <Header />
                  <Dates />
                  <Table />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* <main
        style={{
          maxWidth: "90%",
          marginLeft: "5%"
        }}
      >
         <Typography style={{ color: "#000000", fontSize: 30, marginTop: "30px"}}>{t("expenses")}</Typography>
         <Stack backgroundColor="white" width="50%"   borderRadius="25px 25px 25px 25px" padding={1} marginTop={1} marginBottom={2}>
         <Stack direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          padding={3}>
                  <label>{t("invoiceType")}</label>
                  <Dropdown
                    control={Select}
                    placeholder={t("invoiceType")}
                    fluid
                    selection
                    clearable
                    options={categoryOptions}
                    value={expenseCategory}
                    onChange={handleCategoryChange}
                  />
                  <label>{t("location")}</label>
                  {JSON.parse(localStorage.getItem("isAdministrator")) || JSON.parse(localStorage.getItem("isSuperAdmin")) ? (
                    <Dropdown
                    control={Select}
                    placeholder={t("location")}
                    fluid
                    selection
                    clearable
                    options={storage?.map((data) => ({
                      key: data.storageCode,
                      text: data.storageCode,
                      value: data._id,
                    }))}
                    value={transferFromObjectId}
                    onChange={handleExpenseLocation}
                    required
                  />
                  ) : (
                    <input
                    style={{ padding: "10px" }}
                    placeholder={t("location")}
                    value={`${transferFrom} (${transferLocationName})`}
                    disabled
                    required
                  />
                  )}
                 </Stack>
                 </Stack>
            <div className="bg-white p-5 rounded shadow" style={{ height: "50vh", overflow: "auto" }}>
              <article>
                {expenseCategory ? (
                  <>
                    <TableForm />
                    <div
                      // className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200 "
                      style={{
                        marginTop: "30px",
                        display: "flex",
                        gap: "30px",
                      }}
                    >
                      <ReactToPrint
                        trigger={() =>
                          expenses && expenses?.length > 0 ? (
                            <button
                              ref={buttonRef}
                              disabled={buttonClicked}
                              style={{ backgroundColor: "#F1B248" }}
                              className="text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400"
                            >
                              Generate Invoice
                            </button>
                          ) : (
                            <h1></h1>
                          )
                        }
                        content={() => componentRef.current}
                        onBeforeGetContent={handlePrintDownload}
                        onAfterPrint={() => {
                          setExpense([]);
                          setExpenseAmount("");
                          setExpenseType("");
                          setExpenseDescription("");
                          setExpenseCategory("");
                          setExpenseTotal("");
                          setInvoiceNumber("");
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <h1 style={{ fontSize: "1rem", fontWeight: "bold" }}>
                    {t("purchaseMessage")}
                  </h1>
                )}
              </article>
            </div>
        
   
        {
          user?.user?.printerId?.printerTyper === "laser" ? ( 
          <div className="print-only-container">
          <div ref={componentRef} className="p-5">
          <div style={{ border: "2px solid black", marginRight: "20px", padding: "15px", paddingBottom: "0px",  flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', }}>
            <Header  />
            <Dates />
            <Table  />
            <div style={{paddingTop: "550px"}}>
                      <p style={{display: 'flex', justifyContent: "center",fontSize: "12px", fontWeight: "bold"}}>Powered By Soft Wise Solutions +92 334 096 0444 </p>
                    </div>
            </div>
          </div>
        </div>
        ) : (
          <div className="print-only-container">
          <div ref={componentRef} className="p-5">
            <Header  />
            <Dates  />
            <Table  />
          </div>
        </div>
        )
        }
       
      </main> */}
    </>
  );
}
export default App;
