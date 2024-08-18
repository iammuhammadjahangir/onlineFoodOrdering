import { API } from "../api/index.jsx";
export const historyRates = async (timeperiod) => {
  try {
    const link = `/api/historicalRatesPastYear/get/${timeperiod}`;
    // console.log("Helllo");
    const { data } = await API.get(link);
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
