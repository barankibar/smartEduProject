const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

const pageRoute = require("./routes/pageRoute");

// CONNECT DB

mongoose
  .connect("mongodb://localhost/smartedu-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
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

// ROUTES
app.use("/", pageRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`${port} has listening`);
});
