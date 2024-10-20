require("dotenv").config();

const express = require("express");
const databaseConnection = require("./db/database");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

databaseConnection();

app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`Server is listening at http://${host}:${port}`);
});
