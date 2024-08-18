import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productReducer,
  updatePurchaseProductPriceReducer,
  getProductsOnCompanyNameReducer,
  getProductOnBarcodeReducer,
} from "./reducers/productReducer";
import {
  colorDetailsReducer,
  colorReducer,
  deleteColorReducer,
  postColorReducer,
  updateColorReducer,
} from "./reducers/colorReducer";
import {
  companyDetailsReducer,
  companyReducer,
  deleteCompanyReducer,
  postCompanyReducer,
  updateCompanyReducer,
} from "./reducers/companyReducer";
import { forgotPasswordReducer, userReducer } from "./reducers/userReducer";
import {
  getActiveUsersReducer,
  getExpensesThisMonthForShopReducer,
  getExpensesThisMonthReducer,
  getPurchaseRecordForCurrentMonthForShopReducer,
  getPurchaseRecordForCurrentMonthReducer,
  getSalesDataForDashBoardReducer,
  getSalesDataForDashBoardWithUserReducer,
  getTopSalesForDashBoardWithUserReducer,
  topProductDashboardReducer,
} from "./reducers/dashboardReducer";
import {
  LocationOnGodownTypeReducer,
  LocationOnShopTypeReducer,
  LocationOnStorageCodeReducer,
  LocationReducer,
  productLocationOnIdReducer,
  updateAndPostProductInLocationReducer,
  updateMinusQuantityUsingTransferReducer,
  updateQuantityInLocationReducer,
  updateQuantityUsingTransferReducer,
} from "./reducers/productLocationReducer";
import {
  deleteStorageReducer,
  postStorageReducer,
  storageDetailsReducer,
  storageReducer,
  updateStorageReducer,
} from "./reducers/storageReducer";
import {
  deleteProductTypeReducer,
  postProductTypeReducer,
  productTypeDetailsReducer,
  productTypeReducer,
  updateProductTypeReducer,
} from "./reducers/productTypeReducer";
import {
  deleteTempPurchaseItemReducer,
  deleteTempPurchaseReducer,
  getTempPurchasOnShopReducer,
  getTempPurchaseDetialsReducer,
  getTempPurchaseReducer,
  postTempPurchaseReducer,
  updateTempPurchaseProductsReducer,
} from "./reducers/tempPurchaseReducer";
import {
  deleteTempSaleItemListReducer,
  deleteTempSaleItemReducer,
  getTempSaleOnShopNoReducer,
  tempSaleDetailsReducer,
  tempSalePostReducer,
  tempSaleReducer,
  updateTempSaleProductsReducer,
  updateTempSaleQuantityInListReducer,
} from "./reducers/tempSaleReducer";
import { postSaleToFiscalReducer } from "./reducers/saleProductWithFiscalReducer";
import { getSaleReducer, postSaleReducer } from "./reducers/salePoductReducer";
import {
  deleteTempTransferAllReducer,
  deleteTempTransferProductsReducer,
  postTempTransferReducer,
  tempTransferDetailsReducer,
  tempTransferReducer,
  updateTempTransferItemReducer,
  updateTempTransferReducer,
} from "./reducers/tempTransferReducer";
import { getPurchaseReducer } from "./reducers/purchaseReducer";
import { getTransferReducer } from "./reducers/transferReducer";
import { shopDeatailReducer, shopReducer } from "./reducers/shopReducer";
import { roleReducer } from "./reducers/roleReducer";
import { AssignTaskByIdNameReducer } from "./reducers/assignTaskReducer";
import { taskReducer, postTaskReducer } from "./reducers/taskReducer";
// import { productReducer } from "./reducers/productReducer"
// import { userReducer } from "./reducers/userReducer"

