import axios from "axios";

export const fetchDataa = async (colorName, colorDescription) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/color/post`,
      { colorName, colorDescription },
      config
    );
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

/////**** Update and Post Products from Excel to MongoDb Server */

export const updateTableUsingExcelData = async (updatedJokes) => {
  try {
    console.log("called0");
    console.log(updatedJokes);
    const config = { headers: { "Content-Type": "application/json" } };
    const result = await axios.post(
      "/api/product/updateExcelToMongoDB",
      { updatedJokes },
      config
    );

    return result;
  } catch (error) {
    console.log(error.response);
  }
};

export const postNewTableUsingExcel = async (newJokes) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    console.log(newJokes);
    const result = await axios.post(
      "/api/product/postExcelToMongoDB",
      { newJokes },
      config
    );

    return result;
  } catch (error) {
    console.log(error.response);
  }
};

/////**** Update and Post Color from Excel to MongoDb Server */

export const updateColorsTableUsingExcelData = async (updatedJokes) => {
  try {
    console.log("called0");
    console.log(updatedJokes);
    const config = { headers: { "Content-Type": "application/json" } };
    const result = await axios.post(
      "/api/color/updateColorsExcelToMongoDB",
      { updatedJokes },
      config
    );

    return result;
  } catch (error) {
    console.log(error.response);
  }
};

export const postNewColorsTableUsingExcel = async (newJokes) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    console.log(newJokes);
    const result = await axios.post(
      "/api/color/postColorsExcelToMongoDB",
      { newJokes },
      config
    );

    return result;
  } catch (error) {
    console.log(error.response);
  }
};

/////**** Update and Post Company from Excel to MongoDb Server */

export const updateCompanyTableUsingExcelData = async (updatedJokes) => {
  try {
    console.log("called0");
    console.log(updatedJokes);
    const config = { headers: { "Content-Type": "application/json" } };
    const result = await axios.post(
      "/api/company/updateCompanyExcelToMongoDB",
      { updatedJokes },
      config
    );

    return result;
  } catch (error) {
    console.log(error.response);
  }
};

export const postNewCompanyTableUsingExcel = async (newJokes) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    console.log(newJokes);
    const result = await axios.post(
      "/api/company/postCompanyExcelToMongoDB",
      { newJokes },
      config
    );

    return result;
  } catch (error) {
    console.log(error.response);
  }
};

/////**** Update and Post Color from Excel to MongoDb Server */

export const updateProductTypeTableUsingExcelData = async (updatedJokes) => {
  try {
    console.log("called0");
    console.log(updatedJokes);
    const config = { headers: { "Content-Type": "application/json" } };
    const result = await axios.post(
      "/api/productType/updateProductTypeExcelToMongoDB",
      { updatedJokes },
      config
    );

    return result;
  } catch (error) {
    console.log(error.response);
  }
};

export const postNewProductTypeTableUsingExcel = async (newJokes) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    console.log(newJokes);
    const result = await axios.post(
      "/api/productType/postProductTypeExcelToMongoDB",
      { newJokes },
      config
    );

    return result;
  } catch (error) {
    console.log(error.response);
  }
};
