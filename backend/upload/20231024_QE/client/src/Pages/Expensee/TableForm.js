import React, { useContext, useEffect, useState } from "react";
import swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
// import { State } from "./context/stateContext";
import { Button, Form, Select, Modal, Message } from "semantic-ui-react";
// import { State } from "../../purchaseRecipt/context/stateContext";
import TableComponentId from "../../Components/tableComponent/tableComponentId";
import { addExpenses } from "../../Api";
import { Statee } from "./context/stateContext";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
export default function TableForm() {
  // const context = useContext(State);
  const [Deleteid, setDeleteid] = useState();
  const { t } = useTranslation();
  const action2 = "delete";
  const {
    expenses,
    setExpense,
    expenseType,
    setExpenseType,
    expenseDescription,
    setExpenseDescription,
    expenseAmount,
    setExpenseAmount,
    handleSubmitt,
    expenseCategory,
    setExpenseCategory,
    expenseTotal,
    setExpenseTotal,
    showModal,
    setShowModal,
  } = useContext(Statee);
  // const {
  // list
  // } = context;
  const navigate = useNavigate();
  const handleDelete = (id) => {
    // console.warn('hiiii')
    //setShowModal(true)
    swal
      .fire({
        icon: "warning",
        title: t("titleAreYouSure"),
        text: t("textDeleteItem"),
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      })
      .then((result) => {
        if (result.isConfirmed) {
          const updatedItems = [...expenses];
          updatedItems.splice(id, 1);
          setExpense(updatedItems);
        }
      });

    // const updatedItems = [...expenses];
    // updatedItems.splice(id, 1);
    // setExpense(updatedItems);
    // // setDeleteid(id);
    // console.log(id);
  };
  useEffect(() => {
    // console.warn(expenses);
    const amounts = expenses?.map((item) => item.expenseAmount);
    const totalAmount = amounts.reduce(
      (sum, amount) => parseInt(sum) + parseInt(amount),
      0
    );
    // console.warn(totalAmount)
    setExpenseTotal(totalAmount);
  });
  // const addExpense=async()=>{
  //   setExpense([]);
  //   setExpenseAmount('');
  //   setExpenseType('');
  //   setExpenseDescription('')
  //   setExpenseCategory('')
  //  console.warn(expenseTotal)
  //   const responsee = await fetch(link + "/add-expensee", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       expenseCategory,
  //       expenses,
  //       expenseTotal
  //     }),
  //   });
  //   if(responsee){
  //     swal.fire({
  //       icon: "success",
  //       title: "Added!",
  //       text: "Expenses Added",
  //       showConfirmButton: false,
  //     });
  //   }
  // }
  const columns = [
    { field: "expenseType", label: t("expenseType") },
    { field: "expenseDescription", label: t("expenseDescription") },
    { field: "expenseAmount", label: t("amount") },
  ];
  const actions = [
    {
      label: "deleteee",
      color: "green",
      handler: (itemId) => handleDelete(itemId),
      url: null,
    },
  ];
  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      <Button
        onClick={() => {
          setExpenseAmount("");
          setExpenseDescription("");
          setExpenseType("");
          navigate("/expens");
        }}
        style={{
          backgroundColor: "#F1B248",
          color: "white",
          marginBottom: "30px",
          marginTop: "30px",
        }}
      >
        {t("enterExpense")}
      </Button>

      {expenses === "" ? (
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}></h1>
      ) : (
        <div>
          <TableComponentId
            data={expenses}
            columns={columns}
            actions={actions}
            action2={action2}
          />

          {/* <Button 
                 onClick={
                  addExpense}
                 color={"yellow"}>
                   Add Expense
        
                 </Button> */}
          {/* {showModal && <DeleteModal id={Deleteid} />} */}
        </div>
      )}
    </>
  );
}
