import React, { useContext, useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Button, Dropdown, Table } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "./DeleteModal";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Statee } from "./context/stateContext";
import { useTranslation } from "react-i18next";
import { Loader } from "semantic-ui-react";
import TableComponentId from "../Components/tableComponent/tableComponentId";
import { useSelector, useDispatch } from "react-redux";
import { searchPurchaseData } from "../Components/searchComponent/productLocationSearch/locSearch";
import { useCustomState } from "../Variables/stateVariables";
import {
  getProductLoc,
  getProductLocationOnId,
  getProductLocationOnShopId,
  getProductLocationOnStorageCode,
} from "../actions/productLocationAction";
import "./SaleReciptCss/sale.css";
import { getTemporarySale } from "../actions/tempSaleAction";
import { LocationSearch } from "../Components/searchComponent/productLocationSearch/locationSearch";
let companyy = [];
let storage = [];
let pr = [];
let code = "";
let barcodeProduct = "";
let type = "";
let companyProduct = "";
let pro = [];
const SellProductPage = () => {
  const [Products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [producttName, setProducttName] = useState();
  const [productCode, setProductCode] = useState();
  // const [productType, setProductType] = useState();
  const [prodCompany, setProdCompany] = useState();
  const [productTypee, setProductTypee] = useState([]);
  const [productLoc, setProductLoc] = useState("");
  const [selectedShop, setSelectedShop] = useState();
  const [selectedGodown, setSelectedGodown] = useState();
  const [loc, setLoc] = useState("Hello");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const {
    quantity,
    setQuantity,

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
    selectedSaleItem,
    setSelectedSaleItem,
    quantityidset,
    setQuantityidset,
    locationsetid,
    setLocationsetid,
    excludeTaxPrice,
    setExcludeTaxPrice,
    setTaxPercentage,
    sellExpenses,
    setSellExpenses,
    barcodeDisplay,
    setBarcodeDisplay,
    productColor,
    setProductColor,
    getTempSale,
    setGetTempSale,
    itemsAdded,
    setItemsAdded,
    shopIdForData,
    setShopIdForData,
  } = useContext(Statee);
  const { t } = useTranslation();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { data, setData } = useCustomState();
  const { productLocation } = useSelector((state) => state.productLocation);
  const { company } = useSelector((state) => state.company);
  const { productType } = useSelector((state) => state.productType);
  const navigate = useNavigate();
  useEffect(() => {
    getProduct();
    // getProductTypee();
    // getCompanyy();

    // console.log("vlaue in useeffect " + Namee);
  }, [Namee]);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
    }
  }, [colorTheme]);

  useEffect(() => {
    setItemsAdded(true);
    getTempTransfer();
  }, []);
  const getTempTransfer = async () => {
    let tempProductResult = await getTemporarySale();
    setGetTempSale(tempProductResult);
    console.log(tempProductResult);
  };

  const getProduct = async () => {
    pro = await getProductLocationOnShopId(shopIdForData);
    console.log(pro);
    setData(pro);
    setProducts(pro);
    setFilteredProducts(pro);
    setLoading(true);
  };

  const sellproduct = async (id) => {
    // console.warn("called");
    // console.warn(id);
    setSelectedSaleItem((prevSelectedSaleItems) => [
      ...prevSelectedSaleItems,
      id,
    ]);
    console.log(id);
    let data = await getProductLocationOnId(id);

    console.log(data);
    setNamee(data?.product?.productTypeName?.productName);
    setCode(data?.product?.productCode);
    setCompany(data?.product?.productCompany?.companyName);
    setColor(data?.colorId?.colorName);
    setProductColor(data?.colorId?._id);
    // setActualPrice(data.product?.productActualPrice);
    setCurrentPrice(data?.product?.productCurrentPrice);
    setExcludeTaxPrice(data?.product?.productpriceExcludingTax);
    setTaxPercentage(data?.product?.productTaxPrice);
    setSellExpenses(data?.product?.productExpenses);
    // setExcludeTaxPrice(Math.floor(data.product?.productCurrentPrice / 1.18));
    setQuantitye(data?.productQuantity);
    setQuantityidset(data?.product?._id);
    setLocationsetid(data?.shopAvalibility?._id);
    setShopIdForData(data?.shopAvalibility?._id);
    setBarcodeDisplay("");
    setLoc("Hec this is new");
    navigate("/discountmodel");
  };
  // console.log(loc);

  const handleSearch = async (code, type, companyProduct) => {
    console.log(pro);
    const dataa = await LocationSearch(
      pro,
      selectedShop,
      selectedGodown,
      code,
      type,
      companyProduct
    );
    setData(dataa);
  };

  const columns = [
    { field: "product.productName", label: t("productName") },
    { field: "product.productCode", label: t("code") },
    { field: "product.productTypeName.productName", label: t("type") },
    { field: "product.productCompany.companyName", label: t("company") },
    { field: "colorId.colorName", label: t("color") },
    { field: "product.productpriceExcludingTax", label: t("price") },
    { field: "productQuantity", label: t("quantity") },
    { field: "shopAvalibility.shopCode", label: t("location") },
    { field: "shopAvalibility.shopAddress", label: t("address") },
  ];
  const actions = [
    {
      label: "Sale",
      labeladded: "Sold",
      color: "green",
      handler: (itemId) => sellproduct(itemId),
      url: null,
    },
  ];
  return (
    <>
      <div className={`sale ${colorTheme}`}>
        {loading ? (
          <>
            <div>
              <Button
                className="purchaseSellBackButton"
                onClick={() => {
                  navigate("/saleproduct");
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
                  setProductTypee(e.target.value);
                  handleSearch(code, type, companyProduct);
                }}
              />
              <input
                type="text"
                name="Company"
                placeholder={t("enterProdCompany")}
                autoComplete="off"
                value={prodCompany}
                onChange={(e) => {
                  companyProduct = e.target.value;
                  setProdCompany(e.target.value);
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
      {/* {loading ? (
       <Modal
       style={{marginLeft: "130px", marginTop: "70px", marginRight: "70px"}}
         open={open}
         dimmer="inverted"
         size="fullscreen"
         closeIcon="close"
         onClose={() => {
          navigate("/saleproduct");
         }}
       >
         <Stack  backgroundColor="#ECECEC">
           <Stack spacing={2} direction="row" marginLeft={5} alignItems="center">
             <Typography className="typograpgy" style={{ color: "#000000", fontSize: 30 }}>{t("saleItem")}</Typography>
           </Stack>
           <Modal.Content>
           <Stack  backgroundColor="white"   borderRadius="50px 50px 0 0" padding={1} >
             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} padding={3}>
               <Form style={{width:"100%"}}>
                 <Stack direction="row" sx={{display:"flex",flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
                    <Form.Group widths="equal" style={{ display: "flex", gap: "40px" }} >
                    <input
                      type="text"
                      name="productCode"
                      style={{ flex: 1, padding:"10px" ,width:"350px", backgroundColor: "#ffffff"  }}
                      placeholder={t("enterProdCode")}
                      autoComplete="off"
                      value={productCode}
                      onChange={(e) => { setProductCode(e.target.value)
                        code = e.target.value
                      handleSearch(code, type, companyProduct)}}
                    />
                     <input
                      type="text"
                      name="productType"
                      style={{ flex: 1, padding:"10px" ,width:"350px", backgroundColor: "#ffffff"  }}
                      placeholder={t("enterProdType")}
                      autoComplete="off"
                      // value={productType}
                      onChange={(e) => { 
                        type = e.target.value
                        setProductTypee(e.target.value)
                      handleSearch(code, type, companyProduct)}}
                    />
                     <input
                      type="text"
                      name="Company"
                      style={{ flex: 1, padding:"10px" ,width:"350px", backgroundColor: "#ffffff"  }}
                      placeholder={t("enterProdCompany")}
                      autoComplete="off"
                      value={prodCompany}
                      onChange={(e) => { 
                        companyProduct = e.target.value
                        setProdCompany(e.target.value)
                      handleSearch(code, type, companyProduct)}}
                    />
                  </Form.Group>
                 </Stack>
               </Form>
             </Stack>
           </Stack>
           <div>
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
           </Modal.Content>
         </Stack>
       </Modal>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            height: "100vh",
            backgroundColor: "white",
          }}
        >
          <Loader active>Loading</Loader>
        </div>
      )} */}
    </>
  );
};

export default SellProductPage;
