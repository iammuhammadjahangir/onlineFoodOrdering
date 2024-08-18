import { useState } from "react";

export const useCustomState = () => {
  /////***** Color Varaibles *************/////////
  const [colorName, setColorName] = useState();
  const [loading, setLoading] = useState(false);
  const [isCalled, setIsCalled] = useState(true);
  const [colorDescription, setColorDescription] = useState();

  /////////*********Product Variables **********//////////

  const [buttonClicked, setButtonClicked] = useState(false);
  const [producttName, setProducttName] = useState();
  const [productCode, setProductCode] = useState();
  const [productName, setProductName] = useState();
  const [productActualPrice, setActPrice] = useState();
  const [productCurrentPrice, setCurrPrice] = useState();
  const [productQuantity, setProductQuantity] = useState();
  const [formClassName, setformClassName] = useState();
  const [productStorage, setProductStorage] = useState();
  const [prodCompany, setProdCompany] = useState();
  const [prodColor, setProdColor] = useState();
  const [producttCompany, setProducttCompany] = useState();

  const [productTypeeName, setProductTypeName] = useState();
  const [producttColor, setProducttColor] = useState();

  let productLoc = [];
  let productss = [];
  let barcode = [];
  let quantity = "";
  let productBarcode = "";
  let productAvalibility = "";
  let product_idd = "";
  let product_id = "";
  let id = "";
  let productColor = "";
  let productCompany = "";
  let prodType = "";
  let hasErrorProduct = "false";
  let hasCompanyError = "false";
  let hasColorError = "false";
  let hasStorageError = "false";
  let productlocate = "false";
  let productMatch = "false";

  const [Products, setProducts] = useState();
  const [productType, setProductType] = useState();

  //////////*********Product Company functions */
  const [companyName, setcompanyName] = useState();
  const [companyAddress, setCompanyAddress] = useState();

  /////////**********Godown ********//////////
  const [storageCode, setStorageCode] = useState();
  const [storageAddress, setStorageAddress] = useState();
  const [storageDescription, setStorageDescription] = useState();
  const [storageType, setStorageType] = useState();
  const [storagePhoneNo, setStoragePhoneNo] = useState();
  let storen = [];
  const options = [
    { key: "shop", text: "shop", value: "shop" },
    { key: "store", text: "store", value: "store" },
  ];
  const [product, setProduct] = useState();
  const [data, setData] = useState();

  /////////////*******Product Type ************///////////
  const [productDescription, setProductDescription] = useState();

  /////////**********Purchase  ********/
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectEndDate, setSelectEndDate] = useState(null);
  const [SalesRecord, setSalesRecord] = useState([]);
  const [InvoiceNumber, setInvoiceNumber] = useState();
  const [custName, setcustName] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [invoicedata, setInvoicedata] = useState([]);
  const [purchaseReceiptNumber, setPurchaseReceiptNumber] = useState();
  const [purchaseCompany, setPurchaseCompany] = useState();
  ////////**********Expenses *******///////
  const [expenseType, setExpenseType] = useState();
  const [expenseDescription, setExpenseDescription] = useState();
  const [guestExpenses, setGuestExpenses] = useState();
  const [expenseAmount, setExpenseAmount] = useState();
  const [otherExpenses, setOtherExpenses] = useState();
  const [total, setTotal] = useState();
  return {
    colorName,
    setColorName,
    loading,
    setLoading,
    isCalled,
    setIsCalled,
    colorDescription,
    setColorDescription,

    /////*****Product ******////////
    buttonClicked,
    setButtonClicked,
    producttName,
    setProducttName,
    productCode,
    setProductCode,
    productName,
    setProductName,
    productActualPrice,
    setActPrice,
    productCurrentPrice,
    setCurrPrice,
    productQuantity,
    setProductQuantity,
    formClassName,
    setformClassName,
    productStorage,
    setProductStorage,
    prodCompany,
    setProdCompany,
    prodColor,
    setProdColor,
    productTypeeName,
    setProductTypeName,
    producttColor,
    setProducttColor,
    productLoc,
    productss,
    quantity,
    barcode,
    productBarcode,
    product_id,
    productAvalibility,
    product_idd,
    hasCompanyError,
    hasColorError,
    hasStorageError,
    productlocate,
    productMatch,
    hasErrorProduct,
    productColor,
    id,
    productCompany,
    prodType,
    Products,
    setProducts,
    productType,
    setProductType,
    producttCompany,
    setProducttCompany,

    /////******company ***/////////
    companyName,
    setcompanyName,
    companyAddress,
    setCompanyAddress,

    //////******Godown *******////////
    storageCode,
    setStorageCode,
    storageAddress,
    setStorageAddress,
    storageDescription,
    setStorageDescription,
    storageType,
    setStorageType,
    storen,
    options,
    product,
    setProduct,
    storagePhoneNo,
    setStoragePhoneNo,

    //////////********type */
    productDescription,
    setProductDescription,
    data,
    setData,

    /////******Purchase */
    selectedDate,
    setSelectedDate,
    selectEndDate,
    setSelectEndDate,
    SalesRecord,
    setSalesRecord,
    InvoiceNumber,
    setInvoiceNumber,
    custName,
    setcustName,
    filteredProducts,
    setFilteredProducts,
    invoicedata,
    setInvoicedata,
    purchaseReceiptNumber, 
    setPurchaseReceiptNumber,
    purchaseCompany, 
    setPurchaseCompany,

    ////////**********Expenses ********//////
    expenseType,
    setExpenseType,
    expenseDescription,
    setExpenseDescription,
    guestExpenses,
    setGuestExpenses,
    expenseAmount,
    setExpenseAmount,
    otherExpenses,
    setOtherExpenses,
    total,
    setTotal,
  };
};
