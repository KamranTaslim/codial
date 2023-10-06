const User = require("../models/user");

// Get the user's profile
module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
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
