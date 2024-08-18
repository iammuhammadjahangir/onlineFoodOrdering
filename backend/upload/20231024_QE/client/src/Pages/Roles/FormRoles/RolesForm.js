import React, { useEffect, useState } from "react";
import {
  Message,
  Button,
  Dropdown,
  Form,
  Select,
  Modal,
} from "semantic-ui-react";
import { useTranslation } from "react-i18next";

import { useParams, useNavigate } from "react-router-dom";
import "../../../Styling/AllStyle.css"
import swal from "sweetalert2";
const RolesForm = () => {
  const { t } = useTranslation();

  const [roleName, setRoleName] = useState();
  const [roleCode, setRoleCode] = useState();
  const [roleDescription, setRoleDescription] = useState();

  const [formSuccessMessage, setformSuccessMessage] = useState();
  const [formErrorMessage, setformErrorMessage] = useState();
  const [onUserAdded, setonUserAdded] = useState();
  const [onUserUpdated, setonUserUpdated] = useState();
  const [error, setError] = React.useState();
  const params = useParams();
  const navigate = useNavigate();

  const backPage = () => {
    navigate("/rolesrecord");
  };

  const AddRole = async () => {
    try {
      if (!roleName || !roleDescription) {
        // console.warn("function called");
      } else {
        // console.warn(roleName, roleDescription);
        // setformClassName("success");
        let result = await fetch(link + "/roles", {
          method: "post",
          body: JSON.stringify({
            roleName,
            roleDescription,
          }),
          headers: {
            "content-Type": "application/json",
          },
        });
        result = await result.json();
        if (result) {
          swal.fire({
            icon: "success",
            title: this("titleAdded"),
            text: this("successMessage"),
            showConfirmButton: true,
            customClass: {
              popup: 'custom-swal-popup', // This is the custom class you're adding
            }
          });
        } else {
          // console.warn("data not inserted");
          // console.log("data not inserted");
        }
      }
      navigate("/rolesrecord");
    } catch (err) {
      // console.warn(err);
    }
  };

  return (
    <Modal open dimmer="inverted" size="tiny" closeIcon="close">
      <Modal.Header>Add Roles</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              label="Role Name"
              type="text"
              placeholder="Enter Godown Code"
              name="roleName"
              maxLength="40"
              required
              autoComplete="off"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Role Description"
              type="text"
              placeholder="Enter Description"
              name="roleDescription"
              maxLength="10"
              required
              autoComplete="off"
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
            />
          </Form.Group>
          {/* <Message
                success
                color="green"
                header="Nice one!"
                content="Product added successfully"
              />
              <Message
                warning
                color="yellow"
                header="Woah!"
                content="Invalid Data or Field must be empty"
              /> */}
          <Button
            color={"green"}
            onClick={AddRole}
            type="button"
            className="button"
            floated="right"
          >
            Add Role
          </Button>
          <Button
            color={"green"}
            onClick={backPage}
            type="button"
            className="button"
            floated="left"
          >
            Back
          </Button>
          {/* <Button color={buttonColor} floated="right">
            {buttonSubmitTitle}
          </Button> */}
          <br />
          <br /> {/* Yikes! Deal with Semantic UI React! */}
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default RolesForm;
