import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  FormGroup,
  Input,
  Table,
  FormText,
} from "reactstrap";
import { read, utils } from "xlsx";
import { getProduct } from "../../actions/productActions";
import {
  postNewColorsTableUsingExcel,
  postNewProductTypeTableUsingExcel,
  postNewTableUsingExcel,
  updateColorsTableUsingExcelData,
  updateProductTypeTableUsingExcelData,
  updateTableUsingExcelData,
} from "../../actions/TableToExcelAction";

import { getColorr } from "../../actions/colorAction";
import { getProductTypee } from "../../actions/productTypeAction";
import { useTranslation, initReactI18next } from "react-i18next";
const requiredFields = ["_id", "productName", "productDescription"];
const ProductTypeTableToExcel = () => {
  const [loading, setLoading] = useState(false);
  const [excelRows, setExcelRows] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const [rows, setRows] = useState();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
    }
  }, [colorTheme]);

  const fetchData = async () => {
    setLoading(true);
    const result = await getProductTypee();
    if (result) {
      console.log(result);
      setRows(result);
      setLoading(false);
    }
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    console.log(e.target.files[0]);
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      console.log(reader);
      reader.onload = (e) => {
        const data = e.target.result;
        console.log(data);
        const workbook = read(data, { type: "array" });
        console.log(workbook);
        const sheetName = workbook.SheetNames[0];
        console.log(sheetName);
        const worksheet = workbook.Sheets[sheetName];
        console.log(worksheet);
        const json = utils.sheet_to_json(worksheet);
        console.log("json :", json);
        setExcelRows(json);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const uploadData = async () => {
    setLoading(true);
    const firstItemKeys = excelRows[0] && Object.keys(excelRows[0]);
    let requiredValidation = false;
    console.log(firstItemKeys);
    console.log(requiredFields);
    if (firstItemKeys?.length) {
      requiredFields.forEach((element) => {
        if (!firstItemKeys.find((x) => x === element)) {
          requiredValidation = true;
        }
      });
    }

    // if (requiredValidation) {
    //   alert("Required fields " + JSON.stringify(requiredFields));
    //   setLoading(false);
    //   return;
    // }

    const jokesResponse = await getProductTypee();
    console.log(jokesResponse);
    const jokeList = jokesResponse || [];
    let data = [];

    let postProductsWith_id = [];
    console.log(jokeList);
    if (jokeList === "No Record Found") {
      console.log("calihewitjikelists");
      postProductsWith_id = excelRows.map((obj) => ({
        _id: obj["_id"],
        productName: obj["productName"] || "",
        productDescription: obj["productDescription"] || "",
      }));
    } else {
      console.log("calihe");
      data = excelRows.map((obj) => ({
        _id: jokeList?.find((x) => x._id == obj["_id"])?._id,
        productName: obj["productName"] || "",
        productDescription: obj["productDescription"] || "",
      }));
    }

    console.log(data);
    let updateProductsData = [];
    let postNewProductWithOut_id = [];
    updateProductsData = data.filter((x) => x._id);
    const newJokes = data.filter((x) => !x._id);

    if (updateProductsData?.length > 0) {
      console.log(updateProductsData);
      const result = await updateProductTypeTableUsingExcelData(
        updateProductsData
      );
      if (result) {
        alert(
          "Successfully updated " + updateProductsData.length + " documents"
        );
      }
    }

    const productsWithoutId = newJokes.map(({ _id, ...rest }) => rest);
    console.log(productsWithoutId);
    if (productsWithoutId?.length > 0) {
      const result = await postNewProductTypeTableUsingExcel(productsWithoutId);
      if (result) {
        alert("Successfully added " + productsWithoutId.length + " documents");
      }
    }

    if (postProductsWith_id?.length > 0) {
      console.log(postProductsWith_id);
      const result = await postNewProductTypeTableUsingExcel(
        postProductsWith_id
      );
      if (result) {
        alert(
          "Successfully exported " + postProductsWith_id.length + " documents"
        );
      }
    }
    fetchData();
    setLoading(false);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setExcelRows([]);
    window.location.reload();
  };

  function renderDataTable() {
    return (
      <></>
      // <Table>
      //   <thead>
      //     <tr>
      //       <th>productTypeName</th>
      //       <th>ProductTypeDescription</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {rows === "No Record Found" ? (
      //       <></>
      //     ) : (
      //       <>
      //         {rows?.map((item, id) => (
      //           <tr key={id}>
      //             <td>{item.productName}</td>
      //             <td>{item.productDescription}</td>
      //             <td>
      //               {item.createdAt
      //                 ? new Date(item.createdAt).toLocaleString()
      //                 : ""}
      //             </td>
      //             <td>
      //               {item.updatedAt
      //                 ? new Date(item.updatedAt).toLocaleString()
      //                 : ""}
      //             </td>
      //           </tr>
      //         ))}
      //       </>
      //     )}
      //   </tbody>
      // </Table>
    );
  }

  return (
    <>
      <div className={`tableToExcel ${colorTheme}`}>
        <div className="MainDiv">
          <input
            id="inputEmpGroupFile"
            name="file"
            type="file"
            onChange={readUploadFile}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
          <p>
            {"NOTE: The headers in the Excel file should be as follows!. => "}
            {requiredFields.join(", ")}
          </p>
          <div className="tableToExcelButtons">
            {selectedFile?.name && (
              <Button
                disabled={loading}
                onClick={uploadData}
                className="button button-upload"
                type="button"
              >
                &nbsp; &nbsp;&nbsp;{t("Upload data")}
              </Button>
            )}{" "}
            {selectedFile?.name && (
              <Button
                disabled={loading}
                onClick={removeFile}
                className={`button button-remove`}
              >
                {t("Remove file")}&nbsp;&nbsp;
              </Button>
            )}
            <Button className="button button-upload" onClick={fetchData}>
              Refresh
            </Button>
          </div>
          <div className="table-container">{renderDataTable()}</div>
        </div>
      </div>
      {/* <h3 className="text-center mt-4 mb-4">
        NodeJs & React. Multi Insert and Multi Update from Excel document
      </h3>
      <div style={{ marginLeft: "100px" }} className="container">
        <Row>
          <Col md="6 text-left">
            <FormGroup>
              <Input
                id="inputEmpGroupFile"
                name="file"
                type="file"
                onChange={readUploadFile}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
              <FormText>
                {
                  "NOTE: The headers in the Excel file should be as follows!. => "
                }
                {requiredFields.join(", ")}
              </FormText>
            </FormGroup>
          </Col>
          <Col style={{ marginLeft: "20px" }} md="6 text-left">
            {selectedFile?.name && (
              <Button disabled={loading} color="success" onClick={uploadData}>
                {"Upload data"}
              </Button>
            )}{" "}
            {selectedFile?.name && (
              <Button disabled={loading} color="danger" onClick={removeFile}>
                {"Remove file"}
              </Button>
            )}
          </Col>
        </Row>
        {loading && <progress style={{ width: "100%" }}></progress>}
        <h4 className="mt-4" style={{ color: "lightgray" }}>
          Jokes Table
        </h4>
        <button onClick={fetchData}>Refresh</button>
        {renderDataTable()}
      </div> */}
    </>
  );
};
export default ProductTypeTableToExcel;
