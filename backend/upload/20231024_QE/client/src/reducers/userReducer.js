
// import {  LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_FAIL,REGISTER_REQUEST, REGISTER_SUCCESS, CLEAR_ERRORS } from "../constants/userConstants"
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_FAIL,REGISTER_REQUEST, REGISTER_SUCCESS, 
    CLEAR_ERRORS, LOGOUT_SUCCESS, LOGOUT_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS,
     LOAD_USER_FAIL, TOKEN_REFRESH_SUCCESS, TOKEN_REFRESH_FAIL, TOKEN_REFRESH_REQUEST, FORGOTPASSWORD_REQUEST, FORGOTPASSWORD_SUCCESS, FORGOTPASSWORD_FAIL  } from "../constants/userConstants"

export const userReducer =(state = { user: {}}, action)=>{
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            case LOAD_USER_REQUEST:
            case TOKEN_REFRESH_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS: 
        case REGISTER_SUCCESS: 
        case LOAD_USER_SUCCESS:
        return {
            ...state, 
            loading: false,
            isAuthenticated: true,
            user: action.payload,
        }

        case LOGOUT_SUCCESS:
        return {
            loading: false,
            isAuthenticated: false,
            user: null
        }

        case TOKEN_REFRESH_SUCCESS: 
        return {
            ...state,
            loading: false,
            isAuthenticated: true,
        }
        case TOKEN_REFRESH_FAIL: 
        return {
            loading: false,
            isAuthenticated: false,
            error: action.payload,
        }
        case LOAD_USER_FAIL: 
        return {
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload,
        }
        case LOGIN_FAIL: 
        return {
            ...state,
            loading: false,
            error: action.payload
        }
        case REGISTER_FAIL: 
        return {
            ...state, 
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload,
        }

        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
           return state;
    }
}


export const forgotPasswordReducer =(state = { forgotPassword: {}}, action)=>{
    switch (action.type) {
        case FORGOTPASSWORD_REQUEST:
            return {
                loading: true,
                forgotPassword: []
            }
        case FORGOTPASSWORD_SUCCESS: 
        return {
            ...state, 
            loading: false,
            forgotPassword: action.payload,
        }
        case FORGOTPASSWORD_FAIL: 
        return {
            loading: false,
            error: action.payload,
        }
        
       
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
           return state;
    }
}