import React, { useEffect, useState } from "react";
import { Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import TableTransfer from "../TableTransfer/TableTranfer";
//import TableUser from "../TableUser/TableUser";
//import FormUser from "../FormUser/FormUser";

const App = () => {
  return (
    <div>
      <Container style={{ width: "80%" }}>
        <TableTransfer />
      </Container>
      <br />
    </div>
  );
};

export default App;
