const User = require("../models/user");

// Get the user's profile
// module.exports.profile = function (req, res) {
//   return res.render("user_profile", {
//     title: "User Profile",
//     profile_user: user,
//   });
// };

// module.exports.profile = function (req, res) {
//   User.findById(req.params.id, function (err, user) {
//     return res.render("user_profile", {
//       title: "User Profile",
//       profile_user: user,
//     });
//   });
// };
module.exports.profile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

//render the Sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

//render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

//get the sign up data
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

// Sign in and Create a Session for the users
module.exports.createSession = async function (req, res) {
  // steps to authentication
  return res.redirect("/");
};
//Update user Profile name and email

// module.exports.update = function (req, res) {
//   if (req.user.id == req.params.id) {
//     User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
//       return res.redirect("back");
//     });
//   } else {
//     return res.status(401).send("Unauthorized");
//   }
// };
module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      return res.redirect("back");
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
  } else {
    return res.status(401).send("Unauthorized");
  }
};

//LogOut session
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      // Handle the error
    } else {
      res.redirect("/");
    }
  });
};
