const express = require("express");
const app = express();
const port = 8000;
const expressLayout = require("express-ejs-layouts");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");
//used for session cookies

const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-outh2-strategy");
const MongoStore = require("connect-mongo");
const SassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMiddleware = require("./config/middleware");

app.use(
  SassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(express.static("./assets"));

//make the upload path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayout);

//extract style and scripts from sub pages into the layout

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//Mongo Store is used to store the session cookies in the db.
app.use(
  session({
    name: "codieal",
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongoUrl: "mongodb://0.0.0.0:27017/codeial_developments",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb-setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleware.setFlash);
//use express router
app.use("/", require("./routes"));
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port : ${port}`);
});
