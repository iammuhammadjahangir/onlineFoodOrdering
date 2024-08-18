// import axios from "axios";
// import swal from "sweetalert2";
// import { baseQuery, apiSlice } from "../app/api/apiSlice";
// import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
// import { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useCustomState } from "../Variables/stateVariables";
// import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
// import { useTranslation, initReactI18next } from "react-i18next";
// import "../Styling/AllStyle.css"
// //Function for Translation
// export const useTranslationForFunctions = () => {
//   const { t } = useTranslation();

//   return {
//     t,
//   };
// };
// // translationFunctions.t

// ///////////********** Color Functions  **********////////////////////

// export const getcolor = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       { url: "/api/color/get", method: "GET" },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     return response.data;
//   } catch (error) {
//     // console.error(error);
//     throw new Error("Failed to fetch colors");
//   }
// };

// export const AddColor = async (
//   colorName,
//   colorDescription,
//   translationFunctions
// ) => {
//   try {
//     // console.warn(colorName);
//     // console.warn(colorDescription);

//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/color/post",
//         method: "POST",
//         body: JSON.stringify({ colorName, colorDescription }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     console.log(result);

//     if (result) {
//       swal.fire({
//         icon: "success",
//         title: translationFunctions.t("titleAdded"),
//         text: translationFunctions.t("successMessage"),
//         showConfirmButton: true,
//         customClass: {
//           popup: "custom-swal-popup", // This is the custom class you're adding
//         },
//       });
//     } else {
//       // console.warn("data not inserted");
//       // console.log("data not inserted");
//     }
//   } catch (error) {
//     // console.warn(error);
//   }
// };

// export const deleteColor = async (id, translationFunctions) => {
//   swal
//     .fire({
//       icon: "warning",
//       title: translationFunctions.t("titleMessage"),
//       text: translationFunctions.t("textRevertWarning"),
//       showCancelButton: true,
//       confirmButtonText: translationFunctions.t("confirmButtonText"),
//       cancelButtonText: translationFunctions.t("cancelButtonText"),
//       customClass: {
//         popup: "custom-swal-popup", // This is the custom class you're adding
//       },
//     })
//     .then(async (result) => {
//       if (result.value) {
//         const controller = new AbortController();
//         const signal = controller.signal;

//         try {
//           const response = await baseQuery(
//             {
//               url: `/api/color/delete/${id}`,
//               method: "DELETE",
//             },
//             {
//               getState: () => ({
//                 auth: {
//                   token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//                 },
//               }),
//               signal,
//             } // Replace 'YOUR_TOKEN' with the actual token
//           );
//           // console.log(response);
//           try {
//             const deletedRecord = await response.data;
//             // console.log();

//             if (deletedRecord.message === "Color deleted successfully") {
//               swal.fire({
//                 icon: "success",
//                 title: translationFunctions.t("titleDelete"),
//                 text: translationFunctions.t("textRecordDeleted"),
//                 showConfirmButton: false,
//                 customClass: {
//                   popup: "custom-swal-popup", // This is the custom class you're adding
//                 },
//               });
//               window.location.reload();
//             }
//           } catch (error) {
//             if (
//               response.error &&
//               response.error.data.error ===
//                 "Cannot delete the color as it is referenced by other records"
//             ) {
//               swal.fire({
//                 icon: "error",
//                 title: translationFunctions.t("titleError"),
//                 text: translationFunctions.t("textReferenceDeletion"),
//                 showConfirmButton: true,
//                 customClass: {
//                   popup: "custom-swal-popup", // This is the custom class you're adding
//                 },
//               });
//             }
//           }
//         } catch (error) {
//           // console.warn(error);
//         }
//       }
//     });
// };

// export const getColorDetails = async (id) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/color/get/${id}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch color details");
//   }
// };

// export const updateColor = async (id, colorName, colorDescription) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/color/put/${id}`,
//         method: "PUT",
//         body: JSON.stringify({
//           colorName,
//           colorDescription,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     // console.warn(result);
//   } catch (error) {
//     // console.warn(error);
//   }
// };

// ///////*********Company Functions ********///////////

// export const getCompany = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/company/get",
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch company details");
//   }
// };

// export const getCompanyDetail = async (id) => {
//   try {
//     // console.warn(id);

//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/company/get/${id}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch company details");
//   }
// };

// export const deleteCompany = async (id, translationFunctions) => {
//   swal
//     .fire({
//       icon: "warning",
//       title: translationFunctions.t("titleMessage"),
//       text: translationFunctions.t("textRevertWarning"),
//       showCancelButton: true,
//       confirmButtonText: translationFunctions.t("confirmButtonText"),
//       cancelButtonText: translationFunctions.t("cancelButtonText"),
//       customClass: {
//         popup: "custom-swal-popup", // This is the custom class you're adding
//       },
//     })
//     .then(async (result) => {
//       if (result.value) {
//         const controller = new AbortController();
//         const signal = controller.signal;

//         try {
//           const response = await baseQuery(
//             {
//               url: `/api/company/delete/${id}`,
//               method: "DELETE",
//             },
//             {
//               getState: () => ({
//                 auth: {
//                   token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//                 },
//               }),
//               signal,
//             }
//           );

//           try {
//             const deletedRecord = await response.data;
//             // console.log();

