export const ProfitEmpoloyee = (data, salesProductSaleByDropDown, salesStartingDate,
  salesEndingDate) => {
    const modifiedDataArray = data?.map((item) => {
        //Deconstruct items From the main Array
        const {saleBy, shopNo, createdAt, products } = item;
    
        // Add shopNo and createdAt properties to each nested product
        const productsWithShopAndDate = products?.map((product) => ({
          ...product,
          saleBy,
          createdAt
        }));
    
        //Return the New Array with added Products
        return productsWithShopAndDate;
      });
 
      const combinedArray = modifiedDataArray?.reduce(
        (acc, curr) => [...acc, ...curr],
        []
      );

       
       
      let Filtered = combinedArray?.filter((product) => {
        if (salesProductSaleByDropDown && !product?.saleBy?.includes(salesProductSaleByDropDown)) {
            console.log('callde')
            return false;
          }
          if (salesStartingDate) {
            const transferDate = new Date(salesStartingDate);
            const productDate = new Date(product.createdAt);
      
            if (productDate < transferDate) {
              return false;
            }
          }
      
          //   //Filter by Ending Date
          if (salesEndingDate) {
            const transferDate = new Date(salesEndingDate);
            const productDate = new Date(product.createdAt);
            if (productDate > transferDate) {
              return false;
            }
          }
          return true;
      })

       //   //Filter by Starting Date
  
      return Filtered;
}