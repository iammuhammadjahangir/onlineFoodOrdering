import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Stack from "@mui/material/Stack";
import "../../../table.css";
// import { getStorage, deleteGodown } from "../../../Api";
import { useCustomState } from "../../../Variables/stateVariables";
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
import { useSelector, useDispatch } from "react-redux";
import { getStorage } from "../../../actions/storageAction";
import { getShop } from "../../../actions/shopAction";
import { refreshTokken } from "../../../actions/userAction";
import "../godownCss/godown.css";
let isCalled = "false";
const Stocktable = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { storage } = useSelector((state) => state.storage);
  const [colorTheme, setColorTheme] = useState("theme-white");
  ///////////////////////////////////////////
  const { product, setProduct, loading, setLoading, data, setData } =
    useCustomState();
  const { t } = useTranslation();
  const linkk = "stockUpdate";
  const actionUpdate = "Update";
  const action3 = "Delete";

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  useEffect(() => {
    isCalled = "false";
  }, [data, storage]);

  useEffect(() => {
    if (isCalled === "false") {
      isCalled = "true";
      getToken();
    }
  }, [isCalled]);
  const getToken = async () => {
    const token = await refreshTokken();
    if (token.data === "Please login to acces this resource") {
      navigate("/login");
    }
    console.log(token);
  };

  useEffect(() => {
    call();
  }, []);

  async function call() {
    dispatch(getStorage());
    dispatch(getShop());
  }
  useEffect(() => {
    if (storage) {
      console.log(storage);
      setData(storage);
      setProduct(storage);
      setLoading(true);
    }
  });

  const columns = [
    { field: "storageCode", label: t("storageCode") },
    { field: "storageAddress", label: t("storageAddress") },
    { field: "storageDescription", label: t("storageDescription") },
    { field: "shopId.shopCode", label: t("shop") },
    { field: "storageType", label: t("storageType") },
    { field: "storagePhoneNo", label: t("phoneNumber") },
  ];

  const actions = [
    // {
    //   label: 'Delete',
    //   color: 'yellow',
    //   handler: (itemId) => deleteGodown(itemId),
    // },
    {
      label: "Update",
      color: "green",
      url: (itemId) => `/updatecompany/${itemId}`,
    },
  ];

  return (
    <>
      <div className={`godown ${colorTheme}`}>
        <div className="search-withouInputfields-box"></div>
        <div className="table-container">
          <TableComponentId
            data={data}
            columns={columns}
            actions={actions}
            linkk={linkk}
            actionUpdate={actionUpdate}
            action3={action3}
          />
        </div>
      </div>
    </>
  );
};

export default Stocktable;