//             if (deletedRecord.message === "Company deleted successfully") {
//               swal.fire({
//                 icon: "success",
//                 title: translationFunctions.t("titleDelete"),
//                 text: translationFunctions.t("textRecordDeleted"),
//                 showConfirmButton: false,
//                 customClass: {
//                   popup: "custom-swal-popup", // This is the custom class you're adding
//                 },
//               });
//               window.location.reload();
//             }
//           } catch (error) {
//             if (
//               response.error &&
//               response.error.data.error ===
//                 "Cannot delete the company as it is referenced by other records"
//             ) {
//               swal.fire({
//                 icon: "error",
//                 title: translationFunctions.t("titleError"),
//                 text: translationFunctions.t("textReferenceDeletion"),
//                 showConfirmButton: true,
//                 customClass: {
//                   popup: "custom-swal-popup", // This is the custom class you're adding
//                 },
//               });
//             }
//           }
//         } catch (error) {
//           // console.warn(error);
//         }
//       }
//     });
// };
// export const addCompany = async (
//   companyName,
//   address,
//   translationFunctions
// ) => {
//   try {
//     if (!companyName || !address) {
//       return swal.fire({
//         icon: "error",
//         title: translationFunctions.t("titleError"),
//         text: translationFunctions.t("textAllFieldsAreRequired"),
//         showConfirmButton: true,
//         customClass: {
//           popup: "custom-swal-popup", // This is the custom class you're adding
//         },
//       });
//     } else {
//       const controller = new AbortController();
//       const signal = controller.signal;

//       const response = await baseQuery(
//         {
//           url: "/api/company/post",
//           method: "POST",
//           body: JSON.stringify({
//             companyName,
//             address,
//           }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//         {
//           getState: () => ({
//             auth: {
//               token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//             },
//           }),
//           signal,
//         } // Replace 'YOUR_TOKEN' with the actual token
//       );

//       const result = await response.data;
//       if (result) {
//         swal.fire({
//           icon: "success",
//           title: translationFunctions.t("titleAdded"),
//           text: translationFunctions.t("successMessage"),
//           showConfirmButton: true,
//           customClass: {
//             popup: "custom-swal-popup", // This is the custom class you're adding
//           },
//         });
//         return result;
//       } else {
//         // console.warn("data not inserted");
//         // console.log("data not inserted");
//       }
//     }
//   } catch (error) {
//     // console.warn(error);
//   }
// };

// export const updateCompanyData = async (id, companyName, address) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/company/put/${id}`,
//         method: "PUT",
//         body: JSON.stringify({
//           companyName,
//           address,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     // console.warn(result);
//   } catch (error) {
//     // console.warn(error);
//   }
// };

// /////////////**************Product Functions *****************//////////

// export const deleteProduct = async (id) => {
//   // console.warn(id);
//   // console.warn("hiii");
// };

// export const getProducts = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/product/get",
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     // console.log(result);
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch products");
//   }
// };

// export const getProductsOnCompanyName = async (companyName) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;
//     console.log(companyName)
//     const response = await baseQuery(
//       {
//         url: `/api/product/getProductOnCompanyName/${companyName}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     // console.log(result);
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch products");
//   }
// };

// export const getProductDetails = async (id) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/product/get/${id}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch product details");
//   }
// };

// export const updateProductt = async (
//   id,
//   productTypeName,
//   productCode,
//   productName,
//   productCompany,
//   productColor
// ) => {
//   try {

//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/product/put/${id}`,
//         method: "PUT",
//         body: JSON.stringify({
//           productTypeName,
//           productCode,
//           productName,
//           productCompany,
//           productColor,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     // console.warn(result);
//   } catch (error) {
//     // console.warn(error);
//   }
// };
// export const addProductt = async (
//   productTypeName,
//   productCode,
//   productName,
//   productCompany,
//   productColor,
//   barcodeValue
// ) => {
//   try {
//     // console.warn(productTypeName);
//     // console.warn(productCode);
//     // console.warn(productName);
//     // console.warn(productCompany);
//     // console.warn(productColor);
//     // console.warn(barcodeValue);

//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/product/post",
//         method: "POST",
//         body: JSON.stringify({
//           productTypeName,
//           productCode,
//           productName,
//           productCompany,
//           productColor,
//           barcodeValue,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return Promise.resolve(result?._id);
//   } catch (error) {
//     // console.warn(error);
//   }
// };

// /////////////********* Location Functions *******/////////////

// export const getProductLoc = async () => {
//   try {
//     console.log("called");
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/productlocation/get",
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const results = await response.data;
//     console.log(results);
//     return results;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch product locations");
//   }
// };



// export const getProductLocOnStorageCode = async (storageCode) => {
//   try {
//     console.log("called");
//     console.log(storageCode)
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/productLocation/getProductForStorageCode/${storageCode}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const results = await response.data;
//     console.log(results);
//     return results;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch product locations");
//   }
// };

// export const addProductLocation = async (
//   product,
//   productAvalibility,
//   productQuantity
// ) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     // console.warn("bhai 2");
//     // console.warn(product);
//     // console.warn(productAvalibility);
//     // console.warn(productQuantity);

//     const response = await baseQuery(
//       {
//         url: "/api/productlocation/post",
//         method: "POST",
//         body: JSON.stringify({
//           product,
//           productAvalibility,
//           productQuantity,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//   } catch (err) {
//     // console.warn(err);
//   }
// };

// export const getProductLocation= async (id) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/productlocation/getId/${id}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const data = await response.data;
//     return data;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch product location");
//   }
// };

// export const deleteLocation = async (id, translationFunctions) => {
//   swal
//     .fire({
//       icon: "warning",
//       title: translationFunctions.t("titleMessage"),
//       text: translationFunctions.t("textRevertWarning"),
//       showCancelButton: true,
//       confirmButtonText: translationFunctions.t("confirmButtonText"),
//       cancelButtonText: translationFunctions.t("cancelButtonText"),
//       customClass: {
//         popup: "custom-swal-popup", // This is the custom class you're adding
//       },
//     })
//     .then(async (result) => {
//       if (result.value) {
//         const controller = new AbortController();
//         const signal = controller.signal;

//         try {
//           const response = await baseQuery(
//             {
//               url: `/api/productLocation/delete/${id}`,
//               method: "DELETE",
//             },
//             {
//               getState: () => ({
//                 auth: {
//                   token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//                 },
//               }),
//               signal,
//             } // Replace 'YOUR_TOKEN' with the actual token
//           );
//           // console.log(response);
//           const deletedRecord = await response.data;
//           // console.log();

