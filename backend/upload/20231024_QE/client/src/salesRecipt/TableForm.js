import React, { useContext, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { Statee } from "./context/stateContext";
import {
  Button,
  Form,
  Select,
  Loader,
  Modal,
  Message,
} from "semantic-ui-react";
import TableComponentId from "../Components/tableComponent/tableComponentId";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { useTranslation } from "react-i18next";
export default function TableForm() {
  const [Deleteid, setDeleteid] = useState();
  const action2 = "delete";
  const action4 = "salePage";
  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleDelete = (id) => {
    // console.warn("hii");
    setDeleteid(id);
    // console.warn(showModaal);
    // console.log(id);
  };
  const { list, total, showModaal, barLoader, fetchingListData } =
    useContext(Statee);
  const columns = [
    { field: "Code", label: t("code") },
    { field: "Namee", label: t("name") },
    { field: "color", label: t("color") },
    { field: "Company", label: t("company") },
    { field: "PurchaseQuantity", label: t("quantity") },
    { field: "excludeTaxPrice", label: t("price") },
    { field: "Discount", label: t("discount") },
    { field: "totalAmounnt", label: t("totalPrice") },
    { field: "taxAmount", label: t("taxAmount") },
    { field: "amount", label: t("totalAmount") },
  ];
  const actions = [
    {
      label: "dlete",
      color: "green",
      handler: (itemId) => handleDelete(itemId),
      url: null,
    },
  ];
  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      {barLoader ? (
        <Loader active inline="centered" />
      ) : (
        <Button
          style={{
            backgroundColor: "#F1B248",
            color: "white",
            margin: "30px",
          }}
          onClick={() => {
            navigate("/saleproductpage");
          }}
        >
          {t("sellProduct")}&nbsp;
          <Inventory2Icon />
        </Button>
      )}
      {/* {barLoader ? (<Loader active inline="centered" /> ) : ( */}
      <div className="productActivityTableSection">
        {!fetchingListData ? (
          <>
            <TableComponentId
              data={list}
              columns={columns}
              actions={actions}
              action2={action2}
              action4={action4}
            />
            {showModaal && <DeleteModal id={Deleteid} />}
          </>
        ) : (
          <Loader active style={{ position: "relative", marginTop: "30px" }}>
            Loading
          </Loader>
        )}
      </div>
      {/* )} */}
      <div>
        {list?.length > 0 ? (
          <h2
            className="flex items-end justify-end text-gray-800 font-bold"
            style={{ fontSize: "1rem" }}
          >
            Grand Total. {total.toLocaleString()}
          </h2>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
