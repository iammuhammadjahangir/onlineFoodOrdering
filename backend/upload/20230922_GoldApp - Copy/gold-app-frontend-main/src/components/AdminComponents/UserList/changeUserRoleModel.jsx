import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { TextField, Typography, Button, Box } from "@mui/material";
import { UpdateUserRole } from "../../../api";

const ChangeUserRoleModel = ({ props }) => {
  const [role, setRole] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setRole(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(props.roleData._id);
    const result = await UpdateUserRole(props.roleData._id, role);
    props.setOpen(false);
    console.log("submit");
  };

  return (
    <Box sx={{ minWidth: 120, padding: "30px" }}>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="Role"
            onChange={handleChange}
          >
            <MenuItem value={"user"}>User</MenuItem>
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"Administrator"}>Administrator</MenuItem>
          </Select>
        </FormControl>
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
            setRole("");
            props.setOpen(false);
          }}
        >
          Back
        </Button>
        <Button
          variant="outlined"
          endIcon={<AddIcon />}
          onClick={() => {
            handleSubmit();
          }}
        >
          Change Role
        </Button>
      </Box>
    </Box>
  );
};

export default ChangeUserRoleModel;