//           if (
//             deletedRecord.message === "Location Quantity deleted successfully"
//           ) {
//             swal.fire({
//               icon: "success",
//               title: translationFunctions.t("titleDelete"),
//               text: translationFunctions.t("textRecordDeleted"),
//               showConfirmButton: false,
//               customClass: {
//                 popup: "custom-swal-popup", // This is the custom class you're adding
//               },
//             });
//             // window.location.reload();
//           }
//         } catch (error) {
//           // console.warn(error);
//         }
//       }
//     });
// };

// export const updateLocation = async (id, quantity, translationFunctions) => {
//   try {
//     // console.warn(id);
//     const productQuantity = quantity;

//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/productlocation/putId/${id}`,
//         method: "PUT",
//         body: JSON.stringify({
//           productQuantity,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;

//     if (result) {
//       swal.fire({
//         icon: "success",
//         title: translationFunctions.t("titleAdded"),
//         text: translationFunctions.t("textRecordAddedSuccessfully"),
//         showConfirmButton: true,
//         customClass: {
//           popup: "custom-swal-popup", // This is the custom class you're adding
//         },
//       });
//       return Promise.resolve(result._id);
//     } else {
//       // console.warn("data not inserted");
//       // console.log("data not inserted");
//     }
//   } catch (err) {
//     // console.warn(err);
//   }
// };

// ///////******** Godown Function ***********//////////////
// export const addGodown = async (
//   storageCode,
//   storageAddress,
//   storageDescription,
//   storageType,
//   storagePhoneNo,
//   translationFunctions
// ) => {
//   try {
//     if (
//       !storageCode ||
//       !storageAddress ||
//       !storageDescription ||
//       !storageType
//     ) {
//       return swal.fire({
//         icon: "error",
//         title: translationFunctions.t("titleError"),
//         text: translationFunctions.t("textAllFieldsAreRequired"),
//         showConfirmButton: true,
//         customClass: {
//           popup: "custom-swal-popup", // This is the custom class you're adding
//         },
//       });
//     } else {
//       // console.warn
//       // storageCode,
//       //   storageAddress,
//       //   storageDescription,
//       //   storageType,
//       //   storagePhoneNo;

//       const controller = new AbortController();
//       const signal = controller.signal;

//       const response = await baseQuery(
//         {
//           url: "/api/godown/post",
//           method: "POST",
//           body: JSON.stringify({
//             storageCode,
//             storageAddress,
//             storageDescription,
//             storageType,
//             storagePhoneNo,
//           }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//         {
//           getState: () => ({
//             auth: {
//               token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//             },
//           }),
//           signal,
//         }
//       );

//       const result = await response.data;
//       if (result) {
//         swal.fire({
//           icon: "success",
//           title: translationFunctions.t("titleAdded"),
//           text: translationFunctions.t("successMessage"),
//           showConfirmButton: true,
//           customClass: {
//             popup: "custom-swal-popup", // This is the custom class you're adding
//           },
//         });
//         return result;
//       } else {
//         // console.warn("data not inserted");
//         // console.log("data not inserted");
//       }
//     }
//   } catch (error) {
//     // console.warn(error);
//   }
// };

// export const getStorage = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/godown/get",
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch storage details");
//   }
// };

// export const getStoragee = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/godown/get",
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     return response.data;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch storage details");
//   }
// };
// export const deleteGodown = async (id, translationFunctions) => {
//   swal
//     .fire({
//       icon: "warning",
//       title: translationFunctions.t("titleMessage"),
//       text: translationFunctions.t("textRevertWarning"),
//       showCancelButton: true,
//       confirmButtonText: translationFunctions.t("confirmButtonText"),
//       cancelButtonText: translationFunctions.t("cancelButtonText"),
//       customClass: {
//         popup: "custom-swal-popup", // This is the custom class you're adding
//       },
//     })
//     .then(async (result) => {
//       if (result.value) {
//         try {
//           const controller = new AbortController();
//           const signal = controller.signal;

//           const response = await baseQuery(
//             {
//               url: `/api/godown/delete/${id}`,
//               method: "DELETE",
//             },
//             {
//               getState: () => ({
//                 auth: {
//                   token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//                 },
//               }),
//               signal,
//             } // Replace 'YOUR_TOKEN' with the actual token
//           );

//           try {
//             const deletedRecord = await response.data;
//             // console.log();

//             if (deletedRecord.message === "Record deleted successfully") {
//               swal.fire({
//                 icon: "success",
//                 title: translationFunctions.t("titleDelete"),
//                 text: translationFunctions.t("textRecordDeleted"),
//                 showConfirmButton: false,
//                 customClass: {
//                   popup: "custom-swal-popup", // This is the custom class you're adding
//                 },
//               });
//               window.location.reload();
//             }
//           } catch (error) {
//             if (
//               response.error &&
//               response.error.data.error ===
//                 "Cannot delete the Record as it is referenced by other records"
//             ) {
//               swal.fire({
//                 icon: "error",
//                 title: translationFunctions.t("titleError"),
//                 text: translationFunctions.t("textReferenceDeletion"),
//                 showConfirmButton: true,
//                 customClass: {
//                   popup: "custom-swal-popup", // This is the custom class you're adding
//                 },
//               });
//             }
//           }
//         } catch (error) {
//           // console.warn(error);
//         }
//       }
//     });
// };

// export const getStorageDetails = async (id) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/godown/get/${id}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch storage details");
//   }
// };

// export const updateStorage = async (
//   id,
//   storageCode,
//   storageAddress,
//   storageDescription,
//   storageType,
//   storagePhoneNo
// ) => {
//   try {
//     // console.warn(storageAddress);
//     // console.warn(storageDescription);

//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/godown/put/${id}`,
//         method: "PUT",
//         body: JSON.stringify({
//           storageCode,
//           storageAddress,
//           storageDescription,
//           storageType,
//           storagePhoneNo,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     // console.warn(result);
//   } catch (error) {
//     // console.warn(error);
//   }
// };

