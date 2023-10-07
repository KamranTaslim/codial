const Post = require("../models/post");

// async function home(req, res) {
//   const posts = await Post.find({});
//   return res.render("home", {
//     title: "Codiel | Home",
//     posts: posts,
//   });
// }

// module.exports.home = function (req, res) {
//   Post.find({})
//     .populate("user")
//     .exec(function (err, posts) {
//       return res.render("home", {
//         title: "Codiel | Home",
//         posts: posts,
//       });
//     });
// };

//populate the user for each post
async function home(req, res) {
  try {
    const posts = await Post.find({})
      .populate("user")
      .populate({ path: "comments", populate: { path: "user" } })
      .exec();
    return res.render("home", {
      title: "Codiel | Home",
      posts: posts,
    });
  } catch (err) {
    console.log("Error in finding and populating posts:", err);
  }
}

module.exports.home = home;
