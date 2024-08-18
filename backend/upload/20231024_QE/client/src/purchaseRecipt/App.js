import { useContext, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import MetaData from "../MetaData";
import Dates from "./Dates";
import Header from "./Header";
import Table from "./Table";
import TableForm from "./TableForm";
import "./printDiv.css";
import ReactToPrint from "react-to-print";
import { State } from "./context/stateContext";
import { baseQuery } from "../app/api/apiSlice";
import { useTranslation } from "react-i18next";
import PrinterSelectionDropdown from "./PrinterSelectionDropdown";
import { useParams, useNavigate } from "react-router-dom";
import { getPermissionForRoles } from "../Pages/user/rolesAssigned/RolesPermissionValidation";

import {
  Button,
  Form,
  Select,
  Modal,
  Message,
  Dropdown,
  Dimmer,
  Loader,
  Image,
  Segment,
} from "semantic-ui-react";
import "./salerecipt.css";
import swal from "sweetalert2";
import "../Styling/AllStyle.css";
import { useSelector, useDispatch } from "react-redux";
import Time from "../Time/Time";
import { Stack, Typography, Box } from "@mui/material";
import { updateAndPostProductInLocation } from "../actions/productLocationAction";
import {
  getProduct,
  getProductsOnCompanyName,
  updatePurchaseProductPrice,
} from "../actions/productActions";
import { getCompany } from "../actions/companyAction";
import { getStorage, gettStorage } from "../actions/storageAction";
import {
  deleteAllTempPurchase,
  getTemporaryPurchase,
} from "../actions/tempPurchaseAction";
import "./PurchaseCss/purchase.css";
import { GetTempPurchase } from "../Api";
import { getProductType } from "../actions/productTypeAction";
import { addPurchase } from "../actions/purchaseAction";
import { refreshTokken } from "../actions/userAction";
import { TEMP_PURCHASE_DETAILS_SUCCESS } from "../constants/tempPurchaseConstants";
import { getColor } from "../actions/colorAction";
let invoicenumberr = null;
// let company = [];
let shopNo;
let tempProductResult = [];
let variableForPrint;
let selectedShop = [];
let seletedGodown = [];
let selectedTempShop = "";
let storeIn;
let isCalled = "false";
// let time=new Date().toLocaleTimeString()
function App() {
  ///////===========================/////////////
  ////////// useState Variables /////////////////
  ///////=========================///////////////
  const [buttonClicked, setButtonClicked] = useState(false);
  const [StorageLocation, setStorageLocation] = useState([]);
  const [isListHaveItem, setIsListHaveItem] = useState(false);
  const [purchaseProductPermission, setPurchaseProductPermission] =
    useState(false);
  const [variableForButtonLoader, setVariableForButtonLoader] = useState(false);
  const {
    clientName,
    setClientName,
    invoiceNumber,
    setInvoiceNumber,
    setInvoiceDate,
    componentRef,
    listpurchase,
    total,
    setListpurchase,
    setTotal,
    setLocationsetid,
    purchaseDate,
    setPurchaseDate,
    purchaseReceiptNumber,
    setPurchaseReceiptNumber,
    purchaseCompany,
    setPurchaseCompany,
    purchaseFor,
    setPurchaseFor,
    purchasedBy,
    setTempPurchaseId,
    clearData,
    selectedRadioOption,
    setSelectedRadioOption,
    setGodownId,
    shopId,
    setShopId,
    shopAddress,
    setShopAddress,
    shopPhoneNo,
    setShopPhoneNo,
    postTempPurchaseMainId,
    setPostTempPurchaseMainId,
    invoiceShopAddress,
    setInvoiceShopAddress,
  } = useContext(State);
  const [locQuantityList, setLocQuantityList] = useState([]);
  const [locProductItemlist, setLocProductItemlist] = useState([]);
  const [isGenerated, setIsGenerated] = useState(false);
  // const [selectedPrinter, setSelectedPrinter] = useState("laser");
  const [colorTheme, setColorTheme] = useState("theme-white");
  let isGetProductCalled = "false";
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.company);
  const { storage } = useSelector((state) => state.storage);
  const { shop } = useSelector((state) => state.shop);
  const { user } = useSelector((state) => state.user);
  const { tempPurchaseDetails, tempPurchaseDetailsLoading } = useSelector(
    (state) => state.tempPurchaseDetails
  );
  const { postTempPurchase } = useSelector((state) => state.postTempPurchase);

  useEffect(() => {
    setPurchaseProductPermission(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles(
        "Can Purchase Product"
      );
      setPurchaseProductPermission(permissionForAdd);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  ///////////////////////////////////////////////////////
  ////////=============================////////////////////
  /////////////// Hooks ///////////////////////////////////
  ///////==============================/////////////////
  const { t, i18n } = useTranslation();
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const invoiceNumberRef = useRef(invoiceNumber);

  ////////////==================================//////////
  ///////////////// New Logic ///////////////////////
  //////////==================================/////////

  const handleSelectChange = (e, { value }) => {
    setSelectedRadioOption(value);
    console.log(shop);
    console.log(storage);
    if (value.startsWith("G_")) {
      storage?.map((store) => {
        if (store?.storageCode === value) {
          console.log(store?._id);
          setLocationsetid(store?._id);
          console.log(store?.shopId?.shopAddress);
          setShopAddress(store?.shopId?.shopAddress);
          setShopPhoneNo(store?.shopId?.shopPhoneNo);
          setGodownId(store?._id);
          setShopId(null);
        }
      });
      console.log("cellfie");
    } else {
      shop?.map((shopp) => {
        if (shopp?.shopCode === value) {
          console.log(shopp?._id);
          setLocationsetid(shopp?._id);
          setShopAddress(shopp?.shopAddress);
          setShopPhoneNo(shopp?.shopPhoneNo);
          setShopId(shopp?._id);
          setGodownId(null);
        }
      });
    }
    storeIn = value;
  };

  ////////////==================================//////////
  /////////////////  shop selection ///////////////////////
  //////////==================================/////////
  const shopAsArray = [selectedShop];
  const shopCodes = shopAsArray?.map((shop) => shop);
  const godownCodes = seletedGodown.map((godown) => godown);
  const combinedOptions = [...shopCodes, ...godownCodes];

  useEffect(() => {
    selectedShop = JSON.parse(localStorage.getItem("shopId"));
    seletedGodown = JSON.parse(localStorage.getItem("godownId"));
    console.log(selectedShop);
    console.log(seletedGodown);
  });

  //////////=====================================//////////////
  //////////// Functions for Dropdown fields /////////////////
  //////////=====================================////////////

  const handlePurchaseDateChange = (date) => {
    setPurchaseDate(date);
  };
  const handleCompanySelectChange = (event, { value }) => {
    dispatch(getProductsOnCompanyName(value));
    setPurchaseCompany(value);
  };

  ////////========================================///////////////
  ////////// All UseEffects  /////////////////
  //////////=====================================////////////

  useEffect(() => {
    isCalled = "false";
  }, [
    clientName,
    purchaseDate,
    purchaseCompany,
    purchaseReceiptNumber,
    purchaseFor,
  ]);

  useEffect(() => {
    if (isCalled === "false") {
      isCalled = "true";
      getToken();
    }
  }, [isCalled]);

  useEffect(() => {
    if (purchaseCompany) {
      dispatch(getProductsOnCompanyName(purchaseCompany));
    }
  }, [purchaseCompany]);

  const getToken = async () => {
    dispatch(getStorage());
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
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
  }, []);

  useEffect(() => {
    variableForPrint = "";
    setVariableForButtonLoader(false);
  }, []);

  useEffect(() => {
    setButtonClicked(false);
    dispatch(getProductType());
    dispatch(getCompany());
    dispatch(getColor());
    getStoagelocation();
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    setInvoiceDate(dd + "/" + mm + "/" + yyyy);
  }, []);

  //use Effect just for disable the purchase For ...if it has item in list
  useEffect(() => {
    if (listpurchase?.length > 0) {
      setIsListHaveItem(true);
    } else {
      setIsListHaveItem(false);
    }

    if (listpurchase?.length < 1 && !clearData) {
      setPurchaseFor("");
      setClientName("");
      setPurchaseDate("");
      setPurchaseReceiptNumber("");
      setPurchaseCompany("");
    }
  }, [listpurchase]);

  const getStoagelocation = async () => {
    let result = await gettStorage();
    setStorageLocation(result);
  };

  ////////========================================///////////////
  ////////// For Updating the Products and Product Location  /////////////////
  //////////=====================================////////////
  useEffect(() => {
    if (isGenerated) {
      console.log(locQuantityList);
      console.log(locProductItemlist);
      const locListQauntityLength = locQuantityList?.length;
      console.log(locListQauntityLength);
      for (let i = 0; i < locListQauntityLength; i++) {
        updateAndPostProductInLocation(
          locQuantityList[i].quantityidset,
          locQuantityList[i].colorId,
          locQuantityList[i].shopId,
          locQuantityList[i].godownId,
          locQuantityList[i].productQuantity
        );
        updatePurchaseProductPrice(
          locProductItemlist[i].quantityidset,
          locProductItemlist[i].purchaseProductTotalAmount,
          locProductItemlist[i].purchasePrice,
          locProductItemlist[i].purchaseDiscount,
          locProductItemlist[i].purchaseExpenses,
          locProductItemlist[i].purchaseTaxPercentage
        );
      }
    }
  }, [locQuantityList, isGenerated]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////============================================================////////////////////
  ////////////////////////// Handle Transfer to && transfer from ids here //////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  const handleprodCodeSelectChangeto = async (selectedValue) => {
    // if (JSON.parse(localStorage.getItem("isAdministrator"))) {
    //   let pr = await gettStorage();
    //   let Filtered = pr?.filter((data) => {
    //     if (
    //       selectedValue &&
    //       !data.storageCode
    //         .toString()
    //         .toLowerCase()
    //         .includes(selectedValue.toString().toLowerCase())
    //     ) {
    //       return false;
    //     }
    //     return true;
    //   });
    //   pr = Filtered;
    //   setLocationsetid(pr[0]._id);
    //   console.log(selectedValue);
    //   shopNo = selectedValue;
    // }
  };

  //////////////============================================================////////////////////
  ////////////////////////// Handle Temporary Purchase Table logic //////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (postTempPurchase) {
      setPostTempPurchaseMainId(postTempPurchase?._id);
    }
  }, [postTempPurchase]);

  useEffect(() => {
    console.log(tempPurchaseDetails.length);
    console.log(tempPurchaseDetailsLoading);

    if (tempPurchaseDetails?.length === 0) {
      console.log(tempPurchaseDetails);
    } else {
      console.log(tempPurchaseDetails);
      getProducts();
    }
  }, [tempPurchaseDetails]);

  const getProducts = async () => {
    console.log("caefihe");
    if (tempPurchaseDetails) {
      setClientName(tempPurchaseDetails.clientName);
      const purDate = tempPurchaseDetails.purchaseDate;
      setPurchaseDate(new Date(purDate));
      console.log(tempPurchaseDetails.address);
      setShopAddress(tempPurchaseDetails.address);
      setShopPhoneNo(tempPurchaseDetails.phoneNo);
      setGodownId(tempPurchaseDetails.godownId);
      setShopId(tempPurchaseDetails.shopId);
      setPurchaseCompany(tempPurchaseDetails.purchaseCompany);
      setPurchaseReceiptNumber(tempPurchaseDetails.purchaseReceiptNumber);
      setPurchaseFor(tempPurchaseDetails.shopNo);
      setPostTempPurchaseMainId(tempPurchaseDetails._id);
      storeIn = tempPurchaseDetails.storeIn;
      setSelectedRadioOption(tempPurchaseDetails.storeIn);
      const productLength = tempPurchaseDetails.products?.length;
      let godownId = tempPurchaseDetails.godownId;
      let shopId = tempPurchaseDetails.shopId;
      console.log(productLength);
      console.log(productLength);
      for (let j = 0; j < productLength; j++) {
        console.log(tempPurchaseDetails.products[j].Code);
        let Code = tempPurchaseDetails.products[j].Code;
        let Color = tempPurchaseDetails.products[j].Color;
        let Company = tempPurchaseDetails.products[j].Company;
        let Namee = tempPurchaseDetails.products[j].Namee;

        let PurchaseQuantity = parseInt(
          tempPurchaseDetails.products[j].PurchaseQuantity
        );

        let amount = parseInt(tempPurchaseDetails.products[j].amount);
        let expenseTotal = parseInt(
          tempPurchaseDetails.products[j].expenseTotal
        );
        let id = tempPurchaseDetails.products[j].id;
        let locationsetid = tempPurchaseDetails.products[j].locationsetid;
        let purchasePrice = parseInt(
          tempPurchaseDetails.products[j].purchasePrice
        );
        let productColor = tempPurchaseDetails.products[j].productColor;
        let purchaseProductTotalAmount = parseInt(
          tempPurchaseDetails.products[j].purchaseProductTotalAmount
        );
        let purchaseQuantityPrice = parseInt(
          tempPurchaseDetails.products[j].purchaseQuantityPrice
        );
        let CurrentPrice = parseInt(
          tempPurchaseDetails.products[j].CurrentPrice
        );
        let purchaseProductPriceExcludeTax = parseInt(
          tempPurchaseDetails.products[j].purchaseProductPriceExcludeTax
        );
        let purchaseProductDiscount = parseInt(
          tempPurchaseDetails.products[j].purchaseProductDiscount
        );
        let purchaseProductExpense = parseInt(
          tempPurchaseDetails.products[j].purchaseProductExpense
        );
        let purchaseProductTax = parseInt(
          tempPurchaseDetails.products[j].purchaseProductTax
        );
        let purchaseTaxPercentage = parseInt(
          tempPurchaseDetails.products[j].purchaseTaxPercentage
        );
        let purchaseTotalAmount = parseInt(
          tempPurchaseDetails.products[j].purchaseTotalAmount
        );
        let purchaseTotalDiscount = parseInt(
          tempPurchaseDetails.products[j].purchaseTotalDiscount
        );
        let purchaseTotalTax = parseInt(
          tempPurchaseDetails.products[j].purchaseTotalTax
        );
        let quantityidset = tempPurchaseDetails.products[j].quantityidset;
        const newItems = {
          id,
          Namee,
          Code,
          PurchaseQuantity,
          productColor,
          godownId,
          shopId,
          amount,
          expenseTotal,
          purchasePrice,
          purchaseProductTotalAmount,
          purchaseQuantityPrice,
          purchaseTotalAmount,
          purchaseTotalDiscount,
          CurrentPrice,
          purchaseProductPriceExcludeTax,
          purchaseProductDiscount,
          purchaseProductExpense,
          purchaseProductTax,
          purchaseTaxPercentage,
          purchaseTotalTax,
          Color,
          Company,
          quantityidset,
          locationsetid,
        };
        console.log(newItems);
        setListpurchase((prevlistpurchase) => [...prevlistpurchase, newItems]);
      }
      dispatch({
        type: TEMP_PURCHASE_DETAILS_SUCCESS,
        payload: [],
      });
    }
  };

  ///////////==========================================////////////////
  ////////////// Handle Updating invoice Number //////////////////////
  ///////////////////////////////////////////////////////////////////

  const updateInvoiceNumber = (newInvoiceNumber) => {
    setInvoiceNumber(newInvoiceNumber);
    invoiceNumberRef.current = newInvoiceNumber;
  };

  ///////////==============================================================////////////////
  ////////////// Handle downloading and updation of quanity in database //////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  const handlePrintDownload = async () => {
    try {
      setButtonClicked(true);
      setVariableForButtonLoader(true);
      const result = await handleSaveData();
      console.log(result);
      console.log(listpurchase);
      if (result === "success") {
        listpurchase.map((list) => {
          let purchaseProductTotalAmount = list?.purchaseProductTotalAmount;
          let godownId = list?.godownId;
          let colorId = list?.productColor;
          let shopId = list?.shopId;
          let purchasePrice = list?.purchasePrice;
          let purchaseDiscount = list?.purchaseDiscount;
          let purchaseExpenses = list?.purchaseExpenses;
          let purchaseTaxPercentage = list?.purchaseTaxPercentage;
          let productQuantity = parseInt(list?.PurchaseQuantity);
          let quantityidset = list?.quantityidset;
          let locationsetid = list?.locationsetid;

          const newItems = {
            productQuantity,
            quantityidset,
            colorId,
            locationsetid,
            godownId,
            shopId,
          };
          const newItems2 = {
            quantityidset,
            purchaseProductTotalAmount,
            purchasePrice,
            purchaseDiscount,
            purchaseExpenses,
            purchaseTaxPercentage,
          };
          setLocQuantityList((prevList) => [...prevList, newItems]);
          setLocProductItemlist((prevList) => [...prevList, newItems2]);
        });
        setVariableForButtonLoader(false);
        return new Promise((resolve) => {
          // Delay the resolution of the promise to ensure state update
          setTimeout(() => {
            resolve();
          }, 0);
        });
      }
      if (result === "unsuccess") {
        swal
          .fire({
            icon: "warning",
            title: t("titleAlert"),
            text: t("textDataNotInserted"),
            customClass: {
              popup: "custom-swal-popup", // This is the custom class you're adding
            },
          })
          .then(() => {
            window.location.reload();
            setVariableForButtonLoader(false);
          });
        return Promise.reject();
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  ///////////==============================================================////////////////
  ////////////// Handle save data in purchse invoice table //////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  const handleSaveData = async () => {
    try {
      /* replace the JSON.parse(localStorage.getItem("shopId")) with selected 
      Radio Option if you want to store both godown and shop */
      !JSON.parse(localStorage.getItem("isAdministrator")) &&
        (shopNo = JSON.parse(localStorage.getItem("shopId")));
      console.log(purchasedBy);

      let tempProductResultDelete = await getTemporaryPurchase();
      if (!JSON.parse(localStorage.getItem("isAdministrator"))) {
        tempProductResultDelete = tempProductResultDelete?.reduce(
          (filteredProducts, product) => {
            if (
              product?.shopNo === JSON.parse(localStorage.getItem("shopId")) &&
              product?.clientName === clientName
            ) {
              filteredProducts.push(product);
            }
            return filteredProducts;
          },
          []
        );
      }
      setIsGenerated(true);
      console.log(shopNo);
      console.log(storeIn);
      const response = await addPurchase(
        clientName,
        purchaseReceiptNumber,
        purchaseCompany,
        purchaseDate,
        shopAddress,
        shopPhoneNo,
        shopNo,
        storeIn,
        purchasedBy,
        listpurchase,
        total
      );
      console.log(response);

      console.log("called");

      console.log(response.message);
      if (response.message === "Purchase Product created successfully") {
        console.log("cnete");
        // const responseData = await response.data;
        // console.log(responseData);
        // console.log(responseData.newPurchaseProduct.id);
        const updatedInvoiceNumber = response?.newPurchaseProduct?.id;
        setInvoiceNumber(updatedInvoiceNumber);

        // console.log(upda tedInvoiceNumber);
        console.log("hii");
        updateInvoiceNumber(response?.newPurchaseProduct?.id);
        // const createdId = response?.id; // Assuming the ID field is named 'id'
        console.log("hii2");
        // console.log(tempProductResultDelete[0]?._id)
        dispatch(deleteAllTempPurchase(tempProductResultDelete[0]?._id));
        console.log("hii3");
        variableForPrint = "success";
        console.log(variableForPrint);
        return variableForPrint;
      }
    } catch (error) {
      console.log("heelo3");
      variableForPrint = "unsuccess";
      return variableForPrint;
      // console.error("Error posting data:", error);
    } finally {
      // Set the focus out of the button
      buttonRef.current.blur();
    }
  };

  return (
    <>
      <MetaData title="QE ~~PurchaseProduct" />
      <div className={`purchase ${colorTheme}`}>
        {purchaseProductPermission && (
          <>
            <div className="productActivity-Heading-container">
              <h3>{t("purchaseProduct")}</h3>
            </div>
            <div className="productActivityFormInput">
              <div className="productActivityRow">
                <div className="productActivityform1">
                  <label>{t("purchaseFrom")}</label>
                  <input
                    label={t("enterSellersName")}
                    type="text"
                    placeholder={t("enterSellersName")}
                    name="productType"
                    autoComplete="off"
                    maxLength="40"
                    value={clientName}
                    disabled={isListHaveItem}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>
                <div className="productActivityform1">
                  <label>{t("purchaseReceiptNumber")}</label>
                  <input
                    label={t("productCode")}
                    type="text"
                    placeholder={t("purchaseReceiptNumber")}
                    name="productCode"
                    autoComplete="off"
                    maxLength="40"
                    value={purchaseReceiptNumber}
                    disabled={isListHaveItem}
                    onChange={(e) => setPurchaseReceiptNumber(e.target.value)}
                  />
                </div>
                <div className="productActivityform1">
                  <label className="productActivityLabel">
                    {t("selectStorage")}
                  </label>
                  <Dropdown
                    className="productActivityDropdown"
                    options={combinedOptions.map((option) => ({
                      key: option,
                      text: option,
                      value: option,
                    }))}
                    placeholder={t("selectStorage")}
                    selection
                    search
                    required
                    autoComplete="off"
                    disabled={isListHaveItem}
                    value={selectedRadioOption}
                    onChange={handleSelectChange}
                  />
                </div>
                <div className="productActivityform1">
                  <label className="productActivityLabel">{t("company")}</label>
                  <Dropdown
                    className="productActivityDropdown"
                    options={company?.map((comp) => ({
                      key: comp.companyName,
                      text: comp.companyName,
                      value: comp.companyName,
                    }))}
                    placeholder={t("purchaseCompany")}
                    selection
                    search
                    required
                    value={purchaseCompany}
                    disabled={isListHaveItem}
                    onChange={handleCompanySelectChange}
                  />
                </div>
                <div className="productActivityform1">
                  <label className="productActivityLabel">
                    {t("purchaseDate")}
                  </label>
                  <DatePicker
                    selected={purchaseDate}
                    onChange={handlePurchaseDateChange}
                    disabled={isListHaveItem}
                    placeholderText={t("choosePurchaseDate")}
                    maxDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    className="productActivityDatePicker"
                  />
                  {JSON.parse(localStorage.getItem("isAdministrator")) ? (
                    <>
                      <label>{t("purchaseFor")}</label>
                      <Dropdown
                        label="Purchase For:"
                        placeholder={t("purchaseFor")}
                        options={StorageLocation?.map((element) => ({
                          key: element.storageCode,
                          text: `${element.storageCode}`,
                          value: element.storageCode,
                        }))}
                        value={purchaseFor}
                        className="dropdown"
                        required
                        clearable
                        fluid
                        search
                        selection
                        disabled={isListHaveItem}
                        onChange={(event, data) => {
                          handleprodCodeSelectChangeto(data.value);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        style={{ display: "none" }}
                        type="text"
                        name="Purchase Receipt Number"
                        placeholder={t("purchaseFor")}
                        autoComplete="off"
                        value={setPurchaseFor(
                          JSON.parse(localStorage.getItem("shopId"))
                        )}
                        disabled
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="product-Activity-table-section">
              {clientName &&
              purchaseDate &&
              purchaseCompany &&
              purchaseReceiptNumber &&
              purchaseFor &&
              selectedRadioOption ? (
                <>
                  <TableForm />
                  <ReactToPrint
                    trigger={() =>
                      listpurchase && listpurchase?.length > 0 ? (
                        <button
                          ref={buttonRef}
                          disabled={buttonClicked}
                          style={{
                            backgroundColor: "#F1B248",
                            marginLeft: "30px",
                            marginBottom: "30px",
                            width: "25vh",
                          }}
                          className=" text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400"
                        >
                          {!variableForButtonLoader ? (
                            "Generate Invoice"
                          ) : (
                            <Loader
                              active
                              style={{ position: "relative" }}
                            ></Loader>
                          )}
                        </button>
                      ) : (
                        <h1></h1>
                      )
                    }
                    content={() => componentRef.current}
                    onBeforeGetContent={handlePrintDownload}
                    onAfterPrint={() => {
                      setListpurchase([]);
                      setClientName("");
                      setInvoiceNumber("");
                      setSelectedRadioOption("");
                      setPurchaseReceiptNumber("");
                      setPurchaseCompany("");
                      setPurchaseDate("");
                      setTotal("");
                      setPurchaseFor("");
                    }}
                  />
                </>
              ) : (
                <h1 style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  {t("purchaseMessage")}
                </h1>
              )}
            </div>

            {user?.user?.printerId?.printerType === "Laser" ? (
              <div className="print-only-container">
                <div ref={componentRef} className="p-5 ">
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
              // </div>
              <div className="print-only-container">
                <div ref={componentRef} className="p-5 ">
                  <Header />
                  <Dates />
                  <Table />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
