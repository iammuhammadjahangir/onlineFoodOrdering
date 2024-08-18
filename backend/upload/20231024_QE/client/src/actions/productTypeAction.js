import axios from "axios"

import { ALL_PRODUCT_TYPE_DELETE_FAIL, ALL_PRODUCT_TYPE_DELETE_REQUEST, 
    ALL_PRODUCT_TYPE_DELETE_SUCCESS, ALL_PRODUCT_TYPE_DETAILS_FAIL, 
    ALL_PRODUCT_TYPE_DETAILS_REQUEST, ALL_PRODUCT_TYPE_DETAILS_SUCCESS, 
    ALL_PRODUCT_TYPE_FAIL, ALL_PRODUCT_TYPE_POST_FAIL, ALL_PRODUCT_TYPE_POST_REQUEST, 
    ALL_PRODUCT_TYPE_POST_SUCCESS, ALL_PRODUCT_TYPE_REQUEST, ALL_PRODUCT_TYPE_SUCCESS, 
    ALL_PRODUCT_TYPE_UPDATE_FAIL, ALL_PRODUCT_TYPE_UPDATE_REQUEST,
     ALL_PRODUCT_TYPE_UPDATE_SUCCESS } from "../constants/productTypeConstants"


export const getProductType = ()=>async(dispatch)=>{
    try{
        dispatch({type: ALL_PRODUCT_TYPE_REQUEST})
        const data= await axios.get("/api/producttype/get")
        console.log(data)
        dispatch({
            type: ALL_PRODUCT_TYPE_SUCCESS,
            payload: data?.data,
        })
    }
    catch(error){
        dispatch({
            type: ALL_PRODUCT_TYPE_FAIL,
            payload: error.response
        })
    }
}

export const getProductTypee = async()=>{
    try{
        const data= await axios.get("/api/producttype/get")
        console.log(data)
        return data?.data;
    }
    catch(error){
        console.log(error.response)
    }
}

export const getProductTypeDetails = (id)=>async(dispatch)=>{
    try{
        dispatch({type: ALL_PRODUCT_TYPE_DETAILS_REQUEST})
        const {data}= await axios.get(`/api/producttype/get/${id}`)
        dispatch({
            type: ALL_PRODUCT_TYPE_DETAILS_SUCCESS,
            payload: data,
        })
    }
    catch(error){
        dispatch({
            type: ALL_PRODUCT_TYPE_DETAILS_FAIL,
            payload: error.response
        })
    }
}

export const postProductType = async(productName, productDescription) =>  {
    try {
       const config = { headers: { "Content-Type": "application/json" } };
       const { data } = await axios.post(
        "/api/producttype/post",
           {productName, productDescription},
           config
       )
        return data;
   
    } catch (error) {
       console.log(error.response)
    }
   }

   export const updateProducType = async( id, productName, productDescription) => {
    try {
       const config = { headers: { "Content-Type": "application/json" } };
       const { data } = await axios.put(
        `/api/producttype/put/${id}`,
           { id, productName, productDescription },
           config
       )
        return data;
    } catch (error) {
       return error.response
    }
   }

   export const deleteProductType = async(id) => {
    try {
       const config = { headers: { "Content-Type": "application/json" } };
       const { data } = await axios.delete(
        `/api/producttype/delete/${id}`
       )
        return data;
    } catch (error) {
      return error.response
    }
   }