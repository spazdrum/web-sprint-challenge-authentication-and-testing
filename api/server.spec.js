const request = require("supertest");
const server = require("./server");
const db = require("../database/dbConfig");
const { truncate } = require("../database/dbConfig");
const { expectCt } = require("helmet");
const testUser = { username: "test", password: "testing" };

describe("server.js", () => {
  describe("Get request for jokes", () => {
    it("Should return status 400 when not logged in", async () => {
      const res = await request(server).get("/api/jokes");
      expect(res.status).toBe(400);
    });
    it("Should return json", async () => {
      const res = await request(server).get("/api/jokes");
      expect(res.type).toBe("application/json");
    });
  });

  describe("Register new user", () => {
    it("Should return status 201 when adding new users", async () => {
      await db("users").truncate();
      const res = await request(server)
        .post("/api/auth/register")
        .send(testUser);
      expect(res.status).toBe(201);
    });
    it("Should return status 500 with invalid credentials", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send(testUser);
      expect(res.status).toBe(500);
    });
  });

  describe("login with user", () => {
    it("Should return status 200 with test user", async () => {
      const res = await request(server).post("/api/auth/login").send(testUser);
      expect(res.status).toBe(200);
    });
    it("Should return 401 with invalid credentials", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "invalid", password: "blank_space" });
      expect(res.status).toBe(401);
    });
  });
});
