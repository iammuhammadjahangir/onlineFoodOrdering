import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS,
     PRODUCTS_ON_BARCODE_REQUEST, PRODUCTS_ON_BARCODE_SUCCESS, PRODUCTS_ON_BARCODE_FAIL, PRODUCTS_ON_COMPANY_NAME_FAIL,
      PRODUCTS_ON_COMPANY_NAME_REQUEST, PRODUCTS_ON_COMPANY_NAME_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST,
       PRODUCT_DETAILS_SUCCESS, UPDATE_PURCHASE_PRODUCT_PRICE_FAIL, UPDATE_PURCHASE_PRODUCT_PRICE_REQUEST,
        UPDATE_PURCHASE_PRODUCT_PRICE_SUCCESS } from "../constants/productConstants";

export const productReducer = (state = { products: []}, action)=>{
    switch (action.type){
        case ALL_PRODUCT_REQUEST:
            return{
                productLoading: true,
                products: [],
            };
        case ALL_PRODUCT_SUCCESS: 
            return {
                productLoading: false,
                products: action.payload
            }
        case ALL_PRODUCT_FAIL:
            return {
                productLoading: false,
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


export const getProductOnBarcodeReducer = (state = { productOnBarcode: []}, action)=>{
    switch (action.type){
        case PRODUCTS_ON_BARCODE_REQUEST:
            return{
                loading: true,
                productOnBarcode: [],
            };
        case PRODUCTS_ON_BARCODE_SUCCESS: 
            return {
                loading: false,
                productOnBarcode: action.payload
            }
        case PRODUCTS_ON_BARCODE_FAIL:
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



export const productDetailsReducer = (state = { productDetails: []}, action)=>{
    switch (action.type){
        case PRODUCT_DETAILS_REQUEST:
            return{
                loadingg: true,
                productDetails: [],
            };
        case PRODUCT_DETAILS_SUCCESS: 
            return {
                loadingg: false,
                productDetails: action.payload
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loadingg: false,
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

export const getProductsOnCompanyNameReducer = (state = { productsOnCompanyName: []}, action)=>{
    switch (action.type){
        case PRODUCTS_ON_COMPANY_NAME_REQUEST:
            return{
                loadingg: true,
                productsOnCompanyName: [],
            };
        case PRODUCTS_ON_COMPANY_NAME_SUCCESS: 
            return {
                loadingg: false,
                productsOnCompanyName: action.payload
            }
        case PRODUCTS_ON_COMPANY_NAME_FAIL:
            return {
                loadingg: false,
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


export const updatePurchaseProductPriceReducer = (state = { purcahseProductPriceUpdateInProduct: []}, action)=>{
    switch (action.type){
        case UPDATE_PURCHASE_PRODUCT_PRICE_REQUEST:
            return{
                loading: true,
                purcahseProductPriceUpdateInProduct: [],
            };
        case UPDATE_PURCHASE_PRODUCT_PRICE_SUCCESS: 
            return {
                loading: false,
                purcahseProductPriceUpdateInProduct: action.payload
            }
        case UPDATE_PURCHASE_PRODUCT_PRICE_FAIL:
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