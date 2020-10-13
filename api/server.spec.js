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
});
