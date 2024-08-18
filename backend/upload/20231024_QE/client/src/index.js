import React from "react";
import ReactDOM from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import StateContext from "./salesRecipt/context/stateContext";
import ContextSales from "./salesRecord/context/ContextSales";
// import TransferStateContect from "./Transfer Recipt/context/stateContext";
import TransferStateContect from "./Transfer Recipt/context/stateContext";
import TransferReoprtStateContect from "./Transfer Record/context/ContextSales";
import PurchaseStateContext from "./purchaseRecipt/context/stateContext";
import PurchaseReportStateContext from "./purchaseRecord/context/ContextSales";
import ExpenseStateeContext from "./Pages/Expensee/context/stateContext";
import TableStateContext from "./Components/tableComponent/tableContext"

import "./index.css";
// import { store } from "./app/store";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextSales>
        <StateContext>
          <TransferStateContect>
            <TransferReoprtStateContect>
              <PurchaseStateContext>
                <PurchaseReportStateContext>
                  <ExpenseStateeContext>
                    <TableStateContext>
                      <App />
                    </TableStateContext>
                  </ExpenseStateeContext>
                </PurchaseReportStateContext>
              </PurchaseStateContext>
            </TransferReoprtStateContect>
          </TransferStateContect>
        </StateContext>
      </ContextSales>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
