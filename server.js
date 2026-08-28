require("dotenv").config();
require("./config/database");

const path = require("path");
const express = require("express");

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  app.set('trust proxy', 1);
}

const session = require("express-session");
const MongoStore = require("connect-mongo").MongoStore;
const methodOverride = require("method-override");
const morgan = require("morgan");
const isSignedIn = require("./middleware/isSignedIn");
const addUserToViews = require("./middleware/addUserToViews");

const authRouter = require("./routes/authRouter");
const pagesRouter = require("./routes/pagesRouter");
const movieRouter = require("./routes/movieRouter");

const port = process.env.PORT ? process.env.PORT : "3000";


app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProduction,
    },
  })
);
app.use(addUserToViews);


app.use("", pagesRouter);
app.use("/auth", authRouter);
app.use("/movies", movieRouter);

app.use(isSignedIn);

app.get("/protected", async (req, res) => {
  res.send(`You are logged in as ${req.session.user.username}`);
});


app.listen(port,'0.0.0.0', () => {
  console.log(`The express app is ready on port ${port}!`);
});
