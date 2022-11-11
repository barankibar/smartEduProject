const express = require("express");
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

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`${port} has listening`);
});
