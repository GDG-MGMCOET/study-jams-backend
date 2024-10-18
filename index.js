require("dotenv").config();

const express = require("express");
const databaseConnection = require("./db/database");
const app = express();
app.use(express.json());

const auth = require('./middleware/Authentication');

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

databaseConnection();

app.get("/", (req, res) => {
  return res.send({
    message: "Welcome to study-jams backend",
  });
});

app.post('/admin',auth,(req,res)=>{

  // logic related to get userData.
})

app.listen(port, () => {
  console.log(`Server is listening at http://${host}:${port}`);
});
