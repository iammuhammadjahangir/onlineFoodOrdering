import React, { useEffect, useState } from "react";
import { Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
//import Godowntable from "../GodownTable/Godowntable";
//import TableUser from "../TableUser/TableUser";
//import FormUser from "../FormUser/FormUser";
import Rolestable from "../RolesTable/Rolestable";

const App = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`role ${colorTheme}`}>
        <div className="contentt-box">
          <div className="heading-container">
            <h3>{t("roles")}</h3>
          </div>
          <div className="excelDiv">
            {JSON.parse(localStorage.getItem("isAdministrator")) ||
              (JSON.parse(localStorage.getItem("isSuperAdmin")) && (
                <Button
                  className="button-styled" /* Apply the CSS class to the button */
                  variant="outlined"
                  color="error"
                  endIcon={<AddOutlinedIcon fontSize="small" color="error" />}
                  onClick={() => {
                    navigate("/rolesform");
                  }}
                >
                  {t(" Add Roles")}
                </Button>
              ))}
          </div>
        </div>
        <Rolestable />
      </div>
    </>
    // <div>
    //   <Container style={{ width: "80%" }}>
    //     <h1>Roles</h1>
    //     <Button
    //       color={"green"}
    //       onClick={() => {
    //         navigate("/rolesform");
    //       }}
    //     >
    //       Add Roles
    //     </Button>
    //     <Rolestable />
    //   </Container>
    //   <br />
    // </div>
  );
};

export default App;
