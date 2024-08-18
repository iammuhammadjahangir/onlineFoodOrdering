import { CLEAR_ERRORS, GET_TEMP_SALE_FAIL, GET_TEMP_SALE_REQUEST, GET_TEMP_SALE_SUCCESS, POST_TEMP_SALE_FAIL, POST_TEMP_SALE_REQUEST, POST_TEMP_SALE_SUCCESS, TEMP_SALE_DELETE_FAIL, TEMP_SALE_DELETE_ITEM_FAIL, TEMP_SALE_DELETE_ITEM_REQUEST, TEMP_SALE_DELETE_ITEM_SUCCESS, TEMP_SALE_DELETE_REQUEST, TEMP_SALE_DELETE_SUCCESS, TEMP_SALE_DETAILS_FAIL, TEMP_SALE_DETAILS_REQUEST, TEMP_SALE_DETAILS_SUCCESS, TEMP_SALE_ON_SHOPNO_FAIL, TEMP_SALE_ON_SHOPNO_REQUEST, TEMP_SALE_ON_SHOPNO_SUCCESS, UPDATE_TEMP_SALE_PRODUCTS_FAIL, UPDATE_TEMP_SALE_PRODUCTS_REQUEST, UPDATE_TEMP_SALE_PRODUCTS_SUCCESS, UPDATE_TEMP_SALE_QUANTITY_IN_LIST_FAIL, UPDATE_TEMP_SALE_QUANTITY_IN_LIST_REQUEST, UPDATE_TEMP_SALE_QUANTITY_IN_LIST_SUCCESS } from "../constants/tempSaleConstants";

export const tempSaleReducer = (state = { tempSale: []}, action)=>{
    switch (action.type){
        case GET_TEMP_SALE_REQUEST:
            return{
                tempSaleLoading: true,
                tempSale: [],
            };
        case GET_TEMP_SALE_SUCCESS: 
            return {
                tempSaleLoading: false,
                tempSale: action.payload
            }
        case GET_TEMP_SALE_FAIL:
            return {
                tempSaleLoading: false,
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

export const tempSaleDetailsReducer = (state = { tempSaleDetails: []}, action)=>{
    switch (action.type){
        case TEMP_SALE_DETAILS_REQUEST:
            return{
                tempSaleDetailsLoading: true,
                tempSaleDetails: [],
            };
        case TEMP_SALE_DETAILS_SUCCESS: 
            return {
                tempSaleDetailsLoading: false,
                tempSaleDetails: action.payload
            }
        case TEMP_SALE_DETAILS_FAIL:
            return {
                tempSaleLoading: false,
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

export const getTempSaleOnShopNoReducer = (state = { tempSaleOnShopNo: []}, action)=>{
    switch (action.type){
        case TEMP_SALE_ON_SHOPNO_REQUEST:
            return{
                tempSaleOnShopNoLoading: true,
                tempSaleOnShopNo: [],
            };
        case TEMP_SALE_ON_SHOPNO_SUCCESS: 
            return {
                tempSaleOnShopNoLoading: false,
                tempSaleOnShopNo: action.payload
            }
        case TEMP_SALE_ON_SHOPNO_FAIL:
            return {
                tempSaleOnShopNoLoading: false,
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

export const updateTempSaleProductsReducer = (state = { updateTempSaleProducts: []}, action)=>{
    switch (action.type){
        case UPDATE_TEMP_SALE_PRODUCTS_REQUEST:
            return{
                loading: true,
                updateTempSaleProducts: [],
            };
        case UPDATE_TEMP_SALE_PRODUCTS_SUCCESS: 
            return {
                loading: false,
                updateTempSaleProducts: action.payload
            }
        case UPDATE_TEMP_SALE_PRODUCTS_FAIL:
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

export const updateTempSaleQuantityInListReducer = (state = { updateTempSaleQuantityInList: []}, action)=>{
    switch (action.type){
        case UPDATE_TEMP_SALE_QUANTITY_IN_LIST_REQUEST:
            return{
                loading: true,
                updateTempSaleQuantityInList: [],
            };
        case UPDATE_TEMP_SALE_QUANTITY_IN_LIST_SUCCESS: 
            return {
                loading: false,
                updateTempSaleQuantityInList: action.payload
            }
        case UPDATE_TEMP_SALE_QUANTITY_IN_LIST_FAIL:
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

export const tempSalePostReducer = (state = { tempSalePost: []}, action)=>{
    switch (action.type){
        case POST_TEMP_SALE_REQUEST:
            return{
                loading: true,
                tempSalePost: [],
            };
        case POST_TEMP_SALE_SUCCESS: 
            return {
                loading: false,
                tempSalePost: action.payload
            }
        case POST_TEMP_SALE_FAIL:
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


export const deleteTempSaleItemReducer = (state = { tempSaleItemDelete: []}, action)=>{
    switch (action.type){
        case TEMP_SALE_DELETE_REQUEST:
            return{
                loading: true,
                tempSaleItemDelete: [],
            };
        case TEMP_SALE_DELETE_SUCCESS: 
            return {
                loading: false,
                tempSaleItemDelete: action.payload
            }
        case TEMP_SALE_DELETE_FAIL:
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

export const deleteTempSaleItemListReducer = (state = { tempSaleItemListDelete: []}, action)=>{
    switch (action.type){
        case TEMP_SALE_DELETE_ITEM_REQUEST:
            return{
                loading: true,
                tempSaleItemListDelete: [],
            };
        case TEMP_SALE_DELETE_ITEM_SUCCESS: 
            return {
                loading: false,
                tempSaleItemListDelete: action.payload
            }
        case TEMP_SALE_DELETE_ITEM_FAIL:
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