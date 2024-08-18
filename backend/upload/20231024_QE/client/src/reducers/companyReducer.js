import { ALL_COMPANY_REQUEST, ALL_COMPANY_FAIL, ALL_COMPANY_SUCCESS, CLEAR_ERRORS, ALL_COMPANY_POST_REQUEST, ALL_COMPANY_POST_SUCCESS, ALL_COMPANY_POST_FAIL, ALL_COMPANY_UPDATE_REQUEST, ALL_COMPANY_UPDATE_SUCCESS, ALL_COMPANY_UPDATE_FAIL, ALL_COMPANY_DETAILS_REQUEST, ALL_COMPANY_DETAILS_SUCCESS, ALL_COMPANY_DETAILS_FAIL, ALL_COMPANY_DELETE_REQUEST, ALL_COMOPANY_DELETE_SUCCESS, ALL_COMPANY_DELETE_FAIL } from "../constants/companyContants";

export const companyReducer = (state = { company: []}, action)=>{
    switch (action.type){
        case ALL_COMPANY_REQUEST:
            return{
                loading: true,
                company: [],
            };
        case ALL_COMPANY_SUCCESS: 
            return {
                loading: false,
                company: action.payload
            }
        case ALL_COMPANY_FAIL:
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

export const postCompanyReducer = (state = { companyRes: []}, action)=>{
    switch (action.type){
        case ALL_COMPANY_POST_REQUEST:
            return{
                loading: true,
                companyRes: [],
            };
        case ALL_COMPANY_POST_SUCCESS: 
            return {
                loading: false,
                companyRes: action.payload
            }
        case ALL_COMPANY_POST_FAIL:
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


export const updateCompanyReducer = (state = { companyUpdate: []}, action)=>{
    switch (action.type){
        case ALL_COMPANY_UPDATE_REQUEST:
            return{
                loading: true,
                companyUpdate: [],
            };
        case ALL_COMPANY_UPDATE_SUCCESS: 
            return {
                loading: false,
                companyUpdate: action.payload
            }
        case ALL_COMPANY_UPDATE_FAIL:
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


export const companyDetailsReducer = (state = { companyDetails: []}, action)=>{
    switch (action.type){
        case ALL_COMPANY_DETAILS_REQUEST:
            return{
                loading: true,
                companyDetails: [],
            };
        case ALL_COMPANY_DETAILS_SUCCESS: 
            return {
                loading: false,
                companyDetails: action.payload
            }
        case ALL_COMPANY_DETAILS_FAIL:
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

export const deleteCompanyReducer = (state = { companyDelete: []}, action)=>{
    switch (action.type){
        case ALL_COMPANY_DELETE_REQUEST:
            return{
                loading: true,
                companyDelete: [],
            };
        case ALL_COMOPANY_DELETE_SUCCESS: 
            return {
                loading: false,
                companyDelete: action.payload
            }
        case ALL_COMPANY_DELETE_FAIL:
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