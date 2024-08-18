import {GET_SHOP_DETAILS_FAIL, GET_SHOP_DETAILS_REQUEST, GET_SHOP_DETAILS_SUCCESS, GET_SHOP_FAIL, GET_SHOP_REQUEST, GET_SHOP_SUCCESS} from "../constants/shopConstants"
export const shopReducer = (state = { shop: []}, action)=>{
    switch (action.type){
        case GET_SHOP_REQUEST:
            return{
                loading: true,
                shop: [],
            };
        case GET_SHOP_SUCCESS: 
            return {
                loading: false,
                shop: action.payload
            }
        case GET_SHOP_FAIL:
            return {
                loading: false,
                shop: action.payload,
            }
            default:
            return state;
            
    }
}

export const shopDeatailReducer = (state = { shopDetails: []}, action)=>{
    switch (action.type){
        case GET_SHOP_DETAILS_REQUEST:
            return{
                loading: true,
                shopDetails: [],
            };
        case GET_SHOP_DETAILS_SUCCESS: 
            return {
                loading: false,
                shopDetails: action.payload
            }
        case GET_SHOP_DETAILS_FAIL:
            return {
                loading: false,
                shopDetails: action.payload,
            }
            default:
            return state;
            
    }
}