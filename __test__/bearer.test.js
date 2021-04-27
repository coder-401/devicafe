"use strict";

process.env.SECRET = "toes";

const { server } = require("../src/server.js");
const supergoose = require("@code-fellows/supergoose");
const mockRequest = supergoose(server);

const User = require("../src/database/models/user");
const collection = require("../src/database/controller/data-collection");
const userCollection = new collection(User);
let body = {
  email: "test@test.test",
  username: "test",
  password: "test",
};
let userID;
let token;
let categories;

describe("Testing the bearer", () => {
  beforeAll(async () => {
    await mockRequest.post("/signup").send(body);
    await mockRequest.post("/signin").send(body);
    const userData = await User.find({ username: body.username });
    token = userData[0].token;
    userID = userData[0]._id.toString();
  });
  it("should go to the categories page with bearer", async () => {
    const response = await mockRequest
      .get(`/categories/${userID}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("should NOT go to the categories page with wrong token", async () => {
    const response = await mockRequest
      .get(`/categories/${userID}`)
      .set("Authorization", `Bearer ${token}33`);
    expect(response.status).toBe(403);
  });
});
