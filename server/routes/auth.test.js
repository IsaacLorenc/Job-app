const bcrypt = require("bcrypt");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index"); // Make sure to export your Express app
const { User } = require("../models/user"); // Adjust the path as needed

beforeAll(async () => {
    // Connect to the in-memory database (or your test database)
    await mongoose.connect(process.env.ATLAS_URI, {});
});

afterEach(async () => {
    // Clear the users collection after each test
    await User.deleteMany({});
});

afterAll(async () => {
    // Close the database connection
    await mongoose.connection.close();
});

describe("POST /api/auth", () => {
    it("should log in a user with valid credentials", async () => {
        // Create a test user
        const user = new User({
            firstName: "Test", 
            lastName: "User",
            email: "test@example.com",
            password: await bcrypt.hash("Password123!", 10), // Hash the password
        });
        await user.save();

        const response = await request(app)
            .post("/api/auth")
            .send({
                email: "test@example.com",
                password: "Password123!",
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.message).toBe("logged in successfully");
    });

    it("should return 400 for invalid credentials", async () => {
        const response = await request(app)
            .post("/api/auth")
            .send({
                email: "invalid@example.com",
                password: "wrongpassword",
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Invalid Email or Password");
    });

    it("should return 400 for missing email or password", async () => {
        const response = await request(app)
            .post("/api/auth")
            .send({}); // Send an empty body

        expect(response.status).toBe(400);
        expect(response.body.message).toContain("Email");
    });
});