import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Select, Modal } from "semantic-ui-react";
import { useCustomState } from "../../../Variables/stateVariables";
import MetaData from "../../../MetaData";
// import { getCompanyDetail, updateCompanyData } from "../../../Api";
import swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import "../../../Styling/AllStyle.css";
import Stack from "@mui/material/Stack";
import { TextField, Typography, Box, ButtonGroup } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import { useSelector, useDispatch } from "react-redux";
import {
  getCompanyDetails,
  updateCompany,
} from "../../../actions/companyAction";
import { refreshTokken } from "../../../actions/userAction";
import "../companyCss/company.css";
let isCalledd = "false";
const UpdateCompany = () => {
  const { companyName, setcompanyName, companyAddress, setCompanyAddress } =
    useCustomState();
  const dispatch = useDispatch();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { companyDetails } = useSelector((state) => state.companyDetails);
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    isCalledd = "false";
  }, [isCalledd, companyName, companyAddress, companyDetails]);

  useEffect(() => {
    console.log(isCalledd);
    if (isCalledd === "false") {
      console.log("hfie");
      isCalledd = "true";
      getToken();
    }
  }, [isCalledd, companyName, companyAddress, companyDetails]);

  const getToken = async () => {
    const token = await refreshTokken();
    if (token.data === "Please login to acces this resource") {
      navigate("/login");
    }
  };

  useEffect(() => {
    call();
  }, []);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  const backPage = () => {
    navigate("/company");
  };

  async function call() {
    dispatch(getCompanyDetails(params.id));
    // const resp = await getCompanyDetail(params.id);
    // console.warn(resp);
    // setcompanyName(resp.companyName);
    // setCompanyAddress(resp.address);
  }
  useEffect(() => {
    if (companyDetails) {
      setcompanyName(companyDetails.companyName);
      setCompanyAddress(companyDetails.address);
    }
  }, [companyDetails]);

  const UpdateCompany = async () => {
    if (!companyName || !companyAddress) {
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
      // dispatch(updateCompany(params.id,companyName,companyAddress))
      const response = await updateCompany(
        params.id,
        companyName,
        companyAddress
      );
      console.log(response);
      if (response) {
        navigate("/company");
        return swal.fire({
          icon: "success",
          title: t("titleUpdated"),
          text: t("recordUpdated"),
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: "custom-swal-popup", // This is the custom class you're adding
          },
        });
      }
    }
  };

  return (
    <>
      <MetaData title="QE ~~UpdateCompany" />
      <div className={`company ${colorTheme}`}>
        <div className="formInput">
          <div className="row">
            <div className="form1">
              <label>{t("companyName")}</label>
              <input
                type="text"
                placeholder={t("enterCompanyName")}
                name="productType"
                autoComplete="off"
                maxLength="40"
                required
                value={companyName}
                onChange={(e) => setcompanyName(e.target.value)}
              />
            </div>
            <div className="form1">
              <label>{t("companyAddress")}</label>
              <input
                label={t("enterCompanyAddress")}
                type="text"
                placeholder={t("enterColorDescription")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="companyButtons">
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
              className={`button button-add-product`}
              onClick={UpdateCompany}
              type="button"
            >
              {t("updateCompany")}&nbsp;&nbsp;
              <AddIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
    // <Modal open dimmer="inverted" size="tiny" closeIcon="close">
    //   <Stack  backgroundColor="#ECECEC">
    //     <Stack spacing={2} direction="row" marginLeft={2} alignItems="center" marginTop={1}>
    //       <Typography variant="h5" gutterBottom style={{ color: "#000000"}}>{t("updateCompany")}</Typography>
    //     </Stack>
    //   {/* <Modal.Header>{t("updateColor")}</Modal.Header> */}
    //   <Stack padding={3}>
    //   <Modal.Content>
    //     <Form className={"company"}>
    //       <Form.Group widths="equal">
    //         <Form.Input
    //           label={t("companyName")}
    //           type="text"
    //           placeholder={t("enterCompanyName")}
    //           name="comapnyName"
    //           autoComplete="off"
    //           maxLength="40"
    //           required
    //           value={companyName}
    //           onChange={(e) => setcompanyName(e.target.value)}
    //         />
    //         <Form.Input
    //           label={t("companyAddress")}
    //           type="text"
    //           placeholder={t("enterCompanyAddress")}
    //           name="companAddress"
    //           maxLength="40"
    //           autoComplete="off"
    //           required
    //           value={companyAddress}
    //           onChange={(e) => setCompanyAddress(e.target.value)}
    //         />
    //       </Form.Group>

    //       <Button
    //         color={"green"}
    //         onClick={UpdateCompany}
    //         type="button"
    //         style={{fontSize: "17px", paddingLeft: "10px", paddingRight: "5px", paddingTop: "5px", paddingBottom: "5px" }}
    //         className="button"
    //         floated="right"
    //       >
    //         {t("updateCompany")}&nbsp;&nbsp;<UpdateIcon />
    //       </Button>
    //       <Button
    //         color={"green"}
    //         onClick={backPage}
    //         style={{fontSize: "17px", paddingLeft: "5px", paddingRight: "10px", paddingTop: "5px", paddingBottom: "5px" }}
    //         type="button"
    //         className="button"
    //         floated="left"
    //       >
    //         <ArrowBackIcon />&nbsp;{t("back")}
    //       </Button>
    //       <br />
    //       <br />
    //     </Form>
    //   </Modal.Content>
    //   </Stack>
    //   </Stack>
    // </Modal>
  );
};

export default UpdateCompany;
