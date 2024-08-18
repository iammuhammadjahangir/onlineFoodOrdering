const express = require("express");
const cors = require("cors");
const connectDB = require("./databaseConnection/dbConnection"); //require DB//
const session = require("express-session");
const cookieParse = require("cookie-parser");
require("dotenv").config();
const app = express();

//===========================================//
//========To Enable Cors Options============//
//=========================================//
const corsOptions = {
  origin: process.env.BASE_URL_FRONTEND,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//===========================================//
//========FUNCTION TO CONNECT DB============//
//=========================================//
connectDB();
const sessionTimeout = 120000;
app.use(express.json());
app.use(cookieParse());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: sessionTimeout },
//   })
// );

//===========================================//
//=========SET ROUTES FOR API ==============//
//=========================================//
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/productAndColor", require("./routes/productAndColorTableRoute"));
app.use("/api/company", require("./routes/companyRoutes"));
app.use("/api/color", require("./routes/colorRoutes"));
app.use("/api/godown", require("./routes/godownRoutes"));
app.use("/api/productType", require("./routes/productTypeRoutes"));
app.use("/api/productLocation", require("./routes/productLocationRoutes"));
app.use("/api/saleProduct", require("./routes/salesProductRoutes"));
app.use("/api/transferProduct", require("./routes/transferProductRoutes"));
app.use("/api/purchaseProduct", require("./routes/purchaseProductRoutes"));
app.use("/api/employeCommission", require("./routes/employeCommissionRoute"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/expense", require("./routes/expenseRoutes"));
app.use("/api/expenseType", require("./routes/expenseTypeRoutes"));
app.use("/api/shop", require("./routes/shopRoute"));
app.use("/api/printer", require("./routes/printerRoute"));
app.use("/api/role", require("./routes/roleRoutes"));
app.use("/api/task", require("./routes/taskRoutes"));
app.use("/api/assignedRoles", require("./routes/assignedTasksRoute"));
app.use("/api/tableSetting", require("./routes/tableSettingRoute"));
//===========================================//
//=========SET PORT TO LISTEN ==============//
//=========================================//
const server = app.listen(process.env.port || 4500, function () {
  console.log("Server Started on Port ", process.env.port);
});
