require("dotenv").config();
const mongoose = require("mongoose");

module.exports = async () => {
  const connectionParams = {};

  const uri = process.env.ATLAS_URI;
  console.log("Connecting to:", uri); // Debugging line to check the URI

  if (!uri) {
    console.error("ATLAS_URI is undefined. Check your .env file.");
    return;
  }

  try {
    await mongoose.connect(uri, connectionParams);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Could not connect to the database!", error);
    process.exit(1); // Exit the process on failure
  }
};