const reducer = combineReducers({
  products: productReducer,
  color: colorReducer,
  company: companyReducer,
  user: userReducer,
  topProducts: topProductDashboardReducer,
  topProductsUser: getTopSalesForDashBoardWithUserReducer,
  activeUser: getActiveUsersReducer,
  allSalesData: getSalesDataForDashBoardReducer,
  allSalesDataWithUser: getSalesDataForDashBoardWithUserReducer,
  allPurchaseData: getPurchaseRecordForCurrentMonthReducer,
  allPurchaseDataForShop: getPurchaseRecordForCurrentMonthForShopReducer,
  allExpenseData: getExpensesThisMonthReducer,
  allExpenseDataForShop: getExpensesThisMonthForShopReducer,
  productType: productTypeReducer,
  productLocation: LocationReducer,
  productLocationOnStorageCode: LocationOnStorageCodeReducer,
  colorRes: postColorReducer,
  colorUpdate: updateColorReducer,
  colorDetails: colorDetailsReducer,
  colorDelete: deleteColorReducer,
  companyRes: postCompanyReducer,
  companyUpdate: updateCompanyReducer,
  companyDetails: companyDetailsReducer,
  companyDelete: deleteCompanyReducer,
  storage: storageReducer,
  storageRes: postStorageReducer,
  storageUpdate: updateStorageReducer,
  storageDetails: storageDetailsReducer,
  storageDelete: deleteStorageReducer,
  productTypeRes: postProductTypeReducer,
  productTypeUpdate: updateProductTypeReducer,
  productTypeDetails: productTypeDetailsReducer,
  productTypeDelete: deleteProductTypeReducer,
  purcahseProductPriceUpdateInProduct: updatePurchaseProductPriceReducer,
  tempPurchase: getTempPurchaseReducer,
  tempPurchaseDelete: deleteTempPurchaseReducer,
  quantityUpdateOnProductAndAvailId: updateQuantityInLocationReducer,
  updateAndPostProduct: updateAndPostProductInLocationReducer,
  productDetails: productDetailsReducer,
  productsOnCompanyName: getProductsOnCompanyNameReducer,
  postTempPurchase: postTempPurchaseReducer,
  tempPurchaseItemDelete: deleteTempPurchaseItemReducer,
  updateTempPurchaseProducts: updateTempPurchaseProductsReducer,
  productOnBarcode: getProductOnBarcodeReducer,
  productLocationOnId: productLocationOnIdReducer,
  tempSale: tempSaleReducer,
  tempSaleItemDelete: deleteTempSaleItemReducer,
  saleProductWithFiscal: postSaleToFiscalReducer,
  saleProduct: postSaleReducer,
  tempSalePost: tempSalePostReducer,
  updateTempSaleProducts: updateTempSaleProductsReducer,
  updateTempSaleQuantityInList: updateTempSaleQuantityInListReducer,
  tempSaleItemListDelete: deleteTempSaleItemListReducer,
  tempTransfer: tempTransferReducer,
  tempTransferAllDelete: deleteTempTransferAllReducer,
  updateQuantityUsingTransfer: updateQuantityUsingTransferReducer,
  updateMinusQuantityUsingTransfer: updateMinusQuantityUsingTransferReducer,
  tempTransferProductDelete: deleteTempTransferProductsReducer,
  postTempTransferProduct: postTempTransferReducer,
  updateTempTransferProductItem: updateTempTransferItemReducer,
  updateTempTransferProduct: updateTempTransferReducer,
  purchaseRecord: getPurchaseReducer,
  saleRecord: getSaleReducer,
  transferRecord: getTransferReducer,
  shop: shopReducer,
  shopDetails: shopDeatailReducer,
  tempPurchaseDetails: getTempPurchaseDetialsReducer,
  tempSaleDetails: tempSaleDetailsReducer,
  tempPurchaseOnShop: getTempPurchasOnShopReducer,
  tempSaleOnShopNo: getTempSaleOnShopNoReducer,
  tempTransferDetails: tempTransferDetailsReducer,
  productLocationOnShopType: LocationOnShopTypeReducer,
  productLocationOnGodownType: LocationOnGodownTypeReducer,
  forgotPassword: forgotPasswordReducer,
  role: roleReducer,
  assignTask: AssignTaskByIdNameReducer,
  task: taskReducer,
  taskResponse: postTaskReducer,
  // assignTaskByIdStatus: AssignTaskByIdReducer,

  //  products: productReducer,
  //  user: userReducer
});

let initialState = {
  products: [], // Set an empty array as the initial state for products
  color: [],
  company: [],
  user: [],
  productType: [],
  role: [],
  assignTask: [],
  task: [],
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
