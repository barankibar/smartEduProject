import app from "./server.js";


// Template Engine
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.status(200).render("index", {
        page_name: "index"
    });
})

const port = 3000;
app.listen(port, () => {
    console.log(`${port} has listening`);
})