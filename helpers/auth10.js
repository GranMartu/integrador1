const jwt = require("jsonwebtoken")
const auth10 = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {

        jwt.verify(token, process.env.SECRET_KEY, (err, decodedtoken) => {
            if (err) {
                res.redirect("/register")
            }
            else {

                next()
            }
        })
    }
    else res.redirect("/register")
}
module.exports = auth10;