require("./config/mongo")
const express = require("express");
const hbs = require("express-handlebars");
const { body, validationResult } = require('express-validator');
const { registrationrules, contactrules } = require("./config/validation-rules.js")
// const validationrules = require(".config/validation-rules");
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
app.post("/contact", contactrules, (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render("/contact", { error: true }, { user: "Miguelito" })
    }
})
app.get("/about", (req, res) => {
    res.render("about");
})
app.get("/register", (req, res) => {
    res.render("register");
})

app.post("/register", registrationrules, (req, res) => {

    const { name, bearname, email, password } = req.body;
    console.log(bearname)
    res.render("register", { bearname })

})
app.get("/login", (req, res) => {
    res.render("login");
})
app.post("/login", (req, res) => {

})
app.get("/notcare", (req, res) => {
    res.render("donotcare");
})
app.get("/brown", (req, res) => {
    res.render("article-brown");
})
app.get("/panda", (req, res) => {
    res.render("article-panda");
})
app.get("/polar", (req, res) => {
    res.render("article-polar");
})
app.get("/sun", (req, res) => {
    res.render("article-sun");
})
app.get("/shop", (req, res) => {
    res.render("shop");
})

