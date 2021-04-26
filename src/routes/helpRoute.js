"use strict";

const express = require("express");
const router = express.Router();

const {
  getPosts,
  createPost,
  createComment,
  deletePost,
  deleteComment,
  editPost,
  editComment,
} = require("./../controller/helpController");

const bearerAuth = require("./../auth/middleware/bearer");

// help desk routes
router.get("/help/:id", bearerAuth, getPosts);

//add post routes
router.post("/post/:id", bearerAuth, createPost);
router.delete("/post/:id/:postId", bearerAuth, deletePost);
router.put("/post/:id/:postId", bearerAuth, editPost);

//add comment routes
router.post("/comment/:id", bearerAuth, createComment);
router.delete("/comment/:id/:commentId", bearerAuth, deleteComment);
router.put("/comment/:id/:commentId", bearerAuth, editComment);

module.exports = router;
