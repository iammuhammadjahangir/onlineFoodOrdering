// import React, { useEffect, useState } from "react";
// import {
//   Message,
//   Button,
//   Dropdown,
//   Form,
//   Select,
//   Modal,
//   Dimmer,
//   Loader,
//   Image,
//   Segment,
// } from "semantic-ui-react";

// import { useParams, useNavigate } from "react-router-dom";
// import { BarcodeScanner } from "react-barcode";
// import swal from "sweetalert2";
// import axios from "axios";


// let productTypee = [];

// let productColor = "";
// let productCompany = "";
// let prodType = "";
// let productBarcode = "";
// let hasErrorProduct = "false";
// let hasCompanyError = "false";
// let hasColorError = "false";
// let hasStorageError = "false";
// const LocationFormm = () => {
//   const [loading, setLoading] = useState(false);
//   const [product, setProducttName] = useState();
//   const [productCode, setProductCode] = useState();
//   const [productName, setProductName] = useState();
//   const [productAvalibility, setProductAvailibility] = useState();
 
//   const [productQuantity, setProductQuantity] = useState();
//   const [formClassName, setformClassName] = useState();
//   const [productStorage, setProductStorage] = useState();
//   const [prodCompany, setProdCompany] = useState();
//   const [prodColor, setProdColor] = useState();

//   let type = false;
//   const [errorColor, setErrorColor] = useState(false);
//   const [errorProduct, setErrorProduct] = useState(false);
//   const [errorAvailable, setErrorAvailable] = useState(false);

//   const [error, setError] = React.useState();
//   const params = useParams();
//   const navigate = useNavigate();
//   const backPage = () => {
//     navigate("/productLocationRecord");
//   };

//   useEffect(() => {
    
//     // getStorage();
//     getProductType();
//     // getBarcode();
//   }, []);

  
//   const getProductType = async () => {
//     let result = await fetch("http://localhost:3001/prodType");
//     result = await result.json();

//     productTypee = result;
//     console.warn(productTypee);
//   };

//   const AddRecord = async (productTypeName, productCompany) => {
//     const barcodeValue = Math.floor(Math.random() * 1000000000000).toString();
//     console.warn(productTypeName);
//     let result = await fetch("http://localhost:3001/add-product", {
//       method: "post",
//       body: JSON.stringify({
//        // product,
//         productAvalibility,
//         productQuantity
//       }),
//       headers: {
//         "content-Type": "application/json",
//       },
//     });
//     result = await result.json();
//     if (result) {
//       swal.fire({
//         icon: "success",
//         title: "Added!",
//         text: "Data is added successfully!",
//         showConfirmButton: true,
//       });
//     } else {
//       console.warn("data not inserted");
//       console.log("data not inserted");
//     }
//   };

  
//   const AddProduct = async () => {
//     try {
//       if (
//         !product ||
//         !productAvalibility ||
//         !productQuantity
//       ) {
//         return swal.fire({
//           icon: "error",
//           title: "error!",
//           text: "All fields are required",
//           showConfirmButton: true,
//         });
//       } else {
//         productTypee.forEach((type) => {
//           if (type.productName === product) {
//             console.log("product called");
//             hasErrorProduct = "true";
//             console.warn(hasErrorProduct);
//             // setErrorProduct(true)
//             // console.warn(errorProduct)
//             prodType = type._id;
//           }
//         });
      
//         if (
//           hasErrorProduct === "true" &&
//           hasCompanyError === "true" &&
//           hasColorError == "true" &&
//           hasStorageError === "true"
//         ) {
//           console.warn(hasErrorProduct);
//           console.warn(hasCompanyError);
//           console.warn("data inserted");

//          // AddRecord(prodType, productColor, productCompany);
//           hasErrorProduct = "false";
//           hasCompanyError = "false";
//           hasColorError = "false";
//           hasStorageError = "false";
//         } else {
//           console.warn(hasErrorProduct);
//           console.warn(hasCompanyError);
//           // console.warn(hasColorError);
//           // console.warn(hasCompanyError)
//           // console.warn(hasStorageError);
//           navigate("/record");
//           console.warn("data cannot be added");
//           return swal.fire({
//             icon: "error",
//             title: "error!",
//             text: "Data does not exist in product Type",
//             showConfirmButton: true,
//           });
//         }
//       }
//       navigate("/record");
//     } catch (err) {
//       console.warn(err);
//     }
//   };
//   return (
//     <>
//       (
//         <Modal open dimmer="inverted" size="tiny" closeIcon="close">
//           <Modal.Header>Add Product</Modal.Header>
//           <Modal.Content>
//             <Form className={formClassName}>
//               <Form.Group widths="equal">
//                 <Form.Input
//                   label="Product Name"
//                   type="text"
//                   placeholder="-- Enter Product Type --"
//                   name="productType"
//                   maxLength="40"
//                   required
//                   value={product}
//                   onChange={(e) => setProductName(e.target.value)}
//                 />

//                 <Form.Input
//                   label="Product Availibility"
//                   type="text"
//                   placeholder="-- Enter Product Availibility --"
//                   name="productCode"
                
//                   required
//                   value={productAvalibility}
//                   onChange={(e) => setProductAvailibility(e.target.value)}
//                 />
//               </Form.Group>
             
             
//                 <Form.Input
//                   label="Product Quantity"
//                   type="number"
//                   placeholder="-- Enter Product Quantity --"
//                   name="currPrice"
//                   minLength="0"
//                   required
//                   value={productQuantity}
//                   onChange={(e) => setProductQuantity(e.target.value)}
//                 />
               
//               <Button
//                 color={"green"}
//                 onClick={AddProduct}
//                 type="button"
//                 className="button"
//                 floated="right"
//               >
//                 Add Product
//               </Button>
//               <Button
//                 color={"green"}
//                 onClick={backPage}
//                 type="button"
//                 className="button"
//                 floated="left"
//               >
//                 Back
//               </Button>
//               {/* <Button color={buttonColor} floated="right">
//         {buttonSubmitTitle}
//       </Button> */}
//               <br />
//               <br /> {/* Yikes! Deal with Semantic UI React! */}
//             </Form>
//           </Modal.Content>
//         </Modal>
//       ) : (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             alignSelf: "center",
//             height: "100vh",
//             backgroundColor: "white",
//           }}
//         >
//           <Segment>
//             <Loader active />

//             <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
//           </Segment>
//         </div>
//       )
//     </>
//   );
// };

// export default LocationFormm;