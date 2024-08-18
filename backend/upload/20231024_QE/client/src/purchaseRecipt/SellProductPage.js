import React, { useContext, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { State } from "./context/stateContext";
import { useTranslation } from "react-i18next";
import { Button, Loader } from "semantic-ui-react";
import { useSelector } from "react-redux";
import TableComponentId from "../Components/tableComponent/tableComponentId";
import { useCustomState } from "../Variables/stateVariables";
import { getProductDetails } from "../actions/productActions";
import { gettStorage } from "../actions/storageAction";
import { getTemporaryPurchase } from "../actions/tempPurchaseAction";
import { searchProductData } from "../Components/searchComponent/productMainPageSearch/productSearch";
import { refreshTokken } from "../actions/userAction";
import "./PurchaseCss/purchase.css";
let code = "";
let type = "";
let companyProduct = "";
let isCalled = "false";
const SellProductPage = () => {
  const { data, setData } = useCustomState();
  const [Products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productName, setProductName] = useState();
  const [productCode, setProductCode] = useState();
  // const [productType, setProductType] = useState();
  const [prodCompany, setProdCompany] = useState();
  const [productTypee, setProductTypee] = useState([]);
  const [loc, setLoc] = useState("Hello");
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const {
    setCode,
    setNamee,
    setCompany,
    setCurrentPrice,
    setQuantityidset,
    setPurchasePrice,
    setPurchaseProductDiscount,
    setPurchaseProductExpense,
    setPurchaseProductTax,
    setPurchaseProductPriceExcludeTax,
    setGetTempPurchaseee,
    setItemsAdded,
    setClearData,
  } = useContext(State);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { productType } = useSelector((state) => state.productType);
  const { productsOnCompanyName } = useSelector(
    (state) => state.productsOnCompanyName
  );
  const navigate = useNavigate();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
    }
  }, [colorTheme]);

  useEffect(() => {
    isCalled = "false";
  }, [code, type, companyProduct]);

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
    console.log(productsOnCompanyName);
    if (productsOnCompanyName?.length > 0) {
      getProductLocc();
    } else {
      setLoading(true);
    }
  }, [productsOnCompanyName]);

  useEffect(() => {
    getTempPurchasee();
    setItemsAdded(true);
    setClearData(true);
  }, []);
  const getTempPurchasee = async () => {
    let tempProductResult = await getTemporaryPurchase();

    console.log(tempProductResult);
    setGetTempPurchaseee(tempProductResult);
  };

  async function getProductLocc() {
    // pr= await getProductsOnCompanyName(purchaseCompany)
    console.log(productsOnCompanyName);
    setData(productsOnCompanyName);
    setProducts(productsOnCompanyName);
    setFilteredProducts(productsOnCompanyName);
    setLoading(true);
  }

  const sellproduct = async (id) => {
    // console.log("called");
    // console.log(id);
    let dataa = await getProductDetails(id);
    // console.log(dataa);
    console.log(dataa);
    setNamee(dataa?.productTypeName?.productName);
    setCode(dataa?.productCode);
    setCompany(dataa?.productCompany?.companyName);

    setCurrentPrice(dataa?.productCurrentPrice);
    setPurchaseProductPriceExcludeTax(dataa?.productpriceExcludingTax);
    setPurchaseProductDiscount(dataa?.productDiscount);
    setPurchaseProductExpense(dataa?.productExpenses);
    setPurchaseProductTax(dataa?.productTaxPrice);
    setPurchasePrice(dataa?.productpriceExcludingTax);
    // // setQuantitye(data.productQuantity);
    // console.log(JSON.parse(localStorage.getItem("shopId")));
    console.log(dataa?._id);
    setQuantityidset(dataa?._id);
    // setLocationsetid(data.productAvalibility._id);
    setLoc("Hec this is new");
    navigate("/purchaseDiscount");
  };

  const handleSearch = async (code, type, companyProduct) => {
    console.log(code);
    console.log(type);
    console.log(companyProduct);
    const dataa = await searchProductData(
      productsOnCompanyName,
      code,
      type,
      companyProduct
    );
    // console.warn(dataa);
    setData(dataa);
  };

  const columns = [
    { field: "productName", label: t("productName") },
    { field: "productCode", label: t("code") },
    { field: "productTypeName.productName", label: t("type") },
    { field: "productCompany.companyName", label: t("company") },
    // { field: "productColor.colorName", label: t("color") },
    { field: "productpriceExcludingTax", label: t("price") },
  ];
  const actions = [
    {
      label: "Purchase",
      labeladded: "Already Added",
      color: "green",
      handler: (itemId) => sellproduct(itemId),
      url: null,
    },
  ];
  return (
    <>
      <div className={`purchase ${colorTheme}`}>
        {loading ? (
          <>
            <div>
              <Button
                className="purchaseSellBackButton"
                onClick={() => {
                  navigate("/PurchaseRecipt");
                }}
              >
                Back
              </Button>
            </div>
            <div className="search-box">
              <input
                type="text"
                name="productCode"
                placeholder={t("enterProdCode")}
                autoComplete="off"
                value={productCode}
                onChange={(e) => {
                  setProductCode(e.target.value);
                  code = e.target.value;
                  handleSearch(code, type, companyProduct);
                }}
              />
              <input
                type="text"
                name="productType"
                placeholder={t("enterProdType")}
                autoComplete="off"
                onChange={(e) => {
                  type = e.target.value;
                  handleSearch(code, type, companyProduct);
                }}
              />
            </div>

            <div className="table-container">
              {loading ? (
                <TableComponentId
                  data={data}
                  columns={columns}
                  actions={actions}
                />
              ) : (
                <Loader active>Loading</Loader>
              )}
            </div>
          </>
        ) : (
          <div className="loaderPage">
            <Loader active>Loading</Loader>
          </div>
        )}
      </div>
    </>
  );
};

export default SellProductPage;
