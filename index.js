require("dotenv").config(); // Load environment variables

const express = require("express");
const databaseConnection = require("./db/database"); // Import your database connection function
const cors = require("cors");
const app = express();

// Define allowed origins for CORS
const allowedOrigins = ["https://gdg-mgm-genai.vercel.app"];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin, like mobile apps or curl
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Environment variables for port and host
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

// Connect to the database
databaseConnection();

// Import routes from the routes folder
app.use("/", require("./routes"));

// Error handling for unhandled routes
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

// Error handling for other issues (like CORS errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is listening at http://${host}:${port}`);
});
