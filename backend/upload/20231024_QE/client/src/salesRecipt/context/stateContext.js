import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";

import { useSelector, useDispatch } from "react-redux";
import { getStorage } from "../../actions/storageAction";
import {
  deleteTempSaleItemList,
  getTemppSale,
  postTempSale,
  updateTempSaleProducts,
  updateTempSaleQuantityInListProducts,
} from "../../actions/tempSaleAction";
import { getShop } from "../../actions/shopAction";
export const Statee = createContext();
let isCalled = "false";
export default function StateContext({ children }) {
  /////////==========================================////
  ///========== All useContext Variables =========/////////
  ///////========================================/////////
  let productLocationQuantityUpdateId = null;
  const [name, setName] = useState("");
  const [latestQuantities, setLatestQuantities] = useState({});
  const [address, setAddress] = useState("");
  const [shopAddress, setShopAddress] = useState();
  const [shopPhoneNo, setShopPhoneNo] = useState();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [website, setWebsite] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [productColor, setProductColor] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [width] = useState(641);
  const [isEditing, setIsEditing] = useState(false);
  const [showModaal, setShowModaal] = useState(false);
  const [showModalconfirm, setShowModalconfirm] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isdeletingrow, setIsdeletingrow] = useState(false);
  const [Code, setCode] = useState("");
  const [Namee, setNamee] = useState("");
  const [tempSaleMainId, setTempSaleMainId] = useState("");
  const [Company, setCompany] = useState("");
  const [color, setColor] = useState("");
  const [ActualPrice, setActualPrice] = useState();
  const [CurrentPrice, setCurrentPrice] = useState();
  const [Quantity, setQuantitye] = useState();
  const [PurchaseQuantity, setPurchaseQuantity] = useState();
  const [Discount, setDiscount] = useState();
  const [selectedSaleItem, setSelectedSaleItem] = useState([]);
  const [quantityidset, setQuantityidset] = useState("");
  const [locationsetid, setLocationsetid] = useState("");
  const [excludeTaxPrice, setExcludeTaxPrice] = useState("");
  const [totalAmounnt, setTotalAmounnt] = useState("");
  const [taxAmount, setTaxAmount] = useState("");
  const [TotalIncludedAll, setTotalIncludedAll] = useState("");
  const [GrandQuantityTotal, setGrandQuantityTotal] = useState("");
  const [GrandPriceTotal, setGrandPriceTotal] = useState("");
  const [GrandTotalExludeTex, setGrandTotalExludeTex] = useState("");
  const [GrandTotalTax, setGrandTotalTax] = useState("");
  const [GrandDiscount, setGrandDiscount] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [taxPercentageAmount, setTaxPercentageAmount] = useState("");
  const [taxPercentageAmountt, setTaxPercentageAmountt] = useState("");
  const [fbrInvoiceNumber, setFbrInvoiceNumber] = useState("");
  const [sellExpenses, setSellExpenses] = useState("");
  const [totalExpense, setTotalExpense] = useState("");
  const [barcodeDisplay, setBarcodeDisplay] = useState("");
  const [storageAddress, setStorageAddress] = useState("");
  const [storagePhoneNo, setStoragePhoneNo] = useState("");
  const [barcode, setBarcode] = useState("");
  const [barBack, setBarBack] = useState("false");
  const [barLoader, setBarLoader] = useState(false);
  const [barButtonDisable, setBarButtonDisable] = useState(false);
  const [fetchingListData, setFetchingListData] = useState(false);
  const [shopIdForData, setShopIdForData] = useState("");
  /////*******temp sale */////
  const [getTempSale, setGetTempSale] = useState([]);
  const [itemsAdded, setItemsAdded] = useState(false);
  const [itemsAvailable, setItemsAvailable] = useState(true);
  const [listEmpty, setListEmpty] = useState(false);

  const [saleBy, setSaleBy] = useState(
    JSON.parse(localStorage.getItem("username"))
  );
  let deleteCalled = "false";
  const dispatch = useDispatch();
  const componentRef = useRef();
  const { storage } = useSelector((state) => state.storage);
  const { tempSale } = useSelector((state) => state.tempSale);
  /////////==========================================////
  ///========== Handle DAta on the basis of login user =========/////////
  ///////========================================/////////

  useEffect(() => {
    call();
  }, []);

  useEffect(() => {
    if (storage?.length > 0) {
      console.log(storage);
      if (storage) {
        let Filtered = storage?.filter((data) => {
          if (
            JSON.parse(localStorage.getItem("shopId")) &&
            !data.storageCode
              .toString()
              .toLowerCase()
              .includes(
                JSON.parse(localStorage.getItem("shopId"))
                  .toString()
                  .toLowerCase()
              )
          ) {
            return false;
          }

          return true;
        });
        setStorageAddress(Filtered[0]?.storageAddress);
        setStoragePhoneNo(Filtered[0]?.storagePhoneNo);
      } else {
        console.log("called");
      }
    }
  }, [storage]);

  async function call() {
    dispatch(getStorage());
  }

  useEffect(() => {
    if (window.innerWidth < width) {
      alert("Place your phone in landscape mode for the best experience");
    }
  }, [width]);

  /////////==========================================////
  ///========== Function to update the latest quantity for an item =========/////////
  ///////========================================/////////
  //
  const updateLatestQuantity = (itemId, quantity) => {
    setLatestQuantities((prevState) => ({
      ...prevState,
      [itemId]: quantity,
    }));
  };

  /////////==========================================////
  ///========== Handle All list Data & saving Sale Temp Data=========/////////
  ///////========================================/////////
  const handleSubmit = async () => {
    console.log(list);
    console.log(productColor);
    ///****** handle already present data in list *******////////
    const existingItem = list.find(
      (item) =>
        item.Code === Code &&
        item.Namee.trim() === Namee.trim() &&
        item.Company.trim() === Company.trim() &&
        item.productColor.trim() === productColor.trim()
    );
    console.log(existingItem);
    ////******* update list data if already present in list  ******//////
    if (existingItem) {
      const newItemsNotupdated = {
        Code,
        color,
        Namee,
        Company,
        PurchaseQuantity,
        productColor,
        amount,
        barcode,
        quantityidset,
        locationsetid,
        Discount,
        excludeTaxPrice,
        taxPercentage,
        totalAmounnt,
        taxAmount,
        shopIdForData,
      };
      console.log(newItemsNotupdated);
      const updatedList = list?.map((item) => {
        if (item.Code === Code && item.productColor === productColor) {
          const updatedPurchaseQuantity =
            item.PurchaseQuantity + PurchaseQuantity;
          const updatedAmount = item.amount + amount;
          const quantityidsett = quantityidset;
          const locationsetidd = locationsetid;
          const shopIdForDataa = shopIdForData;
          const updatedDiscount = item.Discount + Discount;
          const updatedExcludeTaxPrice = item.excludeTaxPrice;
          const updatedTotalAmount = item.totalAmounnt + totalAmounnt;
          const updatedTaxAmount = item.taxAmount + taxAmount;

          updateLatestQuantity(item.id, updatedPurchaseQuantity); // Update the latest quantity separately for the item

          return {
            ...item,
            PurchaseQuantity: updatedPurchaseQuantity,
            amount: updatedAmount,
            quantityidset: quantityidsett,
            locationsetid: locationsetidd,
            shopIdForData: shopIdForDataa,
            Discount: updatedDiscount,
            excludeTaxPrice: updatedExcludeTaxPrice,
            totalAmounnt: updatedTotalAmount,
            taxAmount: updatedTaxAmount,
          };
        }
        return item;
      });
      //////***** set Updated list *******///////////
      setList(updatedList);
      await updatequantity(newItemsNotupdated); // Call the updatequantity function for the existing item

      ////********** update list in the temporary Sale table ********////////////
      const length = updatedList?.length;
      for (let i = 0; i < length; i++) {
        const item = updatedList[i];
        console.log(item);
        dispatch(
          updateTempSaleQuantityInListProducts(
            item.PurchaseQuantity,
            item.amount,
            item.Discount,
            item.excludeTaxPrice,
            item.totalAmounnt,
            item.taxAmount,
            item.quantityidset,
            item.locationsetid,
            item.shopIdForData
          )
        );
      }
    } else {
      /////******* set Data in list first time  ********//////
      const newItems = {
        id: uuidv4(),
        Code,
        color,
        Namee,
        Company,
        productColor,
        PurchaseQuantity,
        amount,
        barcode,
        quantityidset,
        locationsetid,
        shopIdForData,
        Discount,
        excludeTaxPrice,
        taxPercentage,
        totalAmounnt,
        taxAmount,
      };
      updateLatestQuantity(newItems.id, newItems.PurchaseQuantity); // Update the latest quantity separately for the new item
      await updatequantity(newItems);
      setList([...list, newItems]);

      let shopNo = JSON.parse(localStorage.getItem("shopId"));
      let listLength = getTempSale?.length;
      console.log(getTempSale);
      console.log(listLength);
      console.log(shopNo);
      console.log(clientAddress);
      let added = "no";
      for (let i = 0; i < listLength; i++) {
        console.log(i);
        console.log(getTempSale[i]?.shopNo);
        console.log(getTempSale[i]?.customerNumber);
        if (
          getTempSale &&
          getTempSale?.length > 0 &&
          getTempSale[i]?.shopNo === shopNo &&
          getTempSale[i]._id === tempSaleMainId
        ) {
          ////****** update list in temporary Sale Table ******///
          console.log("update");

          added = "yes";
          console.log(added);
          dispatch(
            updateTempSaleProducts(
              getTempSale[i]._id,
              newItems.id,
              Code,
              color,
              Namee,
              Company,
              PurchaseQuantity,
              amount,
              barcode,
              quantityidset,
              locationsetid,
              productColor,
              shopIdForData,
              Discount,
              excludeTaxPrice,
              taxPercentage,
              totalAmounnt,
              taxAmount
            )
          );
        }
      }
      console.log(added);
      if (added == "no") {
        {
          console.log("called");
          ////******** adding data to the temporary Sale Table *****////
          console.log(clientName);
          console.log(clientAddress);
          dispatch(
            postTempSale(
              clientName,
              clientAddress,
              shopIdForData,
              shopAddress,
              shopPhoneNo,
              newItems
            )
          );
          // await AddTempSales(
          //   clientName,
          //   clientAddress,
          //   newItems
          //   )
        }
      }
    }
    setIsEditing(false);
    setFetchingListData(false);
  };

  /////////==========================================////
  ///========== All Calculation of the list Data=========/////////
  ///////========================================/////////
  useEffect(() => {
    setTotalAmounnt(parseInt(excludeTaxPrice) * parseInt(PurchaseQuantity));
  }, [PurchaseQuantity]);

  useEffect(() => {
    setTotalExpense(parseInt(sellExpenses) * parseInt(PurchaseQuantity));
  }, [sellExpenses, PurchaseQuantity]);

  useEffect(() => {
    setTaxPercentageAmount(parseInt(taxPercentage) / 100);
  }, [excludeTaxPrice, taxPercentage]);

  useEffect(() => {
    setTaxPercentageAmountt(excludeTaxPrice * taxPercentageAmount);
  }, [excludeTaxPrice, taxPercentageAmount]);

  useEffect(() => {
    // console.log(taxPercentageAmountt);
    setTaxAmount(
      parseInt((taxPercentageAmountt * PurchaseQuantity).toFixed(2))
    );
  }, [taxPercentageAmountt, PurchaseQuantity]);

  // Calculate items amount function
  useEffect(() => {
    const calculateAmount = (amount) => {
      console.log(totalAmounnt);
      console.log(taxAmount);
      console.log(totalExpense);
      console.log(Discount);
      const abc = totalAmounnt + taxAmount - Discount;
      console.log(abc);
      setAmount(
        parseInt(totalAmounnt) + parseInt(taxAmount) - parseInt(Discount)
      );
    };

    calculateAmount(amount);
  }, [amount, ActualPrice, Quantity, CurrentPrice, PurchaseQuantity, Discount]);

  useEffect(() => {
    dispatch(getShop());
  }, []);
  /////////==========================================////
  ///========== update Quantity in Product Location Table========/////////
  ///////========================================/////////
  const updatequantity = async (element) => {
    // let productQuantity = Quantity - element.PurchaseQuantity;
    // let productLocation = await getProductLoc();
    // productLocation?.map((prodLoc) => {
    //   if (
    //     prodLoc.product?._id == quantityidset &&
    //     prodLoc.productAvalibility?._id == locationsetid
    //   ) {
    //     productLocationQuantityUpdateId = prodLoc._id;
    //     // console.log(prodLoc._id);
    //   }
    // });
    // // console.log(productLocationQuantityUpdateId);
    // let result = await updateProductLoccc(
    //   productLocationQuantityUpdateId,
    //   productQuantity
    // );
    // console.warn(result);
  };

  const calculateTotal = () => {
    const allItems = list?.map((item) => item.amount);
    const allQuantities = list?.map((item) => item.PurchaseQuantity);
    const allprice = list?.map((item) => item.excludeTaxPrice);
    const allTotalAmount = list?.map((item) => item.totalAmounnt);
    const allTaxAmount = list?.map((item) => item.taxAmount);
    const allgrandDiscount = list?.map((item) => item.Discount);

    setTotal(collect(allItems).sum());
    setGrandQuantityTotal(collect(allQuantities).sum());
    setGrandPriceTotal(collect(allprice).sum());
    setGrandTotalExludeTex(collect(allTotalAmount).sum());
    setGrandTotalTax(collect(allTaxAmount).sum());
    setGrandDiscount(collect(allgrandDiscount).sum());
  };

  useEffect(() => {
    deleteCalled = "false";
    calculateTotal();
  });

  // Edit function
  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list?.filter((row) => row.id !== id));
    setIsEditing(true);
    setDescription(editingRow.description);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);
  };

  useEffect(() => {
    if (tempSale?.length > 0 && listEmpty === true && deleteCalled === "true") {
      setList([]);
      setClientAddress("");
      setClientName("");
    }
  }, [tempSale]);
  /////////==========================================////
  ///========== Delete Data from the list && Temporary sale Table=========/////////
  ///////========================================/////////
  // Delete function
  const deleteRow = async (id) => {
    deleteCalled = "true";
    setIsdeletingrow(true);
    setList(list?.filter((row) => row.id !== id));
    const result = list.find((item) => item.id === id);
    dispatch(deleteTempSaleItemList(id));
    // await deleteTempSaleRecord(id)
    // let tempProdData = await GetTempSale();
    dispatch(getTemppSale());
    // if(tempProdData?.length < 1 && listEmpty===true){
    //   setList([]);
    //   setClientAddress("");
    //   setClientName("");
    // }
    // console.log(tempProdData);
    setShowModaal(false);
    setIsdeletingrow(false);
  };

  const context = {
    name,
    setName,
    address,
    setAddress,
    email,
    setEmail,
    phone,
    setPhone,
    bankName,
    setBankName,
    bankAccount,
    setBankAccount,
    website,
    setWebsite,
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
    description,
    setDescription,
    quantity,
    setQuantity,
    price,
    setPrice,
    amount,
    setAmount,
    list,
    setList,
    total,
    setTotal,
    width,
    componentRef,
    // handlePrint,
    isEditing,
    setIsEditing,
    showModaal,
    setShowModaal,
    handleSubmit,
    editRow,
    deleteRow,
    showLogoutModal,
    setShowLogoutModal,
    Code,
    setCode,
    Namee,
    setNamee,
    Company,
    setCompany,
    color,
    setColor,
    ActualPrice,
    setActualPrice,
    CurrentPrice,
    setCurrentPrice,
    Quantity,
    setQuantitye,
    PurchaseQuantity,
    setPurchaseQuantity,
    Discount,
    setDiscount,
    showModalconfirm,
    setShowModalconfirm,
    selectedSaleItem,
    setSelectedSaleItem,
    quantityidset,
    setQuantityidset,
    locationsetid,
    setLocationsetid,
    excludeTaxPrice,
    setExcludeTaxPrice,
    totalAmounnt,
    setTotalAmounnt,
    taxAmount,
    setTaxAmount,
    TotalIncludedAll,
    setTotalIncludedAll,
    GrandQuantityTotal,
    setGrandQuantityTotal,
    GrandPriceTotal,
    setGrandPriceTotal,
    GrandTotalExludeTex,
    setGrandTotalExludeTex,
    GrandTotalTax,
    setGrandTotalTax,
    GrandDiscount,
    setGrandDiscount,
    fbrInvoiceNumber,
    setFbrInvoiceNumber,
    isdeletingrow,
    setIsdeletingrow,
    taxPercentage,
    setTaxPercentage,
    sellExpenses,
    setSellExpenses,
    storageAddress,
    storagePhoneNo,
    storageAddress,
    storagePhoneNo,
    saleBy,
    barcodeDisplay,
    setBarcodeDisplay,
    barcode,
    setBarcode,
    barBack,
    setBarBack,
    barLoader,
    setBarLoader,
    barButtonDisable,
    setBarButtonDisable,
    fetchingListData,
    setFetchingListData,
    productColor,
    setProductColor,
    getTempSale,
    setGetTempSale,
    tempSaleMainId,
    setTempSaleMainId,
    itemsAdded,
    setItemsAdded,
    itemsAvailable,
    setItemsAvailable,
    listEmpty,
    setListEmpty,
    shopIdForData,
    setShopIdForData,
    shopAddress,
    setShopAddress,
    shopPhoneNo,
    setShopPhoneNo,
  };

  return <Statee.Provider value={context}>{children}</Statee.Provider>;
}
