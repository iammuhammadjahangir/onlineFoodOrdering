import React, { useState, useEffect } from "react";
import style from "./rolesStyle.css";
import AddIcon from "@mui/icons-material/Add";
import ClearAllIcon from "@mui/icons-material/ClearAll";
// import { postRoles } from "../../../api/index";

import {
  TextField,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography,
  Modal,
  Button,
  Box,
} from "@mui/material";

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const NewRole = () => {
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");

  //To handle data saved
  const handleSubmit = async () => {
    const data = { roleName, roleDescription };
    // const result = await postRoles(data);
    // console.log(result);
  };
  return (
    <Box sx={boxStyle}>
      <Typography variant="h5" sx={{ textAlign: "left" }}>
        Add Role
      </Typography>
      <Box
        className={style.flexDirection}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "50px",
          marginTop: "30px",
        }}
      >
        <TextField
          id="outlined-basic"
          type="text"
          label="Role Name"
          variant="outlined"
          size="small"
          name="roleName"
          value={roleName}
          onChange={(e) => {
            setRoleName(e.target.value);
          }}
          sx={{ flex: 1, width: "100%" }}
        />
        <TextField
          id="outlined-basic"
          type="text"
          label="Role Description"
          variant="outlined"
          size="small"
          name="roleDescription"
          value={roleDescription}
          onChange={(e) => {
            setRoleDescription(e.target.value);
          }}
          sx={{ flex: 1, width: "100%" }}
        />
        {
          // still have to add dublicate functionality error
        }
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <Button
          variant="outlined"
          endIcon={<ClearAllIcon />}
          onClick={() => {
            setRoleName("");
            setRoleDescription("");
          }}
        >
          Clear
        </Button>
        <Button
          variant="outlined"
          endIcon={<AddIcon />}
          onClick={() => {
            handleSubmit();
          }}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default NewRole;
