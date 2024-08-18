import axios from "axios"
import { ALL_PRODUCT_LOCATION_FAIL, ALL_PRODUCT_LOCATION_ON_STORAGECODE_REQUEST, 
    ALL_PRODUCT_LOCATION_ON_STORAGECODE_SUCCESS, ALL_PRODUCT_LOCATION_REQUEST, ALL_PRODUCT_LOCATION_SUCCESS, 
    ALL_PRODUCT_LOCATION_ON_STORAGECODE_FAIL, CLEAR_ERRORS, UPDATE_QUANTITY_ON_AVAILIBILITY_AND_PRODUCT_ID_FAIL,
     UPDATE_QUANTITY_ON_AVAILIBILITY_AND_PRODUCT_ID_REQUEST, UPDATE_QUANTITY_ON_AVAILIBILITY_AND_PRODUCT_ID_SUCCESS,
      UPDATE_AND_POST_PRODUCT_IN_LOCATION_REQUEST, UPDATE_AND_POST_PRODUCT_IN_LOCATION_SUCCESS, UPDATE_AND_POST_PRODUCT_IN_LOCATION_FAIL, 
      PRODUCT_LOCATION_ON_ID_REQUEST, PRODUCT_LOCATION_ON_ID_SUCCESS, PRODUCT_LOCATION_ON_ID_FAIL, 
        UPDATE_MINUS_QUANTITY_USING_TRANSFER_REQUEST,
        UPDATE_MINUS_QUANTITY_USING_TRANSFER_SUCCESS, UPDATE_MINUS_QUANTITY_USING_TRANSFER_FAIL, UPDATE_AND_POST_QUANTITY_USING_TRANSFER_REQUEST, UPDATE_AND_POST_QUANTITY_USING_TRANSFER_SUCCESS, UPDATE_AND_POST_QUANTITY_USING_TRANSFER_FAIL, PRODUCT_LOCATION_ON_SHOPTYPE_REQUEST, PRODUCT_LOCATION_ON_SHOPTYPE_SUCCESS, PRODUCT_LOCATION_ON_SHOPTYPE_FAIL, PRODUCT_LOCATION_ON_GODOWNTYPE_REQUEST, PRODUCT_LOCATION_ON_GODOWNTYPE_SUCCESS, PRODUCT_LOCATION_ON_GODOWNTYPE_FAIL } from "../constants/productLocationConstants";

export const LocationReducer = (state = { productLocation: []}, action)=>{
    switch (action.type){
        case ALL_PRODUCT_LOCATION_REQUEST:
            return{
                loading: true,
                productLocation: [],
            };
        case ALL_PRODUCT_LOCATION_SUCCESS: 
            return {
                loading: false,
                productLocation: action.payload
            }
        case ALL_PRODUCT_LOCATION_FAIL:
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

export const LocationOnShopTypeReducer = (state = { productLocationOnShopType: []}, action)=>{
    switch (action.type){
        case PRODUCT_LOCATION_ON_SHOPTYPE_REQUEST:
            return{
                locationOnShopTypeLoading: true,
                productLocationOnShopType: [],
            };
        case PRODUCT_LOCATION_ON_SHOPTYPE_SUCCESS: 
            return {
                locationOnShopTypeLoading: false,
                productLocationOnShopType: action.payload
            }
        case PRODUCT_LOCATION_ON_SHOPTYPE_FAIL:
            return {
                locationOnShopTypeLoading: false,
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

export const LocationOnGodownTypeReducer = (state = { productLocationOnGodownType: []}, action)=>{
    switch (action.type){
        case PRODUCT_LOCATION_ON_GODOWNTYPE_REQUEST:
            return{
                locationOnGodownTypeLoading: true,
                productLocationOnGodownType: [],
            };
        case PRODUCT_LOCATION_ON_GODOWNTYPE_SUCCESS: 
            return {
                locationOnGodownTypeLoading: false,
                productLocationOnGodownType: action.payload
            }
        case PRODUCT_LOCATION_ON_GODOWNTYPE_FAIL:
            return {
                locationOnGodownTypeLoading: false,
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





export const LocationOnStorageCodeReducer = (state = { productLocationOnStorageCode: []}, action)=>{
    switch (action.type){
        case ALL_PRODUCT_LOCATION_ON_STORAGECODE_REQUEST:
            return{
                loading: true,
                productLocationOnStorageCode: [],
            };
        case ALL_PRODUCT_LOCATION_ON_STORAGECODE_SUCCESS: 
            return {
                loading: false,
                productLocationOnStorageCode: action.payload
            }
        case ALL_PRODUCT_LOCATION_ON_STORAGECODE_FAIL:
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


export const productLocationOnIdReducer = (state = { productLocationOnId: []}, action)=>{
    switch (action.type){
        case PRODUCT_LOCATION_ON_ID_REQUEST:
            return{
                loading: true,
                productLocationOnId: [],
            };
        case PRODUCT_LOCATION_ON_ID_SUCCESS: 
            return {
                loading: false,
                productLocationOnId: action.payload
            }
        case PRODUCT_LOCATION_ON_ID_FAIL:
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

export const updateQuantityInLocationReducer = (state = { quantityUpdateOnProductAndAvailId: []}, action)=>{
    switch (action.type){
        case UPDATE_QUANTITY_ON_AVAILIBILITY_AND_PRODUCT_ID_REQUEST: 
            return{
                loading: true,
                quantityUpdateOnProductAndAvailId: [],
            };
        case UPDATE_QUANTITY_ON_AVAILIBILITY_AND_PRODUCT_ID_SUCCESS: 
            return {
                loading: false,
                quantityUpdateOnProductAndAvailId: action.payload
            }
        case UPDATE_QUANTITY_ON_AVAILIBILITY_AND_PRODUCT_ID_FAIL:
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

export const updateAndPostProductInLocationReducer = (state = { updateAndPostProduct: []}, action)=>{
    switch (action.type){
        case UPDATE_AND_POST_PRODUCT_IN_LOCATION_REQUEST: 
            return{
                loading: true,
                updateAndPostProduct: [],
            };
        case UPDATE_AND_POST_PRODUCT_IN_LOCATION_SUCCESS: 
            return {
                loading: false,
                updateAndPostProduct: action.payload
            }
        case UPDATE_AND_POST_PRODUCT_IN_LOCATION_FAIL:
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


export const updateQuantityUsingTransferReducer = (state = { updateQuantityUsingTransfer: []}, action)=>{
    switch (action.type){
        case UPDATE_AND_POST_QUANTITY_USING_TRANSFER_REQUEST: 
            return{
                loading: true,
                updateQuantityUsingTransfer: [],
            };
        case UPDATE_AND_POST_QUANTITY_USING_TRANSFER_SUCCESS: 
            return {
                loading: false,
                updateQuantityUsingTransfer: action.payload
            }
        case UPDATE_AND_POST_QUANTITY_USING_TRANSFER_FAIL:
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

export const updateMinusQuantityUsingTransferReducer = (state = { updateMinusQuantityUsingTransfer: []}, action)=>{
    switch (action.type){
        case UPDATE_MINUS_QUANTITY_USING_TRANSFER_REQUEST: 
            return{
                loading: true,
                updateMinusQuantityUsingTransfer: [],
            };
        case UPDATE_MINUS_QUANTITY_USING_TRANSFER_SUCCESS: 
            return {
                loading: false,
                updateMinusQuantityUsingTransfer: action.payload
            }
        case UPDATE_MINUS_QUANTITY_USING_TRANSFER_FAIL:
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