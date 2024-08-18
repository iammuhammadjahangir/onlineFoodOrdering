export const searchTransferConsolidatednvoiceData = async (
  dataArray,
  transferToValue,
  transferCodeValue,
  transferCompanyValue,
  transferStartingDate,
  transferEndingDate
) => {
  //Function to Add shopNo & Created At in nested Products Array
  const modifiedDataArray = dataArray?.map((item) => {
    //Deconstruct items From the main Array
    const { transferTo, createdAt, products } = item;

    // Add shopNo and createdAt properties to each nested product
    const productsWithShopAndDate = products?.map((product) => ({
      ...product,
      transferTo,
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

  let Filtered = combinedArray?.filter((product) => {
    //Filter by Transfer To
    if (transferToValue && !product?.transferTo?.includes(transferToValue)) {
      return false;
    }

    // Filter by product Code
    if (transferCodeValue && !product?.Code?.includes(transferCodeValue)) {
      return false;
    }

    // Filter by product Company
    if (
      transferCompanyValue &&
      !product?.Company?.includes(transferCompanyValue)
    ) {
      return false;
    }

    //Filter by Starting Date
    if (transferStartingDate) {
      const transferDate = new Date(transferStartingDate);
      const productDate = new Date(product.createdAt);

      if (productDate < transferDate) {
        return false;
      }
    }

    //Filter by Ending Date
    if (transferEndingDate) {
      const transferDate = new Date(transferEndingDate);
      const productDate = new Date(product.createdAt);
      if (productDate > transferDate) {
        return false;
      }
    }

    return true;
  });

  return Filtered;
};
