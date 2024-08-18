import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import AddIcon from "@mui/icons-material/Add";
import style from "./tasksStyle.css";
import { Modal, Button, Box } from "@mui/material";
import { getTasks } from "../../../api/index";
import TableComponent from "../../../components/TableComponent/tableComponent";
import NewTasks from "./newTasks";

const TasksTable = () => {
  //General UseStates
  const [tasksData, setTasksData] = useState("");
  const [loading, setLoading] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getTasksData();
  }, []);

  const getTasksData = async () => {
    const record = await getTasks();
    setTasksData(record.data.data);
    setLoading(false);
    console.log(record.data.data);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const columnsRole = [
    { id: "taskName", label: "Name" },
    { id: "taskDescription", label: "Description" },
  ];

  const columnActions = [
    {
      //   id: `${checkedforActions}`,
      color: "white",
      url: (itemId) => `/update/${itemId}`,
      backgroundColor: "#1976d2",
      align: "column.align",
      minWidth: "100",
      label: "Purchase Report",
    },
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
            <TableComponent
              props={{
                data: tasksData,
                columns: columnsRole,
                //   action: actionsForTradeReport,
                //   handleChildButtonClick: handleChildButtonClickForTradeReport,
                //   handlePrint: handlePrintTrade,
              }}
            />
          ) : (
            <Box sx={{ marginTop: "50%", textAlign: "center" }}>
              <RotatingLines
                strokeColor="grey"
                strokeWidth="3"
                animationDuration="0.75"
                width="40"
                visible={true}
              />
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
              getTasksData: getTasksData,
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default TasksTable;
