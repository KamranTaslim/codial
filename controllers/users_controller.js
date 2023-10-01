const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.end("<h1>User Profile</h1>");
};

//render the Sign up page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

//render the sign in page

module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

//get the sign up data

// module.exports.create = function (req, res) {
//   if (req.body.password != req.body.confirm_password) {
//     return res.redirect("back");
//   }
//   User.findOne({ email: req.body.email }, function (err, user) {
//     if (err) {
//       console.log("error in finding user in signing up");
//       return;
//     }

//     if (!user) {
//       User.create(req.body, function (err, user) {
//         if (err) {
//           console.log("error in creating user while signing up");
//           return;
//         }

//         return res.redirect("/users/sign-in");
//       });
//     } else {
//       return res.redirect("back");
//     }
//   });
// };

module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  // Find the user by email.
  const user = await User.findOne({ email: req.body.email });

  // If the user does not exist, create the user.
  if (!user) {
    await User.create(req.body);
  }

  // Redirect the user to the sign in page.
  return res.redirect("/users/sign-in");
};

//Sign in and Create a Session for the user

module.exports.createSession = function (req, res) {};
