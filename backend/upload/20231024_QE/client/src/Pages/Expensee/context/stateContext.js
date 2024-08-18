import { createContext, useEffect, useRef, useState } from "react";
// import { getStorage } from "../../../Api";
import { useSelector, useDispatch } from "react-redux";
export const Statee = createContext();

export default function StateContext({ children }) {
  const [expenses, setExpense] = useState([]);
  const [expenseType, setExpenseType] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseTotal, setExpenseTotal] = useState("");
  const [expenseLocation, setExpenseLocation] = useState("");
  const [transferFrom, setTransferFrom] = useState("");
  const [transferLocationName, setTransferLocationName] = useState("");
  const [StorageLocation, setStorageLocation] = useState([]);
  const [transferFromObjectId, setTransferFromObjectId] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [salesId, setSalesId] = useState("");
  const [storageAddress, setStorageAddress] = useState("");
  const [storagePhoneNo, setStoragePhoneNo] = useState("");
  const {storage} = useSelector((state)=> state.storage)
  const componentRef = useRef();
  const handleSubmitt = () => {
    // console.warn("hiiiiii");
    const newItems = {
      expenseType,
      expenseAmount,
      expenseDescription,
    };
    setExpense([...expenses, newItems]);

    // navigate("/saleproductpage");
  };

  useEffect(()=> {
    if(storage === "Something went wrong"){
      console.log(storage)
    }
    else
      if(storage?.length > 0){
      console.log(storage)
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
      console.log(Filtered)
      setStorageAddress(Filtered[0]?.storageAddress);
      setStoragePhoneNo(Filtered[0]?.storagePhoneNo);
    }
  }, [storage])

  // useEffect(() => {
  //   call();
  // }, []);

  // async function call() {
  //   let resp = await getStorage().then((resp) => {
  //     // console.warn(resp);

  //     if (resp) {
  //       let Filtered = resp?.filter((data) => {
  //         // console.log(data.storageCode);
  //         // console.log(JSON.parse(localStorage.getItem("shopId")));

  //         if (
  //           JSON.parse(localStorage.getItem("shopId")) &&
  //           !data.storageCode
  //             .toString()
  //             .toLowerCase()
  //             .includes(
  //               JSON.parse(localStorage.getItem("shopId"))
  //                 .toString()
  //                 .toLowerCase()
  //             )
  //         ) {
  //           return false;
  //         }

  //         return true;
  //       });
  //       setStorageAddress(Filtered[0].storageAddress);
  //       setStoragePhoneNo(Filtered[0].storagePhoneNo);
  //     } else {
  //       console.log("called");
  //     }
  //   });
  // }

  // Submit form function
  // const handleSubmit = () => {
  //   // toast.error("Please fill in all inputs");
  //   const newItems = {
  //     expenseType,
  //     amount,
  //     expenseDescription
  //   };
  //   setExpense([...expense, newItems]);

  // console.log("first form");
  //   // navigate("/saleproductpage");
  // };

  const context = {
    expenses,
    setExpense,
    expenseType,
    setExpenseType,
    amount,
    setAmount,
    expenseDescription,
    setExpenseDescription,
    handleSubmitt,
    expenseCategory,
    setExpenseCategory,
    expenseAmount,
    setExpenseAmount,
    expenseTotal,
    setExpenseTotal,
    expenseLocation,
    setExpenseLocation,
    componentRef,
    transferFrom,
    setTransferFrom,
    transferLocationName,
    setTransferLocationName,
    StorageLocation,
    setStorageLocation,
    transferFromObjectId,
    setTransferFromObjectId,
    invoiceNumber,
    setInvoiceNumber,
    salesId,
    setSalesId,
    storageAddress,
    storagePhoneNo,
  };

  return <Statee.Provider value={context}>{children}</Statee.Provider>;
}
