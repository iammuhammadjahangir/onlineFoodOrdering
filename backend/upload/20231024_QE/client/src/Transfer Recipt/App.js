import { useContext, useEffect, useRef, useState } from "react";
import MetaData from "../MetaData";
import { useParams, useNavigate } from "react-router-dom";
import Dates from "./Dates";
// import Footer from "./Footer";
import "./printDiv.css";
import Header from "./Header";
import { Dropdown, List, Loader } from "semantic-ui-react";
import MainDetails from "./MainDetails";
import Notes from "./Notes";
import Table from "./Table";
import TableForm from "./TableForm";
import ReactToPrint from "react-to-print";
import PrinterSelectionDropdown from "../purchaseRecipt/PrinterSelectionDropdown";
import { getPermissionForRoles } from "../Pages/user/rolesAssigned/RolesPermissionValidation";

// import { State } from "./context/stateContext";
import { Statte } from "./context/stateContext";
import { baseQuery } from "../app/api/apiSlice";
import "./salerecipt.css";
import swal from "sweetalert2";
import "../Styling/AllStyle.css";
import { useTranslation } from "react-i18next";
import { use } from "i18next";
import Time from "../Time/Time";
import "./transferReciptCss/transfer.css";
import { Stack, Typography, Box } from "@mui/material";
import {
  getProductLoc,
  updateAndPostProductInLocation,
  updateProductLocationOnGodownId,
  updateProductLocationOnSale,
} from "../actions/productLocationAction";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTempTransferAll,
  getTemporaryTransfer,
} from "../actions/tempTransferAction";
import { gettStorage } from "../actions/storageAction";
import {
  getProductLocationOnGodownAndProductId,
  postTransferProduct,
} from "../actions/transferAction";
import { refreshTokken } from "../actions/userAction";
import { TEMP_TRANSFER_DETIALS_SUCCESS } from "../constants/tempTransferConstants";
import { getProductLocationOnShopAndProductId } from "../actions/saleProductAction";
let productAvalibility = null;
let productLocationQuantityUpdateId = null;
// let itemAdded="false"
// let selectedId = null;
let conditionMet = false;
let tempProductResult = [];
let variableForPrint;
let selectedShop = [];
let seletedGodown = [];
let selectedGodown = [];
let mergedArray = [];
let locItemsArray = [];
let transferFromm = "";
let isCalled = "false";
function App() {
  /////////// ============================================= /////////////////////////////////
  ////////////////////// All useState variables ////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  const [products, setProducts] = useState();
  const [StorageLocation, setStorageLocation] = useState([]);
  const [transferLocationName, setTransferLocationName] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isselected, setIsselected] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [variableForButtonLoader, setVariableForButtonLoader] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [transferProductPermission, setTransferProductPermission] =
    useState(false);

  useEffect(() => {
    setTransferProductPermission(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles(
        "Can Transfer Product"
      );
      setTransferProductPermission(permissionForAdd);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const {
    tempTransferId,
    setTempTransferId,
    transferFrom,
    setTransferFrom,
    transferTo,
    setTransferTo,
    StateIds,
    setStateIds,
    disableDropdowns,
    setDisableDropdowns,

    clientName,
    setClientName,
    clientAddress,
    setClientAddress,
    invoiceNumber,
    setInvoiceNumber,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    notes,
    setNotes,
    componentRef,
    list,
    total,
    setList,
    selectedSaleItem,
    setSelectedSaleItem,
    Quantity,
    quantityidset,
    setQuantityidset,
    locationsetid,
    setLocationsetid,
    selectedId,
    setSelectedId,
    transferBy,
    itemsAdded,
    setItemsAdded,
    islistadded,
    setislistadded,
    itemsAvailable,
    setItemsAvailable,
    tempDeleteId,
    setTempDeleteId,
    selectedRadioOption,
    setSelectedRadioOption,
    transferShopId,
    setTransferShopId,
    transferGodownId,
    setTransferGodownId,
    transferToShopId,
    setTransferToShopId,
    transferToGodownId,
    setTransferToGodownId,
    shopAddress,
    setShopAddress,
    shopPhoneNo,
    setShopPhoneNo,
    tempTransferMainId,
    setTempTransferMainId,
  } = useContext(Statte);
  const [locQuantityList, setLocQuantityList] = useState([]);
  const [locMinusQuantityList, setLocMinusQuantityList] = useState([]);
  const [locList, setLocList] = useState([]);
  const [minusLocList, setMinusLocList] = useState([]);
  const [colorTheme, setColorTheme] = useState("theme-white");
  // const [selectedPrinter, setSelectedPrinter] = useState("laser");
  const { tempTransfer, loadingTempTransfer } = useSelector(
    (state) => state.tempTransfer
  );
  const dispatch = useDispatch();
  const { shop } = useSelector((state) => state.shop);
  const { storage } = useSelector((state) => state.storage);
  const { tempTransferDetails } = useSelector(
    (state) => state.tempTransferDetails
  );
  const { postTempTransferProduct } = useSelector(
    (state) => state.postTempTransferProduct
  );
  const { user } = useSelector((state) => state.user);
  ////////////// =============================== //////////////
  ///////////////////// All Hooks ////////////////////////////
  ////////////////////////////////////////////////////////////

  const { t, i18n } = useTranslation();
  let haveListItems = "false";
  let isGetProductCalled = "false";
  const prevListLength = useRef(0);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  ////////////// =============================== //////////////
  ///////////////////// All Radio Options ////////////////////////////
  ////////////////////////////////////////////////////////////
  const options = [
    { value: selectedShop, label: selectedShop },
    { value: seletedGodown, label: seletedGodown },
    // Add more options as needed
  ];

  useEffect(() => {
    const currentColorTheme = localStorage.getItem("theme-color");
    if (currentColorTheme) {
      setColorTheme(currentColorTheme);
    }
  }, [colorTheme]);

  useEffect(() => {
    if (isCalled === "false") {
      isCalled = "true";
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
  const godownCodes = seletedGodown.map((godown) => godown);
  const combinedOptions = [...shopCodes, ...godownCodes];

  // useEffect(() => {
  //   console.log(combinedOptions)
  //   if (combinedOptions?.length > 0 && !selectedRadioOption) {
  //     setSelectedRadioOption(combinedOptions[0]);
  //   }
  // }, [combinedOptions, selectedRadioOption])

  ////////////// =============================== //////////////
  ///////////////////// All useEffect ////////////////////////////
  ////////////////////////////////////////////////////////////
  useEffect(() => {
    selectedShop = JSON.parse(localStorage.getItem("shopId"));
    seletedGodown = JSON.parse(localStorage.getItem("godownId"));
    console.log(selectedShop);
    console.log(seletedGodown);
  });

  const handleOptionChange = (event) => {
    console.log(event.target.value);
    setSelectedRadioOption(event.target.value);
    transferFromm = event.target.value;
  };

  useEffect(() => {
    if (isGenerated) {
      const locListQauntityLength = locQuantityList?.length;
      console.log(locListQauntityLength);
      for (let i = 0; i < locListQauntityLength; i++) {
        updateAndPostProductInLocation(
          locQuantityList[i]?.quantityidset,
          locQuantityList[i]?.productColor,
          locQuantityList[i]?.transferToShopId,
          locQuantityList[i]?.transferToGodownId,
          locQuantityList[i]?.productQuantity
        );
        if (transferShopId) {
          updateProductLocationOnSale(
            locMinusQuantityList[i]?.quantityidset,
            locMinusQuantityList[i]?.productColor,
            locMinusQuantityList[i]?.transferShopId,
            locMinusQuantityList[i]?.productQuantity
          );
        } else {
          updateProductLocationOnGodownId(
            locMinusQuantityList[i]?.quantityidset,
            locMinusQuantityList[i]?.transferGodownId,
            locMinusQuantityList[i]?.productQuantity
          );
        }
      }
    }
  }, [locQuantityList, locMinusQuantityList]);

  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
  }, []);

  useEffect(() => {
    variableForPrint = "";
    setVariableForButtonLoader(false);
    console.log(isGetProductCalled);
    if (isGetProductCalled === "false") {
      // getTempProductss();
    }
  }, []);

  // useEffect(() => {
  //     getProduct();
  // }, []);

  useEffect(() => {
    setButtonClicked(false);

    // getStoagelocation();

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    setInvoiceDate(dd + "/" + mm + "/" + yyyy);
  }, []);
  useEffect(() => {
    if (list?.length > 0) {
      setDisableDropdowns(true);
      setItemsAdded(false);
    } else {
      setDisableDropdowns(false);
    }
  }, [list]);

  useEffect(() => {
    console.log();
  }, [transferFromm]);

  useEffect(() => {
    if (transferTo && StorageLocation) {
      const matchingItem = StorageLocation.find(
        (item) => item.storageCode === transferTo
      );
      if (matchingItem) {
        productAvalibility = matchingItem._id;
        // console.log(productAvalibility);
      }
    }
    if (StorageLocation) {
      // console.log(StorageLocation);
      const filteredElement = StorageLocation?.filter((data) => {
        // console.log(JSON.parse(localStorage.getItem("shopId")));
        return data.storageCode.includes(
          JSON.parse(localStorage.getItem("shopId"))
        );
        // console.log("hello t");
      });

      // console.log(filteredElement);
      if (filteredElement?.length > 0) {
        // console.log("hello z");
        // to set transfer from only when user is not administrator
        if (!JSON.parse(localStorage.getItem("isAdministrator"))) {
          // setTransferFrom(filteredElement[0].storageCode);
          setTransferLocationName(filteredElement[0].storageAddress);
          // console.log(transferFrom);
        }
      }
    }
  }, [transferTo, StorageLocation]);

  ////////////// =============================== //////////////
  ///////////////////// Printer Selection ////////////////////////////
  ////////////////////////////////////////////////////////////
  // const handleSelectPrinter = (printer) => {
  //   setSelectedPrinter(printer);
  // };

  useEffect(() => {
    if (!loadingTempTransfer) {
      console.log(tempTransfer);
      setItemsAvailable(false);
    }
  }, [loadingTempTransfer]);

  ////////////==================================//////////
  ///////////////// New Logic ///////////////////////
  //////////==================================/////////

  const handleSelectTransferFromChange = (e, { value }) => {
    setTransferTo("");
    setTempTransferId(value);
    setSelectedRadioOption(value);
    setTransferFrom(value);
    setSelectedRadioOption(value);
    if (value.startsWith("G_")) {
      storage?.map((store) => {
        if (store?.storageCode === value) {
          console.log(store._id);
          setLocationsetid(store._id);
          setTransferGodownId(store._id);
          setShopAddress(store?.shopId?.shopAddress);
          setShopPhoneNo(store?.shopId?.shopPhoneNo);
          setTransferShopId(null);
        }
      });
      console.log("cellfie");
    } else {
      shop?.map((shopp) => {
        if (shopp?.shopCode === value) {
          console.log(shopp?._id);
          setShopAddress(shopp?.shopAddress);
          setShopPhoneNo(shopp?.shopPhoneNo);
          setTransferShopId(shopp?._id);
          setLocationsetid(shopp?._id);
          setTransferGodownId(null);
        }
      });
    }
  };

  const handleprodCodeSelectChangeto = (selectedValue) => {
    setTransferTo(selectedValue);

    if (selectedValue.startsWith("G_")) {
      storage?.map((store) => {
        if (store?.storageCode === selectedValue) {
          console.log(store._id);
          setTransferToGodownId(store._id);
          setTransferToShopId(null);
        }
      });
      console.log("cellfie");
    } else {
      shop?.map((shopp) => {
        if (shopp?.shopCode === selectedValue) {
          console.log(shopp?._id);
          setTransferToShopId(shopp?._id);
          setTransferToGodownId(null);
        }
      });
    }
  };

  useEffect(() => {
    if (shop && storage) {
      console.log(storage);
      console.log(shop);
      const renamedArray = storage.map((item) => ({
        shopCode: item.storageCode,
        shopAddress: item.storageAddress,
        shopDescription: item.storageDescription,
      }));
      console.log(renamedArray);
      mergedArray = [...renamedArray, ...shop];
      console.log(mergedArray);
    }
  }, [storage, shop]);

  ////////////// =============================== //////////////
  ///////////////////// handle Transfer to and transfer From ids  ////////////////////////////
  ////////////////////////////////////////////////////////////
  const handleprodCodeSelectChangefrom = async (selectedValue) => {
    // let Result = await GetTempTransfer();
    let Result = await getTemporaryTransfer();
    // let Result = tempTransfer
    console.log(tempProductResult);
    console.log(selectedValue);
    console.log(Result);
    let selected = "false";
    Result?.map((dataItems) => {
      if (dataItems.transferFrom === selectedValue) {
        setTransferFrom("");
        selected = "true";
        swal
          .fire({
            icon: "warning",
            title: t("titleThisLocationInvoicePreview"),
            html: t("html"),
            showCancelButton: true,
            confirmButtonText: t("confirmYesButton"), // Customize the "Yes" button text
            cancelButtonText: t("cancelNoButton"),
            customClass: {
              popup: "custom-swal-popup", // This is the custom class you're adding
            },
          })
          .then(async (result) => {
            console.log(result);
            if (result.isConfirmed) {
              console.log("hi");
              setTransferFrom("");
              navigate("/optionTempPage");
            }
          });
      }
    });
    // console.log("Selected value:", selectedValue);
    if (selected == "false") {
      setTransferFrom(selectedValue);
      setTempTransferId(selectedValue);
    }
  };

  //////////////============================================================////////////////////
  ////////////////////////// Handle Temporary Transfer Table logic //////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    console.log(postTempTransferProduct);
    if (postTempTransferProduct) {
      setTempTransferMainId(postTempTransferProduct?._id);
    }
  }, [postTempTransferProduct]);

  useEffect(() => {
    console.log(tempTransferDetails.length);

    if (tempTransferDetails.length === 0) {
      console.log(tempTransferDetails);
    } else {
      console.log(tempTransferDetails);
      handleTempLocationData();
      // handleTransfer()
    }
  }, [tempTransferDetails]);

  const handleTempLocationData = async () => {
    for (let i = 0; i < tempTransferDetails?.products?.length; i++) {
      console.log(tempTransferDetails.products[i].transferGodownId);
      console.log(tempTransferDetails.products[i]._id);
      if (tempTransferDetails.products[i].transferGodownId) {
        let resp = await getProductLocationOnGodownAndProductId(
          tempTransferDetails.products[i].quantityidset,
          tempTransferDetails.products[i].productColor,
          tempTransferDetails.products[i].transferGodownId
        );
        let godownId = resp.godownAvalibility;
        let productId = resp.product;
        let productColor = resp.colorId;
        let shopId = null;
        let quantity = resp.productQuantity;
        const locItems = {
          godownId,
          productColor,
          productId,
          shopId,
          quantity,
        };
        locItemsArray.push(locItems);
      } else {
        if (tempTransferDetails.products[i].transferShopId) {
          let resp = await getProductLocationOnShopAndProductId(
            tempTransferDetails.products[i].quantityidset,
            tempTransferDetails.products[i].productColor,
            tempTransferDetails.products[i].transferShopId
          );
          console.log(resp);
          let shopId = resp.shopAvalibility;
          let productId = resp.product;
          console.log(resp.colorId);
          let productColor = resp.colorId;
          let godownId = null;
          let quantity = resp.productQuantity;
          const locItems = {
            shopId,
            productColor,
            productId,
            godownId,
            quantity,
          };
          locItemsArray.push(locItems);
        }
      }
    }
    handleTransfer();
  };

  const handleTransfer = async () => {
    console.log(locItemsArray);
    console.log(tempTransferDetails);
    tempTransferDetails?.products.map((tempSale) => {
      console.log("hhi");
      locItemsArray?.map((locItems) => {
        if (locItems?.godownId) {
          if (
            tempSale.quantityidset === locItems.productId &&
            tempSale.transferGodownId === locItems.godownId &&
            tempSale.productColor === locItems.productColor
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
                    setTransferTo("");
                    setTransferFrom("");
                    navigate("/tempTransferPendings");
                  }
                  console.log(result);
                });
            }
          }
        } else {
          if (locItems?.shopId) {
            if (
              tempSale.quantityidset === locItems.productId &&
              tempSale.transferShopId === locItems.shopId &&
              tempSale.productColor === locItems.productColor
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
                      setTransferTo("");
                      setTransferFrom("");
                      navigate("/tempTransferPendings");
                    }
                    console.log(result);
                  });
              }
            }
          }
        }
      });
    });

    if (tempTransferDetails) {
      setTransferFrom(tempTransferDetails.transferFrom);
      setTransferTo(tempTransferDetails.transferTo);
      setShopAddress(tempTransferDetails.address);
      setShopPhoneNo(tempTransferDetails.phoneNo);
      setSelectedRadioOption(tempTransferDetails.transferFrom);
      const productLength = tempTransferDetails.products?.length;
      ///////*****for matcing location id******////
      for (let j = 0; j < productLength; j++) {
        setTransferShopId(tempTransferDetails.products[j].transferShopId);
        setTempTransferMainId(tempTransferDetails?._id);
        setTransferGodownId(tempTransferDetails.products[j].transferGodownId);
        setLocationsetid(tempTransferDetails.products[j].locationsetid);
        let Code = tempTransferDetails.products[j].Code;
        let Color = tempTransferDetails.products[j].Color;
        let Company = tempTransferDetails.products[j].Company;
        let Namee = tempTransferDetails.products[j].Namee;
        let PurchaseQuantity = parseInt(
          tempTransferDetails.products[j].PurchaseQuantity
        );
        let id = tempTransferDetails.products[j].id;
        let quantityidset = tempTransferDetails.products[j].quantityidset;
        let locationsetid = tempTransferDetails.products[j].locationsetid;
        let productColor = tempTransferDetails.products[j].productColor;
        let transferToShopId = tempTransferDetails.products[j].transferToShopId;
        let transferToGodownId =
          tempTransferDetails.products[j].transferToGodownId;
        let transferShopId = tempTransferDetails.products[j].transferShopId;
        let transferGodownId = tempTransferDetails.products[j].transferGodownId;

        const newItems = {
          id,
          Namee,
          Code,
          PurchaseQuantity,
          Color,
          Company,
          quantityidset,
          locationsetid,
          productColor,
          transferToShopId,
          transferToGodownId,
          transferShopId,
          transferGodownId,
        };
        setList((prevList) => [...prevList, newItems]);
        // setList([...list, newItems])
        console.log(Code);
      }
      dispatch({
        type: TEMP_TRANSFER_DETIALS_SUCCESS,
        payload: [],
      });
    }
  };

  // const getProduct = async () => {
  //   let result = await getProducts();
  //   setProducts(result);
  //   console.log(result)
  // }
  ////////////// =============================== //////////////
  ///////////////////// handle Temporary Transfer Table data  ////////////////////////////
  ////////////////////////////////////////////////////////////
  // const getTempProductss = async (value) => {
  //   console.log(selectedRadioOption)
  //   console.log('called')
  //   isGetProductCalled = "true";

  //   let productLoc = await getProductLoc();
  //   // tempProductResult = await GetTempTransfer();
  //   let tempProductResult = await getTemporaryTransfer()
  //   // tempProductResult = tempTransfer
  //   console.log('called')
  //   console.log(tempProductResult)
  //   let roleName = JSON.parse(localStorage.getItem("roles"));
  //   console.log(roleName);
  //   if (!JSON.parse(localStorage.getItem("isAdministrator"))) {
  //     tempProductResult = tempProductResult?.reduce(
  //       (filteredProducts, product) => {
  //         if (
  //           product?.transferFrom === JSON.parse(localStorage.getItem("shopId")) || product?.transferFrom === value
  //         ) {
  //           filteredProducts.push(product);
  //         }
  //         return filteredProducts;
  //       },
  //       []
  //     );
  //   }

  //   console.log(tempProductResult);
  //   if(!itemsAdded) {
  //     console.log("enter");
  //     if (roleName[0] === "Administrator" && tempProductResult?.length > 0) {
  //       swal
  //         .fire({
  //           icon: "warning",
  //           title: t("titleMultipleInvoiceInProgress"),
  //           html: t("html"),
  //           showCancelButton: true,
  //           confirmButtonText: t("confirmYesButton"), // Customize the "Yes" button text
  //           cancelButtonText: t("cancelNoButton"),
  //           allowOutsideClick: false, // Prevent clicking outside the modal from closing it
  //           allowEscapeKey: false,
  //           customClass: {
  //             popup: "custom-swal-popup", // This is the custom class you're adding
  //           },
  //         })
  //         .then(async (result) => {
  //           console.log(result);
  //           if (result.isConfirmed) {
  //             console.log("hi");
  //             navigate("/optionTempPage");
  //           }
  //         });
  //       setItemsAvailable(false);
  //     } else {
  //       console.log("called");
  //       if (tempProductResult && tempProductResult?.length > 0)
  //       {
  //         setItemsAvailable(false);
  //         setislistadded(true);
  //         setTempDeleteId(tempProductResult[0]._id);
  //         setTransferFrom(tempProductResult[0].transferFrom);
  //         setTransferTo(tempProductResult[0].transferTo);
  //         setSelectedRadioOption(tempProductResult[0].transferFrom)
  //         console.log(tempProductResult[0].transferFrom)
  //         console.log(tempProductResult[0].transferTo)
  //         console.log(tempProductResult)
  //          ///////*****for matcing location id******//////
  //          let result = await gettStorage();
  //          const selectedOption = result?.find(
  //            (element) => element.storageCode === tempProductResult[0].transferTo
  //          );
  //          if (selectedOption) {
  //            console.log(selectedOption._id)
  //            setSelectedId(selectedOption._id);
  //            setStateIds(selectedOption._id);
  //          } else {
  //            setSelectedId(null);
  //          }

  //          ///////////////////////////////////////////////

  //         productLoc?.map((locc) => {
  //           tempProductResult?.map((dataItems) => {
  //             dataItems?.products?.map((product) => {
  //               if (
  //                 locc?.product?._id === product.quantityidset &&
  //                 locc?.productAvalibility?._id === product.locationsetid
  //               ) {
  //                 console.log(product);
  //                 console.log(locc?.productQuantity);
  //                 console.log(product.PurchaseQuantity);
  //                 if (locc?.productQuantity >= product.PurchaseQuantity) {
  //                   haveListItems = "true";
  //                   console.log(product.Code);
  //                   let Code = product.Code;
  //                   let Color = product.Color;
  //                   let Company = product.Company;
  //                   let Namee = product.Namee;
  //                   let PurchaseQuantity = parseInt(product.PurchaseQuantity);
  //                   let id = product.id;
  //                   let quantityidset = product.quantityidset;
  //                   let locationsetid = product.locationsetid;

  //                   const newItems = {
  //                     id,
  //                     Namee,
  //                     Code,
  //                     PurchaseQuantity,
  //                     Color,
  //                     Company,
  //                     quantityidset,
  //                     locationsetid,
  //                   };
  //                   setList((prevList) => [...prevList, newItems]);
  //                   // setList([...list, newItems])
  //                   console.log(Code);
  //                 }
  //               }
  //             });
  //           });
  //         });
  //         if (haveListItems === "false") {
  //           setList([]);
  //           setTransferFrom("");
  //           setTransferTo("");
  //           dispatch(deleteTempTransferAll(tempProductResult[0]._id))
  //           // deleteAllTempRecord(tempProductResult[0]._id);
  //         } else {
  //           swal
  //             .fire({
  //               icon: "warning",
  //               title: t("tileInvoiceAlreadyInProgess"),
  //               html: t("html"),
  //               showCancelButton: true,
  //               confirmButtonText: t("confirmYesButton"), // Customize the "Yes" button text
  //               cancelButtonText: t("cancelNoButton"),
  //               allowOutsideClick: false, // Prevent clicking outside the modal from closing it
  //               allowEscapeKey: false,
  //               customClass: {
  //                 popup: "custom-swal-popup", // This is the custom class you're adding
  //               },
  //             })
  //             .then(async (result) => {
  //               if (result.value) {
  //               } else {
  //                 setList([]);
  //                 setTransferFrom("");
  //                 setTransferTo("");
  //                 setIsselected(true);
  //                 console.log(tempProductResult);
  //                 console.log(tempProductResult[0]._id);
  //                 dispatch(deleteTempTransferAll(tempProductResult[0]._id))
  //                 // deleteAllTempRecord(tempProductResult[0]._id);
  //               }
  //             });
  //         }
  //       } else {
  //         console.log('hiie')
  //         setItemsAvailable(false);
  //       }
  //     }
  //   }
  // };

  // const getStoagelocation = async () => {
  //   let result = await gettStorage();
  //   setStorageLocation(result);
  // };

  ////////////// =============================== //////////////
  ///////////////////// handle downloading and updating quanitity in the database  ////////////////////////////
  ////////////////////////////////////////////////////////////
  const handlePrintDownload = async () => {
    try {
      setButtonClicked(true);
      setVariableForButtonLoader(true);
      const result = await handleSaveData();
      console.log(result);

      if (result === "success") {
        // let productLoc = await getProductLoc();
        // let productLoc = await getProductLoc()
        // console.log(productLoc);
        console.log(list);
        list.map((temp) => {
          let productQuantity = parseInt(temp?.PurchaseQuantity);
          let quantityidset = temp?.quantityidset;
          let locationsetid = selectedId;
          let productColor = temp?.productColor;
          let transferToShopId = temp?.transferToShopId;
          let transferToGodownId = temp?.transferToGodownId;
          const newItems = {
            productQuantity,
            productColor,
            quantityidset,
            transferToShopId,
            transferToGodownId,
          };
          // setLocList((prevList) => [...prevList, newItems]);
          setLocQuantityList((prevList) => [...prevList, newItems]);
        });

        list.map((temp) => {
          let prodQuantity = parseInt(temp?.PurchaseQuantity);
          let productQuantity = -prodQuantity;
          let quantityidset = temp?.quantityidset;
          let locationsetid = selectedId;
          let productColor = temp?.productColor;
          let transferShopId = temp?.transferShopId;
          let transferGodownId = temp?.transferGodownId;
          const newItems = {
            productQuantity,
            productColor,
            quantityidset,
            transferShopId,
            transferGodownId,
          };
          // setLocList((prevList) => [...prevList, newItems]);
          setLocMinusQuantityList((prevList) => [...prevList, newItems]);
        });

        // productLoc?.map((locc) =>
        // {
        //   list.map((temp) => {
        //     console.log("hiiiiii");
        //     if (
        //       locc?.product?._id === temp.quantityidset &&
        //       locc?.productAvalibility?.storageCode === selectedRadioOption
        //     ) {
        //       console.log("hiiii");
        //       console.log(locc?.productQuantity);
        //       console.log(temp?.PurchaseQuantity);
        //       let prodQuantity = parseInt(locc?.productQuantity);
        //       let purchaseQuantity = parseInt(temp?.PurchaseQuantity);
        //       console.log(prodQuantity);
        //       console.log(purchaseQuantity);
        //       let productQuantity = prodQuantity - purchaseQuantity;
        //       let quantityidset = locc?.product?._id;
        //       let locationsetid = locc?.productAvalibility?._id;
        //       const newItems = {
        //         productQuantity,
        //         quantityidset,
        //         locationsetid,
        //       };
        //       // setMinusLocList((prevList) => [...prevList, newItems]);
        //       setLocMinusQuantityList((prevList) => [...prevList, newItems]);
        //     }
        //   });
        // });
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

  ////////////// =============================== //////////////
  ///////////////////// handle saving data in the database of transfer invoice table  ////////////////////////////
  ////////////////////////////////////////////////////////////
  const handleSaveData = async () => {
    // console.log(clientName);
    // console.log(clientAddress);
    // console.log(list);

    // let tempTransferProductResult = await GetTempTransfer();
    let tempTransferProductResult = await getTemporaryTransfer();
    console.log(tempTransferProductResult);

    let roleName = JSON.parse(localStorage.getItem("roles"));
    console.log(roleName);
    if (!JSON.parse(localStorage.getItem("isAdministrator"))) {
      tempTransferProductResult = tempTransferProductResult?.reduce(
        (filteredProducts, product) => {
          if (
            product?.transferFrom === selectedRadioOption &&
            product?.transferTo === transferTo
          ) {
            filteredProducts.push(product);
          }
          return filteredProducts;
        },
        []
      );
    }
    console.log(tempDeleteId);

    try {
      setIsGenerated(true);

      // console.log(list);
      const response = await postTransferProduct(
        transferFrom,
        transferTo,
        transferBy,
        shopAddress,
        shopPhoneNo,
        list
      );
      // const response = await baseQuery(
      //   {
      //     url: "/api/transferProduct/post",
      //     method: "POST",
      //     body: {
      //       transferFrom,
      //       transferTo,
      //       transferBy,
      //       list,
      //     },
      //   },
      //   {
      //     getState: () => ({
      //       auth: {
      //         token: JSON.parse(localStorage.getItem("accessToken")),
      //       },
      //     }),
      //   }
      // );

      console.log(response);
      console.log(response);
      if (response.message === "Transfer product created successfully") {
        //deleteAllTempRecord(tempProductResult[0]._id);
        // const result = response.data;
        // console.log('called1')
        // console.log(result);
        // console.log(result.newTranferProduct.id);
        const updatedInvoiceNumber = response?.newTranferProduct?.id;
        console.log("called2");
        setInvoiceNumber(updatedInvoiceNumber);
        console.log("called3");
        console.log(tempTransferProductResult[0]?._id);
        dispatch(deleteTempTransferAll(tempTransferProductResult[0]?._id));
        // deleteAllTempRecord(tempTransferProductResult[0]?._id);
        console.log(tempTransferProductResult[0]?._id);
        console.log("called4");
        // console.log(updatedInvoiceNumber);
        console.log("heelo");
        variableForPrint = "success";
        console.log("called5");
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
      <MetaData title="QE ~~TransferProduct" />
      <div className={`transfer ${colorTheme}`}>
        {transferProductPermission && (
          <>
            <div className="productActivity-Heading-container">
              <h3>{t("transferProduct")}</h3>
            </div>
            <div className="productActivityFormInput">
              <div className="productActivityRow">
                <div className="productActivityform1">
                  {!JSON.parse(localStorage.getItem("isAdministrator")) ? (
                    <>
                      <label htmlFor="transferfrom">{t("transferFrom")}</label>
                      <Dropdown
                        placeholder={t("transferFrom")}
                        selection
                        clearable
                        options={combinedOptions?.map((option) => ({
                          key: option,
                          text: option,
                          value: option,
                        }))}
                        value={selectedRadioOption}
                        disabled={disableDropdowns}
                        onChange={handleSelectTransferFromChange}
                        className="productActivityDropdown"
                      />
                    </>
                  ) : (
                    <>
                      <label htmlFor="transferfrom">{t("transferFrom")}</label>
                      <Dropdown
                        className="productActivityDropdown"
                        label={t("transferFrom")}
                        options={StorageLocation?.map((element) => ({
                          key: element.storageCode,
                          text: `${element.storageCode} (${element.storageAddress})`,
                          value: element.storageCode,
                        }))}
                        placeholder={t("enterTransferFrom")}
                        fluid
                        search
                        selection
                        clearable
                        disabled={disableDropdowns}
                        value={transferFrom}
                        onChange={(event, data) => {
                          handleprodCodeSelectChangefrom(data.value); // Pass the selected value as a parameter
                        }}
                        required
                      />
                    </>
                  )}
                </div>
                <div className="productActivityform1">
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
                </div>
              </div>
            </div>
            <div className="product-Activity-table-section">
              {transferTo && selectedRadioOption ? (
                <>
                  <TableForm />
                  <div
                    style={{
                      marginTop: "30px",
                      marginBottom: "30px",
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
                              marginLeft: "30px",
                              marginBottom: "30px",
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
                        setList([]);
                        setTransferTo("");
                        setTransferFrom("");
                        setInvoiceNumber("");
                        setDisableDropdowns(false);
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

            {user?.user?.printerId?.printerType === "laser" ? (
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
                    <div style={{ paddingTop: "600px" }}>
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
                  <MainDetails />
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
          marginLeft: "5%",
        }}
      >
        <Stack direction="row" marginTop={2}>
          <Typography style={{ color: "#000000", fontSize: 30 }}>
            {t("transferProduct")}
          </Typography>
          <Box flexGrow={1} textAlign="right">
            <Time />
          </Box>
        </Stack>

        <Stack
          backgroundColor="white"
          width="50%"
          borderRadius="25px 25px 25px 25px"
          padding={1}
          marginBottom={2}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            padding={3}
          >
            {
            // !itemsAvailable ? (
              <>
                <Stack>
                  <Stack spacing={2} direction="row" flex={1}>
                    {!JSON.parse(localStorage.getItem("isAdministrator")) ? (
                      <>
                        <label htmlFor="transferfrom">
                          {t("transferFrom")}
                        </label>
                        <Dropdown
                      placeholder= {t("transferFrom")}
                      selection
                      clearable
                      options={combinedOptions?.map((option) => ({
                        key: option,
                        text: option,
                        value: option,
                      }))}
                      value={selectedRadioOption}
                      disabled={disableDropdowns}
                      onChange={handleSelectTransferFromChange}
                      style={{
                        marginBottom: '0px',
                        padding: '10px',
                        width: '300px',
                        height: '30px',
                      }}
                    />
                      </>
                    ) : (
                      <>
                        <label htmlFor="transferfrom">
                          {t("transferFrom")}
                        </label>
                        <Dropdown
                          className="custom-dropdown"
                          label={t("transferFrom")}
                          options={StorageLocation?.map((element) => ({
                            key: element.storageCode,
                            text: `${element.storageCode} (${element.storageAddress})`,
                            value: element.storageCode,
                          }))}
                          placeholder={t("enterTransferFrom")}
                          fluid
                          search
                          selection
                          clearable
                          disabled={disableDropdowns}
                          value={transferFrom}
                          onChange={(event, data) => {
                            handleprodCodeSelectChangefrom(data.value); // Pass the selected value as a parameter
                          }}
                          required
                        />
                      </>
                    )}

                    <label htmlFor="trasfer to">{t("transferTo")}</label>
                    <Dropdown
                      className="custom-dropdown"
                      label={t("transferTo")}
                      options={mergedArray?.filter(
                        (element) => element.shopCode !== selectedRadioOption
                      )?.map((element) => ({
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
          <article style={{ marginTop: "30px" }}>
            {transferTo && selectedRadioOption ? (
              <>
                <TableForm />
                <div
                  style={{
                    marginTop: "30px",
                    marginBottom: "30px",
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
                      setList([]);
                      setTransferTo("");
                      setTransferFrom("");
                      setInvoiceNumber("");
                      setDisableDropdowns(false);
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
        user?.user?.printerId?.printerType === "laser" ? (
          <div className="print-only-container">
          <div ref={componentRef} className="p-5">
          <div style={{ border: "2px solid black", marginRight: "20px", padding: "15px", paddingBottom: "0px",  flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', }}>
            <Header />
            <MainDetails  />
            <Dates  />
            <Table  />
            <div style={{paddingTop: "600px"}}>
                      <p style={{display: 'flex', justifyContent: "center",fontSize: "12px", fontWeight: "bold"}}>Powered By Soft Wise Solutions +92 334 096 0444 </p>
                    </div>
            </div>

          </div>
        </div>
        ) : (
          <div className="print-only-container">
          <div ref={componentRef} className="p-5">
            <Header />
            <MainDetails />
            <Dates  />
            <Table />

          </div>
        </div>
        )
      }
  
      </main> */}
    </>
  );
}

export default App;
