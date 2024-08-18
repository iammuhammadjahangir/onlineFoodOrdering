import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
///Product Location Quantity Page
import RecordLocation from "./Pages/ProductLocation/ProductLocationRecord/ProductLocRecord";
import UpdateLocation from "./Pages/ProductLocation/updateLocation/Update";

//Product Page Routes
import Record from "./Pages/Product/Record/Records";
import UpdateData from "./Pages/Product/Update/UpdateData";
import TableUser from "./Pages/Product/TableUser/TableUser";
import FormUser from "./Pages/Product/FormUser/FormUser";
import Barcodegenerate from "./Pages/Product/BarcodeGenerate/Barcodegenerate";

//Color Page Routes
import Color from "./Pages/Color/Record/RecordColor";
import ColorForm from "./Pages/Color/formUser/FormUserColor";
import UpdateColor from "./Pages/Color/Update/updateColor";

//Company Page Routes
import FormCompany from "./Pages/company/formCompany/FormCompany";
import Company from "./Pages/company/CompanyRecord/CompanyRexord";
import UpdateCompany from "./Pages/company/UpdateCompany/UpdateCompany";

//Godown Page Routes
import StockLocation from "./Pages/Godown/GodownRecord/StockLocation";
import StockForm from "./Pages/Godown/FormGodown/StockForm";
import StockUpdate from "./Pages/Godown/UpdateGodown/StockUpdate";

//Shop Page Routes
import Shop from "./Pages/Shop/ShopRecord/ShopRecord";
import ShopForm from "./Pages/Shop/ShopForm/ShopForm";
import ShopUpdate from "./Pages/Shop/ShopUpdate/UpdateShop";

//Product Type Page Routes
import TypeRecord from "./Pages/ProductType/Record/TypeRecord";
import UpdateType from "./Pages/ProductType/UpdateProdType/UpdateType";
import FormType from "./Pages/ProductType/TypeForm/FormType";

// Product With Location page Routes
// import LocationRecord from "./Pages/ProductLocation/ProductLocationRecord/ProductLocRecord";

//Transfer Page Routes
import RecordTransfer from "./Pages/Transfer/record/RecordTransfer";

//Transfer Recipt Page Routes
import TransferRecorddd from "./Transfer Recipt/TransferProduct/TransferRecord";
import TransferRecordd from "./Transfer Recipt/App";
import TranferProductPage from "./Transfer Recipt/TransferProductPage";
import DiscountModelTransfer from "./Transfer Recipt/DiscountModel";
import OptionTempDropDown from "./Transfer Recipt/OptionTempDropDown";

//Transfer Record Page Routes
import TranferPreview from "./Transfer Record/Transferrecord";
import TranferPreviewBill from "./Transfer Record/InvoicePreview/preview";

//Sales Recipt Page Routes
import Invoice from "./salesRecipt/App";
import SalesProductPage from "./salesRecipt/SellProductPage";
import DiscountModel from "./salesRecipt/DiscountModel";
import ShowConfirmDialogursubmitBox from "./salesRecipt/showConfirmDialogsubmitBox";

//Non FBR Sales Recipt Page Routes
// import InvoiceNonFBr from "./Non-Fiscal/salesRecipt/App";
// import SalesProductPageNonFBr from "./Non-Fiscal/salesRecipt/SellProductPage";
// import DiscountModelNonFBr from "./Non-Fiscal/salesRecipt/DiscountModel";
// import ShowConfirmDialogursubmitBoxNonFBr from "./Non-Fiscal/salesRecipt/showConfirmDialogsubmitBox";

//Sales Record Page Routes
import Salerecord from "./salesRecord/Salerecord";
import Preview from "./salesRecord/InvoicePreview/preview";

//Purchase Recipt Page Routes
import SellProductPage from "./purchaseRecipt/SellProductPage";
import DiscountModelPur from "./purchaseRecipt/DiscountModel";
import PurchaseRecipt from "./purchaseRecipt/App";
import OptionTempPurchaseDropdown from "./purchaseRecipt/OptionTempDropdown";

//Purchase Record Page Routes
import TableTransfer from "./purchaseRecord/Purchaserecord";
import PreviewPurchase from "./purchaseRecord/InvoicePreview/preview";

//Expense Page Routes
import ExpenseApp from "./Pages/Expensee/App";
import ExpenseFormm from "./Pages/Expensee/ExpenseFormm";
import ExpenseInvoice from "./Pages/Expensee/ExpenseInvoice/ExpenseInvoice";
import ExpensePreview from "./Pages/Expensee/ExpenseInvoice/Preview/InvoicePreview";

