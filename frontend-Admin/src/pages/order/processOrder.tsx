const ProcessOrder = () => {
  return <div></div>;
};

export default ProcessOrder;

// import { useFormik } from "formik";
// import { Fragment, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useTranslation } from "react-i18next";
// import { FaCartArrowDown } from "react-icons/fa";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   returnedTypeDropDown,
//   shippingConpanies,
//   statusDataPropDown,
// } from "../../assets/data";
// import Button from "../../components/button/button";
// import DropDown from "../../components/dropdown/selectDropdown";
// import Input from "../../components/inputs/input";
// import Loader from "../../components/loader/loader";
// import Container from "../../components/mainContainer/container";
// import Heading from "../../components/pageHeading/heading";
// import { updateStatusSchema } from "../../features/schema/orderSchema";
// import { getPermissionsForRole } from "../../redux/api/assignTasks";
// import { useProcessOrderMutation } from "../../redux/api/orderApi";
// import { useUpdateReturnedQuantityMutation } from "../../redux/api/productDetails";
// import { CustomError } from "../../types/types";

// const ProcessOrder = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [canUpdateOrder, setCanUpdateOrder] = useState(false);
//   const [isLoadingArray, setisLoadingArray] = useState(false);
//   const [filteredstatusDataDropDown, setFilteredStatusDataDropDown] =
//     useState(statusDataPropDown);

//   const [processOrder, { isLoading, isError, error, isSuccess }] =
//     useProcessOrderMutation();
//   const [updatedQuantity] = useUpdateReturnedQuantityMutation();

//   console.log(location.state);

//   useEffect(() => {
//     setCanUpdateOrder(false);
//     getPermission();
//   }, []);
//   async function getPermission() {
//     try {
//       const permissionForUpdate = await getPermissionsForRole("Update Order");
//       setCanUpdateOrder(permissionForUpdate);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }

//   useEffect(() => {
//     if (isError) {
//       const err = error as CustomError;
//       toast.error(err.data.message);
//     }
//     if (isSuccess) {
//       toast.success("Order has benn processed");
//       navigate("/orders");
//     }
//   }, [isError, isSuccess]);

//   const initialValues = {
//     statusName: location.state.statusName,
//     statusComment: location.state.statusComment,
//     returnedType: "",
//     ownerShippingFee: 0,
//     TrackingNumber: "",
//     ShippedCompany: "",
//   };

//   const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
//     useFormik({
//       initialValues,
//       validationSchema: updateStatusSchema,
//       validateOnChange: true,
//       validateOnBlur: true,
//       onSubmit: async (values) => {
//         const updatedValues: any = {
//           id: location.state.id,
//           statusName: values.statusName,
//           statusComment: values.statusComment,
//         };

//         if (location.state.statusName === "Confirmed") {
//           updatedValues.ownerShippingFee = values.ownerShippingFee;
//           updatedValues.TrackingNumber = values.TrackingNumber;
//           updatedValues.ShippedCompany = values.ShippedCompany;
//         }

//         if (values.statusName === "Returned") {
//           location.state.items.map((item: any) => {
//             console.log("item", item);
//             const returnedItem: any = {
//               productID: item.productID,
//               shopID: item.shopID,
//               wareHouseID: item.wareHouseID,
//               sizeID: item.sizeID,
//               colorID: item.colorID,
//               materialID: item.materialID,
//               styleID: item.styleID,
//               returnedType: values.returnedType,
//               returnedQuantity: item.purchaseQuantity,
//             };
//             console.log("returned Item", returnedItem);
//             updatedQuantity(returnedItem);

//             // updatedValues.items.push(returnedItem);
//           });
//         }

//         processOrder(updatedValues);
//       },
//     });

//   console.log(values);

//   useEffect(() => {
//     // Update the status data array with the isDisabled property dynamically
//     for (let i = 0; i < statusDataPropDown.length; i++) {
//       if (
//         statusDataPropDown[i].value.toLocaleLowerCase() ===
//         location.state.statusName.toLowerCase()
//       ) {
//         console.log("Matched");
//         console.log(statusDataPropDown[i].value);
//         console.log(location.state.statusName);
//         statusDataPropDown[i].isDisabled = true;
//         break;
//       } else {
//         console.log("else Not Matched");
//         statusDataPropDown[i].isDisabled = true;
//       }
//     }

//     setFilteredStatusDataDropDown([...statusDataPropDown]); // Ensure state update triggers re-render
//     setisLoadingArray(false);
//   }, [location.state.statusName]);

