import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MetaData from "../../../MetaData";
import { Button, Form, Select, Modal } from "semantic-ui-react";
import swal from "sweetalert2";
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import { getProductLocation } from "../../../Api";
import { getProductLocationOnId } from "../../../actions/productLocationAction";
import { getProductDetails } from "../../../actions/productActions";
import "../Css/ActualProduct.css";
let br = [];
let pr = [];
const Barcodegenerate = () => {
  const { t } = useTranslation();
  let [barValue, setBarValue] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const ref = useRef();

  useEffect(() => {
    getProductDetailss();
  }, []);

  const backPage = () => {
    navigate("/Record");
  };

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  const generateBarcode = async (id) => {
    // console.warn(id);
  };
  const getProductDetailss = async () => {
    // const resp = await getProductLocationOnId(params.id);
    const resp = await getProductDetails(params.id);
    console.log(resp);
    // console.warn(resp.product.barcodeValue);
    pr = resp;
    barVal();
  };

  const barVal = () => {
    setBarValue(pr?.barcodeValue);
  };

  const pagStyle = `
      @page {
        size: auto;
        margin: 0;
      }
  
      .barcode-page {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 20vh;
      }
  
      .barcode-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }
  
      .product-info {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 0px;
      }
  
      .product-info p {
        margin: 0;
        font-size: 18px;
        font-weight: bold;
        margin-right: 10px;
      }
  
      @media print {
        body {
          margin: 0;
          transform: scale(0.5); /* Adjust the scale value as needed */
        transform-origin: top left;
        }
  
        .pageBreak {
          page-break-before: always;
        }
      }
    `;
  return (
    <>
      <MetaData title="QE ~~UpdateProducts" />
      <div className={`Products ${colorTheme}`}>
        <div className="formInput">
          <div ref={ref} className="barcode-page">
            <div className="barcode-container">
              <div className="product-info">
                <p>{pr?.productName}</p>
                <p>{pr?.productCompany?.companyName}</p>
              </div>
              <Barcode value={barValue} />
            </div>
          </div>
          <div className="productButtons">
            <Button
              onClick={backPage}
              className="button button-back"
              type="button"
            >
              <ArrowBackIcon />
              &nbsp; &nbsp;&nbsp;{t("back")}
            </Button>
            <ReactToPrint
              trigger={() => (
                <Button
                  className={`button button-add-product `}
                  // onClick={barVal}
                >
                  Print
                </Button>
              )}
              content={() => ref.current}
              pageStyle={pagStyle}
              // onBeforePrint={() => window.print()}
            />
            {/* <Button
              onClick={Updateproduct}
              type="button"
              
            >
              {t("updateProduct")}&nbsp;&nbsp;
              <AddIcon />
            </Button> */}
          </div>
        </div>
      </div>
      {/* <MetaData title="QE ~~ViewBarcode" />
      <Modal open dimmer="inverted" size="tiny" closeIcon="close">
        <Modal.Header>Generate Barcode</Modal.Header>
        <Modal.Content>
          <div>
            <style>{pagStyle}</style>
            <div ref={ref} className="barcode-page">
              <div className="barcode-container">
                <div className="product-info">
                  <p>{pr?.productName}</p>
                  <p>{pr?.productCompany?.companyName}</p>
                  <p>{pr?.productColor?.colorName}</p>
                </div>
                <Barcode value={barValue} />
              </div>
            </div>

            <Form className={"product"}>
              <Button
                color={"green"}
                onClick={backPage}
                type="button"
                className="button"
                floated="left"
              >
                Back
              </Button>
              <ReactToPrint
                trigger={() => (
                  <Button
                    color="green"
                    type="button"
                    className="button"
                    floated="right"
                    // onClick={barVal}
                  >
                    Print
                  </Button>
                )}
                content={() => ref.current}
                pageStyle={pagStyle}
                // onBeforePrint={() => window.print()}
              />
              <br />
              <br />
            </Form>
          </div>
        </Modal.Content>
      </Modal> */}
    </>
  );
};

export default Barcodegenerate;
