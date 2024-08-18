import React, { useEffect, useState } from "react";
import { Box, Modal, Typography, Button } from "@mui/material";
import style from "./dailyEntryReport.module.css";
import { getCustomerNames, getAssignRolesByIdAndNames } from "../../api";
import { RotatingLines } from "react-loader-spinner";

// import IconButton from "@material-ui/core/IconButton";
// import CloseIcon from "@material-ui/icons/Close";
// import ModalClose from "@mui/joy/ModalClose";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Outlet, useNavigate } from "react-router-dom";

import { getDailyEntry } from "../../api";
import AddIcon from "@mui/icons-material/Add";

import TableComponent from "../../components/TableComponent/tableComponent";
import DailyEntryFrom from "../DailyEntry/DailyEntryFrom";

let dailyentry = [];
let goldInSum = "";
let goldOutSum = "";
let cashInSum = "";
let cashOutSum = "";
let footerAction = "totalDailyEntry";
const DailyEntryReport = () => {
  const navigate = useNavigate();

  const [permissionForViewDailyReport, setPermissionForViewDailyReport] =
    useState(false);
  const [permissionForAddDailyEntry, setPermissionForAddDailyEntry] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [dailyEntryData, setdailyEntryData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDataId, setSelectedDataId] = useState("");
  const [selectedDataCustomerId, setSelectedDataCustomerId] = useState("");
  const [customerData, setCustomerData] = useState("");
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState("");
  const [customerNamesForDropDown, setCustomerNamesForDropDown] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log("called");
    // setOpen(false);
    // Call the async function
    getPermissionForViewReport();
  }, [open]);

  const getDailyEntryData = async () => {
    const response = await getDailyEntry();
    totalValues(response.data);
    setdailyEntryData(response.data);

    const customerName = await getCustomerNames();
    //Function to Return Unique value
    const uniqueCustomersArray = customerName.data?.filter(
      (code, index) => customerName.data.indexOf(code) === index
    );
    setCustomerNamesForDropDown(uniqueCustomersArray);
    // console.log(customerName);

    dailyentry = response.data;
    setLoading(true);
  };
  async function getPermissionForViewReport() {
    try {
      const data = await getAssignRolesByIdAndNames(
        JSON.parse(localStorage.getItem("userRoleId")),
        "View Daily Entry Report"
      );
      // console.log(data.data.status);
      setPermissionForViewDailyReport(data.data.status);
      getPermissionForAddEntry();
      // setLoading(true);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function getPermissionForAddEntry() {
    try {
      const data = await getAssignRolesByIdAndNames(
        JSON.parse(localStorage.getItem("userRoleId")),
        "Add Daily Entry"
      );
      // console.log(data.data.status);
      setPermissionForAddDailyEntry(data.data.status);
      getDailyEntryData();
      // setLoading(true);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const columns = [
    {
      id: "customer.firstName + customer.lastName",
      label: "Name",
      minWidth: 70,
    },
    { id: "customer.cellNumber", label: "Cell Number", minWidth: 100 },
    { id: "customer.city", label: "City", minWidth: 100 },
    { id: "goldIn", label: "Gold In", minWidth: 100 },
    { id: "goldout", label: "Gold Out", minWidth: 100 },
    { id: "cashIn", label: "Cash In", minWidth: 100 },
    { id: "cashout", label: "Cash Out", minWidth: 100 },
    { id: "createdAt", label: "Date", minWidth: 100, format: "date" },
    { id: "status", label: "Status", minWidth: 100, format: "bool" },
  ];

  const actions = [
    {
      id: "Print",
      color: "white",
      handler: (itemId) => `/update/${itemId}`,
      url: (itemId) => `/update/${itemId}`,
      minWidth: "150",
      backgroundColor: "#1976d2",
      label: "DailyEntry",
    },
  ];

  //calculating Total For Footer Values
  const totalValues = (record) => {
    //Calculating gold-In Sum
    goldInSum = record
      .reduce((sum, cust) => sum + parseInt(cust.goldIn, 10), 0)
      .toString();
    //Calculating gold-Out Sum
    goldOutSum = record
      .reduce((sum, cust) => sum + parseInt(cust.goldout, 10), 0)
      .toString();
    //Calculating cash-In Sum
    cashInSum = record
      .reduce((sum, cust) => sum + parseInt(cust.cashIn, 10), 0)
      .toString();
    //Calculating Cash-out Sum
    cashOutSum = record
      .reduce((sum, cust) => sum + parseInt(cust.cashout, 10), 0)
      .toString();
    console.log(goldInSum);
    console.log(goldOutSum);
    console.log(cashInSum);
    console.log(cashOutSum);
  };

  const handleChangeCustomer = (value) => {
    console.log("handleChangeCustomer", value);

    if (value) {
      //setdailyEntryData(dailyentry); //this line is for filtering from all the data not the only last filtered
      const Filter = dailyentry.filter((customers) => {
        const cust =
          customers.customer.firstName + " " + customers.customer.lastName;
        if (value && cust.includes(value)) {
          return true;
        }

        return false;
      });
      totalValues(Filter);
      setdailyEntryData(Filter);
    } else {
      totalValues(dailyentry);
      setdailyEntryData(dailyentry);
    }
  };

  const onClickUpdateButton = (recordId, customerId, customer, data) => {
    console.log(customer, recordId, customerId, data);
    localStorage.setItem(
      "values",
      JSON.stringify({
        custName: customer.firstName + " " + customer.lastName,
        custId: customer.customerId,
        goldIn: data.goldIn,
        goldout: data.goldout,
        cashIn: data.cashIn,
        cashout: data.cashout,
        type: "dailyEntryReport",
        navigate: "dailyEntryReport",
      })
    );

    navigate("/thermalPrintComponent");
  };

  return (
    <>
      {loading ? (
        permissionForViewDailyReport ? (
          <Box
            sx={{
              width: "80%",
              // height: "100vh", // You can adjust the height as needed
              margin: "40px auto",
            }}
          >
            <Typography variant="h3" sx={{ textAlign: "left" }}>
              Daily Entry Report
            </Typography>

            <Box sx={{ width: "100%", margin: "0 auto" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "30px",
                }}
              >
                <Autocomplete
                  size="small"
                  value={selectedCustomerFilter}
                  //for changing null to some value
                  onChange={(event, newValue) => {
                    console.log(newValue);
                    setSelectedCustomerFilter(newValue);
                    handleChangeCustomer(newValue);
                  }}
                  // inputValue={inputValue}

                  //for changing from one input to other
                  onInputChange={(event, newInputValue) => {
                    setSelectedCustomerFilter(newInputValue);
                    handleChangeCustomer(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={customerNamesForDropDown}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Customers" />
                  )}
                />
                {permissionForAddDailyEntry && (
                  <Button
                    variant="outlined"
                    endIcon={<AddIcon />}
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Add Daily Entry
                  </Button>
                )}
              </Box>
              <TableComponent
                props={{
                  data: dailyEntryData,
                  columns: columns,
                  action: actions,
                  updateButton: onClickUpdateButton,
                  goldInSum: goldInSum,
                  goldOutSum: goldOutSum,
                  cashInSum: cashInSum,
                  cashOutSum: cashOutSum,
                  footer: footerAction,
                }}
              />
            </Box>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              {/* <Box display="flex" alignItems="center">
                  <Box flexGrow={1} >{title}</Box>
                  <Box>
                      <IconButton onClick={onClose}>
                      </IconButton>
                  </Box>
            </Box> */}
              {/* <CloseIcon /> */}

              {/* <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.surface",
            }}
          /> */}
              <Box className={style.modelStyle}>
                <DailyEntryFrom
                  props={{
                    customerId: selectedDataCustomerId,
                    recordId: selectedDataId,
                    customerName: customerData,
                    open: open,
                    setOpen: setOpen,
                  }}
                />
              </Box>
            </Modal>
          </Box>
        ) : (
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Not allowed By Admin
          </h1>
        )
      ) : (
        <Box textAlign="center">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="3"
            animationDuration="0.75"
            width="40"
            visible={true}
          />
        </Box>
      )}
    </>
  );
};

export default DailyEntryReport;
