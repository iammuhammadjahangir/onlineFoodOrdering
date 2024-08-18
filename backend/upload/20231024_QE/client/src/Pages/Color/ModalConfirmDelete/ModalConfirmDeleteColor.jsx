// import React, { Component, useState } from "react";
// import { Button, Modal } from "semantic-ui-react";
// import axios from "axios";

// const ModalConfirmDeleteColor = () => {
//   const [modelOpen, setmodelOpen] = useState(false);

//   const handleClose = (e) => setmodelOpen(false);
//   const handleOpen = (e) => setmodelOpen(true);

//   const handleSubmit = (e) => {
//     let params = e.target.getAttribute("data-userID");

//     axios({
//       method: "delete",
//       responseType: "json",
//       url: `${this.props.server}/api/users/${params}`,
//     })
//       .then((response) => {
//         handleClose();
//         props.onUserDeleted(response.data.result);
//         props.socket.emit("delete", response.data.result);
//       })
//       .catch((err) => {
//         handleClose();
//         throw err;
//       });
//   };

//   return (
//     <Modal
//       trigger={
//         <Button onClick={handleOpen} color={props.buttonColor}>
//           {props.buttonTriggerTitle}
//         </Button>
//       }
//       open={modelOpen}
//       onClose={handleClose}
//       dimmer="inverted"
//       size="tiny"
//     >
//       <Modal.Header>{props.headerTitle}</Modal.Header>
//       <Modal.Content>
//         <p>
//           Are you sure you want to delete{" "}
//           <strong>{this.props.user.name}</strong>?
//         </p>
//       </Modal.Content>
//       <Modal.Actions>
//         <Button onClick={handleSubmit} data-userID={props.user._id} color="red">
//           Yes
//         </Button>
//         <Button onClick={handleClose} color="black">
//           No
//         </Button>
//       </Modal.Actions>
//     </Modal>
//   );
// };

// export default ModalConfirmDeleteColor;
