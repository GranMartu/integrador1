require("./config/mongo")
const express = require("express");
const hbs = require("express-handlebars");
const { body, validationResult } = require('express-validator');
const { registrationrules, contactrules } = require("./config/validation-rules.js");
const securepass = require("./helpers/secure-pass");
const Member = require("./config/schemas/user-schema");
const session = require("express-session")
const auth = require("./helpers/auth");
const auth4fun = require("./helpers/auth4fun");
const auth10 = require("./helpers/auth10");
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')
const createtoken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: 1000000 });
}

const router = require('express').Router()
const PORT = 3001
const app = express();


app.engine(".hbs", hbs.engine({ extname: "hbs" }));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(session({
    secret: "KE",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.listen(PORT, (err) => {
    err ? console.log('something went ouchie') : console.log(`Running on http://localhost:${PORT}`);
})
app.get("/", (req, res) => {
    res.render("home");
})
app.get("/contact", auth, (req, res) => {
    res.render("contact");
})
app.post("/contact", contactrules, (req, res) => {
    const { opinion, msg } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render("contact", { error: true })
    }
    if (opinion == "bad") {
        res.redirect("/delete")
    }
    if (opinion == "good" && errors.isEmpty()) {
        res.render("contact", { msg: true })
    }
})
app.get("/about", (req, res) => {
    res.render("about");
})
app.get("/register", auth4fun, (req, res) => {
    res.render("register");
})

app.post("/register", registrationrules, async (req, res, next) => {
    const { name, bearname, email, password } = req.body;
    const hashedpass = await securepass.encrypt(password);
    const newmember = new Member({
        name, bearname, email, password: hashedpass
    })

    newmember.save((err) => {
        if (!err) {
            res.render("register", { bearname })
        }
        else {
            console.log(err)
        }
    });


})
app.get("/login", auth4fun, (req, res) => {
    res.render("login");
})
app.post("/login", async (req, res, next) => {
    const { bearname, password } = req.body;
    const member = await Member.find().where({ bearname })
    if (!member.length) {
        return res.render("login", { message: "Invalid Bear or password" })
    }
    if (await securepass.decrypt(password, member[0].password)) {
        const token = createtoken(member[0]._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 1000 });
        res.redirect("/")
    }
    else return res.render("login", { message: "Invalid Bear or password" })

})
app.get("/edit", auth10, (req, res) => {
    res.render("edit-session");
})
app.post("/edit", async (req, res) => {
    const { editemail, oldpassword, password } = req.body;

    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedtoken) => {
            if (!err) {
                const currentmember = await Member.findById(decodedtoken.id)
                if (currentmember.email == editemail) {
                    if (await securepass.decrypt(oldpassword, currentmember.password)) {

                        await Member.findByIdAndUpdate(currentmember.id, password)
                        res.render("edit-session", { message: "Success!" })
                    }
                    else {
                        res.render("edit-session", { errmsg: "Invalid mail or password" })
                    }
                }
                else {
                    res.render("edit-session", { errmsg: "Invalid mail or password" })
                }
            }
            else {
                console.log(err)
            }
        })
    }
})
app.get("/logout", (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect("/");
})
app.get("/delete", (req, res) => {
    res.render("delete-session");
})
app.post("/delete", (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedtoken) => {
            if (!err) {
                const currentmember = await Member.findById(decodedtoken.id)
                await Member.findByIdAndDelete(currentmember.id)
                res.redirect("/logout")
            }
            else {
                console.log(err)
            }
        })
    }
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

