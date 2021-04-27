"use strict";

process.env.SECRET = "toes";
const moment = require("moment");
const { server } = require("../src/server.js");
const supergoose = require("@code-fellows/supergoose");
const mockRequest = supergoose(server);

const User = require("../src/database/models/user");
const PostModel = require("../src/database/models/posts");
const CommentModel = require("../src/database/models/comments");

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

describe("Testing help routes", () => {
  let postID;
  let commentID;
  beforeAll(async () => {
    await mockRequest.post("/signup").send(body);
    await mockRequest.post("/signin").send(body);
    const userData = await User.find({ username: body.username });
    token = userData[0].token;
    userID = userData[0]._id.toString();
  });

  it("should go to the help page", async () => {
    const response = await mockRequest
      .get(`/help/${userID}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should create a post inside the help page", async () => {
    const newPost = {
      description: "I Have An Error In My Code Can You Help Me?",
      owner: userID,
      time: moment().format("h:mm a"),
    };

    let des = newPost.description;

    const response = await mockRequest
      .post(`/post/${userID}`)
      .send(newPost)
      .set("Authorization", `Bearer ${token}`);

    const checkPostInDB = await PostModel.find({ description: des });
    postID = checkPostInDB[0]._id;

    expect(response.status).toBe(302);
    expect(checkPostInDB[0].description).toBe(des);
  });

  it("should edit the post inside the help page", async () => {
    const newPost = {
      description: "I Have An Error In My Code Can You Help Me?",
    };

    let des = newPost.description;

    const response = await mockRequest
      .put(`/post/${userID}/${postID}`)
      .send(newPost)
      .set("Authorization", `Bearer ${token}`);

    const checkPostInDB = await PostModel.find({ description: des });
    postID = checkPostInDB[0]._id;

    expect(response.status).toBe(302);
    expect(checkPostInDB[0].description).toBe(des);
  });
  it("should delete the post inside the help page", async () => {
    const response = await mockRequest
      .delete(`/post/${userID}/${postID}`)
      .set("Authorization", `Bearer ${token}`);
    console.log(response.status);
    const checkPostInDB = await PostModel.find({});

    expect(response.status).toBe(302);
    expect(checkPostInDB).toEqual([]);
  });

  it("should create a comment to a post inside the help page", async () => {
    const newPost = {
      description: "I Have An Error In My Code Can You Help Me?",
    };

    await mockRequest
      .put(`/post/${userID}/${postID}`)
      .send(newPost)
      .set("Authorization", `Bearer ${token}`);

    const newComment = {
      description: "Can You Provide Me With More Details ?",
      owner : userID,
      post:postID
    };

    let des = newComment.description;

    const response = await mockRequest
      .post(`/comment/${userID}`)
      .send(newComment)
      .set("Authorization", `Bearer ${token}`);

    const checkCommentInDB = await CommentModel.find({ description: des });
    commentID = checkCommentInDB[0]._id;
    
    expect(response.status).toBe(302);
    expect(checkCommentInDB[0].description).toEqual(des);
  });

    it("should edit comment on a post inside the help page", async () => {
      const newPost = {
        description: "Can You Provide Me With Your Code?",
      };

      let des = newPost.description;

      const response = await mockRequest
        .put(`/comment/${userID}/${commentID}`)
        .send(newPost)
        .set("Authorization", `Bearer ${token}`);

      const checkEditComment = await CommentModel.find({ description: des });
      expect(response.status).toBe(302);
      expect(checkEditComment[0].description).toBe(des);
    });
    it("should delete a comment on a post inside the help page", async () => {
      const response = await mockRequest
        .delete(`/comment/${userID}/${commentID}`)
        .set("Authorization", `Bearer ${token}`);
      
      const checkCommentInDB = await CommentModel.find({});

      expect(response.status).toBe(302);
      expect(checkCommentInDB).toEqual([]);
    });
});