// //////////************Product Type Functions ************///////////////
// export const addProductType = async (
//   productName,
//   productDescription,
//   translationFunctions
// ) => {
//   try {
//     if (!productName || !productDescription) {
//       return swal.fire({
//         icon: "error",
//         title: translationFunctions.t("titleError"),
//         text: translationFunctions.t("textAllFieldsAreRequired"),
//         showConfirmButton: true,
//         customClass: {
//           popup: "custom-swal-popup", // This is the custom class you're adding
//         },
//       });
//     } else {
//       // console.warn(productName, productDescription);

//       const controller = new AbortController();
//       const signal = controller.signal;

//       const response = await baseQuery(
//         {
//           url: "/api/producttype/post",
//           method: "POST",
//           body: JSON.stringify({
//             productName,
//             productDescription,
//           }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//         {
//           getState: () => ({
//             auth: {
//               token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//             },
//           }),
//           signal,
//         } // Replace 'YOUR_TOKEN' with the actual token
//       );

//       const result = await response.data;
//       if (result) {
//         swal.fire({
//           icon: "success",
//           title: translationFunctions.t("titleAdded"),
//           text: translationFunctions.t("successMessage"),
//           showConfirmButton: true,
//           customClass: {
//             popup: "custom-swal-popup", // This is the custom class you're adding
//           },
//         });
//         return result;
//       } else {
//         // console.warn("data not inserted");
//         // console.log("data not inserted");
//       }
//     }
//   } catch (error) {
//     // console.warn(error);
//   }
// };

// export const getProductType = async () => {
//   try {
//     // console.warn("hel");

//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/producttype/get",
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch product types");
//   }
// };

// export const deleteProductType = async (id, translationFunctions) => {
//   swal
//     .fire({
//       icon: "warning",
//       title: translationFunctions.t("titleMessage"),
//       text: translationFunctions.t("textRevertWarning"),
//       showCancelButton: true,
//       confirmButtonText: translationFunctions.t("confirmButtonText"),
//       cancelButtonText: translationFunctions.t("cancelButtonText"),
//       customClass: {
//         popup: "custom-swal-popup", // This is the custom class you're adding
//       },
//     })
//     .then(async (result) => {
//       if (result.value) {
//         try {
//           const controller = new AbortController();
//           const signal = controller.signal;

//           const response = await baseQuery(
//             {
//               url: `/api/producttype/delete/${id}`,
//               method: "DELETE",
//             },
//             {
//               getState: () => ({
//                 auth: {
//                   token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//                 },
//               }),
//               signal,
//             } // Replace 'YOUR_TOKEN' with the actual token
//           );

//           try {
//             const deletedRecord = await response.data;
//             // console.log();

//             if (deletedRecord.message === "Product Type deleted successfully") {
//               swal.fire({
//                 icon: "success",
//                 title: translationFunctions.t("titleDelete"),
//                 text: translationFunctions.t("textRecordDeleted"),
//                 showConfirmButton: false,
//                 customClass: {
//                   popup: "custom-swal-popup", // This is the custom class you're adding
//                 },
//               });
//               window.location.reload();
//             }
//           } catch (error) {
//             if (
//               response.error &&
//               response.error.data.error ===
//                 "Cannot delete the Product Type as it is referenced by other records"
//             ) {
//               swal.fire({
//                 icon: "error",
//                 title: translationFunctions.t("titleError"),
//                 text: translationFunctions.t("textReferenceDeletion"),
//                 showConfirmButton: true,
//                 customClass: {
//                   popup: "custom-swal-popup", // This is the custom class you're adding
//                 },
//               });
//             }
//           }
//         } catch (error) {
//           // console.warn(error);
//         }
//       }
//     });
// };

// export const getProductTypeDetails = async (id) => {
//   try {
//     // console.warn(id);

//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/producttype/get/${id}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch product type details");
//   }
// };

// export const updateProductTypeDetails = async (
//   id,
//   productName,
//   productDescription
// ) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/producttype/put/${id}`,
//         method: "PUT",
//         body: JSON.stringify({
//           productName,
//           productDescription,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     // console.warn(result);
//   } catch (error) {
//     // console.warn(error);
//   }
// };

// ////////************Purchase Functions ********///////////
// export const updatePurchaseProductPrice = async (
//   id,
//   productCurrentPrice,
//   productpriceExcludingTax,
//   productDiscount,
//   productExpenses,
//   productTaxPrice
// ) => {
//   try {
//     // console.log(id);
//     // console.log(productCurrentPrice);

//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/product/put/${id}`,
//         method: "PUT",
//         body: JSON.stringify({
//           productCurrentPrice,
//           productpriceExcludingTax,
//           productDiscount,
//           productExpenses,
//           productTaxPrice,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     // console.warn(result);
//   } catch (error) {
//     // console.warn(error);
//   }
// };
// export const getPurchaseRecord = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/purchaseProduct/get",
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch purchase records");
//   }
// };

// export const getPurchaseDetail = async (salesId) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/purchaseProduct/get/${salesId}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch purchase details");
//   }
// };

// export const getProductLoccUsingProductAndLocation = async (id1, id2) => {
//   try {
//     // console.log(id1);
//     // console.log(id2);
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/productLocation/getProductIdForTransferProduct/${id1}/${id2}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const getMainQuantity = await response.data;
//     return getMainQuantity;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch product location");
//   }
// };

