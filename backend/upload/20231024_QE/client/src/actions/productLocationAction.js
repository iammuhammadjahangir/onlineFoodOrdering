import axios from "axios"
import { ALL_PRODUCT_LOCATION_FAIL, ALL_PRODUCT_LOCATION_ON_STORAGECODE_REQUEST, 
    ALL_PRODUCT_LOCATION_ON_STORAGECODE_SUCCESS, ALL_PRODUCT_LOCATION_REQUEST, 
    ALL_PRODUCT_LOCATION_SUCCESS, ALL_PRODUCT_LOCATION_ON_STORAGECODE_FAIL,
     UPDATE_AND_POST_PRODUCT_IN_LOCATION_REQUEST, UPDATE_AND_POST_PRODUCT_IN_LOCATION_SUCCESS,
      UPDATE_AND_POST_PRODUCT_IN_LOCATION_FAIL, PRODUCT_LOCATION_ON_ID_REQUEST, PRODUCT_LOCATION_ON_ID_SUCCESS, PRODUCT_LOCATION_ON_ID_FAIL, 
      UPDATE_QUANTITY_USING_TRANSFER_REQUEST, UPDATE_QUANTITY_USING_TRANSFER_SUCCESS, UPDATE_QUANTITY_USING_TRANSFER_FAIL, UPDATE_MINUS_QUANTITY_USING_TRANSFER_REQUEST, UPDATE_MINUS_QUANTITY_USING_TRANSFER_SUCCESS, UPDATE_MINUS_QUANTITY_USING_TRANSFER_FAIL, UPDATE_AND_POST_QUANTITY_USING_TRANSFER_REQUEST, UPDATE_AND_POST_QUANTITY_USING_TRANSFER_SUCCESS, UPDATE_AND_POST_QUANTITY_USING_TRANSFER_FAIL, PRODUCT_LOCATION_ON_SHOPTYPE_REQUEST, PRODUCT_LOCATION_ON_SHOPTYPE_SUCCESS, PRODUCT_LOCATION_ON_SHOPTYPE_FAIL, PRODUCT_LOCATION_ON_GODOWNTYPE_REQUEST, PRODUCT_LOCATION_ON_GODOWNTYPE_SUCCESS, PRODUCT_LOCATION_ON_GODOWNTYPE_FAIL } from "../constants/productLocationConstants"



export const getProductLocation = ()=>async(dispatch)=>{
    try{
        dispatch({type: ALL_PRODUCT_LOCATION_REQUEST})
        const {data}= await axios.get("/api/productlocation/get")
        dispatch({
            type: ALL_PRODUCT_LOCATION_SUCCESS,
            payload: data,
        })
    }
    catch(error){
        dispatch({
            type: ALL_PRODUCT_LOCATION_FAIL,
            payload: error.response
        })
    }
}

export const getProductLoc = async()=>{
    try{
        const {data}= await axios.get("/api/productlocation/get")
        console.log(data)
        return data;
    }
    catch(error){
       console.log(error)
    }
}

export const getProductLocationOnShopType = ()=>async(dispatch)=>{
    try{
        dispatch({type: PRODUCT_LOCATION_ON_SHOPTYPE_REQUEST})
        const {data}= await axios.get("/api/productLocation/getProductLocationOnShopType")
        console.log(data)
        dispatch({
            type: PRODUCT_LOCATION_ON_SHOPTYPE_SUCCESS,
            payload: data,
        })
    }
    catch(error){
        dispatch({
            type: PRODUCT_LOCATION_ON_SHOPTYPE_FAIL,
            payload: error.response
        })
    }
}

export const getProductLocationOnGodownType = ()=>async(dispatch)=>{
    try{
        dispatch({type: PRODUCT_LOCATION_ON_GODOWNTYPE_REQUEST})
        const {data}= await axios.get("/api/productLocation/getProductLocationOnGodownType")
        console.log(data)
        dispatch({
            type: PRODUCT_LOCATION_ON_GODOWNTYPE_SUCCESS,
            payload: data,
        })
    }
    catch(error){
        dispatch({
            type: PRODUCT_LOCATION_ON_GODOWNTYPE_FAIL,
            payload: error.response
        })
    }
}



export const getProductLocationOnShopId = async(id)=>{
    try{
        console.log(id)
        const {data}= await axios.get(`/api/productLocation/getForShop/${id}`)
        return data;
    }
    catch(error){
       console.log(error)
    }
}

export const getProductLocationOnGodownId = async(id)=>{
    try{
        console.log(id)
        const {data}= await axios.get(`/api/productLocation/getForGodown/${id}`)
        return data;
    }
    catch(error){
       console.log(error)
    }
}

