import { ALL_TEMP_TRANSFER_DELETE_FAIL, ALL_TEMP_TRANSFER_DELETE_REQUEST, ALL_TEMP_TRANSFER_DELETE_SUCCESS, ALL_TEMP_TRANSFER_FAIL, ALL_TEMP_TRANSFER_REQUEST, ALL_TEMP_TRANSFER_SUCCESS, CLEAR_ERRORS, DELETE_TEMP_TRANSFER_PRODUCT_REQUEST, DELETE_TEMP_TRANSFER_PRODUCT_SUCCESS, POST_TEMP_TRANSFER_FAIL, POST_TEMP_TRANSFER_REQUEST, POST_TEMP_TRANSFER_SUCCESS, TEMP_TRANSFER_DETIALS_FAIL, TEMP_TRANSFER_DETIALS_REQUEST, TEMP_TRANSFER_DETIALS_SUCCESS, UPDATE_TEMP_TRANSFER_PRODUCT_FAIL, UPDATE_TEMP_TRANSFER_PRODUCT_ITEM_FAIL, UPDATE_TEMP_TRANSFER_PRODUCT_ITEM_REQUEST, UPDATE_TEMP_TRANSFER_PRODUCT_ITEM_SUCCESS, UPDATE_TEMP_TRANSFER_PRODUCT_REQUEST, UPDATE_TEMP_TRANSFER_PRODUCT_SUCCESS } from "../constants/tempTransferConstants";

export const tempTransferReducer = (state = { tempTransfer: []}, action)=>{
    switch (action.type){
        case ALL_TEMP_TRANSFER_REQUEST:
            return{
                loadingTempTransfer: true,
                tempTransfer: [],
            };
        case ALL_TEMP_TRANSFER_SUCCESS: 
            return {
                loadingTempTransfer: false,
                tempTransfer: action.payload
            }
        case ALL_TEMP_TRANSFER_FAIL:
            return {
                loadingTempTransfer: false,
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

export const tempTransferDetailsReducer = (state = { tempTransferDetails: []}, action)=>{
    switch (action.type){
        case TEMP_TRANSFER_DETIALS_REQUEST:
            return{
                tempTransferDetailsLoading: true,
                tempTransferDetails: [],
            };
        case TEMP_TRANSFER_DETIALS_SUCCESS: 
            return {
                tempTransferDetailsLoading: false,
                tempTransferDetails: action.payload
            }
        case TEMP_TRANSFER_DETIALS_FAIL:
            return {
                tempTransferDetailsLoading: false,
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


export const deleteTempTransferAllReducer = (state = { tempTransferAllDelete: []}, action)=>{
    switch (action.type){
        case ALL_TEMP_TRANSFER_DELETE_REQUEST:
            return{
                loading: true,
                tempTransferAllDelete: [],
            };
        case ALL_TEMP_TRANSFER_DELETE_SUCCESS: 
            return {
                loading: false,
                tempTransferAllDelete: action.payload
            }
        case ALL_TEMP_TRANSFER_DELETE_FAIL:
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


export const deleteTempTransferProductsReducer = (state = { tempTransferProductDelete: []}, action)=>{
    switch (action.type){
        case DELETE_TEMP_TRANSFER_PRODUCT_REQUEST:
            return{
                loading: true,
                tempTransferProductDelete: [],
            };
        case DELETE_TEMP_TRANSFER_PRODUCT_SUCCESS: 
            return {
                loading: false,
                tempTransferProductDelete: action.payload
            }
        case DELETE_TEMP_TRANSFER_PRODUCT_REQUEST:
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

export const postTempTransferReducer = (state = { postTempTransferProduct: []}, action)=>{
    switch (action.type){
        case POST_TEMP_TRANSFER_REQUEST:
            return{
                loading: true,
                postTempTransferProduct: [],
            };
        case POST_TEMP_TRANSFER_SUCCESS: 
            return {
                loading: false,
                postTempTransferProduct: action.payload
            }
        case POST_TEMP_TRANSFER_FAIL:
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


export const updateTempTransferItemReducer = (state = { updateTempTransferProductItem: []}, action)=>{
    switch (action.type){
        case UPDATE_TEMP_TRANSFER_PRODUCT_ITEM_REQUEST:
            return{
                loading: true,
                updateTempTransferProductItem: [],
            };
        case UPDATE_TEMP_TRANSFER_PRODUCT_ITEM_SUCCESS: 
            return {
                loading: false,
                updateTempTransferProductItem: action.payload
            }
        case UPDATE_TEMP_TRANSFER_PRODUCT_ITEM_FAIL:
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

export const updateTempTransferReducer = (state = { updateTempTransferProduct: []}, action)=>{
    switch (action.type){
        case UPDATE_TEMP_TRANSFER_PRODUCT_REQUEST:
            return{
                loading: true,
                updateTempTransferProduct: [],
            };
        case UPDATE_TEMP_TRANSFER_PRODUCT_SUCCESS: 
            return {
                loading: false,
                updateTempTransferProduct: action.payload
            }
        case UPDATE_TEMP_TRANSFER_PRODUCT_FAIL:
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