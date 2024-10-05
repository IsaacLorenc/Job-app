const request = require("supertest");
const mongoose = require("mongoose");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const app = require("../index"); 
describe("POST /api/users", () => {
    beforeEach(async () => {
        // Clear the User collection before each test
        await User.deleteMany({});
    });

    afterAll(async () => {
        // Close mongoose connection after all tests
        await mongoose.connection.close();
    });

    it("should create a new user when valid data is provided", async () => {
        const res = await request(app)
            .post("/api/users")
            .send({
                firstName: "Test",
                lastName: "User",
                email: "test@example.com",
                password: "Password123!"
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("message", "User created successfully");

        const user = await User.findOne({ email: "test@example.com" });
        expect(user).not.toBeNull();
    });

    it("should return 409 if the user already exists", async () => {
        const user = new User({
            firstName: "Test",
            lastName: "User",
            email: "test@example.com",
            password: await bcrypt.hash("Password123!", 10),
        });
        await user.save();

        const res = await request(app)
            .post("/api/users")
            .send({
                firstName: "Test",
                lastName: "User",
                email: "test@example.com",
                password: "Password123!",
            });

        expect(res.status).toBe(409);
        expect(res.body).toHaveProperty("message", "User with given email already Exist!");
    });

    it("should return 400 for invalid input", async () => {
        const res = await request(app)
            .post("/api/users")
            .send({
                firstName: "Test",
                lastName: "User",
                email: "invalid-email", // Invalid email format
                password: "123", // Weak password
            });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("message");
    });
});