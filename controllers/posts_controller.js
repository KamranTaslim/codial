const Post = require("../models/post");

async function createPost(req, res) {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("back");
  } catch (err) {
    console.log("Error in creating a post:", err);
  }
}

module.exports.create = createPost;
