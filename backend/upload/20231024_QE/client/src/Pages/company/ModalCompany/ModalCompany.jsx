import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import FormCompany from "../formCompany/FormCompany";

const ModalCompany = (props) => {
  return (
    <Modal
      trigger={
        <Button style={{ backgroundColor: "#F1B248" }}>
          {props.buttonTriggerTitle}
        </Button>
      }
      dimmer="inverted"
      size="tiny"
      closeIcon="close"
    >
      <Modal.Header>{props.headerTitle}</Modal.Header>
      <Modal.Content>
        <FormCompany
          buttonSubmitTitle={props.buttonSubmitTitle}
          buttonColor={props.buttonColor}
          userID={props.userID}
          onUserAdded={props.onUserAdded}
          onUserUpdated={props.onUserUpdated}
        />
      </Modal.Content>
    </Modal>
  );
};

export default ModalCompany;