// export const updateProductLocAndRemoveQuantity = async (
//   id,
//   productQuantity
// ) => {
//   try {
//     // console.log(id);
//     // console.log(productQuantity);
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/productLocation/putToUpdateQuantity/${id}`,
//         method: "PUT",
//         body: {
//           productQuantity,
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     return response.data;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to update product location");
//   }
// };

// ////////*********SaleProduct Functions ************///////
// export const getSaleRecord = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/saleProduct/get",
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch sale records");
//   }
// };

// export const getSpecificSaleProduct = async (salesId) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/saleProduct/get/${salesId}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch specific sale product");
//   }
// };

// export const addSaleProduct = async (
//   InvoiceNumber,
//   clientName,
//   clientAddress,
//   list,
//   total
// ) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/saleProduct/post",
//         method: "POST",
//         body: {
//           InvoiceNumber,
//           clientName,
//           clientAddress,
//           list,
//           total,
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//   }
// };

// /////////*********For Sale Purpose *******///////
// export const getProductLocc = async (id) => {
//   try {
//     // console.warn(id);
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/saleProduct/getproductLocc/${id}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const getMainQuantity = await response.data;
//     return getMainQuantity;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch product location");
//   }
// };

// export const updateProductLocc = async (id, productQuantity) => {
//   try {
//     // console.warn(id);
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/saleProduct/putproductLocc/${id}`,
//         method: "PUT",
//         body: {
//           productQuantity,
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     return response.data;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to update product location");
//   }
// };

// export const updateProductLoccc = async (id, productQuantity) => {
//   try {
//     // console.log(id);
//     // console.log(productQuantity);
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/saleProduct/putproductLoc/${id}`,
//         method: "PUT",
//         body: {
//           productQuantity,
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     return response;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to update product location");
//   }
// };

// ///////************Transfer functions *//////////
// export const getTransferRecord = async () => {
//   try {
//     const response = await baseQuery(
//       {
//         url: "/api/transferProduct/get",
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: JSON.parse(localStorage.getItem("accessToken")),
//           },
//         }),
//       }
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.error("Failed to fetch transfer records:", error);
//     throw new Error("Failed to fetch transfer records");
//   }
// };


// ///////************Transfer Invoice functions *//////////
// export const getTransferInvoiceRecord = async (storageCode) => {
//   try {
//     const response = await baseQuery(
//       {
//         url: `/api/transferProduct/getInvoiceRecordOnStorageCode/${storageCode}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: JSON.parse(localStorage.getItem("accessToken")),
//           },
//         }),
//       }
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.error("Failed to fetch transfer records:", error);
//     throw new Error("Failed to fetch transfer records");
//   }
// };
// ///////************Expense Type functions *//////////
// export const addExpenses = async (
//   expenseType,
//   expenseDescription,
//   translationFunctions
// ) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/expenseType/post",
//         method: "POST",
//         body: { expenseType, expenseDescription },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     if (result) {
//       swal.fire({
//         icon: "success",
//         title: translationFunctions.t("titleAdded"),
//         text: translationFunctions.t("textRecordDeleted"),
//         showConfirmButton: true,
//         customClass: {
//           popup: "custom-swal-popup", // This is the custom class you're adding
//         },
//       });
//     }
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to add expenses");
//   }
// };

// export const getExpenses = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/expenseType/get",
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch expenses");
//   }
// };
// export const getExpense = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/expense/get",
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch expenses");
//   }
// };

// export const getExpenseDetails = async (id) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/expenseType/get/${id}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch expense details");
//   }
// };

// export const deleteExpense = async (id, translationFunctions) => {
//   swal
//     .fire({
//       icon: "warning",
//       title: translationFunctions.t("titleMessage"),
//       text: translationFunctions.t("textRevertWarning"),
//       showCancelButton: true,
//       confirmButtonText: translationFunctions.t("confirmButtonText"),
//       cancelButtonText: translationFunctions.t("cancelButtonText"),
//       customClass: {
//         popup: "custom-swal-popup", // This is the custom class you're adding
//       },
//     })
//     .then(async (result) => {
//       if (result.value) {
//         const controller = new AbortController();
//         const signal = controller.signal;

//         try {
//           const response = await baseQuery(
//             {
//               url: `/api/expenseType/delete/${id}`,
//               method: "DELETE",
//             },
//             {
//               getState: () => ({
//                 auth: {
//                   token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//                 },
//               }),
//               signal,
//             }
//           );
//           const deletedRecord = await response.data;
//           // console.log();

//           if (deletedRecord.message === "Expense deleted successfully") {
//             swal.fire({
//               icon: "success",
//               title: translationFunctions.t("titleDelete"),
//               text: translationFunctions.t("textExpenseDeleted"),
//               showConfirmButton: false,
//               customClass: {
//                 popup: "custom-swal-popup", // This is the custom class you're adding
//               },
//             });
//             window.location.reload();
//           }
//         } catch (error) {
//           // console.warn(error);
//           throw new Error("Failed to delete expense");
//         }
//       }
//     });
// };

// export const updateExpense = async (
//   id,
//   rent,
//   lunch,
//   guest,
//   bills,
//   others,
//   total
// ) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/expenseType/put/${id}`,
//         method: "PUT",
//         body: {
//           rent,
//           lunch,
//           guest,
//           bills,
//           others,
//           total,
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     // console.log(result);
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to update expense");
//   }
// };

// export const getExpenseDetail = async (salesId) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/expense/get/${salesId}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch purchase details");
//   }
// };

// export const getProductsOnBarcode = async (barcode) => {
//   try {
//     console.log(barcode);
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/product/barcode/${barcode}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.warn(error);
//     throw new Error("Failed to fetch purchase details");
//   }
// };

// ///////////////For Users///////////////////
// export const getUsers = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       { url: "/api/user/getWithPopulation", method: "GET" },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     return response.data;
//   } catch (error) {
//     throw new Error("Failed to fetch user");
//   }
// };

// export const getUsersById = async (id) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       { url: `/api/user/getWithPopulationWithId/${id}`, method: "GET" },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     return response.data;
//   } catch (error) {
//     throw new Error("Failed to fetch user");
//   }
// };

// export const getOneUserByUserName = async (id) => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       { url: `/api/user/getOneUserByUserName/${id}`, method: "GET" },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     return response.data;
//   } catch (error) {
//     throw new Error("Failed to fetch user");
//   }
// };

// export const getVerifiedUserMessage = async (usernameparams, password) => {
//   // console.log(usernameparams, password);
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/user/getVerifiedUser/${usernameparams}/${password}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     return response.data;
//   } catch (error) {
//     throw new Error("Failed to fetch user");
//   }
// };

