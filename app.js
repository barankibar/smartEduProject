const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { default: mongoose } = require("mongoose");
const app = express();

const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const { getRegisterPage } = require("./controllers/pageControllers");
const userRoute = require("./routes/userRoute");

// CONNECT DB
mongoose
  .connect("mongodb://0.0.0.0:27017/smartedu-db", {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.error(err.stack);
  });

// Template Engine
app.set("view engine", "ejs");

// GLOBAL VARIABLES
(global.userIN = null),
  // MIDDLEWARES
  app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard_cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://0.0.0.0:27017/smartedu-db",
    }),
  })
);

// ROUTES
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`${port} has listening`);
});
