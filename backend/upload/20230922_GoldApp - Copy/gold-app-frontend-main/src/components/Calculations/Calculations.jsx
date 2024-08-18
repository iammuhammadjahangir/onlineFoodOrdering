import React, { Component, useEffect, forwardRef } from "react";
import TextField from "@mui/material/TextField";
import {
  getPurchaseFormData,
  getPurchaseFromCal,
  getTradeFormData,
  getTradeFromCal,
} from "../../api";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import "./Calculation.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

const date = new Date();
const d = date.getDate();
const mo = date.getMonth();
const y = date.getFullYear();
const h = date.getHours();
const m = date.getMinutes();
const string = `${d}/${mo}/${y}`;

const initialData = {
  reportID: "",
};
const Reports = ({
  pageNumber,
  startDate,
  endDate,
  reportID,
  date,
  checked,
  props,
}) => {
  const { bool } = useParams();
  console.log(bool);
  console.log(props);
  console.log("props");

  const [isPurchaseReport, setPurchaseStatus] = useState(
    bool === "true" ? true : false
  );

  const [purchaseFormData, setPurchaseFormData] = useState({});
  const [tradeFormData, setTradeFormData] = useState({});
  const [rateCalc, setRateCalc] = useState("");
  const [cashGold, setCashGold] = useState(0);
  const [fullGold, setFullGold] = useState(0);
  const [loading, setLoading] = useState(true);
  console.log(loading);
  useEffect(() => {
    setRateCalc("");
    setCashGold(0);
    setFullGold(0);
  }, []);
  useEffect(() => {
    isPurchaseReport ? call() : call2();
  }, [isPurchaseReport, date, checked]);

  useEffect(() => {
    bool === "true" ? setPurchaseStatus(true) : setPurchaseStatus(false);
  }, [bool]);

  async function call() {
    try {
      setLoading(true);
      const resp = await getPurchaseFromCal(
        pageNumber,
        reportID,
        startDate,
        endDate,
        checked
      );
      console.log(resp);
      setLoading(false);
      const { data } = resp;
      setPurchaseFormData(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function call2() {
    try {
      setLoading(true);
      console.log("hasnat");
      const resp = await getTradeFromCal(
        pageNumber,
        reportID,
        startDate,
        endDate,
        checked
      );
      console.log(resp);
      setLoading(false);
      const { data } = resp;
      setTradeFormData(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div>
        {loading ? (
          <Box textAlign="center">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="3"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          </Box>
        ) : isPurchaseReport ? (
          <Stack
            direction={"row"}
            spacing={2}
            mt={3}
            alignItems="center"
            justifyContent={"center"}
            sx={{ width: "100%" }}
          >
            <Card
              sx={{
                minWidth: 170,
                whiteSpace: "nowrap",
                height: 65,
                textAlign: "center",
                border: "2px solid #1976d2",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14, background: "#1976d2", color: "white" }}
                  gutterBottom
                >
                  Cash
                </Typography>

                <Typography variant="body2">
                  PKR &nbsp; &nbsp;
                  {parseFloat(props?.cash).toLocaleString("en-US")}
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                minWidth: 150,
                whiteSpace: "nowrap",
                height: 65,
                textAlign: "center",
                border: "2px solid #1976d2",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14, background: "#1976d2", color: "white" }}
                  gutterBottom
                >
                  Pure Weight
                </Typography>

                <Typography variant="body2">
                  &nbsp; &nbsp;
                  {parseFloat(props?.pureWeight).toLocaleString("en-US")}
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                minWidth: 150,
                whiteSpace: "nowrap",
                height: 65,
                textAlign: "center",
                border: "2px solid #1976d2",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14, background: "#1976d2", color: "white" }}
                  gutterBottom
                >
                  Orignal Pond
                </Typography>

                <Typography variant="body2">
                  &nbsp; &nbsp;
                  {parseFloat(props?.originalPond).toLocaleString("en-US")}
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                minWidth: 150,
                whiteSpace: "nowrap",
                height: 65,
                textAlign: "center",
                border: "2px solid #1976d2",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14, background: "#1976d2", color: "white" }}
                  gutterBottom
                >
                  Final Pond
                </Typography>

                <Typography variant="body2">
                  &nbsp; &nbsp;
                  {parseFloat(props?.finalPond).toLocaleString("en-US")}
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                minWidth: 150,
                whiteSpace: "nowrap",
                height: 65,
                textAlign: "center",
                border: "2px solid #1976d2",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14, background: "#1976d2", color: "white" }}
                  gutterBottom
                >
                  Mail
                </Typography>

                <Typography variant="body2">
                  &nbsp; &nbsp;
                  {parseFloat(props?.mail).toLocaleString("en-US")}
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                minWidth: 150,
                whiteSpace: "nowrap",
                height: 65,
                textAlign: "center",
                border: "2px solid #1976d2",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14, background: "#1976d2", color: "white" }}
                  gutterBottom
                >
                  Cash Gold
                </Typography>

                <Typography variant="body2">
                  &nbsp; &nbsp;
                  {parseFloat(cashGold).toLocaleString("en-US")}
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                minWidth: 150,
                whiteSpace: "nowrap",
                height: 65,
                textAlign: "center",
                border: "2px solid #1976d2",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14, background: "#1976d2", color: "white" }}
                  gutterBottom
                >
                  Full Gold
                </Typography>

                <Typography variant="body2">
                  &nbsp; &nbsp;
                  {parseFloat(fullGold).toLocaleString("en-US")}
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                minWidth: 150,
                whiteSpace: "nowrap",
                height: 65,
                textAlign: "center",
                border: "2px solid #1976d2",
                padding: "0",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14, background: "#1976d2", color: "white" }}
                  gutterBottom
                >
                  Enter Rate
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "2px 5px",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    variant="standard"
                    value={rateCalc}
                    sx={{ margin: "0 auto" }}
                    onChange={(e) => {
                      setRateCalc(e.target.value);
                    }}
                  />
                  <Button
                    sx={{
                      paddingBottom: 0,
                      backgroundColor: "#1976d2",
                      color: "white",
                      marginLeft: "2px",
                      fontSize: "12px",
                      "&:hover": {
                        backgroundColor: "#42a5f5", // Change the background color on hover
                      },
                    }}
                    onClick={() => {
                      setCashGold(
                        parseFloat(
                          ((props?.cash / rateCalc) * 11.664).toFixed(3)
                        ).toLocaleString("en-US")
                      );
                      setFullGold(
                        parseFloat(
                          (parseFloat(props?.cash) / rateCalc) * 11.664 +
                            parseFloat(props?.pureWeight)
                        )
                          .toFixed(3)
                          .toLocaleString("en-US")
                      );
                    }}
                  >
                    Calc.
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        ) : (
          <>
            {/* <Stack
              direction={"row"}
              spacing={1}
              mt={3}
              alignItems="center"
              justifyContent="space-around"
              sx={{ width: "100%" }}
            >
             
            </Stack> */}
            <Stack
              direction={"row"}
              spacing={2}
              mt={3}
              alignItems="center"
              justifyContent={"center"}
              sx={{ width: "100%" }}
            >
              <Box
                sx={{
                  border: "2px solid #1976d2",
                  minWidth: 300,
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                <Typography>PCS</Typography>
                <Stack
                  direction="row"
                  spacing={4}
                  justifyContent="space-around"
                >
                  <Card
                    sx={{
                      minWidth: 100,
                      height: 80,
                      border: "2px solid #1976d2",
                      textAlign: "center",
                    }}
                  >
                    <CardContent sx={{ mt: "2px" }}>
                      <Typography
                        sx={{
                          fontSize: 12,
                          background: "#1976d2",
                          color: "white",
                        }}
                        gutterBottom
                      >
                        Gold Sold
                      </Typography>

                      <Typography variant="body2" sx={{ fontSize: 12 }}>
                        &nbsp; &nbsp;
                        {parseFloat(props?.pcsGoldSold).toLocaleString("en-US")}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 11,
                          width: "100%",
                          background: "#1976d2",
                          color: "white",
                        }}
                        gutterBottom
                      >
                        Cash Received
                      </Typography>

                      <Typography variant="body2" sx={{ fontSize: 11 }}>
                        &nbsp; &nbsp;
                        {parseFloat(props?.pcsCashRecieved).toLocaleString(
                          "en-US"
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                  {/* <Card sx={{ minWidth: 100, height: 70, border: "2px solid black" }}>
										<CardContent sx={{ mt: "2px", minWidth: 120, marginLeft: "-12px", textAlign: "center" }}>
											<Typography sx={{ fontSize: 11, width: "100%", background: "black", color: "white" }} gutterBottom>
												Cash Received
											</Typography>

											<Typography variant="body2" sx={{ fontSize: 11 }}>
												&nbsp; &nbsp;
												{tradeFormData?.sellPCSCash?.toLocaleString(undefined, { maximumFractionDigits: 3 })}
											</Typography>
										</CardContent>
									</Card> */}
                  <Card
                    sx={{
                      minWidth: 100,
                      height: 80,
                      border: "2px solid #1976d2",
                    }}
                  >
                    <CardContent
                      sx={{
                        mt: "2px",
                        minWidth: 120,
                        marginLeft: "-12px",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 11,
                          width: "100%",
                          background: "#1976d2",
                          color: "white",
                        }}
                        gutterBottom
                      >
                        Gold Bought
                      </Typography>

                      <Typography variant="body2" sx={{ fontSize: 12 }}>
                        &nbsp; &nbsp;
                        {parseFloat(props?.pcsGoldBought).toLocaleString(
                          "en-US"
                        )}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 11,
                          width: "100%",
                          background: "#1976d2",
                          color: "white",
                        }}
                        gutterBottom
                      >
                        Cash Paid
                      </Typography>

                      <Typography variant="body2" sx={{ fontSize: 12 }}>
                        &nbsp; &nbsp;
                        {parseFloat(props?.pcsCashPaid).toLocaleString("en-US")}
                      </Typography>
                    </CardContent>
                  </Card>
                  {/* <Card sx={{ minWidth: 100, height: 70, border: "2px solid black" }}>
										<CardContent sx={{ mt: "2px", minWidth: 120, marginLeft: "-12px", textAlign: "center" }}>
											<Typography sx={{ fontSize: 11, width: "100%", background: "black", color: "white" }} gutterBottom>
												Cash Paid
											</Typography>

											<Typography variant="body2" sx={{ fontSize: 12 }}>
												&nbsp; &nbsp;
												{tradeFormData?.buyPCSCash?.toLocaleString(undefined, { maximumFractionDigits: 3 })}
											</Typography>
										</CardContent>
									</Card> */}
                </Stack>
              </Box>
              <Box
                sx={{
                  border: "2px solid #1976d2",
                  minWidth: 300,
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                <Typography>Rawa</Typography>
                <Stack
                  direction="row"
                  spacing={4}
                  justifyContent="space-around"
                >
                  <Card
                    sx={{
                      minWidth: 100,
                      height: 80,
                      border: "2px solid #1976d2",
                      textAlign: "center",
                    }}
                  >
                    <CardContent sx={{ mt: "2px" }}>
                      <Typography
                        sx={{
                          fontSize: 12,
                          background: "#1976d2",
                          color: "white",
                        }}
                        gutterBottom
                      >
                        Gold Sold
                      </Typography>

                      <Typography variant="body2" sx={{ fontSize: 12 }}>
                        &nbsp; &nbsp;
                        {parseFloat(props?.rawaGoldSold).toLocaleString(
                          "en-US"
                        )}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 11,
                          width: "100%",
                          background: "#1976d2",
                          color: "white",
                        }}
                        gutterBottom
                      >
                        Cash Received
                      </Typography>

                      <Typography variant="body2" sx={{ fontSize: 12 }}>
                        &nbsp; &nbsp;
                        {parseFloat(props?.rawaCashRecieved).toLocaleString(
                          "en-US"
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                  {/* <Card sx={{ minWidth: 100, height: 70, border: "2px solid black" }}>
										<CardContent sx={{ mt: "2px", minWidth: 120, marginLeft: "-12px", textAlign: "center" }}>
											<Typography sx={{ fontSize: 11, width: "100%", background: "black", color: "white" }} gutterBottom>
												Cash Received
											</Typography>

											<Typography variant="body2" sx={{ fontSize: 12 }}>
												&nbsp; &nbsp;
												{tradeFormData?.sellRawaCash?.toLocaleString(undefined, { maximumFractionDigits: 3 })}
											</Typography>
										</CardContent>
									</Card> */}
                  <Card
                    sx={{
                      minWidth: 100,
                      height: 80,
                      border: "2px solid #1976d2",
                    }}
                  >
                    <CardContent
                      sx={{
                        mt: "2px",
                        minWidth: 120,
                        marginLeft: "-12px",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 11,
                          width: "100%",
                          background: "#1976d2",
                          color: "white",
                        }}
                        gutterBottom
                      >
                        Gold Bought
                      </Typography>

                      <Typography variant="body2" sx={{ fontSize: 12 }}>
                        &nbsp; &nbsp;
                        {parseFloat(props?.rawaGoldBought).toLocaleString(
                          "en-US"
                        )}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 11,
                          width: "100%",
                          background: "#1976d2",
                          color: "white",
                        }}
                        gutterBottom
                      >
                        Cash Paid
                      </Typography>

                      <Typography variant="body2" sx={{ fontSize: 12 }}>
                        &nbsp; &nbsp;
                        {parseFloat(props?.rawaCashPaid).toLocaleString(
                          "en-US"
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                  {/* <Card sx={{ minWidth: 100, height: 70, border: "2px solid black" }}>
										<CardContent sx={{ mt: "2px", minWidth: 120, marginLeft: "-12px", textAlign: "center" }}>
											<Typography sx={{ fontSize: 11, width: "100%", background: "black", color: "white" }} gutterBottom>
												Cash Paid
											</Typography>

											<Typography variant="body2" sx={{ fontSize: 12 }}>
												&nbsp; &nbsp;
												{tradeFormData?.buyRawaCash?.toLocaleString(undefined, { maximumFractionDigits: 3 })}
											</Typography>
										</CardContent>
									</Card> */}
                </Stack>
              </Box>
              <Box
                sx={{
                  border: "2px solid #1976d2",
                  padding: "5px",
                  textAlign: "center",
                  minWidth: 300,
                }}
              >
                <Typography>Grami</Typography>
                <Stack
                  direction="row"
                  spacing={4}
                  justifyContent="space-around"
                >
                  <Card
                    sx={{
                      minWidth: 100,
                      height: 80,
                      border: "2px solid #1976d2",
                      textAlign: "center",
                    }}
                  >
                    <CardContent sx={{ mt: "2px" }}>
                      <Typography
                        sx={{
                          fontSize: 12,
                          background: "#1976d2",
                          color: "white",
                        }}
                        gutterBottom
                      >
                        Gold Sold
                      </Typography>

                      <Typography variant="body2" sx={{ fontSize: 12 }}>
                        &nbsp; &nbsp;
                        {parseFloat(props?.gramiGoldSold).toLocaleString(
                          "en-US"
                        )}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 11,
                          width: "100%",
                          background: "#1976d2",
                          color: "white",
                        }}
                        gutterBottom
                      >
                        Cash Received
                      </Typography>

                      <Typography variant="body2" sx={{ fontSize: 12 }}>
                        &nbsp; &nbsp;
                        {parseFloat(props?.gramiCashRecieved).toLocaleString(
                          "en-US"
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                  {/* <Card sx={{ minWidth: 100, height: 70, border: "2px solid black" }}>
										<CardContent sx={{ mt: "2px", minWidth: 120, marginLeft: "-12px", textAlign: "center" }}>
											<Typography sx={{ fontSize: 11, width: "100%", background: "black", color: "white" }} gutterBottom>
												Cash Received
											</Typography>

											<Typography variant="body2" sx={{ fontSize: 12 }}>
												&nbsp; &nbsp;
												{tradeFormData?.sellGramiCash?.toLocaleString(undefined, { maximumFractionDigits: 3 })}
											</Typography>
										</CardContent>
									</Card> */}
                  <Card
                    sx={{
                      minWidth: 100,
                      height: 80,
                      border: "2px solid #1976d2",
                    }}
                  >
                    <CardContent
                      sx={{
                        mt: "2px",
                        minWidth: 120,
                        marginLeft: "-12px",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 11,
                          width: "100%",
                          background: "#1976d2",
                          color: "white",
                        }}
                        gutterBottom
                      >
                        Gold Bought
                      </Typography>

                      <Typography variant="body2" sx={{ fontSize: 12 }}>
                        &nbsp; &nbsp;
                        {parseFloat(props?.gramiGoldBought).toLocaleString(
                          "en-US"
                        )}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 11,
                          width: "100%",
                          background: "#1976d2",
                          color: "white",
                        }}
                        gutterBottom
                      >
                        Cash Paid
                      </Typography>

                      <Typography variant="body2" sx={{ fontSize: 12 }}>
                        &nbsp; &nbsp;
                        {parseFloat(props?.gramiCashPaid).toLocaleString(
                          "en-US"
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                  {/* <Card sx={{ minWidth: 100, height: 70, border: "2px solid black" }}>
										<CardContent sx={{ mt: "2px", minWidth: 120, marginLeft: "-12px", textAlign: "center" }}>
											<Typography sx={{ fontSize: 11, width: "100%", background: "black", color: "white" }} gutterBottom>
												Cash Paid
											</Typography>

											<Typography variant="body2" sx={{ fontSize: 12 }}>
												&nbsp; &nbsp;
												{tradeFormData?.buyGramiCash?.toLocaleString(undefined, { maximumFractionDigits: 3 })}
											</Typography>
										</CardContent>
									</Card> */}
                </Stack>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Card
                  sx={{
                    minWidth: 160,
                    height: 50,
                    border: "2px solid #1976d2",
                    textAlign: "center",
                  }}
                >
                  <CardContent sx={{ mt: "2px" }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        background: "#1976d2",
                        color: "white",
                      }}
                      gutterBottom
                    >
                      Gold Bought
                    </Typography>

                    <Typography variant="body2">
                      GRM &nbsp; &nbsp;
                      {parseFloat(props?.goldBought).toLocaleString("en-US")}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    minWidth: 160,
                    height: 50,
                    border: "2px solid #1976d2",
                    textAlign: "center",
                  }}
                >
                  <CardContent sx={{ mt: "2px" }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        background: "#1976d2",
                        color: "white",
                      }}
                      gutterBottom
                    >
                      Cash Paid
                    </Typography>

                    <Typography variant="body2">
                      PKR &nbsp; &nbsp;
                      {parseFloat(props?.cashPaid).toLocaleString("en-US")}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Card
                  sx={{
                    minWidth: 160,
                    height: 50,
                    border: "2px solid #1976d2",
                    textAlign: "center",
                  }}
                >
                  <CardContent sx={{ mt: "2px" }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        background: "#1976d2",
                        color: "white",
                      }}
                      gutterBottom
                    >
                      Gold Sold
                    </Typography>

                    <Typography variant="body2">
                      GRM &nbsp; &nbsp;
                      {parseFloat(props?.goldSold).toLocaleString("en-US")}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    minWidth: 160,
                    height: 50,
                    border: "2px solid #1976d2",
                    textAlign: "center",
                  }}
                >
                  <CardContent sx={{ mt: "2px" }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        background: "#1976d2",
                        color: "white",
                      }}
                      gutterBottom
                    >
                      Cash Received
                    </Typography>

                    <Typography variant="body2">
                      PKR &nbsp; &nbsp;
                      {parseFloat(props?.cashRecieved).toLocaleString("en-US")}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Card
                  sx={{
                    minWidth: 160,
                    height: 50,
                    border: "2px solid #1976d2",
                    textAlign: "center",
                  }}
                >
                  <CardContent sx={{ mt: "2px" }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        background: "#1976d2",
                        color: "white",
                      }}
                      gutterBottom
                    >
                      Gold Excess
                    </Typography>

                    <Typography variant="body2">
                      PKR &nbsp; &nbsp;
                      {parseFloat(
                        parseFloat(props?.goldBought) -
                          parseFloat(props?.goldSold)
                      ).toLocaleString("en-US")}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    minWidth: 160,
                    height: 50,
                    border: "2px solid #1976d2",
                    textAlign: "center",
                  }}
                >
                  <CardContent sx={{ mt: "2px" }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        background: "#1976d2",
                        color: "white",
                      }}
                      gutterBottom
                    >
                      Cash Excess
                    </Typography>

                    <Typography variant="body2">
                      PKR &nbsp; &nbsp;
                      {parseFloat(
                        parseFloat(props?.cashRecieved) -
                          parseFloat(props?.cashPaid)
                      ).toLocaleString("en-US")}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Stack>
          </>
        )}
      </div>
    </>
  );
};

export default Reports;
