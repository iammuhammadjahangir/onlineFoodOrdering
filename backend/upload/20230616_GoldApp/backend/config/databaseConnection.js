const mongoose = require("mongoose");

//==================================================//
//====FUNCTION TO CONNECT TO MONGO DB ATLAS   =====//
//================================================//
const DataBaseConnection = () => {
  mongoose.connect(process.env.DATABASE_URL).then((data) => {
    console.log(`DataBase is connected on host ${data.connection.host}`);
  });
};

module.exports = DataBaseConnection;
