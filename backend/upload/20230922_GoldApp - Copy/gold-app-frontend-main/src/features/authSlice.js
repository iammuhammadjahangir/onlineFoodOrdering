import { createSlice } from "@reduxjs/toolkit";

const initialState={
    authFormData:""
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        storeAuthFormData:(state,action)=>{
            state.authFormData=action.payload;
        }
    }
})

export default authSlice.reducer
export const {storeAuthFormData}=authSlice.actions