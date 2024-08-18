import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { TextField, Typography } from "@mui/material";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const ThermalPrintComponent = () => {
  const navigate = useNavigate();
  const ComponentDiv = useRef();
  const bool = true;
  const data = JSON.parse(localStorage.getItem("values"));

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    const currentTimeStamp = new Date();

    const year = currentTimeStamp.getFullYear(); // Get the current year
    const month = currentTimeStamp.getMonth() + 1; // Get the current month (0-indexed, so add 1)
    const day = currentTimeStamp.getDate(); // Get the current day of the month
    const hours = currentTimeStamp.getHours(); // Get the current hour (0-23)
    const formattedHours = hours % 12 || 12; // 0 should be displayed as 12
    const minutes = currentTimeStamp.getMinutes(); // Get the current minute (0-59)
    const seconds = currentTimeStamp.getSeconds(); // Get the current second (0-59)
    const ampm = hours >= 12 ? "PM" : "AM";
    setDate(`${day}/${month}/${year}`);
    setTime(`${formattedHours}:${minutes}:${seconds} ${ampm}`);

    handlePrint();
    navigate(`/${data.navigate}`);
  }, []);

  const handlePrint = useReactToPrint({
    content: () => ComponentDiv.current,
    documentTitle: "Purchase-Data",
  });
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirecton: "row",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "302px", padding: "7px" }} ref={ComponentDiv}>
        {/* <Box sx={{ margin: "0 15px", borderBottom: "1px solid black" }}>
          <Typography
            variant="h4"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            ALKHAIR
          </Typography>
        </Box>
        <Box sx={{ borderBottom: "1px solid black" }}>
          <Typography
            variant="h5"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            GOLD LAB & TRADING
          </Typography>
        </Box> */}
        {/* //For date time */}
        <Box
          sx={{
            borderBottom: "1px solid black",
            display: "flex",
            justifyContent: "space-between",
            padding: "3px",
          }}
        >
          <Typography variant="h6">{date} </Typography>
          <Typography variant="h6">{time} </Typography>
        </Box>
        {/* //For For Customer Name */}

        {data.type === "purchase" && (
          <>
            <Box
              sx={{
                borderBottom: "1px solid black",
                display: "flex",
                justifyContent: "space-between",
                padding: "3px",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {data.customer}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {data.customerId}
              </Typography>
            </Box>
            {/* //For rati or non */}
            <Box
              sx={{
                margin: "0 7px",
                borderBottom: "1px solid black",
                display: "flex",
                justifyContent: "center",
                padding: "3px",
              }}
            ></Box>
            {/* //For values */}
            <Box
              sx={{
                borderBottom: "1px solid black",
                display: "flex",
                flexDirection: "column",
                margin: "7px 7px 0 7px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="p" sx={{ fontSize: "14px" }}>
                  PondWeight {data.pondWeight}
                </Typography>
                <Typography variant="p" sx={{ fontSize: "14px" }}>
                  Mail/Nagh {data.mail}
                </Typography>
              </Box>
              <Box
                sx={{
                  borderBottom: "1px solid black",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="p" sx={{ fontSize: "14px" }}>
                  Final Weight {data.finalWeight}
                </Typography>

                <Typography variant="p" sx={{ fontSize: "14px" }}>
                  Gram/Rate {data.gramRate}
                </Typography>
              </Box>
            </Box>
            {/* //For ratti only */}
            <Box
              sx={{
                borderBottom: "1px solid black",
                display: "flex",
                flexDirection: "column",
                margin: "7px 7px 0 7px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="p"
                  sx={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  {`${data.rattiMilli} (${
                    data.ratti ? data.ratti : data.milli
                  }) `}
                </Typography>
              </Box>
              <Box
                sx={{
                  borderBottom: "1px solid black",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="p" sx={{ fontSize: "14px" }}>
                  Pure Weight {data.pureWeight}
                </Typography>
                <Typography variant="p" sx={{ fontSize: "14px" }}>
                  Rate {data.rate}
                </Typography>
              </Box>
            </Box>

            {/* //For Payment */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "7px 7px 0 7px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="p"
                  sx={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  Payment Method:
                </Typography>
                <Typography
                  variant="p"
                  sx={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  {data.paymentMethod}
                </Typography>
              </Box>
              <Box
                sx={{
                  borderBottom: "1px solid black",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="p" sx={{ fontSize: "14px" }}>
                  Cash:
                </Typography>
                <Typography variant="p" sx={{ fontSize: "14px" }}>
                  {data.cash}
                </Typography>
              </Box>
            </Box>
          </>
        )}

        {data.type === "trade" && (
          <>
            <Box
              sx={{
                borderBottom: "1px solid black",
                display: "flex",
                justifyContent: "space-between",
                padding: "3px",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {data.name}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {data.id}
              </Typography>
            </Box>

            <Box
              sx={{
                margin: "0 7px",
                borderBottom: "1px solid black",
                display: "flex",
                justifyContent: "center",
                padding: "3px",
              }}
            >
              <Typography variant="h6">{data.category}</Typography>
            </Box>
            <Box
              sx={{
                borderBottom: "1px solid black",
                display: "flex",
                flexDirection: "column",
                margin: "7px 7px 0 7px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="p" sx={{ fontSize: "14px" }}>
                  Weight {data.weight}
                </Typography>
                <Typography variant="p" sx={{ fontSize: "14px" }}>
                  Rate {data.rate}
                </Typography>
              </Box>
              <Box
                sx={{
                  borderBottom: "1px solid black",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="p" sx={{ fontSize: "14px" }}>
                  Cash {data.cash}
                </Typography>
                {data.category === "sellGrami" && (
                  <Typography variant="p" sx={{ fontSize: "14px" }}>
                    Packing charges {data.packingCharges}
                  </Typography>
                )}
              </Box>
            </Box>
          </>
        )}
        {data.type === "dailyEntryReport" && (
          <>
            <Box
              sx={{
                borderBottom: "1px solid black",
                display: "flex",
                justifyContent: "space-between",
                padding: "3px",
                gap: "40px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontSize: "16px" }}
              >
                {data.custName}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontSize: "16px" }}
              >
                CUST-{data.custId}
              </Typography>
            </Box>

            <Box
              sx={{
                borderBottom: "1px solid black",
                display: "flex",
                flexDirection: "column",
                margin: "7px 7px 0 7px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="p" sx={{ fontSize: "14px" }}>
                  Gold In {data.goldIn}
                </Typography>
                <Typography variant="p" sx={{ fontSize: "14px" }}>
                  Gold Out {data.goldout}
                </Typography>
              </Box>
              <Box
                sx={{
                  borderBottom: "1px solid black",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="p" sx={{ fontSize: "14px" }}>
                  Cash In {data.cashIn}
                </Typography>

                <Typography variant="p" sx={{ fontSize: "14px" }}>
                  Cash Out {data.cashout}
                </Typography>
              </Box>
            </Box>
          </>
        )}

        {/* Footer */}
        <Box
          sx={{
            borderTop: "3px solid black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "7px 7px 0 7px",
          }}
        >
          {/* <Typography variant="p" sx={{ fontSize: "12px" }}>
            D-271, New Safara Bazar, Rawalpindi
          </Typography> */}
          {/* <Typography variant="p" sx={{ fontSize: "12px" }}>
            051-5557313
          </Typography> */}
          <Typography variant="p" sx={{ fontWeight: "bold", fontSize: "10px" }}>
            Developed By Soft Wise Solution <span>+92 334 096 0444</span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ThermalPrintComponent;
