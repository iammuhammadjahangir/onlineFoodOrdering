import axios from "axios";
import API from "./baseURL";
export const postEmployeeComssionData = async (
  employeName,
  totalCommission,
  percentage,
  shopNo,
  records
) => {
  try {
    const record = records?.map(
      ({
        Code: productCode,
        Namee: productName,
        Company: productCompany,
        PurchaseQuantity: quantity,
        excludeTaxPrice: Price,
        Discount: discount,
        totalAmounnt: totalPrice,
        taxAmount: taxAmount,
        amount: totalAmount,
        profit: commission,
        ...rest
      }) => ({
        productCode,
        productName,
        productCompany,
        quantity,
        Price,
        discount,
        totalPrice,
        taxAmount,
        totalAmount,
        commission, // Assign a constant value
        ...rest,
      })
    );

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/employeCommission/post",
      {
        employeName,
        totalCommission,
        percentage,
        shopNo,
        record,
      },
      config
    );
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const getEmployeCommission = async () => {
  try {
    const { data } = await axios.get("/api/employeCommission/get");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeCommissionOnId = async (id) => {
  try {
    const { data } = await axios.get(`/api/employeCommission/getPaid/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
