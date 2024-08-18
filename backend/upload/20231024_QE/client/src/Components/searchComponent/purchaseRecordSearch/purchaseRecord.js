export const searchPurchaseRecord = async (
  SalesRecord,
  InvoiceNumber,
  purchaseReceiptNumber,
  purchaseCompany,
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

    // Filter by purchase receipt number
    if (
      purchaseReceiptNumber &&
      !sales.purchaseReceiptNumber
        .toString()
        .toLowerCase()
        .includes(purchaseReceiptNumber.toString().toLowerCase())
    ) {
      return false;
    }

    // Filter by purchase company
    if (
      purchaseCompany &&
      !sales.purchaseCompany
        .toString()
        .toLowerCase()
        .includes(purchaseCompany.toString().toLowerCase())
    ) {
      return false;
    }

    // Filter by customer name
    if (
      custName &&
      !sales.clientName
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
