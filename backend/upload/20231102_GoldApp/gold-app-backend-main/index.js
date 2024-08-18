const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { noInternet } = require("./middleware/noInternet");
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.BASE_URL_FRONTEND,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception ${err.message}`);
  console.log("Server is shtting down due to Uncaught Exception");

  process.exit(1);
});
// app.use(noInternet)
// mongoose.connect("mongodb://127.0.0.1:27017/GoldShopApp");
mongoose.connect(
  "mongodb+srv://aqibqazidb:ak123@cluster0.9xyyptd.mongodb.net/?retryWrites=true&w=majority",
  // "mongodb+srv://goldapp:goldapp123@cluster0.xqa8eiv.mongodb.net/?retryWrites=true&w=majority",
  () => {
    console.log("connected");
  }
);
app.use(express.json());

app.use("/api/purchaseForm", require("./routes/PurchaseFormRoutes"));
app.use("/api/tradeForm", require("./routes/TradeFormRoutes"));
app.use("/api/goldapp", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/verify", require("./routes/emailVerifiactionRoutes"));
app.use("/api/forgotPassword", require("./routes/forgotPasswordRoutes"));
app.use("/api/frontEnd", require("./routes/forntEndAuthRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/dailyEntry", require("./routes/dailyEntryRoutes"));
app.use("/api/role", require("./routes/userRolesRoute"));
app.use("/api/task", require("./routes/taskRoute"));
app.use("/api/assignedRoles", require("./routes/userAssignTasksRoute"));
app.use("/api/Metal", require("./Routes/MetalLocalRatesRouter"));
app.use("/api/Metal", require("./Routes/MetalGlobalRatesRouter"));

// call();

app.listen(process.env.PORT || 5000, function () {
  console.log("server started on port 5000");
});

//port = process.env.PORT || 3000

process.on("unhandledRejection", (err) => {
  //handle errors here
  console.log(`Error: ${err.message}`);
  console.log("Server is shutting down due to unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
