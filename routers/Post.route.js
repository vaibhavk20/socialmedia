const express = require("express");
const { PostModel } = require("../model/Post.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const postRouter = express.Router();

// get posts
postRouter.get("/", async (req, res) => {
  // user id =>token===db
  const userID = req.body.userID;
  try {
    const data = await PostModel.find({ userID: userID });
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send("try again");
  }
});

postRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const post = new PostModel(payload);
    await post.save();
    res.send("posted successfully");
  } catch (err) {
    console.log(err);
    res.send("try again later");
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  // post id
  const ID = req.params.id;
  const payload = req.body;
  const post = await PostModel.findOne({ _id: ID });
  // user id =>token===db
  const userID_post = post.userID;
  const userID_body = req.body.userID;
  try {
    if (userID_post == userID_body) {
      await PostModel.findByIdAndUpdate({ _id: ID }, payload);

      res.send("updated successfully");
    } else {
      res.send("your not a autherized person");
    }
  } catch (err) {
    console.log(err);
  }
});

// delete
postRouter.delete("/delete/:id", async (req, res) => {
  // post id
  const ID = req.params.id;
  const post = await PostModel.findOne({ _id: ID });
  // user id =>token===db
  const userID_post = post.userID;
  const userID_body = req.body.userID;
  try {
    if (userID_post == userID_body) {
      await PostModel.findByIdAndDelete({ _id: ID });
      res.send("deleted successfully");
    } else {
      res.send("your not a autherized person");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  postRouter,
};
