import { ALL_STORAGE_DELETE_FAIL, ALL_STORAGE_DELETE_REQUEST, ALL_STORAGE_DELETE_SUCCESS, ALL_STORAGE_DETAILS_FAIL, 
    ALL_STORAGE_DETAILS_REQUEST, ALL_STORAGE_DETAILS_SUCCESS, ALL_STORAGE_FAIL, ALL_STORAGE_POST_FAIL, ALL_STORAGE_POST_REQUEST, ALL_STORAGE_POST_SUCCESS, 
    ALL_STORAGE_REQUEST, ALL_STORAGE_SUCCESS, ALL_STORAGE_UPDATE_FAIL, ALL_STORAGE_UPDATE_REQUEST, ALL_STORAGE_UPDATE_SUCCESS, CLEAR_ERRORS } from "../constants/storageConstants";


export const storageReducer = (state = { storage: []}, action)=>{
    switch (action.type){
        case ALL_STORAGE_REQUEST:
            return{
                loading: true,
                storage: [],
            };
        case ALL_STORAGE_SUCCESS: 
            return {
                loading: false,
                storage: action.payload
            }
        case ALL_STORAGE_FAIL:
            return {
                loading: false,
                storage: action.payload,
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

export const postStorageReducer = (state = { storageRes: []}, action)=>{
    switch (action.type){
        case ALL_STORAGE_POST_REQUEST:
            return{
                loading: true,
                storageRes: [],
            };
        case ALL_STORAGE_POST_SUCCESS: 
            return {
                loading: false,
                storageRes: action.payload
            }
        case ALL_STORAGE_POST_FAIL:
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

export const updateStorageReducer = (state = { storageUpdate: []}, action)=>{
    switch (action.type){
        case ALL_STORAGE_UPDATE_REQUEST:
            return{
                loading: true,
                storageUpdate: [],
            };
        case ALL_STORAGE_UPDATE_SUCCESS: 
            return {
                loading: false,
                storageUpdate: action.payload
            }
        case ALL_STORAGE_UPDATE_FAIL:
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


export const storageDetailsReducer = (state = { storageDetails: []}, action)=>{
    switch (action.type){
        case ALL_STORAGE_DETAILS_REQUEST:
            return{
                loading: true,
                storageDetails: [],
            };
        case ALL_STORAGE_DETAILS_SUCCESS: 
            return {
                loading: false,
                storageDetails: action.payload
            }
        case ALL_STORAGE_DETAILS_FAIL:
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

export const deleteStorageReducer = (state = { storageDelete: []}, action)=>{
    switch (action.type){
        case ALL_STORAGE_DELETE_REQUEST:
            return{
                loading: true,
                storageDelete: [],
            };
        case ALL_STORAGE_DELETE_SUCCESS: 
            return {
                loading: false,
                storageDelete: action.payload
            }
        case ALL_STORAGE_DELETE_FAIL:
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