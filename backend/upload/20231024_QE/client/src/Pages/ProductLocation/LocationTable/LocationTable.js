import React from "react";
import { useEffect, useState, useRef } from "react";
import { Button } from "semantic-ui-react";
// import { deleteLocation, getProductLoc,useTranslationForFunctions } from "../../../Api";
import { useSelector, useDispatch } from "react-redux";
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
import Stack from "@mui/material/Stack";
import {
  deleteLocation,
  getProductLoc,
  getProductLocationOnGodownId,
  getProductLocationOnShopId,
} from "../../../actions/productLocationAction";
import { useNavigate } from "react-router-dom";
import { useTranslation, initReactI18next } from "react-i18next";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { Dropdown, Select } from "semantic-ui-react";
import { LocationSearch } from "../../../Components/searchComponent/productLocationSearch/locationSearch";
import "./printDiv.css";
import "./printSetting.css";
import "../productLocationCss/productLocation.css";
import Header from "./Header";
import SecondHeader from "./SecondHeader";
import PrintTable from "./PrintTable";
import ReactToPrint from "react-to-print";
import { refreshTokken } from "../../../actions/userAction";
let code = "";
let type = "";
let company = "";
let searchLocation = "";
let selecteddShop = [];
let selecteddGodown = [];
let isCalled = "false";
const LocationTable = (props) => {
  // const translationFunctions = useTranslationForFunctions();
  const navigate = useNavigate();
  const linkk = "updateLoc";
  const [data, setData] = useState();
  const [adminData, setAdminData] = useState();
  const [selectedShop, setSelectedShop] = useState();
  const [selectedGodown, setSelectedGodown] = useState();
  const [selectedAdminShop, setSelectedAdminShop] = useState();
  const [selectedAdminGodown, setSelectedAdminGodown] = useState();
  const [productCode, setProductCode] = useState();
  const [productType, setProductType] = useState();
  const [productCompany, setProductCompany] = useState();
  const { t, i18n } = useTranslation();
  const actionUpdate = "Update";
  const action3 = "Delete";
  const [colorTheme, setColorTheme] = useState("theme-white");
  const tableContainerRef = useRef(null);
  const { productLocation } = useSelector((state) => state.productLocation);
  const { productLocationOnShopType } = useSelector(
    (state) => state.productLocationOnShopType
  );
  const { productLocationOnGodownType } = useSelector(
    (state) => state.productLocationOnGodownType
  );
  const { storage } = useSelector((state) => state.storage);
  const { shop } = useSelector((state) => state.shop);
  const componentRef = useRef();
  const categoryOptions = [
    { key: "1", text: "shop", value: "shop" },
    { key: "2", text: "store", value: "store" },
  ];

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
  }, [productLocationOnShopType, productCode, productCompany]);

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

  ////////////==================================//////////
  /////////////////  shop selection ///////////////////////
  //////////==================================/////////
  const shopAsArray = [selecteddShop];
  const shopCodes = shopAsArray?.map((shop) => shop);
  const godownCodes = selecteddGodown.map((godown) => godown);
  const combinedOptions = [...shopCodes, ...godownCodes];

  useEffect(() => {
    selecteddShop = JSON.parse(localStorage.getItem("shopId"));
    selecteddGodown = JSON.parse(localStorage.getItem("godownId"));
    console.log(selectedShop);
    console.log(selecteddGodown);
  });

  ////////////==================================//////////
  ///////////////// New Logic ///////////////////////
  //////////==================================/////////

  const handleSelectTransferFromChange = async (e, { value }) => {
    console.log(value);
    if (value.startsWith("G_")) {
      setSelectedAdminGodown(value);
      setSelectedAdminShop("");
      setSelectedGodown("");
      setSelectedShop("");
      storage?.map(async (store) => {
        if (store?.storageCode === value) {
          let pr = await getProductLocationOnGodownId(store._id);
          console.log(pr);
          setAdminData(pr);
          setData(pr);
          // pr = await getProductLocationOnGodownId(transferGodownId)
          // pr = await getProductLocationOnShopId(transferShopId)
        }
      });
      console.log("cellfie");
    } else {
      setSelectedAdminShop(value);
      setSelectedAdminGodown("");
      setSelectedGodown("");
      setSelectedShop("");
      shop?.map(async (shopp) => {
        if (shopp?.shopCode === value) {
          let pr = await getProductLocationOnShopId(shopp._id);
          console.log(pr);
          setAdminData(pr);
          setData(pr);
        }
      });
    }
  };

  const handleCategoryChange = async (event, { value }) => {
    // setExpenseCategory(value);
    if (value.startsWith("st")) {
      setSelectedShop("");
      console.log(productLocationOnGodownType);
      setSelectedGodown(value);
      setData(productLocationOnGodownType);
      console.log("st");
    } else {
      console.log("shop");
      console.log(productLocationOnShopType);
      setData(productLocationOnShopType);
      setSelectedShop(value);
      setSelectedGodown("");
    }
  };

  const deleteProduct = async (id) => {
    deleteLocation(id);
  };

  ////////////==================================//////////
  /////////////////  Function for search///////////////////////
  //////////==================================/////////
  const handleSearch = async (code, type, company, searchLocation) => {
    console.log(code);
    if (selectedShop) {
      const dataa = await LocationSearch(
        productLocationOnShopType,
        selectedShop,
        selectedGodown,
        code,
        type,
        company,
        searchLocation
      );
      setData(dataa);
    } else {
      console.log(productLocationOnGodownType);
      console.log("chlie");
      if (selectedGodown) {
        const dataa = await LocationSearch(
          productLocationOnGodownType,
          selectedShop,
          selectedGodown,
          code,
          type,
          company,
          searchLocation
        );
        setData(dataa);
      } else {
        const dataa = await LocationSearch(
          adminData,
          selectedShop,
          selectedGodown,
          code,
          type,
          company,
          searchLocation
        );
        setData(dataa);
      }
    }
  };

  const columns = [
    { field: "product.productCode", label: "Product Code" },
    { field: "product.productName", label: "Product Name" },
    { field: "product.productTypeName.productName", label: "Type" },
    { field: "product.productCompany.companyName", label: "Company" },
    // { field: "product.productColor.colorName", label: "Product Color" },
    { field: "colorId.colorName", label: "Product Color" },
    { field: "shopAvalibility.shopCode", label: "WareHouse" },
    { field: "productQuantity", label: "Product Quantity" },
  ];

  const column1 = [
    { field: "product.productCode", label: "Product Code" },
    { field: "product.productName", label: "Product Name" },
    { field: "product.productTypeName.productName", label: "Type" },
    { field: "product.productCompany.companyName", label: "Company" },
    // { field: "product.productColor.colorName", label: "Product Color" },
    { field: "colorId.colorName", label: "Product Color" },
    { field: "godownAvalibility.storageCode", label: "WareHouse" },
    { field: "productQuantity", label: "Product Quantity" },
  ];

  const link = "updateLoc";
  const actions = [
    {
      label: "Delete",
      color: "yellow",
      handler: (itemId) => deleteProduct(itemId),
    },
    // {
    //   label: "Update",
    //   color: "yellow",
    //   handler: null,
    //   url: (itemId) => `updateLoc/${itemId}`,
    // },
  ];
  return (
    <>
      <div className={`productLocation ${colorTheme}`}>
        <div className="search-Product-Location-box">
          <input
            type="text"
            name="productCode"
            placeholder={t("enterProdCode")}
            autoComplete="off"
            value={productCode}
            onChange={(e) => {
              setProductCode(e.target.value);
              code = e.target.value;
              handleSearch(code, type, company, searchLocation);
            }}
          />
          <input
            type="text"
            name="productType"
            placeholder={t("enterProdType")}
            autoComplete="off"
            onChange={(e) => {
              type = e.target.value;
              setProductType(e.target.value);
              handleSearch(code, type, company, searchLocation);
            }}
          />
          <input
            type="text"
            name="Company"
            placeholder={t("enterProdCompany")}
            autoComplete="off"
            value={productCompany}
            onChange={(e) => {
              company = e.target.value;
              setProductCompany(e.target.value);
              handleSearch(code, type, company, searchLocation);
            }}
          />
          {(JSON.parse(localStorage.getItem("isAdministrator")) ||
            JSON.parse(localStorage.getItem("isSuperAdmin"))) && (
            <>
              {selectedShop ? (
                <>
                  <Dropdown
                    placeholder="Select an option"
                    selection
                    options={shop.map((option) => ({
                      key: option.shopCode,
                      text: option.shopCode,
                      value: option.shopCode,
                    }))}
                    clearable
                    className="productLocationDropdown1"
                    onChange={(e, { value }) => {
                      searchLocation = value;
                      handleSearch(code, type, company, searchLocation);
                    }}
                  />
                </>
              ) : (
                <>
                  {selectedGodown && (
                    <Dropdown
                      placeholder="Select an option"
                      selection
                      clearable
                      options={storage.map((option) => ({
                        key: option.storageCode,
                        text: option.storageCode,
                        value: option.storageCode,
                      }))}
                      className="productLocationDropdown1"
                      onChange={(e, { value }) => {
                        searchLocation = value;
                        handleSearch(code, type, company, searchLocation);
                      }}
                    />
                  )}
                </>
              )}
            </>
          )}
          {JSON.parse(localStorage.getItem("isAdministrator")) ||
          JSON.parse(localStorage.getItem("isSuperAdmin")) ? (
            <Dropdown
              control={Select}
              placeholder={t("selectWareHouse")}
              className="productLocationDropdown"
              fluid
              selection
              clearable
              options={categoryOptions}
              onChange={handleCategoryChange}
            />
          ) : (
            <Dropdown
              control={Select}
              placeholder={t("selectWareHouse")}
              className="productLocationDropdown"
              fluid
              selection
              clearable
              options={combinedOptions.map((option) => ({
                key: option,
                text: option,
                value: option,
              }))}
              onChange={handleSelectTransferFromChange}
            />
          )}
          <div className="buttonDiv">
            {(JSON.parse(localStorage.getItem("isAdministrator")) ||
              JSON.parse(localStorage.getItem("isSuperAdmin"))) && (
              <Button
                className="buttonProductLocation"
                onClick={() => {
                  setProductCode("");
                  setProductType("");
                  if (selectedShop) {
                    setData(productLocationOnShopType);
                  } else {
                    setData(productLocationOnGodownType);
                  }
                }}
              >
                {t("clear")}&nbsp;&nbsp;{<ClearAllIcon />}
              </Button>
            )}
          </div>
        </div>

        <div className="table-container">
          {(!JSON.parse(localStorage.getItem("isAdministrator")) ||
            !JSON.parse(localStorage.getItem("isSuperAdmin"))) &&
          selectedAdminGodown ? (
            <>
              <TableComponentId
                data={data}
                columns={column1}
                actions={actions}
                linkk={linkk}
              />
            </>
          ) : (
            <>
              {(!JSON.parse(localStorage.getItem("isAdministrator")) ||
                !JSON.parse(localStorage.getItem("isSuperAdmin"))) &&
              selectedAdminShop ? (
                <>
                  <TableComponentId
                    data={data}
                    columns={columns}
                    actions={actions}
                    linkk={linkk}
                  />
                </>
              ) : (
                <></>
              )}
            </>
          )}

          {(JSON.parse(localStorage.getItem("isAdministrator")) ||
            JSON.parse(localStorage.getItem("isSuperAdmin"))) &&
          selectedGodown ? (
            <>
              <TableComponentId
                data={data}
                columns={column1}
                actions={actions}
                linkk={linkk}
                action3={action3}
                actionUpdate={actionUpdate}
              />
            </>
          ) : (
            <>
              {(JSON.parse(localStorage.getItem("isAdministrator")) ||
                JSON.parse(localStorage.getItem("isSuperAdmin"))) &&
              selectedShop ? (
                <>
                  <TableComponentId
                    data={data}
                    columns={columns}
                    actions={actions}
                    linkk={linkk}
                    action3={action3}
                    actionUpdate={actionUpdate}
                  />
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </div>

      {/* <Stack
        backgroundColor="white"
        borderRadius="50px 50px 0 0"
        padding={1}
        marginTop={1}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3} padding={3}>
          <input
            type="text"
            name="productCode"
            style={{
              flex: 1,
              padding: "10px",
              width: "350px",
              backgroundColor: "#ffffff",
            }}
            placeholder={t("enterProdCode")}
            autoComplete="off"
            value={productCode}
            onChange={(e) => {
              setProductCode(e.target.value);
              code = e.target.value;
              handleSearch(code, type, company, searchLocation);
            }}
          />
          <input
            type="text"
            name="productType"
            style={{
              flex: 1,
              padding: "10px",
              width: "350px",
              backgroundColor: "#ffffff",
            }}
            placeholder={t("enterProdType")}
            autoComplete="off"
            // value={productType}
            onChange={(e) => {
              type = e.target.value;
              setProductType(e.target.value);
              handleSearch(code, type, company, searchLocation);
            }}
          />
          <input
            type="text"
            name="Company"
            style={{
              flex: 1,
              padding: "10px",
              width: "350px",
              backgroundColor: "#ffffff",
            }}
            placeholder={t("enterProdCompany")}
            autoComplete="off"
            value={productCompany}
            onChange={(e) => {
              company = e.target.value;
              setProductCompany(e.target.value);
              handleSearch(code, type, company, searchLocation);
            }}
          />
          {(JSON.parse(localStorage.getItem("isAdministrator")) ||
            JSON.parse(localStorage.getItem("isSuperAdmin"))) && (
            <>
              {selectedShop ? (
                <>
                  <Dropdown
                    placeholder="Select an option"
                    selection
                    options={shop.map((option) => ({
                      key: option.shopCode,
                      text: option.shopCode,
                      value: option.shopCode,
                    }))}
                    clearable
                    // value={selectedRadioOption}
                    onChange={(e, { value }) => {
                      searchLocation = value; // Update the state variable with the selected value
                      handleSearch(code, type, company, searchLocation); // Pass the selected value to your search function
                    }}
                    style={{
                      flex: 1,
                      padding: "10px",
                      width: "250px",
                      backgroundColor: "#ffffff",
                    }}
                  />
                </>
              ) : (
                <>
                  {selectedGodown && (
                    <Dropdown
                      placeholder="Select an option"
                      selection
                      clearable
                      options={storage.map((option) => ({
                        key: option.storageCode,
                        text: option.storageCode,
                        value: option.storageCode,
                      }))}
                      // value={selectedRadioOption}
                      onChange={(e, { value }) => {
                        searchLocation = value; // Update the state variable with the selected value
                        handleSearch(code, type, company, searchLocation); // Pass the selected value to your search function
                      }}
                      style={{
                        flex: 1,
                        padding: "10px",
                        width: "250px",
                        backgroundColor: "#ffffff",
                      }}
                    />
                  )}
                </>
              )}
            </>
          )}
          {JSON.parse(localStorage.getItem("isAdministrator")) ||
          JSON.parse(localStorage.getItem("isSuperAdmin")) ? (
            <Dropdown
              control={Select}
              placeholder={t("selectWareHouse")}
              style={{
                flex: 1,
                padding: "10px",
                width: "350px",
                backgroundColor: "#ffffff",
              }}
              fluid
              selection
              clearable
              options={categoryOptions}
              // value={expenseCategory}
              onChange={handleCategoryChange}
            />
          ) : (
            <Dropdown
              control={Select}
              placeholder={t("selectWareHouse")}
              style={{
                flex: 1,
                padding: "10px",
                width: "350px",
                backgroundColor: "#ffffff",
              }}
              fluid
              selection
              clearable
              options={combinedOptions.map((option) => ({
                key: option,
                text: option,
                value: option,
              }))}
              // value={expenseCategory}
              onChange={handleSelectTransferFromChange}
            />
          )}
          {(JSON.parse(localStorage.getItem("isAdministrator")) ||
            JSON.parse(localStorage.getItem("isSuperAdmin"))) && (
            <Button
              style={{
                backgroundColor: "transparent",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "10px 10px 10px 10px",
                fontWeight: "bold",
              }}
              onClick={() => {
                setProductCode("");
                setProductType("");
                if (selectedShop) {
                  setData(productLocationOnShopType);
                } else {
                  setData(productLocationOnGodownType);
                }
              }}
            >
              {t("clear")}&nbsp;&nbsp;{<ClearAllIcon />}
            </Button>
          )}
        </Stack>
      </Stack>
      <div ref={tableContainerRef} style={{ height: "70vh", overflow: "auto" }}>
        {(!JSON.parse(localStorage.getItem("isAdministrator")) ||
          !JSON.parse(localStorage.getItem("isSuperAdmin"))) &&
        selectedAdminGodown ? (
          <>
            <TableComponentId
              data={data}
              columns={column1}
              actions={actions}
              linkk={linkk}
            />
          </>
        ) : (
          <>
            {(!JSON.parse(localStorage.getItem("isAdministrator")) ||
              !JSON.parse(localStorage.getItem("isSuperAdmin"))) &&
            selectedAdminShop ? (
              <>
                <TableComponentId
                  data={data}
                  columns={columns}
                  actions={actions}
                  linkk={linkk}
                />
              </>
            ) : (
              <></>
            )}
          </>
        )}

        {(JSON.parse(localStorage.getItem("isAdministrator")) ||
          JSON.parse(localStorage.getItem("isSuperAdmin"))) &&
        selectedGodown ? (
          <>
            <TableComponentId
              data={data}
              columns={column1}
              actions={actions}
              linkk={linkk}
              action3={action3}
              actionUpdate={actionUpdate}
            />
          </>
        ) : (
          <>
            {(JSON.parse(localStorage.getItem("isAdministrator")) ||
              JSON.parse(localStorage.getItem("isSuperAdmin"))) &&
            selectedShop ? (
              <>
                <TableComponentId
                  data={data}
                  columns={columns}
                  actions={actions}
                  linkk={linkk}
                  action3={action3}
                  actionUpdate={actionUpdate}
                />
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      <div
        style={{
          display: "flex",
          marginBottom: "10px",
          flexDirection: "row",
          alignItems: "right",
          justifyContent: "right",
        }}
      >
        <ReactToPrint
          trigger={() => (
            <Button
              variant="outlined"
              color="error"
              style={{ marginLeft: "10px" }}
            >
              Print
            </Button>
          )}
          content={() => componentRef.current}
          pageStyle={{ marginBottom: "300px", marginLeft: "200px" }}
        />
      </div>
      <div className="print-only-container">
        <div ref={componentRef}>
          <div className="print-container">
            <Header />
            <SecondHeader
              props={{
                producttCompany: productCompany,
                productType: productType,
                data: data,
              }}
            />
            {selectedShop || selectedAdminShop ? (
              <>
                {" "}
                <PrintTable data={data} columns={columns} />
              </>
            ) : (
              <>
                {selectedGodown || selectedAdminGodown ? (
                  <PrintTable data={data} columns={column1} />
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default LocationTable;
