const mongoose = require("mongoose");
const { User, validate } = require("./user"); // Update with your actual path
require('dotenv').config();

describe("User Model Tests", () => {
	let user;

	// Connect to MongoDB before running tests
	beforeAll(async () => {
		await mongoose.connect(process.env.ATLAS_URI, {});
	});

	// Clear the database before each test
	beforeEach(async () => {
		await User.deleteMany({});
		user = new User({
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			password: "ComplexPass1!", // Ensure this meets your complexity requirements
		});
	});

	// Disconnect from MongoDB after tests
	afterAll(async () => {
		await mongoose.connection.close();
	});

	test("should create a user successfully", async () => {
		const savedUser = await user.save();
		expect(savedUser._id).toBeDefined();
		expect(savedUser.firstName).toBe("John");
		expect(savedUser.lastName).toBe("Doe");
		expect(savedUser.email).toBe("john.doe@example.com");
	});

	test("should validate user data successfully", () => {
		const { error } = validate({
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			password: "ComplexPass1!",
		});
		expect(error).toBeUndefined(); // No validation error should occur
	});

	test("should fail validation for missing fields", () => {
		const { error } = validate({
			firstName: "",
			lastName: "Doe",
			email: "invalidEmail",
			password: "123",
		});
		expect(error).toBeDefined(); // There should be a validation error
		expect(error.details.length).toBeGreaterThan(0);
	});

	test("should generate a valid JWT token", () => {
		const token = user.generateAuthToken();
		expect(token).toBeDefined();
		const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
		expect(decoded._id).toBe(user._id.toString());
	});
});