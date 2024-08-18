export const ReportSearch = (data, searchValue) => {
  console.log(searchValue);
  let Filtered = data?.filter((record) => {
    //For customerID
    if (searchValue) {
      const lowerCaseSearchValue = searchValue.toString().toLowerCase();

      if (
        record.customerId
          .toString()
          .toLowerCase()
          .includes(lowerCaseSearchValue)
      ) {
        return true;
      }

      if (record.cnic.toString().toLowerCase().includes(lowerCaseSearchValue)) {
        return true;
      }

      if (
        record.address.toString().toLowerCase().includes(lowerCaseSearchValue)
      ) {
        return true;
      }

      if (
        record.cellNumber
          .toString()
          .toLowerCase()
          .includes(lowerCaseSearchValue)
      ) {
        return true;
      }

      if (record.city.toString().toLowerCase().includes(lowerCaseSearchValue)) {
        return true;
      }

      if (
        record.firstName.toString().toLowerCase().includes(lowerCaseSearchValue)
      ) {
        return true;
      }

      if (
        record.lastName.toString().toLowerCase().includes(lowerCaseSearchValue)
      ) {
        return true;
      }

      if (
        record.phoneNumber
          .toString()
          .toLowerCase()
          .includes(lowerCaseSearchValue)
      ) {
        return true;
      }

      if (
        record.status.toString().toLowerCase().includes(lowerCaseSearchValue)
      ) {
        return true;
      }
    }

    return false;
  });

  return Filtered;
};

export const dateFilterReport = (dataArray, startingDate, endingDate) => {
  console.log(dataArray);
  console.log(startingDate);
  console.log(endingDate);
  let Filtered = dataArray?.filter((product) => {
    //   //Filter by Starting Date
    if (startingDate) {
      const productDate = new Date(product.createdAt);
      const sDate = new Date(startingDate);
      console.log(startingDate);
      console.log(productDate);

      if (productDate < sDate) {
        console.log("greater");
        return false;
      }
    }

    //   //Filter by Ending Date
    if (endingDate) {
      const productDate = new Date(product.createdAt);
      const eDate = new Date(endingDate);
      if (eDate <= productDate) {
        return false;
      }
    }

    return true;
  });

  return Filtered;
};
