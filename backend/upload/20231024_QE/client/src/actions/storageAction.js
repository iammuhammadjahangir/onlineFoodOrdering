import axios from "axios"

import { ALL_STORAGE_DELETE_FAIL, ALL_STORAGE_DELETE_REQUEST, ALL_STORAGE_DELETE_SUCCESS, ALL_STORAGE_DETAILS_FAIL, ALL_STORAGE_DETAILS_REQUEST, ALL_STORAGE_DETAILS_SUCCESS, ALL_STORAGE_FAIL, ALL_STORAGE_POST_FAIL, ALL_STORAGE_POST_REQUEST, ALL_STORAGE_POST_SUCCESS, ALL_STORAGE_REQUEST, ALL_STORAGE_SUCCESS, ALL_STORAGE_UPDATE_FAIL, ALL_STORAGE_UPDATE_REQUEST, ALL_STORAGE_UPDATE_SUCCESS } from "../constants/storageConstants"

export const getStorage = ()=>async(dispatch)=>{
    try{
        dispatch({type: ALL_STORAGE_REQUEST})
        const {data}= await axios.get("/api/godown/get")
        dispatch({
            type: ALL_STORAGE_SUCCESS,
            payload: data,
        })
    }
    catch(error){
        dispatch({
            type: ALL_STORAGE_FAIL,
            payload: error.response
        })
    }
}


export const gettStorage = async()=>{
    try{
        const {data}= await axios.get("/api/godown/get")
        return data;
    }
    catch(error){
        console.log(error)
    }
}


export const getStorageDetails = (id)=>async(dispatch)=>{
    try{
        dispatch({type: ALL_STORAGE_DETAILS_REQUEST})
        const {data}= await axios.get(`/api/godown/get/${id}`)
        dispatch({
            type: ALL_STORAGE_DETAILS_SUCCESS,
            payload: data,
        })
    }
    catch(error){
        dispatch({
            type: ALL_STORAGE_DETAILS_FAIL,
            payload: error.response
        })
    }
}


export const postStorage = async(storageCode, storageAddress,shopId, storageDescription, storageType, storagePhoneNo) =>  {
    try {
       const config = { headers: { "Content-Type": "application/json" } };
       console.log(shopId)
       const { data } = await axios.post(
        "/api/godown/post",
           {storageCode, storageAddress,shopId, storageDescription, storageType, storagePhoneNo},
           config
       )
       return data;
    } catch (error) {
       console.log(error.response)
    }
   }

   export const updateStorage = async( id, storageCode, storageAddress, storageDescription,storageType, storagePhoneNo) => {
    try {
       const config = { headers: { "Content-Type": "application/json" } };
       const { data } = await axios.put(
        `/api/godown/put/${id}`,
           { id, storageCode, storageAddress, storageDescription, storageType, storagePhoneNo },
           config
       )
       return data
   
    } catch (error) {
       console.log(error.response)
    }
   }

   export const deleteStorage = (id) => async (dispatch) => {
    try {
       dispatch({type: ALL_STORAGE_DELETE_REQUEST})
       const config = { headers: { "Content-Type": "application/json" } };
       const { data } = await axios.delete(
        `/api/company/delete/${id}`
       )
       dispatch({type: ALL_STORAGE_DELETE_SUCCESS, payload: data})
   
    } catch (error) {
       console.log(error.response)
       dispatch({type: ALL_STORAGE_DELETE_FAIL, payload: error.response})
    }
   }