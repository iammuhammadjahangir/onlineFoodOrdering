export const LocationSearch = async (
   Products,
   selectedShop,
   selectedGodown,
   code,
   productType,
   productCompany,
   searchLocation
  ) => {
    let Filtered= []
    console.log(Products)
    Filtered = Products?.filter((product) => {
        if (
            code &&
            !product?.product?.productCode
              .toString()
              .toLowerCase()
              .includes(code.toString().toLowerCase())
          ) {
            console.log('called')
            return false;
          }
        
  

    if (
        productType && !product?.product?.productTypeName?.productName
          .toString()
          .toLowerCase()
          .includes(productType.toString().toLowerCase())
      ) {
        return false;
      }
    

    if (
        productCompany &&
        !product?.product?.productCompany?.companyName
          .toString()
          .toLowerCase()
          .includes(productCompany.toString().toLowerCase())
      ) {
        return false;
      }

      if(selectedShop){
        if (
            searchLocation &&
            !product?.shopAvalibility?.shopCode
              .toString()
              .toLowerCase()
              .includes(searchLocation.toString().toLowerCase())
          ) {
            return false;
          }
      }

      if(selectedGodown){
        if (
            searchLocation &&
            !product?.godownAvalibility?.storageCode
              .toString()
              .toLowerCase()
              .includes(searchLocation.toString().toLowerCase())
          ) {
            return false;
          }
      }

      return true;
    })
  return Filtered;
  }
  