const User = require("../models/user");

const passport = require("passport");
const LocalStrategy = require("passport-local");

//Authentication Using Passport

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//     },
//     function (email, password, done) {
//       // Find a user and establish the identity
//       User.findOne({ email: email }, function (err, user) {
//         if (err) {
//           console.log("Error in finding user --> Passport");
//           return done(err);
//         }
//         if (!user || user.password !== password) {
//           console.log("Invalid Username/Password");
//           return done(null, false);
//         }
//         return done(null, user);
//       });
//     }
//   )
// );

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      // Add 'req' as the first parameter
      try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
          req.flash("error", "Invalid Username/Password");
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        req.flash("error", err);
        return done(err);
      }
    }
  )
);

//Serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

//deserializing the user from the key in the cookies

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     if (err) {
//       console.log("Error in finding user --> Passport");
//       return done(err);
//     }
//     return done(null, user);
//   });
// });

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.log("Error in finding user --> Passport");
    return done(err);
  }
});

passport.checkAuthentication = function (req, res, next) {
  //if the user is Signed in, then Pass on the request to the next function(Controllers's action)
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req user contains the current signed in user contains from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};
module.exports = passport;
