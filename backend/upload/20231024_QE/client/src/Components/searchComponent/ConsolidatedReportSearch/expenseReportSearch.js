export const searchExpenseConsolidatednvoiceData = async (
  dataArray,
  expenseShopNoDropDown,
  expenseCategoryDropDown,
  expenseTypeDropDown,
  expenseStartDateDropDown,
  expenseEndDateDropDown
) => {
  console.log(
    dataArray,
    expenseShopNoDropDown,
    expenseCategoryDropDown,
    expenseTypeDropDown,
    expenseStartDateDropDown,
    expenseEndDateDropDown
  );
  //Function to Add shopNo & Created At in nested Products Array
  const modifiedDataArray = dataArray?.map((item) => {
    //Deconstruct items From the main Array
    const { expenseCategory, expenseLocation, expenses, createdAt } = item;
    const { storageCode } = expenseLocation;

    // Add shopNo and createdAt properties to each nested product
    const productsWithCombinedData = expenses?.map((product) => ({
      ...product,
      storageCode,
      expenseCategory,
      createdAt,
    }));

    //Return the New Array with added Products
    return productsWithCombinedData;
  });

  // Combine all arrays into a single array using reduce and spread operator
  const combinedArray = modifiedDataArray?.reduce(
    (acc, curr) => [...acc, ...curr],
    []
  );
  console.log(combinedArray);
  //   return combinedArray;

  //Filtered Function to add search Functionality
  let Filtered = combinedArray?.filter((product) => {
    //Filter by Shop No
    if (
      expenseShopNoDropDown &&
      !product?.storageCode?.includes(expenseShopNoDropDown)
    ) {
      return false;
    }

    // Filter by expense Category
    if (
      expenseCategoryDropDown &&
      !product?.expenseCategory?.includes(expenseCategoryDropDown)
    ) {
      return false;
    }

    //   // Filter by expense Type
    if (
      expenseTypeDropDown &&
      !product.expenseType.includes(expenseTypeDropDown)
    ) {
      return false;
    }

    //   //Filter by Starting Date
    if (expenseStartDateDropDown) {
      const transferDate = new Date(expenseStartDateDropDown);
      const productDate = new Date(product.createdAt);

      if (productDate < transferDate) {
        return false;
      }
    }

    //   //Filter by Ending Date
    if (expenseEndDateDropDown) {
      const transferDate = new Date(expenseEndDateDropDown);
      const productDate = new Date(product.createdAt);
      if (productDate > transferDate) {
        return false;
      }
    }

    return true;
  });

  console.log(Filtered);
  return Filtered;
};