// export const addNewUser = async (
//   name,
//   username,
//   password,
//   rolesNonArray,
//   shopNo,
//   godownNo,
//   posId,
//   phoneNo,
//   whatsappNo,
// ) => {
//   try {
//     if (
//       !name ||
//       !username ||
//       !password ||
//       !rolesNonArray ||
//       !shopNo ||
//       !godownNo ||
//       !posId ||
//       !phoneNo ||
//       !whatsappNo
//     ) {
//       // return swal.fire({
//       //   icon: "error",
//       //   title: translationFunctions.t("titleError"),
//       //   text: translationFunctions.t("textAllFieldsAreRequired"),
//       //   showConfirmButton: true,
//       //   customClass: {
//       //     popup: "custom-swal-popup", // This is the custom class you're adding
//       //   },
//       // });
//     } else {
//       console.log(
//         name,
//         username,
//         password,
//         rolesNonArray,
//         shopNo,
//         godownNo,
//         posId,
//         whatsappNo
//       );
//       const roles = rolesNonArray.split(",");
//       console.log(roles);
//       const controller = new AbortController();
//       const signal = controller.signal;

//       const response = await baseQuery(
//         {
//           url: "/api/user/post",
//           method: "POST",
//           body: JSON.stringify({
//             name,
//             username,
//             password,
//             roles,
//             shopNo,
//             godownNo,
//             posId,
//             phoneNo,
//             whatsappNo,
//           }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//         {
//           getState: () => ({
//             auth: {
//               token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//             },
//           }),
//           signal,
//         }
//       );

//       console.log(response);
//       return response.data;
//     }
//   } catch (error) {
//     console.warn(error);
//   }
// };

// export const updateOldUser = async (
//   id,
//   name,
//   username,
//   rolesNonArray,
//   active,
//   shopNo,
//   posId,
//   password,
//   phoneNo,
//   whatsappNo
// ) => {
//   try {
//     const roles = rolesNonArray.split(",");
//     console.log(roles);

    
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/user/put/${id}`,
//         method: "PUT",
//         body: JSON.stringify({
//           id,
//           name,
//           username,
//           roles,
//           active,
//           password,
//           shopNo,
//           posId,
//           phoneNo,
//           whatsappNo,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response;
//     return result;
//   } catch (error) {
//     console.warn(error);
//   }
// };

// export const updateUserPassword = async (username, password) => {
//   try {
//     // console.log(username, password);
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/user/updateUserPassword/${username}`,
//         method: "PUT",
//         body: JSON.stringify({
//           password,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response;
//     return result.data;
//   } catch (error) {
//     console.warn(error);
//   }
// };

// /////////******** Temp Transfer functions ************////////////
// export const AddTempTransfer = async (
//   id,
//   transferFrom,
//   transferTo,
//   transferBy,
//   products
// ) => {
//   try {
//     console.log(id);
//     console.log(transferFrom);
//     console.log(transferTo);
//     console.log(transferBy);
//     if (!id) {
//       !JSON.parse(localStorage.getItem("isAdministrator")) &&
//         (id = JSON.parse(localStorage.getItem("shopId")));
//       console.log(id);
//     }
//     const controller = new AbortController();
//     const signal = controller.signal;
//     const response = await baseQuery(
//       {
//         url: "/api/transferProduct/createTemporaryTransfer",
//         method: "POST",
//         body: JSON.stringify({
//           id,
//           transferFrom,
//           transferTo,
//           transferBy,
//           products,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );
//     const result = await response.data;
//   } catch (err) {}
// };

// export const deleteTempRecord = async (tempProductId, tempLocationId) => {
//   console.log(tempProductId);
//   console.log(tempLocationId);
//   const controller = new AbortController();
//   const signal = controller.signal;

//   try {
//     const response = await baseQuery(
//       {
//         url: `/api/transferProduct/deleteTempTransferProduct/${tempProductId}/${tempLocationId}`,
//         method: "DELETE",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );
//     // console.log(response);

//     const deletedRecord = await response.data;
//     // console.log();
//   } catch (error) {
//     // console.warn(error);
//   }
// };

// export const GetTempTransfer = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       { url: "/api/transferProduct/getTemp", method: "GET" },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     return response.data;
//   } catch (error) {
//     // console.error(error);
//     throw new Error("Failed to fetch colors");
//   }
// };

// export const deleteAllTempRecord = async (id) => {
//   console.log(id);
//   const controller = new AbortController();
//   const signal = controller.signal;

//   try {
//     const response = await baseQuery(
//       {
//         url: `/api/transferProduct/delete/${id}`,
//         method: "DELETE",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );
//     // console.log(response);

//     const deletedRecord = await response.data;
//     // console.log();
//   } catch (error) {
//     // console.warn(error);
//   }
// };

// export const updateTempTransferProductItem = async (
//   id1,
//   id,
//   Namee,
//   Code,
//   PurchaseQuantity,
//   Color,
//   Company,
//   locationsetid,
//   quantityidset
// ) => {
//   console.log(id);
//   console.log(Namee);
//   console.log(Color);
//   console.log(Company);
//   console.log(Code);
//   console.log(PurchaseQuantity);
//   console.log(quantityidset);
//   console.log(locationsetid);
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/transferProduct/updateTempTransfer/${id1}`,
//         method: "PUT",
//         body: {
//           id,
//           Namee,
//           Code,
//           PurchaseQuantity,
//           Color,
//           Company,
//           locationsetid,
//           quantityidset,
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     // console.log(result);
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to update expense");
//   }
// };

// ////////////*********** update product Quantity in Temporary Transfer *******/////////
// export const updateTempTransferProductQuantity = async (
//   PurchaseQuantity,
//   quantityidset,
//   locationsetid
// ) => {
//   console.log(PurchaseQuantity);
//   console.log(quantityidset);
//   console.log(locationsetid);
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/transferProduct/updateTempTransferProductQuantity/${quantityidset}/${locationsetid}`,
//         method: "PUT",
//         body: {
//           PurchaseQuantity,
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     // console.log(result);
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to update expense");
//   }
// };