//Expense Type Page Routes
import ExpenseForm from "./Pages/ExpenseType/expenseForm/expense";
import ExpenseTable from "./Pages/ExpenseType/expenseTable/ExpenseTable";
import RecordExpense from "./Pages/ExpenseType/Record/RecordExpense";
import UpdateExpense from "./Pages/ExpenseType/Update/updateExpense";

//Component Page Routes
import PrivateComponents from "./Components/PrivateComponents";
import NavBar from "./Components/NavBar";
import { SidebarData } from "./Components/SidebarData";

///Pengings Pages
import PurchaseRecord from "./Pending Invoices/Purchase Invoices/Record";
import SaleRecord from "./Pending Invoices/Sale Invoices/SaleRecord";
import RecordTempTransfer from "./Pending Invoices/TrabsferInvoices/TransferRecord";

//Login Page Routes
import LoginPage from "./features/auth/Login";
import ForgotPasswordEmail from "./features/auth/ForgotPasswordEmail";
import ResetPassword from "./features/auth/ResetPassword";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";

//Users Routes
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import UsersList from "./features/users/UsersList";
import UpdateProfileUser from "./features/users/updateProfileUser";

//Consolidated Reports
import ConsolidatedPuchaseReport from "./Pages/consolidatedReports/consolidatedPurchaseReport/consolidatedPuchaseReport";
import ConsolidatedSalesReport from "./Pages/consolidatedReports/consolidatedSalesReport/consolidatedSalesReport";
import ConsolidatedTransferReport from "./Pages/consolidatedReports/consolidatedTransferReport/consolidatedTransferReport";
import ConsolidatedExpenseReport from "./Pages/consolidatedReports/consolidatedExpenseReport/ConsolidatedExpenseReport";

///Profit Report
import ProfitSalesMan from "./Pages/profitSalesMan/ProfitSalesMan";
import PaidDataTable from "./Pages/profitSalesMan/PaidRecord/paidData";
import PaidPreviewDataTable from "./Pages/profitSalesMan/PaidRecord/previewPaidData";

//DashBoard
import DashBoard from "./Pages/dashBoard/DashBoard";
import ProtectedRoute from "./features/auth/ProtectedRoute";

//For Setting pages
import SettingMainPage from "./SettingComponent/settingMainPage";
import PrinterSettingPage from "./SettingComponent/Printer Setting/printerPageSetting";
import DarkMode from "./SettingComponent/ThemeSetting/DarkMode";
import TablePageSetting from "./SettingComponent/TableSetting/tablePageSetting";
import ChangeTableSetting from "./SettingComponent/TableSetting/changeTableSetting";
import LanguageSettingPage from "./SettingComponent/Language Setting/LanguageSettingPage";
//For Changing Permissions
import RolesTable from "./Pages/user/roles/RolesTable";
import TasksTable from "./Pages/user/tasks/TasksTable";
import RolesAssign from "./Pages/user/rolesAssigned/RolesAssign";

import ProductsTableToExcel from "./Pages/TableToExcelPages/ProductsTableToExcel";
import ColorTableToExcel from "./Pages/TableToExcelPages/colorTableToExcel";
import CompanyTableToExcel from "./Pages/TableToExcelPages/companyTableToExcel";
import ProductTypeTableToExcel from "./Pages/TableToExcelPages/productTypeTableToExcel";
import "./App.css";
import i18n from "i18next";
import {
  I18nextProvider,
  useTranslation,
  initReactI18next,
} from "react-i18next";

import tEnglish from "../src/locales/english/translation.json";
import tUrdu from "../src/locales/urdu/translation.json";
import LanguageSwitcher from "../src/locales/localeDropDownOption/LanguageDropDown";
import store from "./store";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./actions/userAction";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: tEnglish,
      },
      ur: {
        translation: tUrdu,
      },
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

