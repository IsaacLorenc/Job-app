const mongoose = require("mongoose");
const connectDB = require("./db");
require("dotenv").config();

jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

describe("Database Connection", () => {
  beforeEach(() => {
    // Reset any process.env changes between tests
    jest.resetModules();
  });

  it("should connect to the database successfully", async () => {
    process.env.ATLAS_URI = "mongodb://valid_uri"; // Set a valid URI for the test
    mongoose.connect.mockResolvedValueOnce({}); // Mock successful connection

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {}); // Spy on console.log

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith("mongodb://valid_uri", {});
    expect(consoleSpy).toHaveBeenCalledWith("Connected to database successfully");

    consoleSpy.mockRestore(); // Clean up the spy
  });

  it("should log an error if the URI is missing", async () => {
    delete process.env.ATLAS_URI; // Simulate missing ATLAS_URI

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    await connectDB();

    expect(consoleErrorSpy).toHaveBeenCalledWith("ATLAS_URI is undefined. Check your .env file.");

    consoleErrorSpy.mockRestore(); // Clean up the spy
  });

  it("should log an error if the connection fails", async () => {
    process.env.ATLAS_URI = "mongodb://invalid_uri";
    mongoose.connect.mockRejectedValueOnce(new Error("Connection failed")); // Mock connection failure

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = jest.spyOn(process, "exit").mockImplementation(() => {}); // Spy on process.exit

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith("mongodb://invalid_uri", {});
    expect(consoleErrorSpy).toHaveBeenCalledWith("Could not connect to the database!", expect.any(Error));
    expect(processExitSpy).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });
});