// ////////******************************** */////////////////////////////////////
// /////////***********update location Quantity on the basis of temp transfer *//////////
// ///////////****************************************** *////////////////////////
// export const updateLocationTempTransferProductQuantity = async (
//   productQuantity,
//   quantityidset,
//   locationsetid
// ) => {
//   console.log(productQuantity);
//   console.log(quantityidset);
//   console.log(locationsetid);
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/productLocation/updateQuantity/${quantityidset}/${locationsetid}`,
//         method: "PUT",
//         body: {
//           productQuantity,
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     // console.log(result);
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to update expense");
//   }
// };

// ////////******************************** */////////////////////////////////////
// /////////***********update location Quantity on the basis of temp transfer have two function above and belown but don't delete any one*//////////
// ///////////****************************************** *////////////////////////
// export const updateMinusLocationTempTransferProductQuantity = async (
//   productQuantity,
//   quantityidset,
//   locationsetid
// ) => {
//   console.log(productQuantity);
//   console.log(quantityidset);
//   console.log(locationsetid);
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/productLocation/updateQuantity/${quantityidset}/${locationsetid}`,
//         method: "PUT",
//         body: {
//           productQuantity,
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     // console.log(result);
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to update expense");
//   }
// };

// /////////******** Temp Transfer functions ************////////////
// export const AddTempPurchase = async (
//   id,
//   clientName,
//   purchaseReceiptNumber,
//   purchaseCompany,
//   purchaseDate,
//   shopNo,
//   storeIn,
//   purchasedBy,
//   products
// ) => {
//   try {
//     console.log(clientName);
//     console.log(purchaseReceiptNumber);
//     console.log(purchaseCompany);
//     console.log(purchaseDate);
//     console.log(purchasedBy);
//     console.log(shopNo)
//     console.log(products);
//     console.log(storeIn)

//     console.log(id);
//     if (!id) {
//       !JSON.parse(localStorage.getItem("isAdministrator")) &&
//         (id = JSON.parse(localStorage.getItem("shopId")));
//     }
//     // const shopNo = JSON.parse(localStorage.getItem("shopId"));
//     console.log(shopNo);
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/purchaseProduct/createTemporaryPurcahse",
//         method: "POST",
//         body: JSON.stringify({
//           id,
//           clientName,
//           purchaseReceiptNumber,
//           purchaseCompany,
//           purchaseDate,
//           shopNo,
//           storeIn,
//           purchasedBy,
//           products,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );
//     const result = await response.data;
//   } catch (err) {}
// };

// export const updateTempPurchaseProductItem = async (
//   id1,
//   id,
//   Code,
//   Color,
//   Namee,
//   Company,
//   PurchaseQuantity,
//   purchasePrice,
//   purchaseQuantityPrice,
//   purchaseTotalTax,
//   expeseTotal,
//   purchaseTotalDiscount,
//   purchaseProductTotalAmount,
//   CurrentPrice,
//   purchaseProductPriceExcludeTax,
//   purchaseProductDiscount,
//   purchaseProductExpense,
//   purchaseProductTax,
//   purchaseTotalAmount,
//   amount,
//   quantityidset,
//   locationsetid
// ) => {
//   console.log(id);
//   console.log(Namee);
//   console.log(Color);
//   console.log(Company);
//   console.log(Code);
//   console.log(PurchaseQuantity);
//   console.log(quantityidset);
//   console.log(locationsetid);
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/purchaseProduct/updateTempPurchase/${id1}`,
//         method: "PUT",
//         body: {
//           id,
//           Code,
//           Color,
//           Namee,
//           Company,
//           PurchaseQuantity,
//           purchasePrice,
//           purchaseQuantityPrice,
//           purchaseTotalTax,
//           expeseTotal,
//           purchaseTotalDiscount,
//           purchaseProductTotalAmount,
//           CurrentPrice,
//           purchaseProductPriceExcludeTax,
//           purchaseProductDiscount,
//           purchaseProductExpense,
//           purchaseProductTax,
//           purchaseTotalAmount,
//           amount,
//           quantityidset,
//           locationsetid,
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     // console.log(result);
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to update expense");
//   }
// };

// export const GetTempPurchase = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       { url: "/api/purchaseProduct/getTemp", method: "GET" },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     return response.data;
//   } catch (error) {
//     // console.error(error);
//     throw new Error("Failed to fetch colors");
//   }
// };

// export const deleteAllTempPurchaseRecord = async (id) => {
//   const controller = new AbortController();
//   const signal = controller.signal;

//   try {
//     const response = await baseQuery(
//       {
//         url: `/api/purchaseProduct/deletePurchaseTemp/${id}`,
//         method: "DELETE",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );
//     // console.log(response);

//     const deletedRecord = await response.data;
//     // console.log();
//   } catch (error) {
//     // console.warn(error);
//   }
// };

// export const deleteTempPurchaseRecord = async (tempProductId) => {
//   console.log(tempProductId);
//   const controller = new AbortController();
//   const signal = controller.signal;

//   try {
//     const response = await baseQuery(
//       {
//         url: `/api/purchaseProduct/deleteTempPurchaseProduct/${tempProductId}`,
//         method: "DELETE",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );
//     // console.log(response);

//     const deletedRecord = await response.data;
//     // console.log();
//   } catch (error) {
//     // console.warn(error);
//   }
// };

// ////////***************** Temporary Sales */
// export const AddTempSales = async (customerName, customerNumber, products) => {
//   console.log(customerName);
//   console.log(customerNumber);
//   console.log(products);
//   try {
//     let shopNo = JSON.parse(localStorage.getItem("shopId"));
//     let id = JSON.parse(localStorage.getItem("shopId"));
//     console.log(shopNo);
//     const controller = new AbortController();
//     const signal = controller.signal;
//     const response = await baseQuery(
//       {
//         url: "/api/saleProduct/createTemporarySales",
//         method: "POST",
//         body: JSON.stringify({
//           id,
//           shopNo,
//           customerName,
//           customerNumber,
//           products,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );
//     const result = await response.data;
//   } catch (err) {}
// };

// export const GetTempSale = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       { url: "/api/saleProduct/getTemp", method: "GET" },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     return response.data;
//   } catch (error) {
//     // console.error(error);
//     throw new Error("Failed to fetch colors");
//   }
// };

// export const updateTempSaleProductItem = async (
//   id1,
//   id,
//   Code,
//   color,
//   Namee,
//   Company,
//   PurchaseQuantity,
//   amount,
//   barcode,
//   quantityidset,
//   locationsetid,
//   Discount,
//   excludeTaxPrice,
//   taxPercentage,
//   totalAmounnt,
//   taxAmount
// ) => {
//   console.log(id);
//   console.log(Namee);
//   console.log(color);
//   console.log(Company);
//   console.log(Code);
//   console.log(PurchaseQuantity);
//   console.log(quantityidset);
//   console.log(locationsetid);
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/saleProduct/updateTempSales/${id1}`,
//         method: "PUT",
//         body: {
//           id,
//           Code,
//           color,
//           Namee,
//           Company,
//           PurchaseQuantity,
//           amount,
//           barcode,
//           quantityidset,
//           locationsetid,
//           Discount,
//           excludeTaxPrice,
//           taxPercentage,
//           totalAmounnt,
//           taxAmount,
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     // console.log(result);
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to update expense");
//   }
// };

