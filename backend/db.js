const mongoose = require("mongoose");
const mongoURL = "mongodb://localhost:27017/ikitab";

const connectToMongo = () => {
  mongoose.connect(mongoURL, () => {
    console.log("connected to mongoDB");
  });
};

mongoose.set("strictQuery", true);
module.exports = connectToMongo;
