import express from "express";
import { connectDB } from "./utils/dbConnection.js";
import { errorMiddleware } from "./middleware/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// for Socket
import http from "http";
import { Server } from "socket.io";

// importing Routes
import userRoutes from "./routes/userRoutes.js";
import taskRoute from "./routes/taskRoutes.js";
import roleRoute from "./routes/roleRoutes.js";
import assignTaskRoute from "./routes/assignTaskRoute.js";
import cartRoute from "./routes/cartRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import customerRoute from "./routes/customerRoute.js";
import itemsRoute from "./routes/itemsRoute.js";
import saleInvoiceRoute from "./routes/saleInvoiceRoute.js";
import subOptionRoute from "./routes/subOptionRoute.js";
import wareHouseRoute from "./routes/warehouseRoute.js";
import branchRoute from "./routes/branchRoute.js";
import ImageSlider from "./routes/imageSliderRoute.js";
import order from "./routes/orderRoute.js";
import banner from "./routes/bannerRoute.js";
import bulkCategoryDiscount from "./routes/bulkCategoryDiscountRoute.js";
import promoCode from "./routes/promoCodeRoute.js";
import ItemBranch from "./routes/itemBranchRoute.js";

// Setting Environment Variable
config({
  path: "./.env",
});

// Connect to DB
connectDB(process.env.MONGO_URL || "");

// for speed optimization and caching
// For storing data in memory
// can pas options for how long data is to be stored
export const myCache = new NodeCache();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://resturent.softwisesol.com",
      "https://resturentadmin.softwisesol.com",
    ],
    // methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://resturent.softwisesol.com",
      "https://resturentadmin.softwisesol.com",
    ],
  },
});
//Default Route
app.get("/", (req, res) => {
  res.send("API Working ");
});

// Using the routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoute);
app.use("/api/v1/role", roleRoute);
app.use("/api/v1/assignTask", assignTaskRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/customer", customerRoute);
app.use("/api/v1/items", itemsRoute);
app.use("/api/v1/branch", branchRoute);
app.use("/api/v1/itemBranch", ItemBranch);
app.use("/api/v1/sale", saleInvoiceRoute);
app.use("/api/v1/subOption", subOptionRoute);
app.use("/api/v1/wareHouse", wareHouseRoute);
app.use("/api/v1/slider", ImageSlider);
app.use("/api/v1/order", order);
app.use("/api/v1/banner", banner);
app.use("/api/v1/bulkCategoryDiscount", bulkCategoryDiscount);
app.use("/api/v1/promoCode", promoCode);

// Make upload folder statis
app.use("/upload", express.static("upload"));

//==================================================================//
//Attach io to the app object to make it available in other modules//
//================================================================//
app.set("socketio", io);

let currentVisitors = 0;
io.on("connection", (socket) => {
  console.log("New client connected");

  // Send the current number of visitors to the newly connected client or admin
  socket.emit("visitorUpdate", currentVisitors);

  socket.on("visitorConnected", () => {
    currentVisitors++;
    io.emit("visitorUpdate", currentVisitors);
    console.log("Visitor connected, current visitors:", currentVisitors);
  });

  socket.on("disconnect", () => {
    if (currentVisitors > 0) {
      currentVisitors--;
    }
    io.emit("visitorUpdate", currentVisitors);
    console.log("Visitor disconnected, current visitors:", currentVisitors);
  });

  // Handle request for current visitor count
  socket.on("requestCurrentVisitors", () => {
    socket.emit("visitorUpdate", currentVisitors);
  });
});

// Custom error MiddleWare
// Always Called after routes
app.use(errorMiddleware);

// server.listen(3999, () => {
//   console.log(`Server Started on http://localhost: 5001`);
// });

server.listen(process.env.PORT, () => {
  console.log(`Server Started on Port ${process.env.PORT}`);
});
