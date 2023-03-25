const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://negi:akhil333@cluster0.yzp1r.mongodb.net/ikitab";

const connectToMongo = () => {
  mongoose.connect(mongoURL, () => {
    console.log("connected to mongoDB");
  });
};

mongoose.set("strictQuery", true);
module.exports = connectToMongo;
