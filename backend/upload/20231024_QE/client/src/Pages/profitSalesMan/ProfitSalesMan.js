import React, { useEffect, useState, useRef } from "react";
import { Typography, Box, ButtonGroup } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Button, Form, Dropdown, Container } from "semantic-ui-react";
// import { getSaleRecord } from '../../Api';
import swal from "sweetalert2";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import PrintTableComponent from "../../Components/tableComponent/printTableComponent";
import PrintLaserTable from "../../Components/tableComponent/printLaserTable";
import { ProfitEmpoloyee } from "../../Components/searchComponent/ConsolidatedProfitSearch/ProfitSearch";
import SearchIcon from "@mui/icons-material/Search";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { getSaleConsolidatedRecord } from "../../actions/saleProductAction";
import { refreshTokken } from "../../actions/userAction";
import { useTranslation } from "react-i18next";
import "./profitSalesMan.css";
import { postEmployeeComssionData } from "../../actions/employeCommissionAction";
import { getPermissionForRoles } from "../user/rolesAssigned/RolesPermissionValidation";

let salesRecord = [];
let data = [];
let dataa = [];
let salesProfit = [];
let totalProfit = 0;
let isCalled = "false";

let quantityy = [];
let Discount = [];
let totalAmounnt = [];
let taxAmount = [];
let Price = [];
let amount = [];
let profit = [];
const ProfitSalesMan = () => {
  ///////////////================================================////////////////////////
  ///////////////////////// All useState Variables /////////////////////////////////////
  //////////////================================================////////////////////////
  let action4 = "ProfitEmployee";
  const [isCalled, setIsCalled] = useState(true);
  const [shopNoData, setShopNoData] = useState([]);
  const [employeName, setEmployeName] = useState([]);
  const [salesProductShopNoDropDown, setsalesProductShopNoDropDown] =
    useState("");
  const [salesProductSaleByDropDown, setsalesProductSaleByDropDown] =
    useState("");
  const [salesStartDateDropDown, setSalesStartDateDropDown] = useState(null);
  const [salesEndDateDropDown, setSalesEndDateDropDown] = useState(null);
  const [isSaleBySelected, setisSaleBySelected] = useState(false);
  const [salRecords, setSalRecords] = useState([]);
  const [percentage, setPercentage] = useState();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const [comissionViewPermission, setComissionViewPermission] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const handleClear = () => {
    setsalesProductSaleByDropDown("");
    setisSaleBySelected(false);
    console.log("calleds");
  };
  useEffect(() => {
    setComissionViewPermission(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles(
        "View Commission Report"
      );
      console.log(permissionForAdd);
      setComissionViewPermission(permissionForAdd);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (isCalled === "false") {
      isCalled = "true";
      getToken();
    }
  }, []);
  const getToken = async () => {
    const token = await refreshTokken();
    if (token.data === "Please login to acces this resource") {
      navigate("/login");
    }
    console.log(token);
  };

  ///////////////================================================////////////////////////
  ///////////////////////////// All useEffect  //////////////////////////////////////////
  //////////////================================================////////////////////////
  useEffect(() => {
    isCalled &&
      getData().then(() => {
        getShopNoFunction();
        if (
          !JSON.parse(localStorage.getItem("isAdministrator")) &&
          !JSON.parse(localStorage.getItem("isSuperAdmin"))
        ) {
          // console.log("caled");
          // hello();
          getSalyByFunction();
        }
      });
  }, []);

  const hello = () => {
    if (
      !JSON.parse(localStorage.getItem("isAdministrator")) ||
      !JSON.parse(localStorage.getItem("isSuperAdmin"))
    ) {
      console.log("caled");
      getSalyByFunction();
    }
  };

  useEffect(() => {
    const currentColorTheme = localStorage.getItem("theme-color");
    if (currentColorTheme) {
      setColorTheme(currentColorTheme);
    }
  }, [colorTheme]);
  ///////////////================================================////////////////////////
  ///////////////////////// Get Sale Record from table /////////////////////////////////////
  //////////////================================================////////////////////////
  const getData = async () => {
    //  data = await getSaleRecord();
    data = await getSaleConsolidatedRecord();
    // data = dataa;
    console.log(data);
    console.log(dataa);
    let role = JSON.parse(localStorage.getItem("roles"));
    console.log(JSON.parse(localStorage.getItem("roles"))?.length);
    if (role[0] === "Admin") {
      console.log("admin");
      data = data?.reduce((filteredProducts, product) => {
        if (product.shopNo === JSON.parse(localStorage.getItem("shopId"))) {
          filteredProducts.push(product);
        }
        return filteredProducts;
      }, []);
    } else if (role[0] === "Salesman") {
      console.log("sale");
      data = data?.reduce((filteredProducts, product) => {
        if (
          product.shopNo === JSON.parse(localStorage.getItem("shopId")) &&
          product.saleBy === JSON.parse(localStorage.getItem("username"))
        ) {
          filteredProducts.push(product);
        }
        return filteredProducts;
      }, []);
    }

    console.log(data);

    setIsCalled(false);
  };

  ///////////////================================================////////////////////////
  /////////////////// Option Selection for DropDown /////////////////////////////////////
  //////////////================================================////////////////////////
  const handleSaleByvalue = (event, { value }) => {
    setisSaleBySelected(true);
    console.log(salesProductSaleByDropDown);
    setsalesProductSaleByDropDown(value);
  };
  const handleShopNovalue = (event, { value }) => {
    console.log(data);
    setsalesProductShopNoDropDown(value);
    (JSON.parse(localStorage.getItem("isAdministrator")) ||
      JSON.parse(localStorage.getItem("isSuperAdmin"))) &&
      getSalyByFunction(value);
  };

  //Function to set Starting Date
  const handleDateSelectChange = (date) => {
    setSalesStartDateDropDown(date);
  };

  //Function to set Ending Date
  const handleSelectEndDateChange = (date) => {
    setSalesEndDateDropDown(date);
  };

  ///////////////================================================////////////////////////
  /////////////////// finding data for shopNo dropDown /////////////////////////////////////
  //////////////================================================////////////////////////
  const getShopNoFunction = () => {
    //map function only to get one column to show on dropDown
    console.log(data);
    const salesArray = data?.map((item) => item.shopNo);
    console.log(salesArray);
    //Function to Return Unique value
    const uniqueShopNoArray = salesArray?.filter(
      (code, index) => salesArray.indexOf(code) === index
    );
    console.log(uniqueShopNoArray);
    setShopNoData(uniqueShopNoArray);
  };

  ///////////////================================================////////////////////////
  /////////////////// finding data for SaleBy dropDown /////////////////////////////////////
  //////////////================================================////////////////////////

  const getSalyByFunction = (value) => {
    console.log(value);
    console.log(data);
    if (
      JSON.parse(localStorage.getItem("isAdministrator")) ||
      JSON.parse(localStorage.getItem("isSuperAdmin"))
    ) {
      console.log("called");
      console.log(data);
      data = data?.reduce((filteredProducts, product) => {
        if (product.shopNo === value) {
          filteredProducts.push(product);
        }
        return filteredProducts;
      }, []);
    } else {
      data = data?.reduce((filteredProducts, product) => {
        if (product.shopNo === JSON.parse(localStorage.getItem("shopId"))) {
          filteredProducts.push(product);
        }
        return filteredProducts;
      }, []);
    }
    //map function only to get one column to show on dropDown
    const salesArray = data?.map((item) => item.saleBy);

    //Function to Return Unique value
    const uniqueShopNoArray = salesArray?.filter(
      (code, index) => salesArray.indexOf(code) === index
    );
    console.log(uniqueShopNoArray);
    setEmployeName(uniqueShopNoArray);
  };

  ///////////////================================================////////////////////////
  /////////////////// Search data for SaleBy dropDown /////////////////////////////////////
  //////////////================================================////////////////////////
  const getRecord = async () => {
    if (percentage > 0) {
      const Filtered = await ProfitEmpoloyee(
        data,
        salesProductSaleByDropDown,
        salesStartDateDropDown,
        salesEndDateDropDown
      );
      console.log(Filtered);
      salesRecord = Filtered;
      setSalRecords(Filtered);
      // Step 3: Calculate profits for each product sold by the salesman
      const profitPercentage = percentage / 100; // 10%

      let profit = 0;
      salesProfit = Filtered.map((sale) => ({
        ...sale, // Spread the existing sale data
        profit: (parseInt(sale.excludeTaxPrice) * profitPercentage).toFixed(2), // Calculate profit
      }));
      console.log(salesProfit);
      totalProfit = salesProfit?.reduce(
        (total, sale) => total + parseInt(sale.profit),
        0
      );
      console.log(totalProfit);
      totalProfit = parseInt(totalProfit);
      // console.log(totalP)
      console.log(`Total profit for: $${totalProfit.toFixed(2)}`);

      quantityy = salesProfit
        ?.reduce(
          (sum, product) => sum + parseInt(product.PurchaseQuantity, 10),
          0
        )
        .toString();
      Price = salesProfit
        ?.reduce((sum, product) => sum + parseFloat(product.excludeTaxPrice), 0)
        .toString();
      Discount = salesProfit
        ?.reduce((sum, product) => sum + parseFloat(product.Discount), 0)
        .toString();
      totalAmounnt = salesProfit
        ?.reduce((sum, product) => sum + parseFloat(product.totalAmounnt), 0)
        ?.toString();
      taxAmount = salesProfit
        ?.reduce((sum, product) => sum + parseFloat(product.taxAmount), 0)
        .toString();
      taxAmount = Number(taxAmount);
      taxAmount = taxAmount.toFixed(2);
      amount = salesProfit
        ?.reduce((sum, product) => sum + parseFloat(product.amount), 0)
        ?.toString();
    } else {
      console.log("percentage should be greater than 0 ");
      swal.fire({
        icon: "warning",
        title: t("titleWarning"),
        text: t("percentageShouldBeGreaterThanZero"),
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    }
  };

  const submitCommissionRecord = async () => {
    let result = await postEmployeeComssionData(
      salesProductSaleByDropDown,
      totalProfit,
      percentage,
      salesProductShopNoDropDown,
      salesProfit
    );
    console.log(result);
    if (result?.message === `Purchase Product created successfully`) {
      swal.fire({
        icon: "success",
        title: t("titleAdded"),
        text: t("successMessage"),
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    }
  };

  const columns = [
    { field: "Code", label: "Code" },
    { field: "Namee", label: "Name" },
    { field: "Company", label: "Company" },
    { field: "PurchaseQuantity", label: "Quantity" },
    { field: "excludeTaxPrice", label: "Price" },
    { field: "Discount", label: "Discount" },
    { field: "totalAmounnt", label: "Total Price" },
    { field: "taxAmount", label: "Tax Amount" },
    { field: "amount", label: "Total Amount" },
    { field: "profit", label: "Employee Profit" },
  ];
  return (
    <>
      <div className={`profit ${colorTheme}`}>
        {comissionViewPermission && (
          <>
            <div className="contentt-box">
              <div className="heading-container">
                <h3>{t("Commission")}</h3>
              </div>
            </div>
            <div className="search-Purchase-box">
              {(JSON.parse(localStorage.getItem("isAdministrator")) ||
                JSON.parse(localStorage.getItem("isSuperAdmin"))) && (
                <Dropdown
                  options={shopNoData?.map((element) => ({
                    key: element,
                    text: element,
                    value: element,
                  }))}
                  placeholder={t("selectShop")}
                  className="purchaseDropdown1"
                  fluid
                  search
                  selection
                  disabled={isSaleBySelected}
                  onClear={handleClear}
                  value={salesProductShopNoDropDown}
                  onChange={handleShopNovalue}
                />
              )}
              <Dropdown
                options={employeName?.map((element) => ({
                  key: element,
                  text: element,
                  value: element,
                }))}
                placeholder={t("Select Employe")}
                fluid
                search
                className="purchaseDropdown"
                selection
                value={salesProductSaleByDropDown}
                onChange={handleSaleByvalue}
                style={{ zIndex: "9" }}
              />

              <input
                type="text"
                name="profitPercentage"
                placeholder={"Enter Percentage"}
                autoComplete="off"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                style={{ flex: 1, padding: "10px", width: "200px" }}
              />
              <DatePicker
                selected={salesStartDateDropDown}
                onChange={handleDateSelectChange}
                placeholderText="startingDate"
                dateFormat="dd/MM/yyyy"
                className="datePicker"
              />
              <DatePicker
                selected={salesEndDateDropDown}
                onChange={handleSelectEndDateChange}
                placeholderText="endingDate"
                dateFormat="dd/MM/yyyy"
                className="datePicker"
              />
              <Button className="buttonPurchase" onClick={getRecord}>
                {t("search")}&nbsp;&nbsp;{<SearchIcon />}
              </Button>
              <Button
                className="buttonPurchase"
                onClick={() => {
                  setsalesProductSaleByDropDown("");
                  setsalesProductShopNoDropDown("");
                  setPercentage("");
                  salesProfit = [];
                  setSalesStartDateDropDown("");
                  setSalesEndDateDropDown("");
                  setisSaleBySelected(false);
                  getData();
                }}
              >
                {t("clear")}&nbsp;&nbsp;{<ClearAllIcon />}
              </Button>
            </div>
            <div className="Purchase-table-container">
              {salesProfit?.length > 0 && (
                <>
                  <div>
                    <Button
                      className="boxButton"
                      onClick={submitCommissionRecord}
                    >
                      Generate Commission Invoice
                    </Button>
                  </div>
                </>
              )}
              <PrintLaserTable
                data={salesProfit}
                columns={columns}
                action4={action4}
                quantityy={quantityy}
                Price={Price}
                Discount={Discount}
                totalAmounnt={totalAmounnt}
                taxAmount={taxAmount}
                amount={amount}
                totalProfit={totalProfit}
              />
            </div>
          </>
        )}
      </div>
    </>
    // <div className="div1Container">
    //   <div style={{ width: "75%" }}>
    //     <Stack spacing={2} direction="row" alignItems="center">
    //       <Typography
    //         className="typograpgy"
    //         style={{ color: "#000000", fontSize: 30 }}
    //       >
    //         Commission
    //       </Typography>
    //     </Stack>

    //     <Stack
    //       backgroundColor="white"
    //       borderRadius="50px 50px 0 0"
    //       padding={1}
    //       marginTop={1}
    //     >
    //       <Stack
    //         direction={{ xs: "column", sm: "row" }}
    //         spacing={3}
    //         padding={3}
    //       >
    //         <Form style={{ width: "100%" }}>
    //           <Stack
    //             direction="row"
    //             sx={{
    //               display: "flex",
    //               flexDirection: "row",
    //               justifyContent: "space-between",
    //               width: "100%",
    //             }}
    //           >
    //             <Form.Group
    //               widths="equal"
    //               style={{ display: "flex", gap: "10px" }}
    //             >
    //               {(JSON.parse(localStorage.getItem("isAdministrator")) ||
    //                 JSON.parse(localStorage.getItem("isSuperAdmin"))) && (
    //                 <Dropdown
    //                   options={shopNoData?.map((element) => ({
    //                     key: element,
    //                     text: element,
    //                     value: element,
    //                   }))}
    //                   placeholder="select Shop"
    //                   fluid
    //                   search
    //                   selection
    //                   disabled={isSaleBySelected}
    //                   clearable
    //                   onClear={handleClear}
    //                   value={salesProductShopNoDropDown}
    //                   onChange={handleShopNovalue}
    //                   style={{ flex: 1, padding: "10px", width: "200px" }}
    //                 />
    //               )}{" "}
    //               <Dropdown
    //                 options={employeName?.map((element) => ({
    //                   key: element,
    //                   text: element,
    //                   value: element,
    //                 }))}
    //                 placeholde="Select Employe"
    //                 fluid
    //                 search
    //                 selection
    //                 clearable
    //                 value={salesProductSaleByDropDown}
    //                 onChange={handleSaleByvalue}
    //                 style={{ flex: 1, padding: "10px", width: "200px" }}
    //               />
    //               <input
    //                 type="text"
    //                 name="profitPercentage"
    //                 placeholder={"Enter Percentage"}
    //                 autoComplete="off"
    //                 value={percentage}
    //                 onChange={(e) => setPercentage(e.target.value)}
    //                 style={{ flex: 1, padding: "10px", width: "200px" }}
    //               />
    //               <DatePicker
    //                 selected={salesStartDateDropDown}
    //                 onChange={handleDateSelectChange}
    //                 placeholderText="startingDate"
    //                 dateFormat="dd/MM/yyyy"
    //                 style={{ flex: 1 }}
    //                 //   disabled={isDisabled}
    //               />
    //               <DatePicker
    //                 selected={salesEndDateDropDown}
    //                 onChange={handleSelectEndDateChange}
    //                 placeholderText="endingDate"
    //                 dateFormat="dd/MM/yyyy"
    //                 style={{ flex: 1 }}
    //                 //   disabled={isDisabled}
    //               />
    //             </Form.Group>
    //             <Form.Group
    //               widths="equal"
    //               style={{ display: "flex", gap: "20px" }}
    //             >
    //               <Button
    //                 style={{
    //                   backgroundColor: "transparent",
    //                   border: "1px solid rgba(0, 0, 0, 0.1)",
    //                   borderRadius: "10px 10px 10px 10px",
    //                   fontWeight: "bold",
    //                 }}
    //                 onClick={getRecord}
    //               >
    //                 {"search"}&nbsp;&nbsp;{<SearchIcon />}
    //               </Button>
    //               <Button
    //                 style={{
    //                   backgroundColor: "transparent",
    //                   border: "1px solid rgba(0, 0, 0, 0.1)",
    //                   borderRadius: "10px 10px 10px 10px",
    //                   fontWeight: "bold",
    //                 }}
    //                 onClick={() => {
    //                   setsalesProductSaleByDropDown("");
    //                   setsalesProductShopNoDropDown("");
    //                   setPercentage("");
    //                   salesProfit = [];
    //                   setSalesStartDateDropDown("");
    //                   setSalesEndDateDropDown("");
    //                   setisSaleBySelected(false);
    //                   getData();
    //                 }}
    //               >
    //                 {"clear"}&nbsp;&nbsp;{<ClearAllIcon />}
    //               </Button>
    //             </Form.Group>
    //           </Stack>
    //         </Form>
    //       </Stack>
    //     </Stack>
    //     <div className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200">
    //       {salesProfit?.length > 0 ? (
    //         <>
    //           <table className="table1" style={{ margin: 0 }}>
    //             <tr className="tr1">
    //               <td>
    //                 <span className="font-bold td1">
    //                   Total Profit for {salesProductSaleByDropDown}:
    //                 </span>{" "}
    //                 {totalProfit}
    //               </td>
    //             </tr>
    //           </table>
    //         </>
    //       ) : (
    //         <></>
    //       )}
    //       <PrintLaserTable data={salesProfit} columns={columns} />
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProfitSalesMan;
