import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";
import {
  // getStorage,
  // deleteTempRecord,
  // AddTempTransfer,
  updateTempTransferProductItem,
  // updateTempTransferProductQuantity,
} from "../../Api";
import { baseQuery, apiSlice } from "../../app/api/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTempTransferProducts,
  postTempTransfer,
  udpateTempTransferProductItem,
  udpateTempTransferProductQuantity,
} from "../../actions/tempTransferAction";
import { refreshTokken } from "../../actions/userAction";
export const Statte = createContext();

export default function StateContext({ children }) {
  let productLocationQuantityUpdateId = null;
  // let selectedId = null;
  let conditionMet = false;
  const [transferFrom, setTransferFrom] = useState();
  const [transferTo, setTransferTo] = useState();
  const [shopAddress, setShopAddress] = useState();
  const [shopPhoneNo, setShopPhoneNo] = useState();
  const [latestQuantities, setLatestQuantities] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [transferShopId, setTransferShopId] = useState("");
  const [transferGodownId, setTransferGodownId] = useState("");
  const [transferToShopId, setTransferToShopId] = useState("");
  const [transferToGodownId, setTransferToGodownId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [website, setWebsite] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
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
  const [productColor, setProductColor] = useState("");
  // const [invoices, setInvoices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showModall, setShowModall] = useState(false);
  const [showModalconfirm, setShowModalconfirm] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [Code, setCode] = useState("");
  const [Namee, setNamee] = useState("");
  const [Company, setCompany] = useState("");
  const [Color, setColor] = useState("");
  const [ActualPrice, setActualPrice] = useState();
  const [CurrentPrice, setCurrentPrice] = useState();
  const [Quantity, setQuantitye] = useState();
  const [PurchaseQuantity, setPurchaseQuantity] = useState();
  const [Discount, setDiscount] = useState();
  const [selectedSaleItem, setSelectedSaleItem] = useState([]);
  const [quantityidset, setQuantityidset] = useState("");
  const [locationsetid, setLocationsetid] = useState("");
  const [StateIds, setStateIds] = useState("");
  const [storageAddress, setStorageAddress] = useState("");
  const [storagePhoneNo, setStoragePhoneNo] = useState("");
  const [disableDropdowns, setDisableDropdowns] = useState(false);
  const [fetchingListData, setFetchingListData] = useState(false);

  /////********** New Logic  ***********/////////
  const [selectedItems, setSelectedItems] = useState([]);
  const [tempProductId, setTempProductId] = useState();
  const [tempProductAvailibilityId, setTempProductAvailibilityId] = useState();
  const [tempProductQuantity, setTempProductQuantity] = useState();
  const [tempTransferId, setTempTransferId] = useState();
  const [getTempTransferData, setGetTempTransferData] = useState([]);
  const [itemsAdded, setItemsAdded] = useState(false);
  const [itemsAvailable, setItemsAvailable] = useState(true);
  const [islistadded, setislistadded] = useState(false);
  const [tempDeleteId, setTempDeleteId] = useState();
  const [selectedRadioOption, setSelectedRadioOption] = useState("");
  const [tempTransferMainId, setTempTransferMainId] = useState();
  const { storage } = useSelector((state) => state.storage);
  const { postTempTransferProduct } = useSelector(
    (state) => state.postTempTransferProduct
  );
  const dispatch = useDispatch();

  const [transferBy, setTransferBy] = useState(
    JSON.parse(localStorage.getItem("username"))
  );

  const componentRef = useRef();

  const handlePrint = () => {
    // console.log("wowwwwwwwwwwwwwwwwww");
    window.print();
  };

  useEffect(() => {
    if (window.innerWidth < width) {
      alert("Place your phone in landscape mode for the best experience");
    }
  }, [width]);

  useEffect(() => {
    if (storage === "Something went wrong") {
      console.log(storage);
    } else if (storage?.length > 0) {
      console.log(storage);
      let Filtered = storage?.filter((data) => {
        // console.log(data.storageCode);
        // console.log(JSON.parse(localStorage.getItem("shopId")));
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
      console.log(Filtered);
      setStorageAddress(Filtered[0]?.storageAddress);
      setStoragePhoneNo(Filtered[0]?.storagePhoneNo);
    }
  }, [storage]);

  // Function to update the latest quantity for an item
  const updateLatestQuantity = (itemId, quantity) => {
    setLatestQuantities((prevState) => ({
      ...prevState,
      [itemId]: quantity,
    }));
  };

  const handleSubmit = async () => {
    console.log(list);
    console.log(Code);
    console.log(locationsetid);
    const existingItem = list?.find(
      (item) =>
        item.Code === Code &&
        item.Namee.trim() === Namee.trim() &&
        item.Company.trim() === Company.trim() &&
        item.Color === Color.trim()
    );
    console.log(existingItem);
    if (existingItem) {
      const newItemsNotupdated = {
        id: uuidv4(),
        Namee,
        Code,
        PurchaseQuantity,
        Color,
        Company,
        quantityidset,
        locationsetid,
        productColor,
        transferShopId,
        transferGodownId,
        transferToShopId,
      };
      const updatedList = list?.map((item) => {
        if (
          item.Code === Code &&
          item.Namee.trim() === Namee.trim() &&
          item.Company.trim() === Company.trim() &&
          item.productColor === productColor
        ) {
          const updatedPurchaseQuantity =
            item.PurchaseQuantity + PurchaseQuantity;
          const quantityidsett = quantityidset;
          const locationsetidd = locationsetid;
          const productColorr = productColor;
          const transferShopIdd = transferShopId;
          const transferGodownIdd = transferGodownId;
          const transferToShopIdd = transferToShopId;
          updateLatestQuantity(item.id, updatedPurchaseQuantity); // Update the latest quantity separately for the item

          return {
            ...item,
            PurchaseQuantity: updatedPurchaseQuantity,
            quantityidset: quantityidsett,
            locationsetid: locationsetidd,
            productColor: productColorr,
            transferShopId: transferShopIdd,
            transferGodownId: transferGodownIdd,
            transferToShopId: transferToShopIdd,
          };
        }
        return item;
      });

      setList(updatedList);
      setItemsAdded(true);
      const length = updatedList?.length;
      for (let i = 0; i < length; i++) {
        const item = updatedList[i];

        udpateTempTransferProductQuantity(
          item.PurchaseQuantity,
          item.productColor,
          item.quantityidset,
          item.locationsetid
        );
      }

      //await updatequantity(newItemsNotupdated); // Call the updatequantity function for the existing item
    } else {
      const newItems = {
        id: uuidv4(),
        Namee,
        Code,
        PurchaseQuantity,
        Color,
        Company,
        productColor,
        quantityidset,
        locationsetid,
        transferShopId,
        transferGodownId,
        transferToShopId,
        transferToGodownId,
      };

      updateLatestQuantity(newItems.id, newItems.PurchaseQuantity); // Update the latest quantity separately for the new item

      //await updatequantity(newItems); // Call the updatequantity function for the new item

      setList([...list, newItems]);
      setItemsAdded(true);
      console.log(tempTransferMainId);
      console.log(getTempTransferData);
      let listLength = getTempTransferData?.length;
      let added = "no";
      for (let i = 0; i < listLength; i++) {
        console.log(getTempTransferData?._id);
        console.log("enter");
        console.log(i);
        console.log(getTempTransferData[i].transferFrom);

        if (
          getTempTransferData &&
          getTempTransferData?.length > 0 &&
          getTempTransferData[i]?.transferFrom === transferFrom &&
          getTempTransferData[i]?.transferTo === transferTo &&
          getTempTransferData[i]?._id === tempTransferMainId
        ) {
          console.log("yes");
          added = "yes";
          dispatch(
            udpateTempTransferProductItem(
              getTempTransferData[i]?._id,
              newItems.id,
              Namee,
              Code,
              PurchaseQuantity,
              Color,
              Company,
              locationsetid,
              quantityidset,
              productColor,
              transferShopId,
              transferGodownId,
              transferToGodownId,
              transferToShopId
            )
          );
        }
      }
      if (added == "no") {
        console.log("no");
        dispatch(
          postTempTransfer(
            transferFrom,
            transferTo,
            transferBy,
            shopAddress,
            shopPhoneNo,
            newItems
          )
        );
      }
    }

    setCode("");
    setNamee("");
    setCompany("");
    setColor("");
    setPurchaseQuantity("");
    setIsEditing(false);
    setFetchingListData(false);
  };

  // Calculate items amount function
  useEffect(() => {
    const calculateAmount = (amount) => {
      setAmount(PurchaseQuantity * ActualPrice - Discount);
    };

    calculateAmount(amount);
  }, [
    amount,
    ActualPrice,
    Quantity,
    setAmount,
    CurrentPrice,
    PurchaseQuantity,
    Discount,
  ]);

  // Use collect.js to calculate the total amount of items in the table. This is a much better function than the commented one above.
  const calculateTotal = () => {
    if (list.lenth > 0) {
      const allItems = list?.map((item) => item.amount);
      setTotal(collect(allItems).sum());
    }
  };

  useEffect(() => {
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

  // Delete function
  const deleteRow = async (id) => {
    console.log(id);
    setList(list?.filter((row) => row.id !== id));
    const result = list.find((item) => item.id === id);

    console.log(result?.quantityidset);
    console.log(result?.locationsetid);
    dispatch(deleteTempTransferProducts(id, result.locationsetid));
    // await deleteTempRecord(id, result.locationsetid);
    setShowModall(false);
  };

  const context = {
    transferFrom,
    setTransferFrom,
    transferTo,
    setTransferTo,
    disableDropdowns,
    setDisableDropdowns,

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
    handlePrint,
    isEditing,
    setIsEditing,
    showModall,
    setShowModall,
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
    Color,
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
    StateIds,
    setStateIds,
    selectedId,
    setSelectedId,
    storageAddress,
    storagePhoneNo,
    transferBy,
    fetchingListData,
    setFetchingListData,

    selectedItems,
    setSelectedItems,
    tempProductId,
    setTempProductId,
    tempProductAvailibilityId,
    setTempProductAvailibilityId,
    tempProductQuantity,
    setTempProductQuantity,
    tempTransferId,
    setTempTransferId,
    getTempTransferData,
    setGetTempTransferData,
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
    productColor,
    setProductColor,
  };

  return <Statte.Provider value={context}>{children}</Statte.Provider>;
}
