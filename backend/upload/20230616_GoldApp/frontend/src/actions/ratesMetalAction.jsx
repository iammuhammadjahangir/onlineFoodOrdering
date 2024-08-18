import { API } from "../api/index.jsx";
export const getGlobalRatesDetails = async () => {
  try {
    const link = `/api/ratesCurrencyMetals/get`;
    // console.log("Helllo");
    const { data } = await API.get(link);
    // console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
