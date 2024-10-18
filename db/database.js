const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const databaseConnectionPassword = process.env.DATABASE_CONNECTION_PASSWORD;

const URL = `mongodb+srv://studyjams:${databaseConnectionPassword}@cluster0.6clgl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const databaseConnection = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log("Error connecting MongoDB", error);
  }
};

module.exports = databaseConnection;
