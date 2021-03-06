const express = require("express");
const router = express.Router();
const { Posts, Likes, Comments } = require("../models");

const {validateToken} = require("../middlewares/AuthMiddleware")

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({include: [Likes]});
  const likedPosts = await Likes.findAll({where:{ UserId: req.user.id}})
  res.json({listOfPosts: listOfPosts, likedPosts: likedPosts});
  
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const singlePost = await Posts.findByPk(id, {include: [Likes]});
  res.json(singlePost);
});



router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});

router.get("/byUserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfUserPosts = await Posts.findAll({where: {UserId: id}, include: [Likes]})
  res.json(listOfUserPosts);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;

  await Posts.destroy({
    where: {
      id: postId
    }});

  res.json("Deleted")
})

module.exports = router;