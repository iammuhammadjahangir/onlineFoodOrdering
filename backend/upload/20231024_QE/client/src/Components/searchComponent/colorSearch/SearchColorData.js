import React, { useContext, useState, useEffect } from "react";
export const SearchColorData = async (pr, colorName) => {
  console.log(pr)
  console.log(colorName)

  let Filtered= []
  if(colorName){
    Filtered = pr?.filter((colors) => {
      //Filter by Products

      if (
        colorName &&
        !colors?.colorName
          .toString()
          .toLowerCase()
          .includes(colorName.toString().toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }
  
  console.log(Filtered)
  return Filtered;
};
