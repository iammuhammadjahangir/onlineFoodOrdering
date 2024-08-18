export const searchProfitInvoice = async (resultt, shopNo, employeName) => {
  let Filtered = [];
  console.log(resultt);
  console.log(shopNo);
  console.log(employeName);
  Filtered = resultt?.filter((result) => {
    if (
      shopNo &&
      !result?.shopNo
        ?.toString()
        .toLowerCase()
        .includes(shopNo?.toString().toLowerCase())
    ) {
      return false;
    }
    if (
      employeName &&
      !result?.employeName

        .toString()
        .toLowerCase()
        .includes(employeName.toLowerCase())
    ) {
      return false;
    }

    console.log("HIHFE");
    return true;
  });
  console.log(Filtered);
  return Filtered;
};
