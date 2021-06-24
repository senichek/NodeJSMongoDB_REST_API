const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get("/:postID", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postID);
        res.json(post);
    } catch (error) {
        res.json({ message: error });
    }
});

router.post("/", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err })
    }
});

router.delete("/:postID", async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postID });
        res.json(removedPost);
    } catch (error) {
        res.json({ message: error });
    }
});

router.patch("/:postID", async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postID },  // _id - this is how ID looks in DB;
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;