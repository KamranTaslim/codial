const Post = require("../models/post");
const Comment = require("../models/comment");

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

// module.exports.destroy = function (req, res) {
//   Post.findById(req.params.id, function (err, post) {
//     //.id means converting the object id into String

//     if (post.user == req.user.id) {
//       post.remove();

//       Comment.deleteMany({ post: req.params.id }, function (err) {
//         return res.redirect("back");
//       });
//     } else {
//       return res.redirect("back");
//     }
//   });
// };

async function destroy(req, res) {
  try {
    const post = await Post.findById(req.params.id).exec();

    if (post.user.toString() === req.user.id.toString()) {
      await post.deleteOne();

      await Comment.deleteMany({ post: req.params.id }).exec();
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
}

module.exports.destroy = destroy;
