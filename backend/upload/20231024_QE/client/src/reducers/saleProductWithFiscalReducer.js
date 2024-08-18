import { CLEAR_ERRORS, POST_SALE_PRODUCT_FAIL, POST_SALE_PRODUCT_REQUEST, POST_SALE_PRODUCT_SUCCESS, POST_SALE_PRODUCT_TO_FISCAL_FAIL, POST_SALE_PRODUCT_TO_FISCAL_REQUEST, POST_SALE_PRODUCT_TO_FISCAL_SUCCESS } from "../constants/saleConstants";

export const postSaleToFiscalReducer = (state = { saleProductWithFiscal: []}, action)=>{
    switch (action.type){
        case POST_SALE_PRODUCT_TO_FISCAL_REQUEST:
            return{
                loading: true,
                saleProductWithFiscal: [],
            };
        case POST_SALE_PRODUCT_TO_FISCAL_SUCCESS: 
            return {
                loading: false,
                saleProductWithFiscal: action.payload,
                InvoiceNumberr: action.payload.InvoiceNumber,
                response: action.payload.response
            }
        case POST_SALE_PRODUCT_TO_FISCAL_FAIL:
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
