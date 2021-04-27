"use strict";

process.env.SECRET = "toes";

const { server } = require("../src/server.js");
const supergoose = require("@code-fellows/supergoose");
const mockRequest = supergoose(server);

const User = require("../src/database/models/user");
const collection = require("../src/database/controller/data-collection");
let body = {
  email: "test@test.test",
  username: "test",
  password: "test",
};

describe("Testing signin with basic", () => {
  
    beforeAll(async () => {
    await mockRequest.post("/signup").send(body);
  });
  
  it("should signin with basic", async () => {
    const response = await mockRequest.post("/signin").send(body);
    expect(response.status).toBe(302);
  });
  it("should NOT signin with basic if one of the requirment is wrong", async () => {
    body = {
        email: "test@test.test",
        username: "test",
        password: "test33"
      };
    const response = await mockRequest.post("/signin").send(body);
    expect(response.status).toBe(403);
  });
});
