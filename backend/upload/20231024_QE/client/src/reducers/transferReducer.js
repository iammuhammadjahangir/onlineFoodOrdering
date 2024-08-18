import { GET_TRANSFER_PRODUCT_FAIL, GET_TRANSFER_PRODUCT_REQUEST, GET_TRANSFER_PRODUCT_SUCCESS } from "../constants/transferConstants";

export const getTransferReducer = (state = { transferRecord: []}, action)=>{
    switch (action.type){
        case GET_TRANSFER_PRODUCT_REQUEST:
            return{
                loading: true,
                transferRecord: [],
            };
        case GET_TRANSFER_PRODUCT_SUCCESS: 
            return {
                loading: false,
                transferRecord: action.payload,
                // newSalesProduct: action?.payload?.newSalesProduct
            }
        case GET_TRANSFER_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
      
            default:
            return state;
            
    }
}