// ////////******************************** */////////////////////////////////////
// /////////***********update temp Sale Quantity on the basis of two id's*//////////
// ///////////****************************************** *////////////////////////
// export const updateSaleProductQuantityinList = async (
//   PurchaseQuantity,
//   amount,
//   Discount,
//   excludeTaxPrice,
//   totalAmounnt,
//   taxAmount,
//   quantityidset,
//   locationsetid
// ) => {
//   console.log(PurchaseQuantity);
//   console.log(quantityidset);
//   console.log(locationsetid);
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/saleProduct/updateTempSaleProductQuantity/${quantityidset}/${locationsetid}`,
//         method: "PUT",
//         body: {
//           PurchaseQuantity,
//           amount,
//           Discount,
//           excludeTaxPrice,
//           totalAmounnt,
//           taxAmount,
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     // console.log(result);
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to update expense");
//   }
// };

// export const deleteTempSaleRecord = async (tempProductId) => {
//   console.log(tempProductId);
//   const controller = new AbortController();
//   const signal = controller.signal;

//   try {
//     const response = await baseQuery(
//       {
//         url: `/api/saleProduct/deleteTempSaleProduct/${tempProductId}`,
//         method: "DELETE",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );
//     // console.log(response);

//     const deletedRecord = await response.data;
//     // console.log();
//   } catch (error) {
//     // console.warn(error);
//   }
// };

// export const deleteAllTempSaleRecord = async (id) => {
//   const controller = new AbortController();
//   const signal = controller.signal;
//   console.log(id);
//   try {
//     const response = await baseQuery(
//       {
//         url: `/api/saleProduct/deleteTemp/${id}`,
//         method: "DELETE",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );
//     // console.log(response);

//     const deletedRecord = await response.data;
//     // console.log();
//   } catch (error) {
//     // console.warn(error);
//   }
// };

// /////////******** Temp Transfer functions ************////////////
// export const updateandPostProductInLocation = async (
//   quantityidset,
//   locationsetid,
//   PurchaseQuantity
// ) => {
//   try {
//     console.log(quantityidset);
//     console.log(locationsetid);
//     console.log(PurchaseQuantity);

//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/productLocation/updateAndPostProduct",
//         method: "POST",
//         body: JSON.stringify({
//           locationsetid,
//           quantityidset,
//           PurchaseQuantity,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );
//     const result = await response.data;
//   } catch (err) {}
// };

// /////////////////////////////////
// /////APi FOR DASHBOARD//////////
// ////////////////////////////////

// export const getActiveUsers = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       { url: "/api/user/activeUsers", method: "GET" },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     return response.data;
//   } catch (error) {
//     throw new Error("Failed to fetch user");
//   }
// };

// export const getSalesDataForDashBoard = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/saleProduct/getTotalSaleThisMonth",
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch sale records");
//   }
// };
// export const getSalesDataForDashBoardWithUser = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/saleProduct/getTotalSaleThisMonth/${JSON.parse(
//           localStorage.getItem("shopId")
//         )}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch sale records");
//   }
// };

// export const getTopSalesForDashBoard = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/saleProduct/gets",
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch sale records");
//   }
// };

// export const getTopSalesForDashBoardWithUser = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/saleProduct/gets/${JSON.parse(
//           localStorage.getItem("shopId")
//         )}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch sale records");
//   }
// };

// export const getPurchaseRecordForCurrentMonth = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/purchaseProduct/getTotalPurcahseThisMonth",
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch purchase records");
//   }
// };

// export const getPurchaseRecordForCurrentMonthForShop = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/purchaseProduct/getTotalPurcahseThisMonth/${JSON.parse(
//           localStorage.getItem("shopId")
//         )}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       } // Replace 'YOUR_TOKEN' with the actual token
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch purchase records");
//   }
// };

// export const getExpensesThisMonth = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: "/api/expense/getTotalExpenseThisMonth",
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch expenses");
//   }
// };

// export const getExpensesThisMonthForShop = async () => {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const response = await baseQuery(
//       {
//         url: `/api/expense/getTotalExpenseThisMonth/${JSON.parse(
//           localStorage.getItem("shopId")
//         )}`,
//         method: "GET",
//       },
//       {
//         getState: () => ({
//           auth: {
//             token: `${JSON.parse(localStorage.getItem("accessToken"))}`,
//           },
//         }),
//         signal,
//       }
//     );

//     const result = await response.data;
//     return result;
//   } catch (error) {
//     // console.warn(error);
//     throw new Error("Failed to fetch expenses");
//   }
// };
