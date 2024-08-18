export const searchSaleRecord = (
  SalesRecord,
  InvoiceNumber,
  custName,
  selectedDate,
  selectEndDate
) => {
  // console.log(SalesRecord);
  let filtered = SalesRecord?.filter((sales) => {
    // Filter by invoice number
    if (InvoiceNumber && sales.id !== InvoiceNumber) {
      return false;
    }

    // Filter by sale receipt number
    if (
      custName &&
      !sales.customerName
        .toString()
        .toLowerCase()
        .includes(custName.toString().toLowerCase())
    ) {
      return false;
    }
    // Filter by starting date
    if (selectedDate) {
      const saleDate = new Date(sales.createdAt);
      if (saleDate < selectedDate) {
        return false;
      }
    }

    // Filter by ending date
    if (selectEndDate) {
      const saleDate = new Date(sales.createdAt);
      if (saleDate > selectEndDate) {
        return false;
      }
    }

    return true;
  });

  // console.log(filtered);

  return filtered;
};
