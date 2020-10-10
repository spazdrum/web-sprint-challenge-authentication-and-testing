const request = require("supertest");
const db = require("../database/dbConfig");
const auth = require("./auth-model");
const server = require("../api/server");

describe("Register User", () => {
  it("should register users", async () => {
    const newUser = { username: "mocUser", password: "password" };
    const res = await request(server).post("/api/auth/register").send(newUser);
    expect(res.status).toBe(201);
    expect(res.type).toBe("application/json");
  });
});

describe("Login User", () => {
  it("should send an error for wrong password", async () => {
    const res = await (await request(server).post("/api/auth/login")).send({
      username: "mocUser2",
      password: "incorrect",
    });
    expect(res.status).toBe(403);
    expect(res.type).toBe("application/json");
  });

  it("Should have success with correct password", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "mocUser2", password: "password" });
    expect(res.status).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body).toHaveProperty("token");
  });
});
