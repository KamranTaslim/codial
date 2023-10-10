const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async (req, res) => {
  const post = await Post.findById(req.body.post);
  if (post) {
    const comment = await Comment.create({
      content: req.body.content,
      post: req.body.post,
      user: req.user._id,
    });
    post.comments.push(comment);
    await post.save();
    res.redirect("/");
  }
};

// module.exports.destroy = function (req, res) {
//   Comment.findById(req.params.id, function (err, comment) {
//     if (comment.user == req.user.id) {
//       let postId = comment.post;

//       comment.remove();

//       Post.findByIdAndUpdate(
//         postId,
//         { $pull: { comment: req.params.id } },
//         function (err, post) {
//           return res.redirect("back");
//         }
//       );
//     } else {
//       return res.redirect("back");
//     }
//   });
// };

module.exports.destroy = async function (req, res) {
  const comment = await Comment.findById(req.params.id);

  if (comment.user.toString() === req.user.id.toString()) {
    const postId = comment.post;

    await comment.deleteOne();

    await Post.findByIdAndUpdate(postId, {
      $pull: { comment: req.params.id },
    });
  }

  return res.redirect("back");
};
