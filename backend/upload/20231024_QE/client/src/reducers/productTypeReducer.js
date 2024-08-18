import { ALL_PRODUCT_TYPE_DELETE_FAIL, ALL_PRODUCT_TYPE_DELETE_REQUEST, ALL_PRODUCT_TYPE_DELETE_SUCCESS, ALL_PRODUCT_TYPE_DETAILS_FAIL, ALL_PRODUCT_TYPE_DETAILS_REQUEST, ALL_PRODUCT_TYPE_DETAILS_SUCCESS, ALL_PRODUCT_TYPE_FAIL, ALL_PRODUCT_TYPE_POST_FAIL, ALL_PRODUCT_TYPE_POST_REQUEST, ALL_PRODUCT_TYPE_POST_SUCCESS, ALL_PRODUCT_TYPE_REQUEST, ALL_PRODUCT_TYPE_SUCCESS, ALL_PRODUCT_TYPE_UPDATE_FAIL, ALL_PRODUCT_TYPE_UPDATE_REQUEST, ALL_PRODUCT_TYPE_UPDATE_SUCCESS, CLEAR_ERRORS } from "../constants/productTypeConstants";


export const productTypeReducer = (state = { productType: []}, action)=>{
    switch (action.type){
        case ALL_PRODUCT_TYPE_REQUEST:
            return{
                loading: true,
                productType: [],
            };
        case ALL_PRODUCT_TYPE_SUCCESS: 
            return {
                loading: false,
                productType: action.payload
            }
        case ALL_PRODUCT_TYPE_FAIL:
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

export const postProductTypeReducer = (state = { productTypeRes: []}, action)=>{
    switch (action.type){
        case ALL_PRODUCT_TYPE_POST_REQUEST:
            return{
                loading: true,
                productTypeRes: [],
            };
        case ALL_PRODUCT_TYPE_POST_SUCCESS: 
            return {
                loading: false,
                productTypeRes: action.payload
            }
        case ALL_PRODUCT_TYPE_POST_FAIL:
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

export const updateProductTypeReducer = (state = { productTypeUpdate: []}, action)=>{
    switch (action.type){
        case ALL_PRODUCT_TYPE_UPDATE_REQUEST:
            return{
                loading: true,
                productTypeUpdate: [],
            };
        case ALL_PRODUCT_TYPE_UPDATE_SUCCESS: 
            return {
                loading: false,
                productTypeUpdate: action.payload
            }
        case ALL_PRODUCT_TYPE_UPDATE_FAIL:
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


export const productTypeDetailsReducer = (state = { productTypeDetails: []}, action)=>{
    switch (action.type){
        case ALL_PRODUCT_TYPE_DETAILS_REQUEST:
            return{
                loading: true,
                productTypeDetails: [],
            };
        case ALL_PRODUCT_TYPE_DETAILS_SUCCESS: 
            return {
                loading: false,
                productTypeDetails: action.payload
            }
        case ALL_PRODUCT_TYPE_DETAILS_FAIL:
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

export const deleteProductTypeReducer = (state = { productTypeDelete: []}, action)=>{
    switch (action.type){
        case ALL_PRODUCT_TYPE_DELETE_REQUEST:
            return{
                loading: true,
                productTypeDelete: [],
            };
        case ALL_PRODUCT_TYPE_DELETE_SUCCESS: 
            return {
                loading: false,
                productTypeDelete: action.payload
            }
        case ALL_PRODUCT_TYPE_DELETE_FAIL:
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