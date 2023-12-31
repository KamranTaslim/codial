const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return res.status(200).json({
    message: "List of post",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user.toString() === req.user.id.toString()) {
      post.deleteOne();

      await Comment.deleteMany({ post: req.params.id });

      return res.status(200).json({
        message: "Post and associated comments deleted successfully",
      });
    } else {
      return res.json(401, {
        message: "You can not delete the posts",
      });
    }
  } catch (err) {
    console.log("*******", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