function App() {
  const dispatch = useDispatch();
  const [colorTheme, setColorTheme] = useState("theme-white");
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme, localStorage.getItem("color-theme")]);
  useEffect(() => {
    store.dispatch(loadUser());
    getData();
  });

  const getData = async () => {
    console.log("hii");
  };
  const userRoles = ["Admin", "Salesman", "Administrator"];
  return (
    <>
      <div className={`app-container ${colorTheme}`}>
        <div className={`background-image ${colorTheme}`}></div>
        <div className="content-container">
          <Router>
            <NavBar />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                exact
                path="/passwordForgot"
                element={<ForgotPasswordEmail />}
              />
              <Route
                exact
                path="/password/reset/:token"
                element={<ResetPassword />}
              />
            </Routes>

            <ProtectedRoute
              exact
              path="/rolesTable"
              allowedRoles={["superAdmin"]}
              Component={RolesTable}
            />
            <ProtectedRoute
              exact
              path="/taskTable"
              allowedRoles={["superAdmin"]}
              Component={TasksTable}
            />
            <ProtectedRoute
              exact
              path="/rolesAssign"
              allowedRoles={["superAdmin"]}
              Component={RolesAssign}
            />

            <ProtectedRoute
              exact
              path="/dashboard"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={DashBoard}
            />

            <ProtectedRoute
              exact
              path="/Record"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={Record}
            />
            <ProtectedRoute
              exact
              path="/tableuser"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={TableUser}
            />
            <ProtectedRoute
              exact
              path="/additem"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={FormUser}
            />
            <ProtectedRoute
              exact
              path="/generate/:id"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={Barcodegenerate}
            />
            <ProtectedRoute
              exact
              path="/update/:id"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={UpdateData}
            />

            <ProtectedRoute
              exact
              path="/color"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={Color}
            />
            <ProtectedRoute
              exact
              path="/addcolor"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ColorForm}
            />
            <ProtectedRoute
              exact
              path="/updatecolor/:id"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={UpdateColor}
            />

            <ProtectedRoute
              exact
              path="/Company"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={Company}
            />
            <ProtectedRoute
              exact
              path="/addcompany"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={FormCompany}
            />
            <ProtectedRoute
              exact
              path="/updatecompany/:id"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={UpdateCompany}
            />

            <ProtectedRoute
              exact
              path="/shopRecord"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={Shop}
            />
            <ProtectedRoute
              exact
              path="/shopform"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ShopForm}
            />
            <ProtectedRoute
              exact
              path="/shopUpdate/:id"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ShopUpdate}
            />

            <ProtectedRoute
              exact
              path="/godownrecord"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={StockLocation}
            />
            <ProtectedRoute
              exact
              path="/stockform"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={StockForm}
            />
            <ProtectedRoute
              exact
              path="/stockUpdate/:id"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={StockUpdate}
            />

            <ProtectedRoute
              exact
              path="/recordType"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={TypeRecord}
            />
            <ProtectedRoute
              exact
              path="/Updatetype/:id"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={UpdateType}
            />
            <ProtectedRoute
              exact
              path="/formType"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={FormType}
            />

            {/* Purchase Recipt Page Routes */}
            <ProtectedRoute
              exact
              path="/purchaseProductPage"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={SellProductPage}
            />
            <ProtectedRoute
              exact
              path="/optionTempPurchase"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={OptionTempPurchaseDropdown}
            />
            <ProtectedRoute
              exact
              path="/purchaseDiscount"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={DiscountModelPur}
            />
            <ProtectedRoute
              exact
              path="/PurchaseRecipt"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={PurchaseRecipt}
            />

            {/* Sales Recipt Page Routes */}
            <ProtectedRoute
              exact
              path="/saleproduct"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={Invoice}
            />
            <ProtectedRoute
              exact
              path="/saleproductpage"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={SalesProductPage}
            />
            <ProtectedRoute
              exact
              path="/discountmodel"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={DiscountModel}
            />
            <ProtectedRoute
              exact
              path="/showconfirmdialogursubmitbox"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ShowConfirmDialogursubmitBox}
            />

            {/*NON FBR Sales Recipt Page Routes */}
            {/* <ProtectedRoute
              exact
              path="/saleproductSimple"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={InvoiceNonFBr}
            />
            <ProtectedRoute
              exact
              path="/saleproductpageSimple"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={SalesProductPageNonFBr}
            />
            <ProtectedRoute
              exact
              path="/discountmodelSimple"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={DiscountModelNonFBr}
            />
            <ProtectedRoute
              exact
              path="/showconfirmdialogursubmitboxSimple"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ShowConfirmDialogursubmitBoxNonFBr}
            /> */}

            {/* Product Location Page Routes */}
            <ProtectedRoute
              exact
              path="/recordLocation"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={RecordLocation}
            />
            <ProtectedRoute
              exact
              path="/updateLoc/:id"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={UpdateLocation}
            />

            {/* Transfer Recipt Page Routes */}
            <ProtectedRoute
              exact
              path="/optionTempPage"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={OptionTempDropDown}
            />
            <ProtectedRoute
              exact
              path="/transferitem"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={TransferRecorddd}
            />
            <ProtectedRoute
              exact
              path="/TranferProductPage"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={TranferProductPage}
            />
            <ProtectedRoute
              exact
              path="/DiscountModelTransfer"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={DiscountModelTransfer}
            />
            <ProtectedRoute
              exact
              path="/TransferRecordd"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={TransferRecordd}
            />

            {/* Purchase Record Page Routes */}
            <ProtectedRoute
              exact
              path="/purchaseRecord"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={TableTransfer}
            />
            <ProtectedRoute
              exact
              path="/Previewpurchase"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={PreviewPurchase}
            />

            {/* Sales Record Page Routes */}
            <ProtectedRoute
              exact
              path="/Salerecord"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={Salerecord}
            />
            <ProtectedRoute
              exact
              path="/Preview"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={Preview}
            />

            {/* Transfer Record Page Routes */}
            <ProtectedRoute
              exact
              path="/TranferPreview"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={TranferPreview}
            />
            <ProtectedRoute
              exact
              path="/TranferPreviewBill"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={TranferPreviewBill}
            />

            {/* Expense Type Page Routes */}
            <ProtectedRoute
              exact
              path="/expenseForm"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ExpenseForm}
            />
            <ProtectedRoute
              exact
              path="/expenseTable"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ExpenseTable}
            />
            <ProtectedRoute
              exact
              path="/expense"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={RecordExpense}
            />
            <ProtectedRoute
              exact
              path="/updateExpense/:id"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={UpdateExpense}
            />

            {/* Expense Page Routes */}
            <ProtectedRoute
              exact
              path="/expensee"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ExpenseApp}
            />
            <ProtectedRoute
              exact
              path="/expens"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ExpenseFormm}
            />
            <ProtectedRoute
              exact
              path="/expenseInvoice"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ExpenseInvoice}
            />
            <ProtectedRoute
              exact
              path="/expensePreview"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ExpensePreview}
            />

            {/* Consolidated Reports Accessable to admin and Administrator */}
            <ProtectedRoute
              exact
              path="/consolidatedPuchaseReport"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ConsolidatedPuchaseReport}
            />
            <ProtectedRoute
              exact
              path="/consolidatedSalesReport"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ConsolidatedSalesReport}
            />
            <ProtectedRoute
              exact
              path="/consolidatedTransferReport"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ConsolidatedTransferReport}
            />
            <ProtectedRoute
              exact
              path="/consolidatedExpenseReport"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ConsolidatedExpenseReport}
            />
            <ProtectedRoute
              exact
              path="/ProfitSalesman"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ProfitSalesMan}
            />
            <ProtectedRoute
              exact
              path="/paidEmployeCommission"
              allowedRoles={["superAdmin", "Administrator"]}
              Component={PaidDataTable}
            />
            <ProtectedRoute
              exact
              path="/paidEmployePreviewCommission/:id"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={PaidPreviewDataTable}
            />

            {/* Users Route */}
            <ProtectedRoute
              exact
              path="/editUser/:id"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={EditUser}
            />
            <ProtectedRoute
              exact
              path="/newUserForm"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={NewUserForm}
            />
            <ProtectedRoute
              exact
              path="/usersList"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={UsersList}
            />

            {/* Update user Profile */}
            <ProtectedRoute
              exact
              path="/updateUserProfile"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={UpdateProfileUser}
            />
            <ProtectedRoute
              exact
              path="/tempPurchasePendings"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={PurchaseRecord}
            />
            <ProtectedRoute
              exact
              path="/tempSalePendings"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={SaleRecord}
            />
            <ProtectedRoute
              exact
              path="/tempTransferPendings"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={RecordTempTransfer}
            />

            {/* Setting Routes*/}
            <ProtectedRoute
              exact
              path="/settings"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={SettingMainPage}
            />
            <ProtectedRoute
              exact
              path="/printerSettings"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={PrinterSettingPage}
            />
            <ProtectedRoute
              exact
              path="/tablePageSetting"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={TablePageSetting}
            />
            <ProtectedRoute
              exact
              path="/darkModeSetting"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={DarkMode}
            />
            <ProtectedRoute
              exact
              path="/changeTableSetting"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ChangeTableSetting}
            />
            <ProtectedRoute
              exact
              path="/changeLanguageSetting"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={LanguageSettingPage}
            />

            {/* Table To Excel Routes*/}
            <ProtectedRoute
              exact
              path="/productsTableToExcel"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ProductsTableToExcel}
            />
            <ProtectedRoute
              exact
              path="/colorTableToExcel"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ColorTableToExcel}
            />
            <ProtectedRoute
              exact
              path="/companyTableToExcel"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={CompanyTableToExcel}
            />
            <ProtectedRoute
              exact
              path="/productTypeTableToExcel"
              allowedRoles={[
                "superAdmin",
                "Administrator",
                "Admin",
                "Salesman",
              ]}
              Component={ProductTypeTableToExcel}
            />
          </Router>
        </div>
      </div>
    </>
  );
}
export default App;
