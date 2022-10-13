// require("./config/mongo")
const express = require("express");
const hbs = require("express-handlebars");
// const session = require("express-session")
const PORT = 3001
const app = express();


app.engine(".hbs", hbs.engine({ extname: "hbs" }));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }));

app.listen(PORT, (err) => {
    err ? console.log('something went ouchie') : console.log(`Running on http://localhost:${PORT}`);
})
app.get("/", (req, res) => {
    res.render("home");
})
app.get("/contact", (req, res) => {
    res.render("contact", { user: "Miguelito" });
})
app.get("/about", (req, res) => {
    res.render("about");
})
app.get("/register", (req, res) => {
    res.render("register");
})
app.get("/log-in", (req, res) => {
    res.render("log-in");
})
app.get("/notcare", (req, res) => {
    res.render("donotcare");
})