//   console.log(filteredstatusDataDropDown);

//   return (
//     <Fragment>
//       {canUpdateOrder && !isLoadingArray && (
//         <Container>
//           <section className="createColorContainer">
//             <header className="orderHeading">
//               <IoMdArrowRoundBack
//                 onClick={() => {
//                   navigate(-1);
//                 }}
//               />
//               <Heading name={t("processOrder")} />
//             </header>
//             <div className="colorFormContainer">
//               <form onSubmit={handleSubmit}>
//                 <div className="inputFields">
//                   <div className="personalContainer">
//                     <h3>{t("status")}</h3>
//                     <DropDown
//                       options={filteredstatusDataDropDown}
//                       isMulti={false}
//                       name="statusName"
//                       handleChange={handleChange}
//                       handleBlur={handleBlur}
//                       touched={touched?.statusName as any}
//                       errors={errors?.statusName as any}
//                       value={values.statusName}
//                       defaultValue={statusDataPropDown.filter(
//                         (dropDownItem: any) =>
//                           location.state.statusName === dropDownItem.value
//                       )}
//                     />
//                   </div>
//                   {values.statusName === "Returned" && (
//                     <>
//                       <div className="personalContainer">
//                         <h3>{t("returnedType")}</h3>
//                         <DropDown
//                           options={returnedTypeDropDown}
//                           isMulti={false}
//                           name="returnedType"
//                           handleChange={handleChange}
//                           handleBlur={handleBlur}
//                           touched={touched?.returnedType as any}
//                           errors={errors?.returnedType as any}
//                           value={values.returnedType}
//                           defaultValue={null}
//                         />
//                       </div>
//                     </>
//                   )}

//                   {location.state.statusName === "Confirmed" && (
//                     <>
//                       <div className="personalContainer">
//                         <h3>{t("shippingCompany")}</h3>
//                         <DropDown
//                           options={shippingConpanies}
//                           isMulti={false}
//                           name="ShippedCompany"
//                           handleChange={handleChange}
//                           handleBlur={handleBlur}
//                           touched={touched?.ShippedCompany as any}
//                           errors={errors?.ShippedCompany as any}
//                           value={values.ShippedCompany}
//                           defaultValue={null}
//                         />
//                       </div>
//                       <Input
//                         label={t("trackingNumber")}
//                         className=""
//                         type={"number"}
//                         placeholder={t("enterTranckingNumber")}
//                         name="TrackingNumber"
//                         autoComplete="off"
//                         maxLength="40"
//                         required={false}
//                         value={values.TrackingNumber}
//                         onKeyDown={null}
//                         isDisabled={false}
//                         handleChange={handleChange}
//                         handleBlur={handleBlur}
//                         touched={touched?.TrackingNumber}
//                         errors={errors?.TrackingNumber}
//                       />
//                       <Input
//                         label={t("ownerShippingFee")}
//                         className=""
//                         type={"number"}
//                         placeholder={t("enterOwnerShippingFee")}
//                         name="ownerShippingFee"
//                         autoComplete="off"
//                         maxLength="4"
//                         required={false}
//                         value={values.ownerShippingFee}
//                         onKeyDown={null}
//                         isDisabled={false}
//                         handleChange={handleChange}
//                         handleBlur={handleBlur}
//                         touched={touched?.ownerShippingFee}
//                         errors={errors?.ownerShippingFee}
//                       />
//                     </>
//                   )}
//                   <Input
//                     label={t("comment")}
//                     className=""
//                     type={"text"}
//                     placeholder={t("enterColorName")}
//                     name="statusComment"
//                     autoComplete="off"
//                     maxLength="40"
//                     required={false}
//                     value={values.statusComment}
//                     onKeyDown={null}
//                     isDisabled={false}
//                     handleChange={handleChange}
//                     handleBlur={handleBlur}
//                     touched={touched?.statusComment}
//                     errors={errors?.statusComment}
//                   />
//                 </div>
//                 <Button
//                   className="filled"
//                   text={t("processOrder")}
//                   type="submit"
//                   icon={isLoading ? <Loader /> : <FaCartArrowDown />}
//                   isDisabled={
//                     location.state.statusName === values.statusName
//                       ? true
//                       : false
//                   }
//                 />
//               </form>
//             </div>
//           </section>
//         </Container>
//       )}
//     </Fragment>
//   );
// };

// export default ProcessOrder;
