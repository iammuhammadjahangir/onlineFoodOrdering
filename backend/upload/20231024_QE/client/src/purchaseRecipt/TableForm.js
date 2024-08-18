import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import "./PurchaseCss/purchase.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "./DeleteModal";
import { State } from "./context/stateContext";
import {
  Button,
  Form,
  Select,
  Modal,
  Message,
  Loader,
} from "semantic-ui-react";
import TableComponentId from "../Components/tableComponent/tableComponentId";
import { useTranslation } from "react-i18next";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
export default function TableForm() {
  const [Deleteid, setDeleteid] = useState();
  const { t } = useTranslation();
  const action2 = "delete";
  const navigate = useNavigate();

  const handleDelete = (id) => {
    // console.warn("hiiii");
    setDeleteid(id);

    // console.log(id);
  };
  const {
    listpurchase,
    total,
    isEditing,
    showModal,
    fetchingListData,
    setFetchingListData,
    abc,
    setAbc,
  } = useContext(State);

  useEffect(() => {
    console.log(listpurchase);
  }, [abc]);

  const columns = [
    { field: "Code", label: t("code") },
    { field: "Color", label: t("color") },
    { field: "purchasePrice", label: t("price") },
    { field: "PurchaseQuantity", label: t("quantity") },
    { field: "purchaseQuantityPrice", label: t("totalPrice") },
    { field: "purchaseTotalTax", label: t("taxAmount") },
    { field: "purchaseTotalDiscount", label: t("discount") },
    { field: "purchaseTotalAmount", label: t("totalAmount") },

    // {field: 'Amount', label: ''},
  ];
  const actions = [
    {
      label: "delete",
      color: "green",
      handler: (itemId) => handleDelete(itemId),
      url: null,
    },
  ];
  return (
    <>
      {/* <ToastContainer position="top-right" theme="colored" /> */}
      <Button
        style={{
          backgroundColor: "#F1B248",
          color: "white",
          margin: "30px",
        }}
        onClick={() => {
          navigate("/purchaseProductPage");
        }}
      >
        {t("purchaseProduct")}&nbsp;
        <ShoppingCartIcon />
      </Button>
      <div className="productActivityTableSection">
        {!fetchingListData ? (
          <>
            <TableComponentId
              data={listpurchase}
              columns={columns}
              actions={actions}
              action2={action2}
            />
            {showModal && <DeleteModal id={Deleteid} />}
          </>
        ) : (
          <Loader active style={{ position: "relative", marginTop: "30px" }}>
            Loading
          </Loader>
        )}
      </div>
      {listpurchase?.length > 0 ? (
        <h2
          className="flex items-end justify-end text-gray-800 font-bold"
          style={{ fontSize: "1rem" }}
        >
          Grand Total. {total.toLocaleString()}
        </h2>
      ) : (
        <>
          <h1></h1>
        </>
      )}
    </>
  );
}
