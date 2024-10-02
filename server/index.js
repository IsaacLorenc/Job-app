require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../dist')));

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 5173;
app.listen(port, console.log(`Listening on port ${port}...`));
