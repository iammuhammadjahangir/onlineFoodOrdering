import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Select, Modal } from "semantic-ui-react";

const Updaterole = () => {
  const [roleName, setRoleName] = React.useState();
  const [roleCode, setRoleCode] = React.useState();
  const [roleDescription, setRoleDescription] = React.useState();

  const params = useParams();
  const navigate = useNavigate();

  const backPage = () => {
    navigate("/rolesrecord");
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(link + `/roles/${params.id}`);
    result = await result.json();
    // console.warn(result);
    setRoleName(result.roleName);
    setRoleDescription(result.roleDescription);
  };

  const Updateproduct = async () => {
    // console.warn("hello");

    let result = await fetch(link + `/roles/${params.id}`, {
      method: "Put",
      body: JSON.stringify({
        roleName,

        roleDescription,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    // console.warn(result);
    navigate("/rolesrecord");
  };

  return (
    <Modal open dimmer="inverted" size="tiny" closeIcon="close">
      <Modal.Header>Update Role</Modal.Header>
      <Modal.Content>
        <Form className={"product"}>
          <Form.Group widths="equal">
            <Form.Input
              label="Role Name"
              type="text"
              placeholder="Enter Product Name"
              name="roleName"
              maxLength="40"
              autoComplete="off"
              required
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Role Description"
              type="text"
              placeholder="Enter Role Description"
              name="actPrice"
              autoComplete="off"
              maxLength="40"
              required
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
            />
          </Form.Group>
          {/*<Message
        success
        color="green"
        header="Nice one!"
        content={formSuccessMessage}
      />
      <Message
        warning
        color="yellow"
        header="Woah!"
        content={formErrorMessage}
  />*/}
          <Button
            color={"green"}
            onClick={Updateproduct}
            type="button"
            className="button"
            floated="right"
          >
            Update Product
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
          <br />
          <br />
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default Updaterole;
