import { configureStore } from "@reduxjs/toolkit";
import authFormDataReducer from "../features/authSlice";

const store = configureStore({
	reducer: {
		authFormData: authFormDataReducer,
	},
});

export default store;
