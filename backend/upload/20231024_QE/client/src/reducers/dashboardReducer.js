
import { ALL_ACTIVE_DASHBOARD_USER_REQUEST, ALL_ACTIVE_TOP_DASHBOARD_USER_FAIL, ALL_ACTIVE_TOP_DASHBOARD_USER_SUCCESS, ALL_DASHBOARD_FAIL, ALL_DASHBOARD_REQUEST, ALL_DASHBOARD_SUCCESS, ALL_EXPENSEDATA_FAIL, ALL_EXPENSEDATA_FORSHOP_FAIL, ALL_EXPENSEDATA_FORSHOP_REQUEST, ALL_EXPENSEDATA_FORSHOP_SUCCESS, ALL_EXPENSEDATA_REQUEST, ALL_EXPENSEDATA_SUCCESS, ALL_PURCHASEDATAFORDASHBOARD_FAIL, ALL_PURCHASEDATAFORDASHBOARD_FORSHOP_FAIL, ALL_PURCHASEDATAFORDASHBOARD_FORSHOP_REQUEST, ALL_PURCHASEDATAFORDASHBOARD_FORSHOP_SUCCESS, ALL_PURCHASEDATAFORDASHBOARD_REQUEST, ALL_PURCHASEDATAFORDASHBOARD_SUCCESS, ALL_SALESDATAFORDASHBOARD_FAIL, ALL_SALESDATAFORDASHBOARD_REQUEST, ALL_SALESDATAFORDASHBOARD_SUCCESS, ALL_SALESDATAFORDASHBOARD_WITHUSER_FAIL, ALL_SALESDATAFORDASHBOARD_WITHUSER_REQUEST, ALL_SALESDATAFORDASHBOARD_WITHUSER_SUCCESS, ALL_TOP_DASHBOARD_FAIL, ALL_TOP_DASHBOARD_REQUEST, ALL_TOP_DASHBOARD_SUCCESS, CLEAR_ERRORS } from "../constants/dashboardConstants";

export const topProductDashboardReducer = (state = { topProducts: []}, action)=>{
    switch (action.type){
        case ALL_DASHBOARD_REQUEST:
            return{
                loading: true,
                topProducts: [],
            };
        case ALL_DASHBOARD_SUCCESS: 
            return {
                loading: false,
                topProducts: action.payload
            }
        case ALL_DASHBOARD_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
            default:
            return state;
            
    }
}

export const getTopSalesForDashBoardWithUserReducer = (state = { topProductsUser: []}, action)=>{
    switch (action.type){
        case ALL_TOP_DASHBOARD_REQUEST:
            return{
                loading: true,
                topProductsUser: [],
            };
        case ALL_TOP_DASHBOARD_SUCCESS: 
            return {
                loading: false,
                topProductsUser: action.payload
            }
        case ALL_TOP_DASHBOARD_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
            default:
            return state;
            
    }
}

export const getActiveUsersReducer = (state = { activeUser: []}, action)=>{
    switch (action.type){
        case ALL_ACTIVE_DASHBOARD_USER_REQUEST:
            return{
                loading: true,
                activeUser: [],
            };
        case ALL_ACTIVE_TOP_DASHBOARD_USER_SUCCESS: 
            return {
                loading: false,
                activeUser: action.payload
            }
        case ALL_ACTIVE_TOP_DASHBOARD_USER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
            default:
            return state;
            
    }
}

export const getSalesDataForDashBoardReducer = (state = { allSalesData: []}, action)=>{
    switch (action.type){
        case ALL_SALESDATAFORDASHBOARD_REQUEST:
            return{
                loading: true,
                allSalesData: [],
            };
        case ALL_SALESDATAFORDASHBOARD_SUCCESS: 
            return {
                loading: false,
                allSalesData: action.payload
            }
        case ALL_SALESDATAFORDASHBOARD_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
            default:
            return state;
            
    }
}

export const getSalesDataForDashBoardWithUserReducer = (state = { allSalesDataWithUser: []}, action)=>{
    switch (action.type){
        case ALL_SALESDATAFORDASHBOARD_WITHUSER_REQUEST:
            return{
                loading: true,
                allSalesDataWithUser: [],
            };
        case ALL_SALESDATAFORDASHBOARD_WITHUSER_SUCCESS: 
            return {
                loading: false,
                allSalesDataWithUser: action.payload
            }
        case ALL_SALESDATAFORDASHBOARD_WITHUSER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
            default:
            return state;
            
    }
}


export const getPurchaseRecordForCurrentMonthReducer = (state = { allPurchaseData: []}, action)=>{
    switch (action.type){
        case ALL_PURCHASEDATAFORDASHBOARD_REQUEST:
            return{
                loading: true,
                allPurchaseData: [],
            };
        case ALL_PURCHASEDATAFORDASHBOARD_SUCCESS: 
            return {
                loading: false,
                allPurchaseData: action.payload
            }
        case ALL_PURCHASEDATAFORDASHBOARD_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
            default:
            return state;
            
    }
}

export const getPurchaseRecordForCurrentMonthForShopReducer = (state = { allPurchaseDataForShop: []}, action)=>{
    switch (action.type){
        case ALL_PURCHASEDATAFORDASHBOARD_FORSHOP_REQUEST:
            return{
                loading: true,
                allPurchaseDataForShop: [],
            };
        case ALL_PURCHASEDATAFORDASHBOARD_FORSHOP_SUCCESS: 
            return {
                loading: false,
                allPurchaseDataForShop: action.payload
            }
        case ALL_PURCHASEDATAFORDASHBOARD_FORSHOP_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
            default:
            return state;
            
    }
}

export const getExpensesThisMonthReducer = (state = { allExpenseData: []}, action)=>{
    switch (action.type){
        case ALL_EXPENSEDATA_REQUEST:
            return{
                loading: true,
                allExpenseData: [],
            };
        case ALL_EXPENSEDATA_SUCCESS: 
            return {
                loading: false,
                allExpenseData: action.payload
            }
        case ALL_EXPENSEDATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
            default:
            return state;
            
    }
}

export const getExpensesThisMonthForShopReducer = (state = { allExpenseDataForShop: []}, action)=>{
    switch (action.type){
        case ALL_EXPENSEDATA_FORSHOP_REQUEST:
            return{
                loading: true,
                allExpenseDataForShop: [],
            };
        case ALL_EXPENSEDATA_FORSHOP_SUCCESS: 
            return {
                loading: false,
                allExpenseDataForShop: action.payload
            }
        case ALL_EXPENSEDATA_FORSHOP_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
            default:
            return state;
            
    }
}