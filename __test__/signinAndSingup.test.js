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

describe("Testing The Errors", () => {
  test("invalid route handler", async () => {
    const res = await mockRequest.get("/any");
    expect(res.status).toEqual(404);
  });
  test("invalid method", async () => {
    const res = await mockRequest.post("/categories/:id");
    expect(res.status).toEqual(404);
  });
  test("invalid method", async () => {
    const res = await mockRequest.post("/questions/:id");
    expect(res.status).toEqual(404);
  });
  test("invalid method", async () => {
    const res = await mockRequest.get("/addquestion/:id");
    expect(res.status).toEqual(404);
  });
  test("invalid method", async () => {
    const res = await mockRequest.get("/addToFavQuestion/:id");
    expect(res.status).toEqual(404);
  });
  test("invalid method", async () => {
    const res = await mockRequest.post("/profile/:id");
    expect(res.status).toEqual(404);
  });
  test("invalid method", async () => {
    const res = await mockRequest.delete("/profile/:id");
    expect(res.status).toEqual(404);
  });
  test("invalid method", async () => {
    const res = await mockRequest.get("/profile");
    expect(res.status).toEqual(500);
  });
});


describe("Testing signup and signin routes", () => {
  it("should create an account", async () => {
    const response = await mockRequest.post("/signup").send(body);
    expect(response.status).toBe(302);
  });

  it("should save user details to the data base", async () => {
    const userData = await User.find({ username: body.username });
    token = userData[0].token;
    userID = userData[0]._id.toString();
    expect(userData[0].username).toBe(body.username);
    expect(userData[0].email).toBe(body.email);
    expect(userData[0].role).toBe("user");
  });

  it("should signin with basic", async () => {
    const response = await mockRequest.post("/signin").send(body);
    categories = response.header.location;
    expect(response.status).toBe(302);
    expect(response.redirect).toBe(true);
  });
});

// test('server socket',()=>{
  
  // })
  /*resposne.socket ==>*/
  
  describe("Testing signup route", () => {
    it("should NOT create an account", async () => {
       body = {
        email: "test@test.test",
      };
      const response = await mockRequest.post("/signup").send(body);
  
      expect(response.status).toBe(403);
    });
    it("should NOT singin ", async () => {
      body = {
       email: "test@test.test",
     };
     const response = await mockRequest.post("/signup").send(body);
 
     expect(response.status).toBe(403);
   });
  
  });