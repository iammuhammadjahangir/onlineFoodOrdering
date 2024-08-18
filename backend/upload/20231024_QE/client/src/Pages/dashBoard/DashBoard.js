import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import MetaData from "../../MetaData";
// Importing the components of DashBoard
import TopBarShopPerformance from "../../Components/DashBoard/TopBarShopPerformance";
import RecordsBar from "../../Components/DashBoard/RecordsBar";
import OperationsBar from "../../Components/DashBoard/OperationsBar";
import SalesBreakDown from "../../Components/DashBoard/SalesBreakDown";

//Icons
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  getTopSalesForDashBoard,
  getTopSalesForDashBoardWithUser,
  getSalesDataForDashBoard,
  getSalesDataForDashBoardWithUser,
  getActiveUsers,
  getPurchaseRecordForCurrentMonth,
  getPurchaseRecordForCurrentMonthForShop,
  getExpensesThisMonthForShop,
  getExpensesThisMonth,
} from "../../actions/dashboardAction";
import { refreshTokken } from "../../actions/userAction";
import "../../Components/DashBoard/dashboard.css";
let isCalled = "false";
const DashBoard = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [colorTheme, setColorTheme] = useState();
  //useStates
  const navigate = useNavigate();
  const [topProductSalesPerformance, setTopProductSalesPerformance] = useState(
    []
  );

  //USer Data useStates
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  //Sales Data USe States
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalSalesItem, setTotalSalesItem] = useState(0);

  //PurchaseData Use States
  const [totalPurchaseAmount, setTotalPurchaseAmount] = useState(0);
  const [totalPurchaseItem, setTotalPurchaseItem] = useState(0);

  //TransferData UserStates
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const [totalExpenseItem, setTotalExpenseItem] = useState(0);

  const { topProducts } = useSelector((state) => state.topProducts);
  const { topProductsUser } = useSelector((state) => state.topProductsUser);
  const { allSalesData } = useSelector((state) => state.allSalesData);
  const { allSalesDataWithUser } = useSelector(
    (state) => state.allSalesDataWithUser
  );
  const { activeUser } = useSelector((state) => state.activeUser);
  const { allPurchaseData } = useSelector((state) => state.allPurchaseData);
  const { allPurchaseDataForShop } = useSelector(
    (state) => state.allPurchaseDataForShop
  );
  const { allExpenseData } = useSelector((state) => state.allExpenseData);
  const { allExpenseDataForShop } = useSelector(
    (state) => state.allExpenseDataForShop
  );
  useEffect(() => {
    callFunctionForTopProducts();
  }, []);

  useEffect(() => {
    const currentColorTheme = localStorage.getItem("theme-color");
    if (currentColorTheme) {
      setColorTheme(currentColorTheme);
    }
  }, [colorTheme]);

  useEffect(() => {
    isCalled = "false";
  }, [
    totalUsers,
    activeUsers,
    totalSaleAmount,
    totalSalesItem,
    totalPurchaseAmount,
    totalPurchaseItem,
    topProducts,
  ]);
  useEffect(() => {
    if (isCalled === "false") {
      isCalled = "true";
      getToken();
    }
  }, [
    totalUsers,
    activeUsers,
    totalSaleAmount,
    totalSalesItem,
    totalPurchaseAmount,
    totalPurchaseItem,
    topProducts,
  ]);
  const getToken = async () => {
    const token = await refreshTokken();
    if (token.data === "Please login to acces this resource") {
      // navigate("/login");
      console.log("hii");
    }
    console.log(token);
  };

  useEffect(() => {
    if (topProducts) {
      console.log("called");
      console.log(topProducts);
      setTopProductSalesPerformance(topProducts);
    }
    if (topProductsUser) {
      setTopProductSalesPerformance(topProductsUser);
    }
    console.log(allSalesData);
    if (allSalesData) {
      let salesData = allSalesData;
      salesData?.totalSaleValue &&
        setTotalSaleAmount(salesData?.totalSaleValue?.toLocaleString());
      salesData?.totalQuantity && setTotalSalesItem(salesData?.totalQuantity);
    }
    if (allSalesDataWithUser) {
      let salesData = allSalesDataWithUser;
      salesData?.totalSaleValue &&
        setTotalSaleAmount(salesData?.totalSaleValue?.toLocaleString());
      salesData?.totalQuantity && setTotalSalesItem(salesData?.totalQuantity);
    }
    if (activeUser) {
      let userData = activeUser;
      setTotalUsers(userData?.totalUsers);
      setActiveUsers(userData?.activeUsers);
    }
    if (allPurchaseData) {
      let purchaseData = allPurchaseData;
      purchaseData?.totalPurchaseValue &&
        setTotalPurchaseAmount(
          purchaseData?.totalPurchaseValue?.toLocaleString()
        );
      purchaseData?.totalQuantity &&
        setTotalPurchaseItem(purchaseData?.totalQuantity);
    }
    if (allPurchaseDataForShop) {
      let purchaseData = allPurchaseDataForShop;
      purchaseData?.totalPurchaseValue &&
        setTotalPurchaseAmount(
          purchaseData?.totalPurchaseValue?.toLocaleString()
        );
      purchaseData?.totalQuantity &&
        setTotalPurchaseItem(purchaseData?.totalQuantity);
    }
    if (allExpenseData) {
      let expenseData = allExpenseData;
      expenseData?.totalExpenseValueValue &&
        setTotalExpenseAmount(
          expenseData?.totalExpenseValueValue?.toLocaleString()
        );
      expenseData?.totalExpenses &&
        setTotalExpenseItem(expenseData?.totalExpenses);
    }
    if (allExpenseDataForShop) {
      let expenseData = allExpenseDataForShop;
      expenseData?.totalExpenseValueValue &&
        setTotalExpenseAmount(
          expenseData?.totalExpenseValueValue?.toLocaleString()
        );
      expenseData?.totalExpenses &&
        setTotalExpenseItem(expenseData?.totalExpenses);
    }
  }, [
    topProducts,
    topProductsUser,
    allSalesData,
    allSalesDataWithUser,
    activeUser,
    allPurchaseData,
    allPurchaseDataForShop,
    allExpenseData,
    allExpenseDataForShop,
  ]);

  const callFunctionForTopProducts = async () => {
    dispatch(getActiveUsers());
    if (
      JSON.parse(localStorage.getItem("isAdministrator")) ||
      JSON.parse(localStorage.getItem("isSuperAdmin"))
    ) {
      dispatch(getTopSalesForDashBoard()); // let data = await getTopSalesForDashBoard();
      dispatch(getSalesDataForDashBoard());
      dispatch(getPurchaseRecordForCurrentMonth());
      dispatch(getExpensesThisMonth());
      // dispatch(getActiveUsers())
    } else {
      dispatch(getTopSalesForDashBoardWithUser());
      dispatch(getSalesDataForDashBoardWithUser());
      dispatch(getPurchaseRecordForCurrentMonthForShop());
      dispatch(getExpensesThisMonthForShop());
      // let data = await getTopSalesForDashBoardWithUser();
    }
  };

  return (
    <>
      <MetaData title="QE ~~Dashboard" />
      <div className={`dashboard ${colorTheme}`}>
        <div className="dashboard-content1">
          {!JSON.parse(localStorage.getItem("isSalesman")) && (
            <div className="content1-box">
              <TopBarShopPerformance
                className="top1"
                props={{
                  heading: t("dashtotalSale"),
                  icon: (
                    <CurrencyExchangeIcon
                      color="primary"
                      style={{ fontSize: "2rem" }}
                    />
                  ),
                  data: `Rs. ${totalSaleAmount}`,
                  bottom: totalSalesItem,
                  bottomText: t("dashItemSoldThisMonth"),
                }}
              />

              <TopBarShopPerformance
                className="top2"
                props={{
                  heading: t("totalPurchase"),
                  icon: (
                    <ShoppingCartIcon
                      color="primary"
                      style={{ fontSize: "2rem" }}
                    />
                  ),
                  data: `Rs. ${totalPurchaseAmount}`,
                  bottom: totalPurchaseItem,
                  bottomText: t("dashItemPurchasedThisMonth"),
                }}
              />

              <TopBarShopPerformance
                className="top3"
                props={{
                  heading: t("dashTotalExpense"),
                  icon: (
                    <TransferWithinAStationIcon
                      color="primary"
                      style={{ fontSize: "2rem" }}
                    />
                  ),
                  data: `Rs. ${totalExpenseAmount}`,
                  bottom: totalExpenseItem,
                  bottomText: t("dashExpenseItemThisMonth"),
                }}
              />

              <TopBarShopPerformance
                props={{
                  heading: t("dashActiveUsers"),
                  icon: (
                    <PeopleOutlineIcon
                      color="primary"
                      style={{ fontSize: "2rem" }}
                    />
                  ),
                  data: activeUsers,
                  bottom: totalUsers,
                  bottomText: t("dashTotalUser"),
                }}
              />
            </div>
          )}
        </div>
        <div className="dashboard-content2">
          <RecordsBar />
        </div>
        <div className="dashboard-content3">
          <div className="operations-bar">
            <OperationsBar />
          </div>
          <div className="sales-breakdown">
            {topProducts && (
              <SalesBreakDown
                props={{
                  sale: topProducts,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
