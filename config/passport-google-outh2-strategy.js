const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "577252815501-tcieu4cjmfj4gb3m23i2o2shtt0kl63p.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({ email: profile.emails[0].value });

        console.log(profile);

        if (user) {
          return done(null, user);
        } else {
          const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          });

          return done(null, newUser);
        }
      } catch (err) {
        console.log("error in google strategy passport", err);
        return done(err);
      }
    }
  )
);

module.exports = passport;
