import { ALL_COLOR_REQUEST, ALL_COLOR_FAIL, ALL_COLOR_SUCCESS, CLEAR_ERRORS, ALL_COLOR_POST_REQUEST, ALL_COLOR_POST_SUCCESS, ALL_COLOR_POST_FAIL, ALL_COLOR_UPDATE_REQUEST, ALL_COLOR_UPDATE_SUCCESS, ALL_COLOR_UPDATE_FAIL, ALL_COLOR_DETAILS_REQUEST, ALL_COLOR_DETAILS_SUCCESS, ALL_COLOR_DETAILS_FAIL, ALL_COLOR_DELETE_REQUEST, ALL_COLOR_DELETE_SUCCESS, ALL_COLOR_DELETE_FAIL } from "../constants/colorConstants";

export const colorReducer = (state = { color: []}, action)=>{
    switch (action.type){
        case ALL_COLOR_REQUEST:
            return{
                loading: true,
                color: [],
            };
        case ALL_COLOR_SUCCESS: 
            return {
                loading: false,
                color: action.payload
            }
        case ALL_COLOR_FAIL:
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

export const postColorReducer = (state = { colorRes: []}, action)=>{
    switch (action.type){
        case ALL_COLOR_POST_REQUEST:
            return{
                loading: true,
                colorRes: [],
            };
        case ALL_COLOR_POST_SUCCESS: 
            return {
                loading: false,
                colorRes: action.payload
            }
        case ALL_COLOR_POST_FAIL:
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

export const updateColorReducer = (state = { colorUpdate: []}, action)=>{
    switch (action.type){
        case ALL_COLOR_UPDATE_REQUEST:
            return{
                loading: true,
                colorUpdate: [],
            };
        case ALL_COLOR_UPDATE_SUCCESS: 
            return {
                loading: false,
                colorUpdate: action.payload
            }
        case ALL_COLOR_UPDATE_FAIL:
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

export const colorDetailsReducer = (state = { colorDetails: []}, action)=>{
    switch (action.type){
        case ALL_COLOR_DETAILS_REQUEST:
            return{
                loading: true,
                colorDetails: [],
            };
        case ALL_COLOR_DETAILS_SUCCESS: 
            return {
                loading: false,
                colorDetails: action.payload
            }
        case ALL_COLOR_DETAILS_FAIL:
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

export const deleteColorReducer = (state = { colorDelete: []}, action)=>{
    switch (action.type){
        case ALL_COLOR_DELETE_REQUEST:
            return{
                loading: true,
                colorDelete: [],
            };
        case ALL_COLOR_DELETE_SUCCESS: 
            return {
                loading: false,
                colorDelete: action.payload
            }
        case ALL_COLOR_DELETE_FAIL:
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