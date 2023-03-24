const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://akhil3:mahakaal333@cluster0.uvqbqru.mongodb.net/test";

const connectToMongo = () => {
  mongoose.connect(mongoURL, () => {
    console.log("connected to mongoDB");
  });
};

mongoose.set("strictQuery", true);
module.exports = connectToMongo;
