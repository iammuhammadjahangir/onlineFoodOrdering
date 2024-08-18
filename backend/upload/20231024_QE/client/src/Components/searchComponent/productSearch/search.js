import React, { useContext, useState, useEffect } from "react";
export const searchData = async (pr, code, productCode, productType, prodCompany) => {
  console.log(pr)
  console.log(productCode)
  console.log(code)
  console.log(productType)
  let Filtered= []
  if(productType && productCode){
    console.log('called one')
   Filtered = pr?.filter((product) => {
      //Filter by Products
      
      if (
      productCode &&
      !product?.productCode?.toString()
        .toLowerCase()
        .includes(productCode?.toString().toLowerCase())
    ) {
      return false;
    }

      if (
        productType &&
        !product?.productTypeName?.productName
          .toString()
          .toLowerCase()
          .includes(productType.toString().toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    
  }else
  if(productType){
    Filtered = pr?.filter((product) => {
      //Filter by Products

      if (
        productType &&
        !product?.productTypeName?.productName
          .toString()
          .toLowerCase()
          .includes(productType.toString().toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }
  else{
   Filtered = pr?.filter((product) => {
    //Filter by Products
    
    if (
      code &&
      !product.productCode?.toString().toLowerCase()
        .includes(code?.toString().toLowerCase())
    ) {
      return false;
    }

    // if (
    //   productCode &&
    //   !product?.productCode?.toString()
    //     .toLowerCase()
    //     .includes(productCode?.toString().toLowerCase())
    // ) {
    //   return false;
    // }

    
    //Filter by product Type
    if (
      productType &&
      !product?.productTypeName?.productName
        .toString()
        .toLowerCase()
        .includes(productType.toString().toLowerCase())
    ) {
      return false;
    }

    //Filter by Product Company
    if (
      prodCompany &&
      !product.productCompany.companyName
        .toString()
        .toLowerCase()
        .includes(prodCompany.toString().toLowerCase())
    ) {
      return false;
    }

    return true;
  });
}
  console.log(Filtered)
  return Filtered;
};
