import { useContext, useEffect, useRef, useState } from "react";
import Dates from "./Dates";
import MetaData from "../MetaData";
import { baseQuery } from "../app/api/apiSlice";
import { Dropdown, Loader } from "semantic-ui-react";
import "./printDiv.css";
// import Footer from "./Footer";
import Header from "./Header";
import MainDetails from "./MainDetails";
import Notes from "./Notes";
import Table from "./Table";
import TableForm from "./TableForm";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { Statee } from "./context/stateContext";
import "./salerecipt.css";
import useScanDetection from "use-scan-detection";
import swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import PrinterSelectionDropdown from "../purchaseRecipt/PrinterSelectionDropdown";
import { getPermissionForRoles } from "../Pages/user/rolesAssigned/RolesPermissionValidation";

import "../Styling/AllStyle.css";
import { useDispatch, useSelector } from "react-redux";
import Time from "../Time/Time";
import "./SaleReciptCss/sale.css";
import { Stack, Typography, Box } from "@mui/material";
import {
  getProductLoc,
  getProductLocation,
  getProductLocationOnId,
  updateAndPostProductInLocation,
  updateProductLocationOnSale,
} from "../actions/productLocationAction";
import { getProductsOnBarcode } from "../actions/productActions";
import {
  deleteTempSaleItem,
  getTemporarySale,
} from "../actions/tempSaleAction";
import { getCompany } from "../actions/companyAction";
import { getProductType } from "../actions/productTypeAction";
import { postSaleProductWithFiscal } from "../actions/saleProductWithFiscalAction";
import {
  getProductLocationOnShopAndProductId,
  postSaleProduct,
} from "../actions/saleProductAction";
import { refreshTokken } from "../actions/userAction";
import { TEMP_SALE_DETAILS_SUCCESS } from "../constants/tempSaleConstants";
let InvoiceNumber = "";
let USIN = "USINO";
let DateTime = "";
let pr = [];
let tempProdData = [];
let barcodeProduct = "";
let locId = "";
let bar = "";
let TotalBillAmount = 0.0;
let quantity = "";
let productLocationQuantityUpdateId = null;
let variableForPrint;
let isCalled = "false";
let locItemsArray = [];
function App() {
  const [Products, setProducts] = useState([]);
  const [locQuantityList, setLocQuantityList] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [productLoc, setProductLoc] = useState("");
  const [locList, setLocList] = useState([]);
  const [isselected, setIsselected] = useState(false);
  const [isInputFilled, setIsInputFilled] = useState(false);
  const [barcodeDisplay, setBarcodeDisplay] = useState("");
  const [variableForButtonLoader, setVariableForButtonLoader] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isGenerated, setIsGenerated] = useState(false);
  const [saleProductPermission, setSaleProductPermission] = useState(false);
  const [loc, setLoc] = useState("Hello");
  let haveListItems = "false";
  // const [selectedPrinter, setSelectedPrinter] = useState("laser");
  const buttonRef = useRef(null);
  let locate = "false";
  let isGetProductCalled = "false";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setSaleProductPermission(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles("Can Sale Product");
      setSaleProductPermission(permissionForAdd);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  //////=====================================================/////////////////////////
  //////////// =====All UseContext Variables ==============///////////////////////////////
  /////////////============================================////////////////////
  const {
    Code,
    setCode,
    Namee,
    setNamee,
    Company,
    setCompany,
    Color,
    setColor,
    CurrentPrice,
    setCurrentPrice,
    excludeTaxPrice,
    setExcludeTaxPrice,
    taxPercentage,
    setTaxPercentage,
    sellExpenses,
    setSellExpenses,
    setQuantitye,
    clientName,
    setClientName,
    clientAddress,
    setClientAddress,
    invoiceNumber,
    setInvoiceNumber,
    barcode,
    setBarcode,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    notes,
    setNotes,
    componentRef,
    list,
    total,
    setTotal,
    setList,
    selectedSaleItem,
    setSelectedSaleItem,
    quantityidset,
    setQuantityidset,
    locationsetid,
    setLocationsetid,
    GrandQuantityTotal,
    GrandTotalExludeTex,
    setGrandTotalExludeTex,
    GrandTotalTax,
    setFbrInvoiceNumber,
    GrandDiscount,
    saleBy,
    setBarBack,
    barLoader,
    setBarLoader,
    setBarButtonDisable,
    setTempSaleMainId,
    listEmpty,
    setListEmpty,
    shopIdForData,
    setShopIdForData,
    shopAddress,
    setShopAddress,
    shopPhoneNo,
    setShopPhoneNo,
  } = useContext(Statee);
  const [locationList, setLocationList] = useState([]);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { shop } = useSelector((state) => state.shop);
  const { user } = useSelector((state) => state.user);
  const { tempSaleDetails, tempSaleDetailsLoading } = useSelector(
    (state) => state.tempSaleDetails
  );
  const { tempSalePost } = useSelector((state) => state.tempSalePost);
  /////////==========================================////
  ///========== handle printer Selection =========/////////
  ///////========================================/////////
  // const handleSelectPrinter = (printer) => {
  //   setSelectedPrinter(printer);
  // };

  /////////==========================================////
  ///========== handle Language Selection =========/////////
  ///////========================================/////////

  useEffect(() => {
    const currentColorTheme = localStorage.getItem("theme-color");
    if (currentColorTheme) {
      setColorTheme(currentColorTheme);
    }
  }, [colorTheme]);

  useEffect(() => {
    isCalled = "false";
  }, [clientName, clientAddress]);

  useEffect(() => {
    if (isCalled === "false") {
      isCalled = "true";
      getToken();
    }
  }, [isCalled]);
  const getToken = async () => {
    console.log(shop);
    if (shop?.length > 0) {
      shop?.map((shopForId) => {
        if (
          shopForId?.shopCode === JSON.parse(localStorage.getItem("shopId"))
        ) {
          setShopIdForData(shopForId?._id);
          setShopAddress(shopForId?.shopAddress);
          setShopPhoneNo(shopForId?.shopPhoneNo);
        }
      });
    }
    const token = await refreshTokken();
    if (token.data === "Please login to acces this resource") {
      navigate("/login");
    }
    console.log(token);
  };

  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
  }, []);

  /////////==========================================////
  ///========== handle date format  Selection and getProducts =========/////////
  ///////========================================/////////
  useEffect(() => {
    dispatch(getProductType());
    dispatch(getCompany());
    setBarBack("false");
    setButtonClicked(false);
    variableForPrint = "";
    setVariableForButtonLoader(false);
    // getProduct();

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let hh = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    if (hh < 10) hh = "0" + hh;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
    DateTime = `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`;
    setInvoiceDate(dd + "-" + mm + "-" + yyyy);
  }, []);

  const barFunc = () => {
    console.log("hooo");

    if (quantity === 0) {
      console.log("enter");
      swal.fire({
        icon: "error",
        title: t("titleAlert"),
        text: t("textProductOutOfStock"),
        showConfirmButton: true,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    } else {
      navigate("/discountmodel");
    }
  };

  /////////==========================================////
  ///========== start of barcode scanning work =========/////////
  ///////========================================/////////

  /////////==========================================////
  ///========== handle Barcode scanning value =========/////////
  ///////========================================/////////
  useEffect(() => {
    // Enable barcode scanning if both clientName and clientAddress are filled
    setIsInputFilled(!!clientName && !!clientAddress && !barLoader);
  }, [clientName, clientAddress, barLoader]);

  /////////==========================================////
  ///========== handle barcode scanning value by device =========/////////
  ///////========================================/////////
  const handleScan = (barcodeValue) => {
    if (isInputFilled) {
      setBarcodeDisplay(barcodeValue);
    }
  };

  /////////==========================================////
  ///========== handle detection of barcode =========/////////
  ///////========================================/////////
  useScanDetection({
    onComplete: handleScan,
    minlength: 1,
  });

  /////////==========================================////
  ///========== set Different values on the basis of barcode scan =========/////////
  ///////========================================/////////
  useEffect(() => {
    setBarcodeDisplay("");
    console.log(barcodeDisplay);
    if (barcodeDisplay) {
      setBarButtonDisable(true);
      setBarLoader(true);
      getProductByBarcode(barcodeDisplay);
      bar = barcodeDisplay;
    }
  }, [barcodeDisplay]);

  useEffect(() => {
    setBarcodeDisplay("");
  }, [invoiceNumber]);

  /////////==========================================////
  ///========== Get Products on barcode value =========/////////
  ///////========================================/////////
  async function getProductByBarcode(barcodeDisplay) {
    console.log(barcodeDisplay);
    console.log("hellooooooooooo");
    barcodeProduct = await getProductsOnBarcode(barcodeDisplay);
    getProductt();
    console.log(barcodeProduct);
  }

  /////////==========================================////
  ///========== gett Productt called for further work on the basis of barcode=========/////////
  ///////========================================/////////

  const getProductt = async () => {
    // pr = await getProductLoc();

    pr = await getProductLoc();
    let proLocId = "";
    //to filter product for each storage location that a user login with account
    if (!JSON.parse(localStorage.getItem("isAdministrator"))) {
      pr = pr?.reduce((filteredProducts, product) => {
        if (
          product?.shopAvalibility?.shopCode ===
          JSON.parse(localStorage.getItem("shopId"))
        ) {
          filteredProducts.push(product);
        }
        return filteredProducts;
      }, []);
    }
    setProductLoc(pr[0].shopAvalibility._id);
    proLocId = pr[0].shopAvalibility._id;
    console.log(proLocId);
    console.log(barcodeProduct);
    if (barcodeProduct) {
      pr?.map((loc) => {
        if (
          loc.shopAvalibility?._id === proLocId &&
          loc.product._id === barcodeProduct._id
        ) {
          console.log(loc._id);
          console.log("callling ");
          sellproduct(loc._id);
          locId = loc._id;
        }
      });
    } else {
      setBarLoader(false);
    }
  };

  /////////==========================================////
  ///========== set Different values on the basis of barcode scan =========/////////
  ///////========================================/////////

  const sellproduct = async (id) => {
    // let quantity="";
    setSelectedSaleItem((prevSelectedSaleItems) => [
      ...prevSelectedSaleItems,
      id,
    ]);

    let data = await getProductLocationOnId(id);
    console.log(data);
    setNamee(data.product?.productTypeName?.productName);
    setCode(data.product?.productCode);
    setCompany(data.product?.productCompany?.companyName);
    setColor(data.product?.productColor?.colorName);
    setCurrentPrice(data.product?.productCurrentPrice);
    setExcludeTaxPrice(data.product?.productpriceExcludingTax);
    setTaxPercentage(data.product?.productTaxPrice);
    setSellExpenses(data.product?.productExpenses);
    quantity = data.productQuantity;
    console.log(quantity);
    setQuantitye(data.productQuantity);
    setQuantityidset(data.product._id);
    setLocationsetid(data.productAvalibility._id);
    setBarcode(barcodeDisplay);
    setBarcodeDisplay("");
    setLoc("Hec this is new");
    setBarBack("true");
    console.log("hiiii");
    setBarLoader(false);
    barFunc();
  };

  /////////==========================================////
  ///========== End of Barcode Scanning Logic =========/////////
  ///////========================================////////

  /////////==========================================////
  ///========== Handle Temporary Sale Table Data  =========/////////
  ///////========================================/////////

  useEffect(() => {
    console.log(tempSalePost);
    if (tempSalePost) {
      setTempSaleMainId(tempSalePost?._id);
    }
  }, [tempSalePost]);

  useEffect(() => {
    if (isGetProductCalled === "false") {
      dispatch(getProductLocation());
    }
  }, []);

  useEffect(() => {
    console.log(tempSaleDetails);
    if (tempSaleDetails.length === 0) {
      console.log(tempSaleDetails);
    } else {
      console.log(tempSaleDetails);

      handleTempLocationData();
    }
  }, [tempSaleDetails]);

  const handleTempLocationData = async () => {
    for (let i = 0; i < tempSaleDetails?.products?.length; i++) {
      console.log(tempSaleDetails.products[i].shopIdForData);
      console.log(tempSaleDetails.products[i]._id);
      let resp = await getProductLocationOnShopAndProductId(
        tempSaleDetails.products[i].quantityidset,
        tempSaleDetails.products[i].productColor,
        tempSaleDetails.products[i].shopIdForData
      );
      console.log(resp);
      let shopId = resp.shopAvalibility;
      let productId = resp.product;
      let colorId = resp.colorId;
      let quantity = resp.productQuantity;
      const locItems = {
        shopId,
        colorId,
        productId,
        quantity,
      };
      // setLocationList((prevList) => [...prevList, locItems])
      locItemsArray.push(locItems);

      console.log(resp);
    }
    handleTempSaleData();
  };
  const handleTempSaleData = async () => {
    console.log(locItemsArray);
    tempSaleDetails?.products.map((tempSale) => {
      console.log("hhi");
      locItemsArray.map((locItems) => {
        if (
          tempSale.quantityidset === locItems.productId &&
          tempSale.shopIdForData === locItems.shopId &&
          tempSale.productColor === locItems.colorId
        ) {
          console.log(locItems);
          console.log(tempSale);
          if (tempSale.PurchaseQuantity > locItems.quantity) {
            console.log("hi popup");
            swal
              .fire({
                icon: "warning",
                title: t("titleAlert"),
                text: t(
                  "The Available Quantity  of product is less than the quantity in pending products"
                ),
                showConfirmButton: true,
                customClass: {
                  popup: "custom-swal-popup", // This is the custom class you're adding
                },
              })
              .then((result) => {
                if (result.value) {
                  setList([]);
                  setClientName("");
                  setClientAddress("");
                  navigate("/tempSalePendings");
                }
                console.log(result);
              });
          }
        }
      });
    });
    setShopPhoneNo(tempSaleDetails.phoneNo);
    setShopAddress(tempSaleDetails.address);
    setClientName(tempSaleDetails.customerName);
    setClientAddress(tempSaleDetails.customerNumber);
    setTempSaleMainId(tempSaleDetails._id);
    const productLength = tempSaleDetails.products?.length;
    for (let j = 0; j < productLength; j++) {
      let Code = tempSaleDetails.products[j].Code;
      let Company = tempSaleDetails.products[j].Company;
      let Discount = parseInt(tempSaleDetails.products[j].Discount);
      let Namee = tempSaleDetails.products[j].Namee;
      let PurchaseQuantity = parseInt(
        tempSaleDetails.products[j].PurchaseQuantity
      );
      let amount = parseInt(tempSaleDetails.products[j].amount);
      let barcode = tempSaleDetails.products[j].barcode;
      let color = tempSaleDetails.products[j].color;
      let excludeTaxPrice = parseInt(
        tempSaleDetails.products[j].excludeTaxPrice
      );
      let taxAmount = parseInt(tempSaleDetails.products[j].taxAmount);
      let taxPercentage = parseInt(tempSaleDetails.products[j].taxPercentage);
      let totalAmounnt = parseInt(tempSaleDetails.products[j].totalAmounnt);
      let productColor = tempSaleDetails.products[j].productColor;
      let id = tempSaleDetails.products[j].id;
      let quantityidset = tempSaleDetails.products[j].quantityidset;
      let locationsetid = tempSaleDetails.products[j].locationsetid;
      let shopIdForData = tempSaleDetails.products[j].shopIdForData;
      const newItems = {
        id,
        Namee,
        Discount,
        Code,
        PurchaseQuantity,
        amount,
        barcode,
        excludeTaxPrice,
        taxAmount,
        productColor,
        taxPercentage,
        totalAmounnt,
        color,
        Company,
        quantityidset,
        locationsetid,
        shopIdForData,
      };
      setList((prevList) => [...prevList, newItems]);
    }
    dispatch({
      type: TEMP_SALE_DETAILS_SUCCESS,
      payload: [],
    });
  };

  useEffect(() => {
    if (isGenerated) {
      const locListQauntityLength = locQuantityList?.length;
      console.log(locListQauntityLength);
      for (let i = 0; i < locListQauntityLength; i++) {
        updateProductLocationOnSale(
          locQuantityList[i].quantityidset,
          locQuantityList[i].productColor,
          locQuantityList[i].shopIdForData,
          locQuantityList[i].productQuantity
        );
      }
    }
  }, [locQuantityList, isGenerated]);

  /////////==========================================////
  ///========== Updating the invoice Number =========/////////
  ///////========================================/////////

  const updateInvoiceNumber = (newInvoiceNumber) => {
    setInvoiceNumber(newInvoiceNumber);
    invoiceNumberRef.current = newInvoiceNumber;
  };

  const invoiceNumberRef = useRef(invoiceNumber);
  /////////==========================================////
  ///========== Handle Print of Data =========/////////
  ///////========================================/////////
  const handlePrintDownload = async () => {
    try {
      setButtonClicked(true);
      setVariableForButtonLoader(true);
      const result = await handleSaveData();
      console.log(result);

      if (result === "success") {
        console.log(list);
        list.map((temp) => {
          let prodQuantity = parseInt(temp?.PurchaseQuantity);
          let productQuantity = -prodQuantity;
          let quantityidset = temp?.quantityidset;
          let locationsetid = temp?.locationsetid;
          let productColor = temp?.productColor;
          let shopIdForData = temp?.shopIdForData;
          const newItems = {
            productQuantity,
            quantityidset,
            productColor,
            shopIdForData,
            locationsetid,
          };
          // setLocList((prevList) => [...prevList, newItems]);
          setLocQuantityList((prevList) => [...prevList, newItems]);
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
            text: t("textDataNotInsertedDueToFBR"),
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

  /////////==========================================////
  ///========== Handle Save Data to Database=========/////////
  ///////========================================/////////
  const handleSaveData = async () => {
    let tempSaleProdData = await getTemporarySale();
    console.log(tempSaleProdData);

    if (!JSON.parse(localStorage.getItem("isAdministrator"))) {
      tempSaleProdData = tempSaleProdData?.reduce(
        (filteredProducts, product) => {
          if (
            product?.shopNo === JSON.parse(localStorage.getItem("shopId")) &&
            product?.customerName === clientName
          ) {
            filteredProducts.push(product);
          }
          return filteredProducts;
        },
        []
      );
    }
    setIsGenerated(true);

    console.log("called");
    const PaymentMode = 1;
    const RefUSIN = null;
    const InvoiceType = 1;
    const POSID = JSON.parse(localStorage.getItem("posId"));
    const TotalQuantity = GrandQuantityTotal;
    const TotalTaxCharged = GrandTotalTax;
    const TotalSaleValue = GrandTotalExludeTex;
    const TotalBillAmount = total;
    const Discount = GrandDiscount;
    const list2 = [...list];
    const filtered_list = list2?.map(
      ({
        Company,
        id,
        Discount,
        excludeTaxPrice,
        locationsetid,
        quantityidset,
        ...rest
      }) => rest
    );
    const Items = filtered_list?.map(
      ({
        Code: ItemCode,
        Namee: ItemName,
        PurchaseQuantity: Quantity,
        totalAmounnt: SaleValue,
        taxPercentage: TaxRate,
        amount: TotalAmount,
        taxAmount: TaxCharged,
        ...rest
      }) => ({
        ItemCode,
        ItemName,
        Quantity,
        SaleValue,
        TotalAmount,
        TaxCharged,
        PCTCode: "00000000",
        TaxRate,
        InvoiceType: 1, // Assign a constant value
        ...rest,
      })
    );
    try {
      /////*********** Handle Fiscal Post Api ***********///////////
      console.log("called");
      console.log(Items);
      const response = await postSaleProductWithFiscal(
        InvoiceNumber,
        POSID,
        USIN,
        DateTime,
        TotalBillAmount,
        TotalQuantity,
        Discount,
        TotalSaleValue,
        TotalTaxCharged,
        PaymentMode,
        RefUSIN,
        InvoiceType,
        Items
      );
      console.log(response);
      /////////********* saving Data to database **********///////////
      console.log(response.ok);
      if (response.ok) {
        console.log(tempSaleProdData[0]._id);
        dispatch(deleteTempSaleItem(tempSaleProdData[0]?._id));
        console.log(tempSaleProdData[0]._id);
        const result = await response.json();
        console.log(result);
        const InvoiceNumber = result.InvoiceNumber;
        setFbrInvoiceNumber(InvoiceNumber);
        const shopNo = JSON.parse(localStorage.getItem("shopId"));
        const responsee = await postSaleProduct(
          InvoiceNumber,
          shopNo,
          clientName,
          clientAddress,
          shopAddress,
          shopPhoneNo,
          saleBy,
          list,
          total
        );
        console.log(responsee.message);
        console.log(responsee);
        if (responsee.message === "Sales product created successfully") {
          const updatedInvoiceNumber = responsee?.newSalesProduct?.id;
          setInvoiceNumber(updatedInvoiceNumber);
          updateInvoiceNumber(responsee.newSalesProduct.id);
          console.log("heelo");
          variableForPrint = "success";
          return variableForPrint;
        }
      } else {
        swal.fire({
          icon: "warning",
          title: t("titleAlert"),
          text: t("textNotSendToFBR"),
          customClass: {
            popup: "custom-swal-popup",
          },
        });
      }
    } catch (error) {
      console.log("heelo3");
      variableForPrint = "unsuccess";
      return variableForPrint;
    } finally {
      buttonRef.current.blur();
    }
  };

  return (
    <>
      <MetaData title="QE ~~SaleProduct" />
      <div className={`sale ${colorTheme}`}>
        {saleProductPermission && (
          <div>
            <div className="productActivity-Heading-container">
              <h3>{t("saleProduct")}</h3>
            </div>
            <div className="productActivityFormInput">
              <div className="productActivityRow">
                <div className="productActivityform1">
                  <label>{t("customerName")}</label>
                  <input
                    type="text"
                    placeholder={t("customerName")}
                    name="productType"
                    autoComplete="off"
                    maxLength="40"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>
                <div className="productActivityform1">
                  <label>{t("contactNo")}</label>
                  <input
                    label={t("productCode")}
                    type="text"
                    placeholder={t("enterContactNo")}
                    name="productCode"
                    autoComplete="off"
                    value={clientAddress}
                    maxLength="11"
                    onChange={(e) => {
                      setClientAddress(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="product-Activity-table-section">
              {clientName && clientAddress ? (
                <>
                  <TableForm setIsInputFilled={setIsInputFilled} />
                  <div
                    style={{
                      marginLeft: "30px",
                      marginBottom: "60px",
                      display: "flex",
                      gap: "30px",
                    }}
                  >
                    <ReactToPrint
                      trigger={() =>
                        list && list?.length > 0 ? (
                          <button
                            ref={buttonRef}
                            disabled={buttonClicked}
                            style={{
                              backgroundColor: "#F1B248",
                              width: "25vh",
                            }}
                            className="text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400"
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
                        setList([]);
                        setClientName("");
                        setClientAddress("");
                        setInvoiceNumber("");
                        setFbrInvoiceNumber("");
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

            {user?.user?.printerId?.printerType === "Laser" ? (
              <>
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
              </>
            ) : (
              <>
                <div className="print-only-container">
                  <div ref={componentRef} className="p-5">
                    <Header />
                    <Dates />
                    <Table />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* <main
        style={{
          maxWidth: "90%",
          marginLeft: "5%"
        }}
      >
       
          
      <Stack direction="row" marginTop={2}>
        <Typography style={{ color: "#000000", fontSize: 30}}>{t("saleProduct")}</Typography>
          <Box flexGrow={1} textAlign="right" >
            <Time />
          </Box>
      </Stack>
         
        <Stack backgroundColor="white" width="50%"   borderRadius="25px 25px 25px 25px" padding={1}  marginBottom={2} > 
          <Stack direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
                padding={3}>
                {
                  <>
                    <Stack>
                    <Stack spacing={2} direction="row" flex={1}>
                      <label htmlFor="clientName">{t("customerName")}</label>
                      <input
                        type="text"
                        name="clientName"
                        id="clientName"
                        placeholder={t("customerName")}
                        autoComplete="off"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                      />

             
                      <label htmlFor="clientAddress">{t("contactNo")}</label>
                      <input
                        type="number"
                        name="clientAddress"
                        id="clientAddress"
                        placeholder={t("enterContactNo")}
                        autoComplete="off"
                        value={clientAddress}
                        maxLength="11"
                        onChange={(e) => {
                          setClientAddress(e.target.value);
                        }}
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "textfield",
                        }}
                      />
                       </Stack>
                    </Stack>
                  </>
               
                }
     
          </Stack>
      </Stack>
            
             <div
            className="bg-white p-5 rounded shadow"
            style={{ height: "50vh", overflow: "auto" }}
          >
              <article>
                {clientName && clientAddress ? (
                  <>
                    <TableForm setIsInputFilled={setIsInputFilled} />
                    <div
                      style={{
                        marginTop: "30px",
                        display: "flex",
                        gap: "30px",
                      }}
                    >
                      <ReactToPrint
                        trigger={() =>
                          list && list?.length > 0 ? (
                            <button
                              ref={buttonRef}
                              disabled={buttonClicked}
                              style={{ backgroundColor: "#F1B248" }}
                              className="text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400"
                            >
                            {!variableForButtonLoader ? "Generate Invoice" :  <Loader active style={{position:"relative"}}></Loader>}
                            </button>
                          ) : (
                            <h1></h1>
                          )
                        }
                        content={() => componentRef.current}
                        onBeforeGetContent={handlePrintDownload}
                        onAfterPrint={() => {
                          setList([]);
                          setClientName("");
                          setClientAddress("");
                          setInvoiceNumber("");
                          setFbrInvoiceNumber("");
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
        user?.user?.printerId?.printerType === "laser" ? (<>
            <div className="print-only-container">
              <div ref={componentRef} className="p-5">
                <div style={{ border: "2px solid black", marginRight: "20px", padding: "15px", paddingBottom: "0px",  flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', }}>
                  <Header />
                  <Dates  />
                  <Table  />
                    <div style={{paddingTop: "550px"}}>
                      <p style={{display: 'flex', justifyContent: "center",fontSize: "12px", fontWeight: "bold"}}>Powered By Soft Wise Solutions +92 334 096 0444 </p>
                    </div>
                </div>
              </div>
            </div>
        </>) : (<>
          <div className="print-only-container">
          <div ref={componentRef} className="p-5">
            <Header  />
            <Dates  />
            <Table  />
          </div>
        </div>
        </>)
       }
      </main> */}
    </>
  );
}

export default App;
