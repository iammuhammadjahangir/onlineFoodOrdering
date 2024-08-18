import { createStore, combineReducers, applyMiddleware } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authFormDataReducer from "./features/authSlice";

import {
  GlobalRatesReducer,
  UpdateRatesReducer,
} from "./reducers/globalRatesReducer";

import {
  LocalRatesReducer,
  UpdateLocalRatesReducer,
} from "./reducers/localRatesReducer";

const reducer = combineReducers({
  GlobalRates: GlobalRatesReducer,
  updateGlobalRates: UpdateRatesReducer,
  localRates: LocalRatesReducer,
  UpdateLocalRate: UpdateLocalRatesReducer,
  authFormData: authFormDataReducer,
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
