const jwt = require("jsonwebtoken")
const auth4fun = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {

        jwt.verify(token, process.env.SECRET_KEY, (err, decodedtoken) => {
            if (err) {
                next();
            }
            else {
                res.redirect("/edit")
            }
        })
    }
    else next()
}
module.exports = auth4fun;
