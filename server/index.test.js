const request = require("supertest");
const app = require("./index"); 
const connection = require("./db"); 
const mongoose = require("mongoose");

global.setImmediate = global.setImmediate || ((fn) => setTimeout(fn, 0));

jest.mock("./db"); // Mock the DB connection to avoid connecting to the real database during testing

describe("App Routes", () => {
  beforeAll(() => {
    // Mock the database connection
    connection.mockResolvedValue();
  });

  afterAll(async () => {
    // Close the mongoose connection after tests
    await mongoose.connection.close();
  });

  describe("GET /api/users (User Routes)", () => {
    it("should return 404 for non-existing endpoint", async () => {
      const res = await request(app).get("/api/users/nonexistent"); // Test a nonexistent user route
      expect(res.status).toBe(404); // We expect a 404 response
    });
  });

  describe("POST /api/auth (Auth Routes)", () => {
    it("should return 400 if credentials are missing", async () => {
      const res = await request(app).post("/api/auth").send({}); // Send an empty payload
      expect(res.status).toBe(400); // Bad request response
      expect(res.body.message).toBeDefined(); // Ensure that the error message is present
    });
  });

  describe("CORS", () => {
    it("should have CORS enabled", async () => {
      jest.setTimeout(10000);
      const res = await request(app).get("/api/auth");
      expect(res.headers["access-control-allow-origin"]).toBe("*"); // CORS header should be present
    });
  });
});