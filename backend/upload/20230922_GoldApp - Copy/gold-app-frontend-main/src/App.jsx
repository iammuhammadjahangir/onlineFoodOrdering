import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import WebFont from "webfontloader";
import "./App.css";

import Auth from "./components/Auth/Auth";

// import PurchaseForm from "./components/PurchaseForm/PurchaseForm";
import UserList from "./components/AdminComponents/UserList/UserList";
import TradeForm from "./components/TradeForm/TradeForm";
import Reports from "./components/Reports/Reports";
import Calculations from "./components/Calculations/Calculations";
import View from "./components/View/View";
import RedirectPage from "./RedirectPage";
import ForgotPassword from "./components/Forgot Password/ForgotPassword";
import FrontEndAdminAuth from "./FrontEndAdminAuth";
import FrontEndUserAndAdminAuth from "./FrontEndUserAndAdminAuth";
import AutoLogin from "./AutoLogin";
import Invoice from "./components/Invoice/Invoice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Button } from "@mui/material";
import { useState } from "react";
import DrawerM from "./DrawerM";
import Insta from "./components/Insta";
import GoldExcessLess from "./components/Gold Excess-Less";
import Customer from "./pages/customer/customerData";
import CustomerReport from "./pages/customerReport/customerReport";
import ThermalPrintComponent from "./components/TableComponent/thermalPrintComponent";
import PurchaseForm from "./components/PurchaseForms/purchaseForm";

import DailyEntryFrom from "./pages/DailyEntry/DailyEntryFrom";
import DailyEntryReport from "./pages/DailyEntryReport/DailyEntryReport";

//for Roles
import RolesTable from "./features/user/roles/RolesTable";
import TasksTable from "./features/user/tasks/TasksTable";
import RolesAssign from "./features/user/rolesAssigned/RolesAssign";

import GoldRate from "./pages/GoldRates/GoldRate";
import UpdateLocalRate from "./pages/UpdateLocalRate/UpdateLocalRate.js";

import TradingGuide from "./pages/TradingGuide/TradingGuide";
import GoldCalculator from "./pages/GoldCalculator/GoldCalculator.js";
const App = () => {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka", "Noto Nastaliq Urdu"],
      },
    });
  }, []);
  // const [darakMode, setDarkMode] = useState(false);
  // const darkTheme = createTheme({
  // 	palette: {
  // 		mode: darakMode ? "dark" : "light",
  // 	},
  // 	lineColor: "white",
  // });
  // const handleChange = () => {
  // 	setDarkMode((prev) => !prev);
  // };
  return (
    <div className="app-container">
      <div className="background-image"></div>
      <div className="content-container">
        <Routes>
          <Route path="/noInternet" element={<>Server Down</>} />
          <Route>
            {/* <Route element={<AutoLogin />}> */}
            <Route path="/login" element={<Auth />} />
            <Route
              exact
              path="/"
              element={<Navigate to="/guide" replace={true} />}
            />
            <Route exact path="/liveRates" element={<GoldRate />} />
            <Route exact path="/guide" element={<TradingGuide />} />
            <Route exact path="/calculator" element={<GoldCalculator />} />
          </Route>

          <Route path="/redirectPage" element={<RedirectPage />} />

          <Route
            path="/forgotPassword/:id/:pageStatus"
            element={<ForgotPassword />}
          />
          {/* <Route path="/drawer" element={<DrawerM />} />
				<Route path="/insta/" element={<Insta />} /> */}

          <Route element={<FrontEndUserAndAdminAuth />}>
            <Route
              exact
              path="/admin/updateRates"
              element={<UpdateLocalRate />}
            />
            <Route path="/dailyEntry" element={<DailyEntryFrom />} />
            <Route path="/dailyEntryReport" element={<DailyEntryReport />} />
            <Route path="/purchase" element={<PurchaseForm />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/customerReport" element={<CustomerReport />} />
            <Route
              path="/thermalPrintComponent"
              element={<ThermalPrintComponent />}
            />
            {/* For Roles */}
            <Route path="/rolesTable" element={<RolesTable />} />
            <Route path="/trade" element={<TradeForm />} />
            <Route path="/view" element={<View />} />
            <Route path="/goldExcessLess" element={<GoldExcessLess />} />
            <Route path="/Invoice/:type" element={<Invoice />} />
            {/* <Route path="/taskTable" element={<TasksTable />} /> */}
            //only Administrator can change role Permission
            <Route path="/" element={<FrontEndAdminAuth />}>
              <Route path="rolesAssign" element={<RolesAssign />} />
            </Route>
            <Route
              path="/admin/report/:bool"
              element={
                <>
                  <Reports />
                </>
              }
            />
            <Route path="/admin/unverifiedUserList" element={<UserList />} />
          </Route>
          <Route path="*" element={<h1>Error 404 NOT FOUND</h1>} />
        </Routes>{" "}
      </div>
    </div>
  );
};

export default App;
