import React, { useState } from "react";
import style from "./tasksStyle.css";
import AddIcon from "@mui/icons-material/Add";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { postTasks } from "../../../api/index";

import { TextField, Typography, Button, Box } from "@mui/material";

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

const NewTasks = ({ props }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  //To handle data saved
  const handleSubmit = async () => {
    const data = { taskName, taskDescription };
    const result = await postTasks(data);
    props.getTasksData();
    props.setOpen(false);
    console.log(result);
  };
  return (
    <Box sx={boxStyle}>
      <Typography variant="h5" sx={{ textAlign: "left" }}>
        Add Tasks
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
          label="Task Name"
          variant="outlined"
          size="small"
          name="taskName"
          value={taskName}
          onChange={(e) => {
            setTaskName(e.target.value);
          }}
          sx={{ flex: 1, width: "100%" }}
        />
        <TextField
          id="outlined-basic"
          type="text"
          label="Task Description"
          variant="outlined"
          size="small"
          name="taskDescription"
          value={taskDescription}
          onChange={(e) => {
            setTaskDescription(e.target.value);
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
            setTaskName("");
            setTaskDescription("");
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

export default NewTasks;
