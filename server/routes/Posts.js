const express = require("express");
const router = express.Router();
const { Posts, Likes, Comments } = require("../models");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll({include: [Likes]});
  res.json(listOfPosts);
  
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const singlePost = await Posts.findByPk(id, {include: [Likes]});
  res.json(singlePost);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

module.exports = router;