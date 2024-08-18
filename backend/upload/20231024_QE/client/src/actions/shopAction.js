import axios from "axios"
import {GET_SHOP_REQUEST, GET_SHOP_SUCCESS, GET_SHOP_FAIL, GET_SHOP_DETAILS_REQUEST, GET_SHOP_DETAILS_SUCCESS, GET_SHOP_DETAILS_FAIL} from "../constants/shopConstants"
export const postShop = async(shopCode, shopAddress, shopDescription, shopType, shopPhoneNo) =>  {
    try {
       const config = { headers: { "Content-Type": "application/json" } };
       const { data } = await axios.post(
        "/api/shop/shopPost",
           {shopCode, shopAddress, shopDescription, shopType, shopPhoneNo},
           config
       )
       return data;
    } catch (error) {
       console.log(error.response)
    }
   }

   export const getShop = ()=>async(dispatch)=>{
    try{
        dispatch({type: GET_SHOP_REQUEST})
        const {data}= await axios.get("/api/shop/shopGet")
        console.log(data)
        dispatch({
            type: GET_SHOP_SUCCESS,
            payload: data,
        })
    }
    catch(error){
        dispatch({
            type: GET_SHOP_FAIL,
            payload: error.response
        })
    }
}


export const gettShop =async ()=>{
    try{
        const {data}= await axios.get("/api/shop/shopGet")
        return data;
    }
    catch(error){
        console.log('errror')
    }
}



export const getShopDetails = (id)=>async(dispatch)=>{
    try{
        dispatch({type: GET_SHOP_DETAILS_REQUEST})
        const {data}= await axios.get(`/api/shop/shopGetbyId/${id}`)
        console.log(data)
        dispatch({
            type: GET_SHOP_DETAILS_SUCCESS,
            payload: data,
        })
    }
    catch(error){
        dispatch({
            type: GET_SHOP_DETAILS_FAIL,
            payload: error.response
        })
    }
}


export const updateShop = async( id,shopCode,
    shopAddress,
    shopDescription,
    shopType,
    shopPhoneNo) => {
    try {
        console.log(shopCode)
        console.log(shopAddress)
        console.log(shopDescription)
        console.log(shopPhoneNo)
        console.log(shopType)
       const config = { headers: { "Content-Type": "application/json" } };
       const { data } = await axios.put(
        `/api/shop/putShop/${id}`,
           { shopCode,
            shopAddress,
            shopDescription,
            shopType,
            shopPhoneNo },
           config
       )
       return data
   
    } catch (error) {
       console.log(error.response)
    }
   }

export const deleteShop = async(id) => {
    try {
       const config = { headers: { "Content-Type": "application/json" } };
       const { data } = await axios.delete(
        `/api/shop/deleteShop/${id}`
       )
       return data;
   
    } catch (error) {
        return error.response
       console.log(error.response)
    }
   }