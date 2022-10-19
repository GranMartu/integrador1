const jwt = require("jsonwebtoken")
const auth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {

        jwt.verify(token, process.env.SECRET_KEY, (err, decodedtoken) => {
            if (err) {
                res.render("donotcare")
            }
            else {
                next();
            }
        })
    }
    else res.render("donotcare")
}
module.exports = auth;
