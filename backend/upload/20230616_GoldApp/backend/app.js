const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketIO(server);

// console.log(process.env.BASE_URL_FRONTEND);
const corsOptions = {
  // origin: "http://localhost:5100",
  origin: "https://ak.softwisesol.com",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//==============================================//
//=================ROUTES  ====================//
//============================================//
app.use("/api", require("./routes/ratesCurrencyRoute"));
app.use("/api", require("./routes/ratesMetalLocalRoute"));
app.use("/api/admin", require("./routes/userRoutes"));

//==================================================================//
//Attach io to the app object to make it available in other modules//
//================================================================//
app.set("socketio", io);

io.on("connection", (socket) => {
  console.log("Client connected");
});

//=================================================================//
//====Start the socket server listening to specified  ============//
//====PORT from environment variable or default 5001 if not =====//
//==============================================================//

server.listen(5001, () => {
  console.log(`Server Started on http://localhost: 5001`);
});

//==============================================//
//=============Middleware For Errors===========//
//============================================//

app.use(errorMiddleware);

module.exports = app;
