const User = require("../models/user");
// Get the user's profile

module.exports.profile = async function (req, res) {
  if (req.cookies.user_id) {
    // Find the user
    const user = await User.findById(req.cookies.user_id);

    if (user) {
      // Render the user profile page
      return res.render("user_profile", {
        title: "User Profile",
        user: user,
      });
    }
  }

  // Redirect to the sign-in page if the user is not logged in
  return res.redirect("/users/sign-in");
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

// //Sign in and Create a Session for the users

// module.exports.createSession = function (req, res) {
//   //steps to authentication

//   //find the user
//   User.findOne({ email: req.body.email }, function (err, user) {
//     if (err) {
//       console.log("error in creating user while signing up");
//       return;
//     }

//     if (user) {
//       //handle password which doen't match
//       if (user.password != req.body.password) {
//         return res.redirect("back");
//       }
//       //handle session creation

//       res.cookie("user_id", user.id);
//       return res.redirect("/users/profile");
//     } else {
//       //handle user not found

//       return res.redirect("back");
//     }
//   });
// };

// Sign in and Create a Session for the users

module.exports.createSession = async function (req, res) {
  // steps to authentication

  // find the user
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    // handle user not found
    return res.redirect("back");
  }

  // handle password which doen't match
  if (user.password != req.body.password) {
    return res.redirect("back");
  }

  // handle session creation
  res.cookie("user_id", user.id);
  return res.redirect("/users/profile");
};
