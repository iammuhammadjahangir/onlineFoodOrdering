import { ALL_TEMP_PURCHASE_FAIL, ALL_TEMP_PURCHASE_REQUEST, ALL_TEMP_PURCHASE_SUCCESS, ALL_TEMP_PURCHASE_DELETE_REQUEST,
    ALL_TEMP_PURCHASE_DELETE_SUCCESS, ALL_TEMP_PURCHASE_DELETE_FAIL, CLEAR_ERRORS, POST_TEMP_PURCHASE_REQUEST, POST_TEMP_PURCHASE_SUCCESS, POST_TEMP_PURCHASE_FAIL, TEMP_PURCHASE_ITEM_DELETE_REQUEST, TEMP_PURCHASE_ITEM_DELETE_SUCCESS, TEMP_PURCHASE_ITEM_DELETE_FAIL, UPDATE_TEMP_PURCHASE_PRODUCTS_REQUEST, UPDATE_TEMP_PURCHASE_PRODUCTS_SUCCESS, UPDATE_TEMP_PURCHASE_PRODUCTS_FAIL, TEMP_PURCHASE_DETAILS_REQUEST, TEMP_PURCHASE_DETAILS_SUCCESS, TEMP_PURCHASE_DETAILS_FAIL, TEMP_PURCHASE_ON_SHOP_REQUEST, TEMP_PURCHASE_ON_SHOP_SUCCESS, TEMP_PURCHASE_ON_SHOP_FAIL } from "../constants/tempPurchaseConstants";

export const getTempPurchaseReducer = (state = { tempPurchase: []}, action)=>{
    switch (action.type){
        case ALL_TEMP_PURCHASE_REQUEST:
            return{
                tempPurchaseLoading: true,
                tempPurchase: [],
            };
        case ALL_TEMP_PURCHASE_SUCCESS: 
            return {
                tempPurchaseLoading: false,
                tempPurchase: action.payload
            }
        case ALL_TEMP_PURCHASE_FAIL:
            return {
                tempPurchaseLoading: false,
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

export const getTempPurchasOnShopReducer = (state = { tempPurchaseOnShop: []}, action)=>{
    switch (action.type){
        case TEMP_PURCHASE_ON_SHOP_REQUEST:
            return{
                tempPurchaseOnShopLoading: true,
                tempPurchaseOnShop: [],
            };
        case TEMP_PURCHASE_ON_SHOP_SUCCESS: 
            return {
                tempPurchaseOnShopLoading: false,
                tempPurchaseOnShop: action.payload
            }
        case TEMP_PURCHASE_ON_SHOP_FAIL:
            return {
                tempPurchaseOnShopLoading: false,
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

export const getTempPurchaseDetialsReducer = (state = { tempPurchaseDetails: []}, action)=>{
    switch (action.type){
        case TEMP_PURCHASE_DETAILS_REQUEST:
            return{
                tempPurchaseDetailsLoading: true,
                tempPurchaseDetails: [],
            };
        case TEMP_PURCHASE_DETAILS_SUCCESS: 
            return {
                tempPurchaseDetailsLoading: false,
                tempPurchaseDetails: action.payload
            }
        case TEMP_PURCHASE_DETAILS_FAIL:
            return {
                tempPurchaseDetailsLoading: false,
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

export const postTempPurchaseReducer = (state = { postTempPurchase: []}, action)=>{
    switch (action.type){
        case POST_TEMP_PURCHASE_REQUEST:
            return{
                loading: true,
                postTempPurchase: [],
            };
        case POST_TEMP_PURCHASE_SUCCESS: 
            return {
                loading: false,
                postTempPurchase: action.payload
            }
        case POST_TEMP_PURCHASE_FAIL:
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

export const deleteTempPurchaseItemReducer = (state = { tempPurchaseItemDelete: []}, action)=>{
    switch (action.type){
        case TEMP_PURCHASE_ITEM_DELETE_REQUEST:
            return{
                loading: true,
                tempPurchaseItemDelete: [],
            };
        case TEMP_PURCHASE_ITEM_DELETE_SUCCESS: 
            return {
                loading: false,
                tempPurchaseItemDelete: action.payload
            }
        case TEMP_PURCHASE_ITEM_DELETE_FAIL:
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

export const deleteTempPurchaseReducer = (state = { tempPurchaseDelete: []}, action)=>{
    switch (action.type){
        case ALL_TEMP_PURCHASE_DELETE_REQUEST:
            return{
                loading: true,
                tempPurchaseDelete: [],
            };
        case ALL_TEMP_PURCHASE_DELETE_SUCCESS: 
            return {
                loading: false,
                tempPurchaseDelete: action.payload
            }
        case ALL_TEMP_PURCHASE_DELETE_FAIL:
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

export const updateTempPurchaseProductsReducer = (state = { updateTempPurchaseProducts: []}, action)=>{
    switch (action.type){
        case UPDATE_TEMP_PURCHASE_PRODUCTS_REQUEST:
            return{
                loading: true,
                updateTempPurchaseProducts: [],
            };
        case UPDATE_TEMP_PURCHASE_PRODUCTS_SUCCESS: 
            return {
                loading: false,
                updateTempPurchaseProducts: action.payload
            }
        case UPDATE_TEMP_PURCHASE_PRODUCTS_FAIL:
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
