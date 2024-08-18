export const searchPurchaseData = async (
  pr,
  code,
  Products,
  productCode,
  productType,
  producttCompany,
  storeSorting
) => {

  let Filtered= []
  if(productType && productCode && producttCompany && storeSorting){
    Filtered = Products?.filter((product) => {
      //Filter by Products
      if (
        productCode &&
        !product?.product?.productCode
          .toString()
          .toLowerCase()
          .includes(productCode.toString().toLowerCase())
      ) {
        return false;
      }
  
      //Filter by product Type
      if (
        productType &&
        !product?.product?.productTypeName?.productName
          .toString()
          .toLowerCase()
          .includes(productType.toString().toLowerCase())
      ) {
        return false;
      }
  
      //Filter by Product Company
      if (
        producttCompany &&
        !product?.product?.productCompany?.companyName
          .toString()
          .toLowerCase()
          .includes(producttCompany.toString().toLowerCase())
      ) {
        return false;
      }
  
      //Filter by Product Storage
      if (
        storeSorting &&
        !product?.productAvalibility?.storageCode
          .toString()
          .toLowerCase()
          .includes(storeSorting.toString().toLowerCase())
      ) {
        return false;
      }
  
      return true;
    });
  }else
    if(productType && productCode && producttCompany)
    {
      Filtered = Products?.filter((product) => {
        //Filter by Products
        if (
          productCode &&
          !product?.product?.productCode
            .toString()
            .toLowerCase()
            .includes(productCode.toString().toLowerCase())
        ) {
          return false;
        }
    
        //Filter by product Type
        if (
          productType &&
          !product?.product?.productTypeName?.productName
            .toString()
            .toLowerCase()
            .includes(productType.toString().toLowerCase())
        ) {
          return false;
        }
    
        //Filter by Product Company
        if (
          producttCompany &&
          !product?.product?.productCompany?.companyName
            .toString()
            .toLowerCase()
            .includes(producttCompany.toString().toLowerCase())
        ) {
          return false;
        }
    
        return true;
      });
    }
    else 
      if(productType && productCode)
      {
        Filtered = Products?.filter((product) => {
          //Filter by Products
          if (
            productCode &&
            !product?.product?.productCode
              .toString()
              .toLowerCase()
              .includes(productCode.toString().toLowerCase())
          ) {
            return false;
          }
      
          //Filter by product Type
          if (
            productType &&
            !product?.product?.productTypeName?.productName
              .toString()
              .toLowerCase()
              .includes(productType.toString().toLowerCase())
          ) {
            return false;
          }
      
          return true;
        });
      }
      else
        if(producttCompany && productCode){
          Filtered = Products?.filter((product) => {
            //Filter by Products
            if (
              productCode &&
              !product?.product?.productCode
                .toString()
                .toLowerCase()
                .includes(productCode.toString().toLowerCase())
            ) {
              return false;
            }
            //Filter by Product Company
            if (
              producttCompany &&
              !product?.product?.productCompany?.companyName
                .toString()
                .toLowerCase()
                .includes(producttCompany.toString().toLowerCase())
            ) {
              return false;
            }
        
            return true;
          });
        }else
        if(producttCompany && productType){
          console.log('called')
          Filtered = Products?.filter((product) => {
            //Filter by Products
            if (
              productType &&
              !product?.product?.productTypeName?.productName
                .toString()
                .toLowerCase()
                .includes(productType.toString().toLowerCase())
            ) {
              return false;
            }
        
            //Filter by Product Company
            if (
              producttCompany &&
              !product?.product?.productCompany?.companyName
                .toString()
                .toLowerCase()
                .includes(producttCompany.toString().toLowerCase())
            ) {
              return false;
            }
        
            return true;
          });
        }
        else
        if(producttCompany)
        {
          console.log('called')
          Filtered = Products?.filter((product) => {
            //Filter by Product Company
            if (
              producttCompany &&
              !product?.product?.productCompany?.companyName
                .toString()
                .toLowerCase()
                .includes(producttCompany.toString().toLowerCase())
            ) {
              return false;
            }
        
            return true;
          });
        }
        else
        if(productType)
        {
          console.log('called2')
          Filtered = Products?.filter((product) => {
            //Filter by Product Company
            if (
              productType &&
              !product?.product?.productTypeName?.productName
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
          console.log('called1')
          console.log(code)
          console.log(producttCompany)
          console.log(productType)
          Filtered = Products?.filter((product) => {
            //Filter by Products
            if (
              code &&
              !product?.product?.productCode
                .toString()
                .toLowerCase()
                .includes(code.toString().toLowerCase())
            ) {
              return false;
            }
        
            //Filter by product Type
            if (
              productType &&
              !product?.product?.productTypeName?.productName
                .toString()
                .toLowerCase()
                .includes(productType.toString().toLowerCase())
            ) {
              return false;
            }
        
            //Filter by Product Company
            if (
              producttCompany &&
              !product?.product?.productCompany?.companyName
                .toString()
                .toLowerCase()
                .includes(producttCompany.toString().toLowerCase())
            ) {
              return false;
            }

            if (
              storeSorting &&
              !product?.productAvalibility?.storageCode
                .toString()
                .toLowerCase()
                .includes(storeSorting.toString().toLowerCase())
            ) {
              return false;
            }
        
            return true;
          });
        }
  

  return Filtered;
};
