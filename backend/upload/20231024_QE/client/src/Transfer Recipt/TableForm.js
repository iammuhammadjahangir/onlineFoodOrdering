import React, { useContext, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "./DeleteModal";
import MoveUpIcon from "@mui/icons-material/MoveUp";

// import { State } from "./context/stateContext";
import { Statte } from "./context/stateContext";
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
export default function TableForm() {
  const navigate = useNavigate();
  const [Deleteid, setDeleteid] = useState();
  const { t } = useTranslation();
  const handleDelete = (id) => {
    console.log(id);
    setDeleteid(id);
    console.warn("hadfaid");
    console.log(id);
  };
  const {
    description,
    setDescription,
    quantity,
    setQuantity,
    price,
    setPrice,
    list,
    total,
    isEditing,
    showModall,
    setShowModall,
    handleSubmit,
    editRow,
    Code,
    setCode,
    Namee,
    setName,
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
    fetchingListData,
    setFetchingListData,
  } = useContext(Statte);
  const columns = [
    { field: "Code", label: t("code") },
    { field: "Namee", label: t("name") },
    { field: "Company", label: t("company") },
    { field: "Color", label: t("color") },
    { field: "PurchaseQuantity", label: t("quantity") },
  ];
  const actions = [
    {
      label: "dlette",
      color: "green",
      handler: (itemId) => handleDelete(itemId),
      url: null,
    },
  ];
  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      {/* <Button color={"yellow"}>
      </Button> */}
      <Button
        style={{
          backgroundColor: "#F1B248",
          color: "white",
          margin: "30px",
        }}
        onClick={() => {
          navigate("/TranferProductPage");
        }}
      >
        {t("transferProduct")}&nbsp;&nbsp;
        <MoveUpIcon />
      </Button>

      <div className="productActivityTableSection">
        {!fetchingListData ? (
          <>
            <TableComponentId data={list} columns={columns} actions={actions} />
            {showModall && <DeleteModal id={Deleteid} />}
          </>
        ) : (
          <Loader active style={{ position: "relative", marginTop: "30px" }}>
            Loading
          </Loader>
        )}
      </div>
    </>
  );
}
