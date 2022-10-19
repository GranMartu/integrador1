const bcrypt = require("bcrypt");
const encrypt = async (pass) => {
    return await bcrypt.hash(pass, 10);
}
const decrypt = async (pass, hashedpass) => {
    return await bcrypt.compare(pass, hashedpass);
}
module.exports = { encrypt, decrypt }