import { ALL_PURCHASE_FAIL, ALL_PURCHASE_POST_FAIL, ALL_PURCHASE_POST_REQUEST, ALL_PURCHASE_POST_SUCCESS, ALL_PURCHASE_REQUEST, ALL_PURCHASE_SUCCESS, CLEAR_ERRORS } from "../constants/puchaseConstants";

export const postPurchaseReducer = (state = { purchaseRes: []}, action)=>{
    switch (action.type){
        case ALL_PURCHASE_POST_REQUEST:
            return{
                loading: true,
                purchaseRes: [],
            };
        case ALL_PURCHASE_POST_SUCCESS: 
            return {
                loading: false,
                purchaseRes: action.payload
            }
        case ALL_PURCHASE_POST_FAIL:
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


export const getPurchaseReducer = (state = { purchaseRecord: []}, action)=>{
    switch (action.type){
        case ALL_PURCHASE_REQUEST:
            return{
                loading: true,
                purchaseRecord: [],
            };
        case ALL_PURCHASE_SUCCESS: 
            return {
                loading: false,
                purchaseRecord: action.payload
            }
        case ALL_PURCHASE_FAIL:
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