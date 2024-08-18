import axios from "axios"
import { POST_SALE_PRODUCT_FAIL, POST_SALE_PRODUCT_REQUEST, POST_SALE_PRODUCT_SUCCESS, POST_SALE_PRODUCT_TO_FISCAL_FAIL, POST_SALE_PRODUCT_TO_FISCAL_REQUEST, POST_SALE_PRODUCT_TO_FISCAL_SUCCESS } from "../constants/saleConstants";

// export const postSaleProductWithFiscal = (  
//    InvoiceNumber,
//    POSID,
//    USIN,
//    DateTime,
//    TotalBillAmount,
//    TotalQuantity,
//    Discount,
//    TotalSaleValue,
//    TotalTaxCharged,
//    PaymentMode,
//    RefUSIN,
//    InvoiceType,
//    Items,) => async (dispatch) => {
//     try {
//        dispatch({type: POST_SALE_PRODUCT_TO_FISCAL_REQUEST})
//        const config = { headers: { "Content-Type": "application/json" } };
//        const { data } = await axios.post(
//         "http://localhost:8524/api/IMSFiscal/GetInvoiceNumberByModel",
//            {   
//             InvoiceNumber,
//             POSID,
//             USIN,
//             DateTime,
//             TotalBillAmount,
//             TotalQuantity,
//             Discount,
//             TotalSaleValue,
//             TotalTaxCharged,
//             PaymentMode,
//             RefUSIN,
//             InvoiceType,
//             Items, 
//          },
//            config
//        )
//        console.log(data)
//        dispatch({type: POST_SALE_PRODUCT_TO_FISCAL_SUCCESS, payload: data})
   
//     } catch (error) {
//        console.log(error.response.data.message)
//        dispatch({type: POST_SALE_PRODUCT_TO_FISCAL_FAIL, payload: error.response.data.message})
//     }
//    }


export const postSaleProductWithFiscal = async(  
   InvoiceNumber,
   POSID,
   USIN,
   DateTime,
   TotalBillAmount,
   TotalQuantity,
   Discount,
   TotalSaleValue,
   TotalTaxCharged,
   PaymentMode,
   RefUSIN,
   InvoiceType,
   Items
   )=> {
    try {
      const response = await fetch(
         "http://localhost:8524/api/IMSFiscal/GetInvoiceNumberByModel",
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             InvoiceNumber,
             POSID,
             USIN,
             DateTime,
             TotalBillAmount,
             TotalQuantity,
             Discount,
             TotalSaleValue,
             TotalTaxCharged,
             PaymentMode,
             RefUSIN,
             InvoiceType,
             Items,
           }),
         }
       );
       return response;
   
    } catch (error) {
       console.log(error.response)
      //  dispatch({type: POST_SALE_PRODUCT_TO_FISCAL_FAIL, payload: error.response.data.message})
    }
   }