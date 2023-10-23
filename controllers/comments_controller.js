const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require("../mailers/comments_mailer");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();
      console.log("hii");
      comment = await comment.populate("user", "name email");
      console.log("hii2");
      commentsMailer.newComment(comment);
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Post created",
        });
      }
      req.flash("Success", "Comment published!");

      res.redirect("/");
    }
  } catch (err) {
    req.flash("error", "Error creating the comment: " + err);
    return res.status(500).json({ error: "Error creating the comment" });
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
