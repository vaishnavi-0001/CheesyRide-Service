import request from "supertest";
import app from "../../src/app";
describe("POST /auth/register", () => {
    describe("Given all fields", () => {
        it("should return the 201 status code", async () => {
            // Arrange
            const userData = {
                firstName: "Arya",
                lastName: "Sharma",
                email: "arya@mern.space",
                password: "secret001",
            };
            // Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            // Assert
            expect(response.statusCode).toBe(201);
        });

        it("should return valid json response", async () => {
            // Arrange
            const userData = {
                firstName: "Arya",
                lastName: "Sharma",
                email: "arya@mern.space",
                password: "secret001",
            };
            // Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            // Assert application/json utf-8
            expect(
                (response.headers as Record<string, string>)["content-type"],
            ).toEqual(expect.stringContaining("json"));
        });

        it("should persist the user in the database", async () => {
            // Arrange
            const userData = {
                firstName: "Arya",
                lastName: "Sharma",
                email: "arya@mern.space",
                password: "secret001",
            };
            // Act
            await request(app).post("/auth/register").send(userData);

            // Assert
        });
    });
    describe("Fields are missing", () => {});
});