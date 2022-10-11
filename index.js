import hbs from "express-handlebars";
import express from "express";
const PORT = 3001
const app = express();

app.engine(".hbs", hbs.engine({ extname: "hbs" }));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static("public"))
app.listen(PORT, (err) => {
    err ? console.log('something went ouchie') : console.log(`Running on http://localhost:${PORT}`);
})
app.get("/", (req, res) => {
    res.render("home");
})
app.get("/contact", (req, res) => {
    res.render("contact");
})
app.get("/about", (req, res) => {
    res.render("about");
})