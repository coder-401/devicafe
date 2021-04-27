"use strict";

process.env.SECRET = "toes";

const { server } = require("../src/server.js");
const supergoose = require("@code-fellows/supergoose");
const mockRequest = supergoose(server);

const User = require("../src/database/models/user");
const questionModel = require("../src/database/models/question");
const favQuestion = require("../src/database/models/favQuestion");

const collection = require("../src/database/controller/data-collection");
const userCollection = new collection(User);
let body = {
  email: "test@test.test",
  username: "test",
  password: "test",
  role: "admin",
};
let userID;
let token;
let categories;

describe("Testing questions routes", () => {
  const record = {
    question: "What is acl ?",
    answer: "access control list",
    difficulty: "advance",
    category: "node",
  };
  beforeAll(async () => {
    await mockRequest.post("/signup").send(body);
    await mockRequest.post("/signin").send(body);
    const userData = await User.find({ username: body.username });
    token = userData[0].token;
    userID = userData[0]._id.toString();
  });

  it("should go to the questions page", async () => {
    const response = await mockRequest
      .get(`/questions/${userID}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should add a question by the admin to the question page", async () => {
    let findQues = record.question;
    const response = await mockRequest
      .post(`/addquestion/${userID}`)
      .send(record)
      .set("Authorization", `Bearer ${token}`);

    const checkQuestionInDB = await questionModel.find({ question: findQues });
    expect(response.status).toBe(302);
    expect(checkQuestionInDB[0].question).toBe(findQues);
  });

  it("should add a question by the admin to the question page", async () => {
    let findQues = record.question;

    const response = await mockRequest
      .post(`/addToFavQuestion/${userID}`)
      .send(record)
      .set("Authorization", `Bearer ${token}`);

      const checkQuestionInDB = await favQuestion.find({question : findQues})

      expect(checkQuestionInDB[0].question).toBe(findQues);
      expect(response.status).toBe(302);
  });
});
