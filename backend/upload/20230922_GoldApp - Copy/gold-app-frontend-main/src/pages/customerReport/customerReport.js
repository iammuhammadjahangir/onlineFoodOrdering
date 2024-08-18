import React, { useEffect, useState } from "react";
import style from "./customerReport.module.css";
import {
  getCustomer,
  deleteCustomerRecord,
  getAssignRolesByIdAndNames,
} from "../../api";
import { RotatingLines } from "react-loader-spinner";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Modal, Typography } from "@mui/material";
import { RadioGroup, Radio } from "@mui/material";

import { Print, Search, DateRange } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CustomerData from "../customer/customerData";
import AddIcon from "@mui/icons-material/Add";
import {
  ReportSearch,
  dateFilterReport,
} from "../../components/SearchComponent/ReportSearchComponent";

import {
  Button,
  TextField,
  InputAdornment,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { format } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TableComponent from "../../components/TableComponent/tableComponent";

let checkedforActions = "De-Activate";
let customerdataAll;
const CustomerReport = () => {
  const [selectedOption, setSelectedOption] = useState("Active Customers");

  const [isCustomerCalled, setIsCustomerCalled] = useState(true);
  const [customerRecord, setCustomerRecord] = useState([]);
  const [permissionForViewCustomer, setPermissionForViewCustomer] =
    useState(false);
  const [permissionForAddCustomer, setPermissionForAddCustomer] =
    useState(false);
  const [loading, setLoading] = useState(false);

  //   USeStates for handling inputs
  const [searchId, setSearchId] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [deletedRecord, setDeletedRecord] = useState(false);
  const [checked, setChecked] = useState(false);
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    // console.log(JSON.parse(localStorage.getItem("userRoleId")));
    // Define an asynchronous function inside useEffect

    // Call the async function
    getPermissionForViewCustomer();
  }, [selectedOption, update, open]);

  const getCustomerData = async () => {
    console.log("called", selectedOption);
    const value = await getCustomer(
      selectedOption === "Active Customers" ? false : true
    );
    selectedOption === "Active Customers"
      ? (checkedforActions = "De-Activate")
      : (checkedforActions = "Activate");
    console.log(value.data);
    setCustomerRecord(value.data);
    customerdataAll = value.data;
    setIsCustomerCalled(false);
    setLoading(true);
  };

  async function getPermissionForAddCustomer() {
    try {
      const data = await getAssignRolesByIdAndNames(
        JSON.parse(localStorage.getItem("userRoleId")),
        "Add Customer"
      );
      // console.log(data.data.status);
      setPermissionForAddCustomer(data.data.status);
      getCustomerData();
      // setLoading(true);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function getPermissionForViewCustomer() {
    try {
      const data = await getAssignRolesByIdAndNames(
        JSON.parse(localStorage.getItem("userRoleId")),
        "View Customer Report"
      );
      // console.log(data.data.status);
      setPermissionForViewCustomer(data.data.status);
      getPermissionForAddCustomer();
      // setLoading(true);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleSearchID = (event) => {
    console.log(event.target.value);
    setSearchId(event.target.value);
  };

  const handleSearchReport = () => {
    const data = ReportSearch(customerRecord, searchId);
    setCustomerRecord(data);
  };

  //For handling change of active and unactive users
  const handleSwitchChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const columns = [
    { id: "firstName", label: "First Name", minWidth: 70 },
    { id: "lastName", label: "Last Name", minWidth: 100 },
    { id: "phoneNumber", label: "Phone Number", minWidth: 100 },
    { id: "cellNumber", label: "Cell Number", minWidth: 100 },
    { id: "cnic", label: "CNIC", minWidth: 100 },
    { id: "city", label: "City", minWidth: 100 },
    { id: "address", label: "Address", minWidth: 100 },
    { id: "createdAt", label: "Date", minWidth: 100, format: "date" },
    { id: "status", label: "Status", minWidth: 100, format: "bool" },
  ];

  const actions = [
    {
      id: `${checkedforActions}`,
      color: "white",
      handler: (itemId) => `/update/${itemId}`,
      url: (itemId) => `/update/${itemId}`,
      link: `/update`,
      align: "column.align",
      minWidth: "100",
      backgroundColor: "#1976d2",
      label: "Customer",
    },
  ];

  //to manage the button Cliked
  const buttonClicked = async (item) => {
    console.log(item);

    try {
      const res = await deleteCustomerRecord(
        item,
        selectedOption === "Active Customers" ? true : false
      );
      console.log(res);
      if (res.status === 200) {
        setUpdate((prev) => !prev);
        alert("Record Updated");
      }
    } catch (e) {
      console.log(e);
      alert(e?.res?.data?.message);
    }
  };

  const handleDateSearch = async () => {
    const data = dateFilterReport(customerRecord, startDate, endDate);
    setCustomerRecord(data);
  };

  return (
    <>
      {loading ? (
        permissionForViewCustomer ? (
          <Box sx={{ width: "85%", margin: "0 auto" }}>
            <Typography variant="h3" sx={{ textAlign: "left" }}>
              Customer Report
            </Typography>
            <Box className={style.searchBar}>
              <Box className={style.customerReport}>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={searchId}
                  onChange={handleSearchID}
                  name="reportID"
                  size="small"
                  className={style.search}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  onFocus={() => {
                    // setSendDate((prev) => !prev);
                  }}
                />

                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSearchReport}
                >
                  Search
                </Button>
              </Box>
              <Box className={style.dateSearch}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                    }}
                    renderInput={(params) => {
                      return (
                        <TextField
                          size="small"
                          variant="outlined"
                          {...params}
                        />
                      );
                    }}
                  />
                </LocalizationProvider>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  // className={style.datePicker}
                  label="End Date"
                >
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    size="small"
                    onChange={(date) => {
                      setEndDate(date);
                    }}
                    renderInput={(params) => (
                      <TextField size="small" variant="outlined" {...params} />
                    )}
                  />
                </LocalizationProvider>

                <Button
                  variant="contained"
                  size="small"
                  onClick={handleDateSearch}
                  className={style.dateSearchBtn}
                  sx={{ width: "100px" }}
                >
                  Search
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    setSearchId("");
                    setDeletedRecord(false);
                    setStartDate(null);
                    setEndDate(null);
                    setCustomerRecord(customerdataAll);
                  }}
                  sx={{ width: "400px" }}
                  className={style.resetBtn}
                >
                  Reset
                </Button>
              </Box>
              <Box>
                <RadioGroup
                  name="userOptions"
                  value={selectedOption}
                  onChange={handleSwitchChange}
                  row
                >
                  <FormControlLabel
                    value="Active Customers"
                    control={<Radio />}
                    label="Active Customers"
                    sx={{ color: "blue" }}
                  />
                  <FormControlLabel
                    value="Deleted Customers"
                    control={<Radio />}
                    label="Deleted Customers"
                    sx={{ color: "red" }}
                  />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ width: "100%", margin: "0 auto" }}>
              {permissionForAddCustomer && (
                <Button
                  variant="outlined"
                  endIcon={<AddIcon />}
                  sx={{
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Add Customer
                </Button>
              )}

              <TableComponent
                props={{
                  data: customerRecord,
                  columns: columns,
                  action: actions,
                  label: "Customer",
                  handleChildButtonClick: buttonClicked,
                }}
              />
            </Box>
            {open && (
              <Box className={style.modelStyle}>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className={style.modelStyle}>
                    <CustomerData props={{ open: open, setOpen: setOpen }} />
                  </Box>
                </Modal>
              </Box>
            )}
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
        <Box style={{ marginTop: "50px", textAlign: "center" }}>
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

export default CustomerReport;
