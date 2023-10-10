const Post = require("../models/post");
const User = require("../models/user");

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
//       User.find({}, function (err, user) {
//         return res.render("home", {
//           title: "Codiel | Home",
//           posts: posts,
//           all_usres: users,
//         });
//       });
//     });
// };

//populate the user for each post
// async function home(req, res) {
//   try {
//     const posts = await Post.find({})
//       .populate("user")
//       .populate({ path: "comments", populate: { path: "user" } })
//       .exec();
//     return res.render("home", {
//       title: "Codiel | Home",
//       posts: posts,
//     });
//   } catch (err) {
//     console.log("Error in finding and populating posts:", err);
//   }
// }

// module.exports.home = home;

module.exports.home = async function (req, res) {
  try {
    const posts = await Post.find({})
      .populate("user")
      .populate({ path: "comments", populate: { path: "user" } })
      .exec();
    const users = await User.find({});

    res.render("home", {
      title: "Codiel | Home",
      posts: posts,
      all_users: users, // Corrected typo 'all_usres' to 'all_users'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
