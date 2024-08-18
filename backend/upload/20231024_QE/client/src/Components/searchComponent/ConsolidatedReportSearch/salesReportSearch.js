export const searchSalesConsolidatednvoiceData = async (
  dataArray,
  shopNoValue,
  salesCodeValue,
  salesCOmpanyValue,
  salesStartingDate,
  salesEndingDate
) => {
  //Function to Add shopNo & Created At in nested Products Array
  const modifiedDataArray = dataArray?.map((item) => {
    //Deconstruct items From the main Array
    const { shopNo, createdAt, products } = item;

    // Add shopNo and createdAt properties to each nested product
    const productsWithShopAndDate = products?.map((product) => ({
      ...product,
      shopNo,
      createdAt,
    }));

    //Return the New Array with added Products
    return productsWithShopAndDate;
  });

  console.log(modifiedDataArray)
  // // Combine all arrays into a single array using reduce and spread operator
  const combinedArray = modifiedDataArray?.reduce(
    (acc, curr) => [...acc, ...curr],
    []
  );

  let Filtered = combinedArray?.filter((product) => {
    //Filter by Shop No
    if (shopNoValue && !product?.shopNo?.includes(shopNoValue)) {
      return false;
    }

    //  Filter by product Code
    if (salesCodeValue && !product?.Code?.includes(salesCodeValue)) {
      return false;
    }

    // Filter by product Company
    if (salesCOmpanyValue && !product?.Company?.includes(salesCOmpanyValue)) {
      return false;
    }

    //   //Filter by Starting Date
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
  });

  return Filtered;
};
