import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import AddIcon from "@mui/icons-material/Add";
import style from "./tasksStyle.css";
import { Modal, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {getTask } from "../../../actions/taskAction"
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
import { useTranslation, initReactI18next } from "react-i18next";
import NewTasks from "./newTasks";

const TasksTable = () => {
  //General UseStates
  const dispatch = useDispatch()
  const {t, i18n}=useTranslation();
  const [open, setOpen] = useState(false);
  const { loading, task } = useSelector((state)=> state.task)

  useEffect(() => {
    call();
  }, [open]);

  async function call() {
    try {
      dispatch(getTask())
      console.log(task)
    } catch (err) {}
  }


  const handleClose = () => {
    setOpen(!open);
  };

  const columns = [
    { field: "taskName", label: t("colorName") },
    { field: "taskDescription", label: t("colorDescription") },
  ];


  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "85%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "40px",
          }}
        >
          <h1>Tasks</h1>
          <Button
            variant="outlined"
            endIcon={<AddIcon />}
            onClick={() => {
              setOpen(true);
            }}
          >
            Add Tasks
          </Button>
        </Box>
        <Box>
          {!loading ? (
            <TableComponentId
            data={task}
            columns={columns}
            />
          ) : (
            <Box sx={{ marginTop: "50%", textAlign: "center" }}>
              <Loader active>Loading</Loader>
            </Box>
          )}
        </Box>
      </Box>
      {/* //call the model for onclick on add role */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.modelStyle}>
          <NewTasks
            props={{
              open: open,
              setOpen: setOpen,
              getTasksData: task,
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default TasksTable;