export const getProductLocationOnStorageCode = async(storageCode)=>{
    try{
        const {data}= await axios.get(`/api/productLocation/getProductForStorageCode/${storageCode}`)
        return data;
    }
    catch(error){
        console.log(error)
    }
}

export const getProductLocationOnId = async(id)=>{
    try{
        // dispatch({type: PRODUCT_LOCATION_ON_ID_REQUEST})
        console.log(id)
        const {data}= await axios.get(`/api/productlocation/getId/${id}`)
        return data;
    }
    catch(error){
       console.log(error)
    }
}

export const deleteLocation =async (id)=>{
    try {
        const { data } = await axios.delete(
            `/api/productLocation/delete/${id}`
        )
        return data;
     } catch (error) {
        console.log(error.response)

     }
}


   export const updateAndPostProductInLocation = async(
    quantityidset,
    colorId,
    shopAvalibility,
    godownAvalibility,
    PurchaseQuantity) =>  {
    try {
     
        console.log(quantityidset)
        console.log(colorId)
        console.log(shopAvalibility)
        console.log(godownAvalibility)
        console.log(PurchaseQuantity)
       const config = { headers: { "Content-Type": "application/json" } };
       const { data } = await axios.post(
        "/api/productLocation/updateAndPostProduct",
           { quantityidset,
            colorId,
            shopAvalibility,
            godownAvalibility,
            PurchaseQuantity },
           config
       )
    console.log(data)
   
    } catch (error) {
       console.log(error.response)
    }
   }


   
   export const updateProductLocationOnSale = async(
    quantityidset,
    colorId,
    shopAvalibility,
    PurchaseQuantity) =>  {
    try {
     
        console.log(quantityidset)
        console.log(colorId)
        console.log(shopAvalibility)
        console.log(PurchaseQuantity)
       const config = { headers: { "Content-Type": "application/json" } };
       const { data } = await axios.put(
        "/api/productLocation/updateProductLocOnSale",
           { quantityidset,
            colorId,
            shopAvalibility,
            PurchaseQuantity },
           config
       )
    console.log(data)
   
    } catch (error) {
       console.log(error.response)
    }
   }



   export const updateProductLocationOnGodownId = async(
    quantityidset,
    colorId,
    godownAvalibility,
    PurchaseQuantity) =>  {
    try {
     
        console.log(quantityidset)
        console.log(colorId)
        console.log(godownAvalibility)
        console.log(PurchaseQuantity)
       const config = { headers: { "Content-Type": "application/json" } };
       const { data } = await axios.put(
        "/api/productLocation/updateProductLocOnGodownIdUsingTransfer",
           { quantityidset,
            colorId,
            godownAvalibility,
            PurchaseQuantity },
           config
       )
   
   
    } catch (error) {
       console.log(error.response)
    }
   }


   export const updateAndPostQuantityUsingTransfer = async( quantityidset,
    locationsetid,
    PurchaseQuantity) =>  {
    try {
    //    dispatch({type: UPDATE_AND_POST_QUANTITY_USING_TRANSFER_REQUEST})
       console.log()
       const config = { headers: { "Content-Type": "application/json" } };
       const { data } = await axios.post(
        "/api/productLocation/updateAndPostProduct",
           {   locationsetid,
            quantityidset,
            PurchaseQuantity,},
           config
       )
       return data;
    //    dispatch({type: UPDATE_AND_POST_QUANTITY_USING_TRANSFER_SUCCESS, payload: data})
   
    } catch (error) {
       console.log(error.response)
    }
   }

   export const updateLocation = async( id, productQuantity) => {
    try {
    //    dispatch({type: UPDATE_MINUS_QUANTITY_USING_TRANSFER_REQUEST})
       const config = { headers: { "Content-Type": "application/json" } };
       const { data } = await axios.put(
        `/api/productlocation/putId/${id}`,
           { productQuantity},
           config
       )
       return data;
    //    dispatch({type: UPDATE_MINUS_QUANTITY_USING_TRANSFER_SUCCESS, payload: data})
   
    } catch (error) {
       console.log(error.response)
    }
   }

   export const updateMinusQuantityUsingTransfer = async( productQuantity, quantityidset, locationsetid) => {
    try {
    //    dispatch({type: UPDATE_MINUS_QUANTITY_USING_TRANSFER_REQUEST})
       console.log(productQuantity)
       console.log(quantityidset)
       console.log(locationsetid)
       const config = { headers: { "Content-Type": "application/json" } };
       const { data } = await axios.put(
        `/api/productLocation/updateQuantity/${quantityidset}/${locationsetid}`,
           { productQuantity},
           config
       )
    //    dispatch({type: UPDATE_MINUS_QUANTITY_USING_TRANSFER_SUCCESS, payload: data})
   
    } catch (error) {
       console.log(error.response)
    }
   }