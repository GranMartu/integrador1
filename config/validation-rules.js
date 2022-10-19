const { body, validationResult } = require('express-validator');
const registrationrules = [
    body("name").matches("^([A-Z][a-z]{0,20})([\s][A-Z][a-z]{0,20})?$").withMessage("Invalid monkey name"),
    body("bearname").matches("^([A-Z][a-z]{0,20})$").withMessage("FIX THIS NOW"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").matches("[a-zA-Z]").withMessage("Password must contain letters").matches("[0-9]").withMessage("Password must contain numbers").contains("bear").withMessage("Password must contain the word bear"),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const formdata = req.body
            const arrwarnings = errors.array()
            arrwarnings.forEach(item => {
                if (item.param == "name") {
                    item.isname = true;
                }
                if (item.param == "bearname") {
                    item.isbearname = true;
                }
                if (item.param == "email") {
                    item.isemail = true;
                }
                if (item.param == "password") {
                    item.ispassword = true;
                }
            });
            res.render("register", { arrwarnings, formdata })
        }
        else return next()
    }


]
const contactrules = [
    body("message").notEmpty().trim(" ").isLength({ min: 10 }).withMessage("you're not complaining the right amount")
]
module.exports = { registrationrules, contactrules };