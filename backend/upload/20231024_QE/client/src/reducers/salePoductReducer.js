import { CLEAR_ERRORS, GET_SALE_PRODUCT_FAIL, GET_SALE_PRODUCT_REQUEST, GET_SALE_PRODUCT_SUCCESS, POST_SALE_PRODUCT_FAIL, POST_SALE_PRODUCT_REQUEST, POST_SALE_PRODUCT_SUCCESS } from "../constants/saleConstants";

export const postSaleReducer = (state = { saleProduct: []}, action)=>{
    switch (action.type){
        case POST_SALE_PRODUCT_REQUEST:
            return{
                loading: true,
                saleProduct: [],
            };
        case POST_SALE_PRODUCT_SUCCESS: 
            return {
                loading: false,
                saleProduct: action.payload,
                newSalesProduct: action?.payload?.newSalesProduct
            }
        case POST_SALE_PRODUCT_FAIL:
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


export const getSaleReducer = (state = { saleRecord: []}, action)=>{
    switch (action.type){
        case GET_SALE_PRODUCT_REQUEST:
            return{
                loading: true,
                saleRecord: [],
            };
        case GET_SALE_PRODUCT_SUCCESS: 
            return {
                loading: false,
                saleRecord: action.payload,
                // newSalesProduct: action?.payload?.newSalesProduct
            }
        case GET_SALE_PRODUCT_FAIL:
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