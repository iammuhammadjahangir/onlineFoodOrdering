export const searchProductData = async (
  Products,
  code,
  productType,
  productCompany
) => {
  let Filtered = [];
  console.log(Products);
  console.log(code);
  console.log(productType);
  console.log(productCompany);
  Filtered = Products?.filter((product) => {
    if (
      productCompany &&
      !product?.productCompany?.companyName
        .toString()
        .toLowerCase()
        .includes(productCompany.toString().toLowerCase())
    ) {
      return false;
    }
    if (
      code &&
      !product?.productCode
        .toString()
        .toLowerCase()
        .includes(code.toString().toLowerCase())
    ) {
      return false;
    }
    if (
      productType &&
      !product?.productTypeName?.productName
        .toString()
        .toLowerCase()
        .includes(productType.toString().toLowerCase())
    ) {
      return false;
    }

    console.log("HIHFE");
    return true;
  });
  console.log(Filtered);
  return Filtered;
};
