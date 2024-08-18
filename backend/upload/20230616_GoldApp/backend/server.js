const app = require("./app");
const dotenv = require("dotenv");
const DataBaseConnection = require("./config/databaseConnection.js");

//====================================================//
//========HANDLING UNCAUGHT EXCEPTION ===============//
//==================================================//
process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception ${err.message}`);
  console.log("Server is shtting down due to Uncaught Exception");

  process.exit(1);
});

//==============================================//
//==================CONFIG   ==================//
//============================================//
dotenv.config({ path: "config/config.env" });

//====================================================//
//====DB CONNECT (MUST CALL AFTER ENV CONFIG)   =====//
//==================================================//
DataBaseConnection();

//=================================================================//
//====Start the server listening to specified  ===================//
//====PORT from environment variable or default 3001 if not =====//
//===============================================================//

//Store in Varibale for exit server on Unhandled promise Rejection
const server = app.listen(process.env.PORT, () => {
  console.log(`Servver is running on port ${process.env.PORT}`);
});

//====================================================//
//========= UNHANDLED PROMISE REJECTION  ============//
//==================================================//

process.on("unhandledRejection", (err) => {
  //handle errors here
  console.log(`Error: ${err.message}`);
  console.log("Server is shutting down due to unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
