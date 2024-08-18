import React, { useContext, useState, useEffect } from "react";
export const SearchCompanyData = async (pr, companyName) => {
  console.log(pr)
  console.log(companyName)

  let Filtered= []
  if(companyName){
    Filtered = pr?.filter((company) => {
      //Filter by Products

      if (
        companyName &&
        !company?.companyName
          .toString()
          .toLowerCase()
          .includes(companyName.toString().toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }
  
  console.log(Filtered)
  return Filtered;
};
