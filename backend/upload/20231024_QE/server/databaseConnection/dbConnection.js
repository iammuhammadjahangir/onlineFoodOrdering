const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  try {
    mongoose.connect(
      // `mongodb+srv://aqibqazidb:SoftWise!23@cluster0.rzmot0y.mongodb.net/?retryWrites=true&w=majority`,
      `mongodb+srv://${process.env.databaseUserName}:${process.env.databasePassword}@cluster0.36cbtm6.mongodb.net/?retryWrites=true&w=majority`,

      // `mongodb+srv://${process.env.databaseUserName}:${process.env.databasePassword}@cluster0.rzmot0y.mongodb.net/?retryWrites=true&w=majority`,
      // `mongodb+srv://${process.env.databaseUserName}:${process.env.databasePassword}@cluster0.rzmot0y.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("connected to DB");
  } catch (error) {
    console.log("Error connection to DB ", error);
  }
};
module.exports = connectDB;
