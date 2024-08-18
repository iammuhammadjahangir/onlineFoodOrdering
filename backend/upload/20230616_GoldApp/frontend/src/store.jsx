import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import authFormDataReducer from "./features/authSlice";
import { UpdateLocalRatesReducer } from "./reducers/ratesMetalLocalReducer";

const reducer = combineReducers({
  UpdateLocalRates: UpdateLocalRatesReducer,
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
