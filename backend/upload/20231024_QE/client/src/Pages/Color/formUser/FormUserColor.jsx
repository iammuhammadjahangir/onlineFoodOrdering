import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Select, Modal, Message } from "semantic-ui-react";
import swal from "sweetalert2";
// import { AddColor,getcolor,useTranslationForFunctions  } from "../../../Api";
import { useTranslation, initReactI18next } from "react-i18next";
import "../colorCss/color.css";
import MetaData from "../../../MetaData";
import Stack from "@mui/material/Stack";
import { TextField, Typography, Box, ButtonGroup } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { getColor, postColor } from "../../../actions/colorAction";
import { refreshTokken } from "../../../actions/userAction";
import { Loader } from "semantic-ui-react";
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
import { SearchColorData } from "../../../Components/searchComponent/colorSearch/SearchColorData";
let productMatch = "false";
let colors = [];
let isCalled = "false";
const FormUserColor = () => {
  // const translationFunctions = useTranslationForFunctions();
  const [colorName, setColorName] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const [colorDescription, setColorDescription] = useState();
  const [formClassName, setformClassName] = useState();
  const [error, setError] = React.useState();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  // const { color } = useSelector((state) => state.color);
  const { colorRes } = useSelector((state) => state.colorRes);
  const { loading, color } = useSelector((state) => state.color);
  const [data, setData] = useState()
  const [colorLoading, setColorLoading] = useState()
  const backPage = async () => {
    navigate("/color");
  };

  useEffect(() => {
    isCalled = "false";
  }, [isCalled, colorName, colorDescription]);

  useEffect(() => {
    console.log(isCalled);
    if (isCalled === "false") {
      console.log("hfie");
      isCalled = "true";
      getToken();
    }
  }, [isCalled, colorName, colorDescription]);
  const getToken = async () => {
    const token = await refreshTokken();
    if (token.data === "Please login to acces this resource") {
      navigate("/login");
    }
  };

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  useEffect(() => {
    productMatch = "false";
  });

  const handleSubmit = async () => {
    if (!colorName || !colorDescription) {
      return swal.fire({
        icon: "error",
        title: t("titleError"),
        text: t("textAllFieldsAreRequired"),
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    } else {
      color.map((colorr) => {
        const colorNam = colorr.colorName
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase();
        const colorDesscription = colorr.colorDescription
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase();
        if (colorNam === colorName.replace(/\s+/g, " ").trim().toLowerCase()) {
          productMatch = "true";
        }
      });
    }

    if (productMatch === "true") {
      return swal.fire({
        icon: "error",
        title: t("titleError"),
        text: t("dataIsAlreadyAvailable"),
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    } else {
      setButtonClicked(true);
      // dispatch(postColor(colorName, colorDescription))
      const response = await postColor(colorName, colorDescription);
      console.log(response);
      if (response) {
        navigate("/color");
        return swal.fire({
          icon: "success",
          title: t("titleAdded"),
          text: t("successMessage"),
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: "custom-swal-popup", // This is the custom class you're adding
          },
        });
      }
      // AddColor(colorName, colorDescription, t,translationFunctions);
    }
  };

  useEffect(() => {
    if (color?.length > 0) {
      console.log(color);
      setData(color);
      setColorLoading(false);
    }
  }, [ color]);

  const handleSearch = async (colorName) => {
    console.log(colorName);
    const dataa = await SearchColorData(color, colorName);
    // console.warn(dataa);
    setData(dataa);
  };


  const columns = [
    { field: "colorName", label: t("colorName") },
    { field: "colorDescription", label: t("colorDescription") },
  ];
  return (
    <>
      <MetaData title="QE ~~AddColors" />
      <div className={`color ${colorTheme}`}>
        <div className="formInput">
        <div className="color-form-table-container">
          {!colorLoading && color !== "No Record Found" ? (
            <TableComponentId
              data={data}
              columns={columns}
            />
          ) : (
            <Loader active>Loading</Loader>
          )}
        </div>
          <div className="row">
            <div className="form1">
              <label>{t("productName")}</label>
              <input
                label={t("colorName")}
                type="text"
                placeholder={t("enterColorName")}
                name="productType"
                autoComplete="off"
                maxLength="40"
                required
                value={colorName}
                onChange={(e) => {
                  setColorName(e.target.value)
                  handleSearch(e.target.value)}}
              />
            </div>
            <div className="form1">
              <label>{t("colorDescription")}</label>
              <input
                label={t("colorDescription")}
                type="text"
                placeholder={t("enterColorDescription")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={colorDescription}
                onChange={(e) => setColorDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="colorbuttons">
            <Button
              color={"green"}
              onClick={backPage}
              className="button button-back"
              type="button"
            >
              <ArrowBackIcon />
              &nbsp; &nbsp;&nbsp;{t("back")}
            </Button>
            <Button
              color={buttonClicked ? "green" : "white"}
              onClick={handleSubmit}
              type="button"
              className={`button button-add-product`}
              disabled={buttonClicked}
            >
              {t("add-color")}&nbsp;&nbsp;
              <AddIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormUserColor;
