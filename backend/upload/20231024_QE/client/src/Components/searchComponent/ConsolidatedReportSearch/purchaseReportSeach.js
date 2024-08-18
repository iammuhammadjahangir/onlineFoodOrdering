export const searchPurchaseConsolidatednvoiceData = async (
  dataArray,
  shopNoValue,
  purchaseCodeValue,
  purchaseCOmpanyValue,
  purchaseStartingDate,
  purchaseEndingDate
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

  // // Combine all arrays into a single array using reduce and spread operator
  const combinedArray = modifiedDataArray?.reduce(
    (acc, curr) => [...acc, ...curr],
    []
  );

  //Filtered Function to add search Functionality
  let Filtered = combinedArray?.filter((product) => {
    //Filter by Shop No
    if (shopNoValue && !product?.shopNo?.includes(shopNoValue)) {
      return false;
    }

    // Filter by product Code
    if (purchaseCodeValue && !product?.Code?.includes(purchaseCodeValue)) {
      return false;
    }

    //   // Filter by product Company
    if (
      purchaseCOmpanyValue &&
      !product.Company.includes(purchaseCOmpanyValue)
    ) {
      return false;
    }

    //   //Filter by Starting Date
    if (purchaseStartingDate) {
      const transferDate = new Date(purchaseStartingDate);
      const productDate = new Date(product.createdAt);

      if (productDate < transferDate) {
        return false;
      }
    }

    //   //Filter by Ending Date
    if (purchaseEndingDate) {
      const transferDate = new Date(purchaseEndingDate);
      const productDate = new Date(product.createdAt);
      if (productDate > transferDate) {
        return false;
      }
    }

    return true;
  });

  return Filtered;
};
